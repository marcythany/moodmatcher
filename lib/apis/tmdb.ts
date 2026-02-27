import { CastMember, Title, TitleDetails, WatchProvider } from '@/lib/types';
import axios from 'axios';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL =
	process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const TMDB_IMAGE_URL =
	process.env.NEXT_PUBLIC_TMDB_IMAGE_URL || 'https://image.tmdb.org/t/p';

if (!TMDB_API_KEY) {
	throw new Error('TMDB_API_KEY is not defined in environment variables');
}

const tmdbClient = axios.create({
	baseURL: TMDB_BASE_URL,
	params: {
		api_key: TMDB_API_KEY,
		language: 'pt-BR',
	},
});

// Mapeamento de gêneros do TMDB
const genreMap: Record<number, string> = {
	28: 'Ação',
	12: 'Aventura',
	16: 'Animação',
	35: 'Comédia',
	80: 'Crime',
	99: 'Documentário',
	18: 'Drama',
	10751: 'Família',
	14: 'Fantasia',
	36: 'História',
	27: 'Terror',
	10402: 'Música',
	9648: 'Mistério',
	10749: 'Romance',
	878: 'Ficção científica',
	10770: 'Cinema TV',
	53: 'Thriller',
	10752: 'Guerra',
	37: 'Faroeste',
};

function formatYear(dateString: string): string {
	return dateString ? dateString.substring(0, 4) : '';
}

// Interfaces para as respostas da API TMDB (tipagem forte)
interface TMDBMovie {
	id: number;
	title: string;
	overview: string;
	poster_path: string | null;
	backdrop_path: string | null;
	release_date: string;
	vote_average: number;
	genre_ids: number[];
}

interface TMDBGenre {
	id: number;
	name: string;
}

interface TMDBCastMember {
	name: string;
	character: string;
	profile_path: string | null;
}

interface TMDBCrewMember {
	name: string;
	job: string;
	profile_path: string | null;
}

interface TMDBProvider {
	provider_name: string;
	logo_path: string;
	provider_id: number;
}

interface TMDBWatchProviders {
	results?: {
		BR?: {
			flatrate?: TMDBProvider[];
			link?: string;
		};
		US?: {
			flatrate?: TMDBProvider[];
			link?: string;
		};
	};
}

interface TMDBMovieDetails extends TMDBMovie {
	genres: TMDBGenre[];
	status: string;
	runtime: number;
	credits?: {
		cast: TMDBCastMember[];
		crew: TMDBCrewMember[];
	};
	'watch/providers'?: TMDBWatchProviders;
	videos?: {
		results: Array<{
			key: string;
			site: string;
			type: string;
		}>;
	};
	imdb_id?: string;
	production_companies?: Array<{
		name: string;
	}>;
}

interface TMDBResponse<T> {
	results: T[];
}

// Buscar filmes por gênero
export async function getMoviesByGenre(genreIds: number[]): Promise<Title[]> {
	try {
		const response = await tmdbClient.get<TMDBResponse<TMDBMovie>>(
			'/discover/movie',
			{
				params: {
					with_genres: genreIds.join(','),
					sort_by: 'popularity.desc',
					'vote_count.gte': 50,
				},
			},
		);

		return response.data.results.map((item) => {
			return {
				id: `tmdb-movie-${item.id}`,
				tmdbId: item.id,
				title: item.title,
				overview: item.overview,
				posterPath:
					item.poster_path ? `${TMDB_IMAGE_URL}/w500${item.poster_path}` : null,
				backdropPath:
					item.backdrop_path ?
						`${TMDB_IMAGE_URL}/original${item.backdrop_path}`
					:	null,
				year: formatYear(item.release_date),
				rating: item.vote_average,
				genres: item.genre_ids.map((id) => genreMap[id] || 'Desconhecido'),
				type: 'movie',
				// streaming não preenchido na listagem
			};
		});
	} catch (error) {
		console.error('Error fetching movies from TMDB:', error);
		return [];
	}
}

// Buscar detalhes de um filme
export async function getMovieDetails(
	movieId: number,
): Promise<TitleDetails | null> {
	try {
		const response = await tmdbClient.get<TMDBMovieDetails>(
			`/movie/${movieId}`,
			{
				params: {
					append_to_response: 'credits,watch/providers,videos',
				},
			},
		);

		const item = response.data;

		// Processar elenco (top 5 atores + diretor)
		const castMembers: CastMember[] = [];

		// Adicionar diretor se existir
		const director = item.credits?.crew?.find(
			(person) => person.job === 'Director',
		);
		if (director) {
			castMembers.push({
				name: director.name,
				character: 'Diretor',
				profilePath:
					director.profile_path ?
						`${TMDB_IMAGE_URL}/w185${director.profile_path}`
					:	null,
			});
		}

		// Adicionar atores principais
		const actors = (item.credits?.cast?.slice(0, 5) || []).map((person) => ({
			name: person.name,
			character: person.character,
			profilePath:
				person.profile_path ?
					`${TMDB_IMAGE_URL}/w185${person.profile_path}`
				:	null,
		}));
		castMembers.push(...actors);

		// Processar provedores de streaming no Brasil
		const providersBR = item['watch/providers']?.results?.BR;
		let watchProviders: WatchProvider[] = [];
		if (providersBR?.flatrate) {
			watchProviders = providersBR.flatrate.map((provider) => ({
				providerName: provider.provider_name,
				logoPath:
					provider.logo_path ?
						`${TMDB_IMAGE_URL}/w92${provider.logo_path}`
					:	'',
				link:
					providersBR.link ||
					`https://www.themoviedb.org/movie/${item.id}/watch`,
			}));
		}

		// Processar trailer
		const trailer = item.videos?.results?.find(
			(video) => video.type === 'Trailer' && video.site === 'YouTube',
		);

		return {
			id: `tmdb-movie-${item.id}`,
			tmdbId: item.id,
			title: item.title,
			overview: item.overview,
			synopsis: item.overview, // TMDB não tem sinopse separada
			posterPath:
				item.poster_path ? `${TMDB_IMAGE_URL}/w500${item.poster_path}` : null,
			backdropPath:
				item.backdrop_path ?
					`${TMDB_IMAGE_URL}/original${item.backdrop_path}`
				:	null,
			year: formatYear(item.release_date),
			rating: item.vote_average,
			tmdbRating: item.vote_average,
			genres: item.genres?.map((g) => g.name) || [],
			type: 'movie',
			streaming:
				watchProviders.length > 0 ?
					{
						provider: watchProviders[0].providerName,
						link: watchProviders[0].link,
					}
				:	undefined,
			// Campos de TitleDetails
			cast: castMembers,
			director: director?.name,
			studio: item.production_companies?.[0]?.name,
			status: item.status,
			trailer:
				trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : undefined,
			imdbId: item.imdb_id,
			episodeRuntime: item.runtime,
			watchProviders: watchProviders,
			// Campos não aplicáveis para filmes
			creators: undefined,
			numberOfEpisodes: undefined,
			numberOfSeasons: undefined,
			jikanRating: undefined,
			tvmazeRating: undefined,
		};
	} catch (error) {
		console.error('Error fetching movie details from TMDB:', error);
		return null;
	}
}
