import { CastMember, Title, TitleDetails } from '@/lib/types';
import { gql, request } from 'graphql-request';

const ANILIST_API_URL = 'https://graphql.anilist.co';

// Interfaces internas para a resposta da AniList
interface AniListTitle {
	romaji?: string;
	english?: string;
	native?: string;
	userPreferred?: string;
}

interface AniListCoverImage {
	large: string;
	medium: string;
	extraLarge?: string;
}

interface AniListDate {
	year?: number;
	month?: number;
	day?: number;
}

interface AniListAiringSchedule {
	episode: number;
	timeUntilAiring?: number;
}

interface AniListStudio {
	name: string;
}

interface AniListCharacter {
	name: { full: string };
	image: { large: string };
}

interface AniListStaff {
	name: { full: string };
	image: { large: string };
	primaryOccupations?: string[];
}

interface AniListMedia {
	id: number;
	title: AniListTitle;
	description?: string;
	coverImage: AniListCoverImage;
	bannerImage?: string;
	startDate: AniListDate;
	meanScore?: number;
	genres: string[];
	status: string;
	episodes?: number;
	duration?: number; // duração por episódio em minutos
	studios?: { nodes: AniListStudio[] };
	characters?: { nodes: AniListCharacter[] };
	staff?: { nodes: AniListStaff[] };
	trailer?: { id: string; site: string };
	source?: string;
	format?: string;
	season?: string;
	seasonYear?: number;
	trending?: number;
	popularity?: number;
	favourites?: number;
	nextAiringEpisode?: AniListAiringSchedule;
}

// Função auxiliar para extrair o ano
function formatYear(date: AniListDate): string {
	return date?.year ? date.year.toString() : '';
}

// Função auxiliar para limpar descrição (remover tags HTML)
function cleanDescription(html?: string): string {
	if (!html) return '';
	return html.replace(/<[^>]*>/g, '');
}

// Buscar animes por gênero (lista de nomes de gênero)
export async function getAnimeByGenre(genreNames: string[]): Promise<Title[]> {
	const query = gql`
		query ($genres: [String]) {
			Page(perPage: 20) {
				media(genre_in: $genres, type: ANIME, sort: POPULARITY_DESC) {
					id
					title {
						romaji
						english
						userPreferred
					}
					description
					coverImage {
						large
					}
					bannerImage
					startDate {
						year
					}
					meanScore
					genres
					format
					episodes
					status
				}
			}
		}
	`;

	const variables = { genres: genreNames };

	try {
		const data = await request<{
			Page: { media: AniListMedia[] };
		}>(ANILIST_API_URL, query, variables);

		return data.Page.media.map((anime) => ({
			id: `anilist-${anime.id}`,
			anilistId: anime.id,
			title:
				anime.title.userPreferred ||
				anime.title.romaji ||
				anime.title.english ||
				'Sem título',
			overview: cleanDescription(anime.description).slice(0, 200) + '...',
			posterPath: anime.coverImage.large || null,
			backdropPath: anime.bannerImage || null,
			year: formatYear(anime.startDate),
			rating: anime.meanScore ? anime.meanScore / 10 : null, // AniList usa 0-100
			genres: anime.genres,
			type: 'anime',
			streaming: undefined,
		}));
	} catch (error) {
		console.error('Error fetching anime from AniList:', error);
		return [];
	}
}

// Buscar detalhes de um anime (incluindo personagens, staff, etc.)
export async function getAnimeDetails(
	animeId: number,
): Promise<TitleDetails | null> {
	const query = gql`
		query ($id: Int) {
			Media(id: $id, type: ANIME) {
				id
				title {
					romaji
					english
					native
					userPreferred
				}
				description
				coverImage {
					large
					extraLarge
				}
				bannerImage
				startDate {
					year
					month
					day
				}
				endDate {
					year
					month
					day
				}
				meanScore
				genres
				status
				episodes
				duration
				studios {
					nodes {
						name
					}
				}
				characters(perPage: 10) {
					nodes {
						name {
							full
						}
						image {
							large
						}
					}
				}
				staff(perPage: 5) {
					nodes {
						name {
							full
						}
						image {
							large
						}
						primaryOccupations
					}
				}
				trailer {
					id
					site
				}
				source
				format
				season
				seasonYear
				trending
				popularity
				favourites
				nextAiringEpisode {
					episode
					timeUntilAiring
				}
			}
		}
	`;

	const variables = { id: animeId };

	try {
		const data = await request<{ Media: AniListMedia }>(
			ANILIST_API_URL,
			query,
			variables,
		);
		const anime = data.Media;

		// Processar elenco (personagens)
		const cast: CastMember[] = (anime.characters?.nodes || []).map((char) => ({
			name: char.name.full,
			character: 'Personagem', // AniList não fornece o papel específico diretamente
			profilePath: char.image.large || null,
		}));

		// Adicionar staff como "Diretor" ou "Criador" se disponível
		const director = anime.staff?.nodes?.find((staff) =>
			staff.primaryOccupations?.includes('Director'),
		);
		if (director) {
			cast.unshift({
				name: director.name.full,
				character: 'Diretor',
				profilePath: director.image.large || null,
			});
		}

		// Estúdio principal
		const studio = anime.studios?.nodes?.[0]?.name;

		// Trailer (apenas YouTube por enquanto)
		let trailerUrl: string | undefined;
		if (anime.trailer?.site === 'youtube' && anime.trailer.id) {
			trailerUrl = `https://www.youtube.com/watch?v=${anime.trailer.id}`;
		}

		return {
			id: `anilist-${anime.id}`,
			title:
				anime.title.userPreferred ||
				anime.title.romaji ||
				anime.title.english ||
				'',
			overview: cleanDescription(anime.description),
			synopsis: cleanDescription(anime.description),
			posterPath: anime.coverImage.extraLarge || anime.coverImage.large || null,
			backdropPath: anime.bannerImage || null,
			year: formatYear(anime.startDate),
			rating: anime.meanScore ? anime.meanScore / 10 : null,
			genres: anime.genres,
			type: 'anime',
			streaming: undefined,
			cast,
			studio,
			status: anime.status,
			numberOfEpisodes: anime.episodes,
			episodeRuntime: anime.duration,
			trailer: trailerUrl,
			// Outros campos não disponíveis
			director: director?.name.full,
			creators: undefined,
			numberOfSeasons: undefined,
			imdbId: undefined,
			watchProviders: [],
			tmdbRating: undefined,
			tvmazeRating: undefined,
			jikanRating: undefined,
		};
	} catch (error) {
		console.error('Error fetching anime details from AniList:', error);
		return null;
	}
}
