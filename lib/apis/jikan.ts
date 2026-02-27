// lib/apis/jikan.ts
import { CastMember, Title, TitleDetails } from '@/lib/types';
import axios from 'axios';

const JIKAN_BASE_URL = 'https://api.jikan.moe/v4';

const jikanClient = axios.create({
	baseURL: JIKAN_BASE_URL,
});

// Interfaces para as respostas da API Jikan v4
interface JikanImage {
	image_url: string;
	small_image_url?: string;
	large_image_url?: string;
}

interface JikanImages {
	jpg: JikanImage;
	webp?: JikanImage;
}

interface JikanAired {
	from: string | null;
	to: string | null;
}

interface JikanGenre {
	mal_id: number;
	name: string;
}

interface JikanAnime {
	mal_id: number;
	title: string;
	title_english?: string;
	synopsis: string | null;
	images: JikanImages;
	aired: JikanAired;
	score: number | null;
	genres: JikanGenre[];
	status: string;
	episodes: number | null;
	duration?: string;
	rating?: string;
	season?: string;
	year?: number;
	studios?: Array<{ name: string }>;
}

interface JikanPerson {
	mal_id: number;
	name: string;
	images: JikanImages;
}

interface JikanCharacter {
	character: JikanPerson;
	role: string;
	voice_actors?: Array<{
		person: JikanPerson;
		language: string;
	}>;
}

// Interface para paginação da Jikan
interface JikanPagination {
	last_visible_page: number;
	has_next_page: boolean;
	current_page?: number;
	items?: {
		count?: number;
		total?: number;
		per_page?: number;
	};
}

// Resposta para endpoints que retornam uma lista (com paginação)
interface JikanListResponse<T> {
	data: T[];
	pagination: JikanPagination;
}

// Resposta para endpoints que retornam um único item (sem paginação)
interface JikanSingleResponse<T> {
	data: T;
}

// Função auxiliar para formatar ano
function formatYear(dateString: string | null): string {
	return dateString ? dateString.substring(0, 4) : '';
}

// Buscar animes por gênero (IDs)
export async function getAnimeByGenre(genreIds: number[]): Promise<Title[]> {
	try {
		const response = await jikanClient.get<JikanListResponse<JikanAnime>>(
			'/anime',
			{
				params: {
					genres: genreIds.join(','),
					order_by: 'popularity',
					sort: 'asc',
					limit: 20,
					sfw: true,
				},
			},
		);

		return response.data.data.map((anime) => ({
			id: `jikan-${anime.mal_id}`,
			jikanId: anime.mal_id,
			title: anime.title,
			overview: anime.synopsis || 'Sem sinopse disponível',
			posterPath: anime.images.jpg.image_url || null,
			backdropPath: anime.images.jpg.large_image_url || null,
			year: formatYear(anime.aired?.from),
			rating: anime.score,
			genres: anime.genres.map((g) => g.name),
			type: 'anime' as const,
			streaming: undefined,
		}));
	} catch (error) {
		console.error('Error fetching anime from Jikan:', error);
		return [];
	}
}

// Buscar detalhes de um anime (incluindo personagens)
export async function getAnimeDetails(
	animeId: number,
): Promise<TitleDetails | null> {
	try {
		// Requisições em paralelo: detalhes do anime + personagens
		const [animeRes, charactersRes] = await Promise.all([
			jikanClient.get<JikanSingleResponse<JikanAnime>>(`/anime/${animeId}`),
			jikanClient.get<JikanListResponse<JikanCharacter>>(
				`/anime/${animeId}/characters`,
			),
		]);

		const anime = animeRes.data.data;
		const characters = charactersRes.data.data;

		// Processa elenco (personagens principais, limitar a 10)
		const cast: CastMember[] = characters.slice(0, 10).map((char) => ({
			name: char.character.name,
			character: char.role || 'Personagem',
			profilePath: char.character.images.jpg.image_url || null,
		}));

		// Estúdio principal (primeiro da lista)
		const studio =
			anime.studios && anime.studios.length > 0 ?
				anime.studios[0].name
			:	undefined;

		// Converte duração (ex: "24 min") para número, se possível
		let episodeRuntime: number | undefined;
		if (anime.duration) {
			const match = anime.duration.match(/(\d+)/);
			if (match) episodeRuntime = parseInt(match[0], 10);
		}

		return {
			id: `jikan-${anime.mal_id}`,
			jikanId: anime.mal_id,
			title: anime.title,
			overview: anime.synopsis || '',
			synopsis: anime.synopsis || '',
			posterPath: anime.images.jpg.image_url || null,
			backdropPath: anime.images.jpg.large_image_url || null,
			year: formatYear(anime.aired?.from),
			rating: anime.score,
			jikanRating: anime.score ?? undefined,
			genres: anime.genres.map((g) => g.name),
			type: 'anime' as const,
			streaming: undefined,
			cast,
			studio,
			status: anime.status,
			numberOfEpisodes: anime.episodes ?? undefined,
			episodeRuntime,
			// Outros campos não disponíveis
			director: undefined,
			creators: undefined,
			numberOfSeasons: undefined,
			trailer: undefined,
			imdbId: undefined,
			watchProviders: [],
			tmdbRating: undefined,
			tvmazeRating: undefined,
		};
	} catch (error) {
		console.error('Error fetching anime details from Jikan:', error);
		return null;
	}
}
