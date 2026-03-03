/**
 * Mapeamento de humores para gêneros nas APIs TMDB, AniList e TVMaze.
 * Cada humor possui um slug (usado na URL), um nome amigável e as listas de gêneros correspondentes.
 */

export interface MoodGenreMap {
	tmdb: number[]; // IDs de gênero do TMDB
	anilist: string[]; // Nomes de gênero da AniList
	tvmaze: string[]; // Nomes de gênero da TVMaze
}

export interface MoodMetadata {
	slug: string; // identificador para URL (ex: "divertido")
	label: string; // nome em português para exibição
	emoji: string; // ícone/emoji representativo
	color: string; // cor temática (classe Tailwind)
	genres: MoodGenreMap;
}

export const moodMappings: MoodMetadata[] = [
	{
		slug: 'divertido',
		label: 'Divertido',
		emoji: '😄',
		color: 'amber-400',
		genres: {
			tmdb: [35], // Comédia
			anilist: ['Comedy'],
			tvmaze: ['Comedy'],
		},
	},
	{
		slug: 'emocionante',
		label: 'Emocionante',
		emoji: '😢',
		color: 'blue-400',
		genres: {
			tmdb: [18, 53], // Drama, Thriller
			anilist: ['Drama', 'Thriller'],
			tvmaze: ['Drama', 'Thriller'],
		},
	},
	{
		slug: 'profundo',
		label: 'Profundo',
		emoji: '🤔',
		color: 'purple-400',
		genres: {
			tmdb: [18, 9648], // Drama, Mistério
			anilist: ['Drama', 'Mystery'],
			tvmaze: ['Drama', 'Mystery'],
		},
	},
	{
		slug: 'leve',
		label: 'Leve',
		emoji: '😌',
		color: 'green-300',
		genres: {
			tmdb: [10751, 16], // Família, Animação
			anilist: ['Slice of Life', 'Comedy'],
			tvmaze: ['Family', 'Animation'],
		},
	},
	{
		slug: 'acao',
		label: 'Ação',
		emoji: '🔥',
		color: 'red-500',
		genres: {
			tmdb: [28, 12], // Ação, Aventura
			anilist: ['Action', 'Adventure'],
			tvmaze: ['Action', 'Adventure'],
		},
	},
	{
		slug: 'romantico',
		label: 'Romântico',
		emoji: '❤️',
		color: 'pink-400',
		genres: {
			tmdb: [10749], // Romance
			anilist: ['Romance'],
			tvmaze: ['Romance'],
		},
	},
	{
		slug: 'sombrio',
		label: 'Sombrio',
		emoji: '🌑',
		color: 'gray-700',
		genres: {
			tmdb: [27, 80, 53], // Terror, Crime, Thriller
			anilist: ['Horror', 'Thriller'],
			tvmaze: ['Horror', 'Crime', 'Thriller'],
		},
	},
	{
		slug: 'inspirador',
		label: 'Inspirador',
		emoji: '✨',
		color: 'yellow-400',
		genres: {
			tmdb: [18, 36, 10751], // Drama, História, Família
			anilist: ['Drama', 'Fantasy'],
			tvmaze: ['Drama', 'History', 'Family'],
		},
	},
	{
		slug: 'fantastico',
		label: 'Fantástico',
		emoji: '🧙',
		color: 'indigo-400',
		genres: {
			tmdb: [14, 878], // Fantasia, Ficção científica
			anilist: ['Fantasy', 'Sci-Fi'],
			tvmaze: ['Fantasy', 'Science-Fiction'],
		},
	},
	{
		slug: 'nostalgico',
		label: 'Nostálgico',
		emoji: '📺',
		color: 'orange-300',
		genres: {
			tmdb: [12, 10751, 35], // Aventura, Família, Comédia (clássicos)
			anilist: ['Adventure', 'Comedy'],
			tvmaze: ['Adventure', 'Family', 'Comedy'],
		},
	},
	{
		slug: 'curioso',
		label: 'Curioso',
		emoji: '🔍',
		color: 'teal-400',
		genres: {
			tmdb: [9648, 53], // Mistério, Thriller
			anilist: ['Mystery', 'Thriller'],
			tvmaze: ['Mystery', 'Thriller'],
		},
	},
	{
		slug: 'energetico',
		label: 'Energético',
		emoji: '⚡',
		color: 'lime-400',
		genres: {
			tmdb: [28, 10402], // Ação, Música
			anilist: ['Action', 'Sports'],
			tvmaze: ['Action', 'Sports', 'Music'],
		},
	},
];

// Tipo auxiliar para os slugs
export type MoodSlug = (typeof moodMappings)[number]['slug'];

// Função utilitária para obter um humor pelo slug
export function getMoodBySlug(slug: string): MoodMetadata | undefined {
	return moodMappings.find((mood) => mood.slug === slug);
}

// Mapeamento rápido de slug para gêneros (para uso nas requisições)
export const moodToGenreMap: Record<MoodSlug, MoodGenreMap> =
	moodMappings.reduce(
		(acc, mood) => {
			acc[mood.slug as MoodSlug] = mood.genres;
			return acc;
		},
		{} as Record<MoodSlug, MoodGenreMap>,
	);
