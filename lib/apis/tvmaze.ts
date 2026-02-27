import { CastMember, Title, TitleDetails } from '@/lib/types';
import axios from 'axios';

const TVMAZE_BASE_URL = 'https://api.tvmaze.com';

const tvmazeClient = axios.create({
	baseURL: TVMAZE_BASE_URL,
});

// Interfaces para as respostas da API TVMaze
interface TVMazeImage {
	medium: string;
	original: string;
}

interface TVMazeShow {
	id: number;
	name: string;
	summary: string | null;
	image: TVMazeImage | null;
	premiered: string | null;
	rating: { average: number | null };
	genres: string[];
	status: string;
	network?: { name: string };
	webChannel?: { name: string };
	externals?: { imdb?: string };
	_embedded?: {
		episodes?: Array<{
			id: number;
			name: string;
			season: number;
			number: number;
			runtime: number | null;
		}>;
	};
}

interface TVMazeCastMember {
	person: {
		name: string;
		image: TVMazeImage | null;
	};
	character: {
		name: string;
	};
}

// Função auxiliar para formatar ano
function formatYear(dateString: string | null): string {
	return dateString ? dateString.substring(0, 4) : '';
}

// Remove tags HTML da sinopse (a TVMaze retorna summary com HTML)
function stripHtml(html: string | null): string {
	if (!html) return '';
	return html.replace(/<[^>]*>/g, '');
}

// Buscar séries por gênero (lista de nomes de gênero)
export async function getSeriesByGenre(genreNames: string[]): Promise<Title[]> {
	try {
		// Converte gêneros para minúsculas para comparação
		const lowerGenres = genreNames.map((g) => g.toLowerCase());

		let allShows: TVMazeShow[] = [];

		// Busca até 2 páginas (limite de 250 shows por página) para ter uma amostra razoável
		for (let page = 0; page < 2; page++) {
			const response = await tvmazeClient.get<TVMazeShow[]>('/shows', {
				params: { page },
			});
			allShows = allShows.concat(response.data);
			if (response.data.length < 250) break; // última página
		}

		// Filtra os shows que possuem pelo menos um dos gêneros desejados
		const filtered = allShows.filter((show) => {
			const showGenres = show.genres.map((g) => g.toLowerCase());
			return lowerGenres.some((genre) => showGenres.includes(genre));
		});

		// Mapeia para o tipo Title
		return filtered.map((show) => ({
			id: `tvmaze-${show.id}`,
			tvmazeId: show.id,
			title: show.name,
			overview: stripHtml(show.summary),
			posterPath: show.image?.medium || null,
			backdropPath: show.image?.original || null,
			year: formatYear(show.premiered),
			rating: show.rating.average, // pode ser null, compatível com Title.rating
			genres: show.genres,
			type: 'series' as const, // string literal, sem importar MediaType
			streaming: undefined, // TVMaze não fornece informações de streaming
		}));
	} catch (error) {
		console.error('Error fetching series from TVMaze:', error);
		return [];
	}
}

// Buscar detalhes de uma série
export async function getSeriesDetails(
	seriesId: number,
): Promise<TitleDetails | null> {
	try {
		// Faz requisições em paralelo: detalhes da série + elenco
		const [showRes, castRes] = await Promise.all([
			tvmazeClient.get<TVMazeShow>(`/shows/${seriesId}`, {
				params: { embed: 'episodes' }, // opcional, para pegar episódios
			}),
			tvmazeClient.get<TVMazeCastMember[]>(`/shows/${seriesId}/cast`),
		]);

		const show = showRes.data;
		const castData = castRes.data;

		// Processa elenco
		const cast: CastMember[] = castData.slice(0, 10).map((member) => ({
			name: member.person.name,
			character: member.character?.name || 'Personagem',
			profilePath: member.person.image?.medium || null,
		}));

		// Determina o estúdio/canal (network ou webChannel)
		const studio = show.network?.name || show.webChannel?.name;

		// Número de episódios (se veio no embed)
		const numberOfEpisodes = show._embedded?.episodes?.length;

		// TVMaze não fornece trailer, watchProviders, etc.
		return {
			id: `tvmaze-${show.id}`,
			tvmazeId: show.id,
			title: show.name,
			overview: stripHtml(show.summary),
			synopsis: stripHtml(show.summary),
			posterPath: show.image?.medium || null,
			backdropPath: show.image?.original || null,
			year: formatYear(show.premiered),
			rating: show.rating.average, // pode ser null, compatível com Title.rating
			tvmazeRating: show.rating.average ?? undefined, // converte null para undefined
			genres: show.genres,
			type: 'series' as const,
			streaming: undefined, // não disponível
			cast,
			studio,
			status: show.status,
			numberOfEpisodes,
			// Campos não disponíveis na TVMaze
			director: undefined,
			creators: undefined,
			numberOfSeasons: undefined,
			episodeRuntime: undefined,
			trailer: undefined,
			imdbId: show.externals?.imdb,
			watchProviders: [],
			jikanRating: undefined,
			tmdbRating: undefined,
		};
	} catch (error) {
		console.error('Error fetching series details from TVMaze:', error);
		return null;
	}
}
