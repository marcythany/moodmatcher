// lib/utils/moodMappings.ts

/**
 * Mapeamento de humores para gêneros nas APIs TMDB, Jikan (MyAnimeList) e TVMaze.
 * Cada humor possui um slug (usado na URL), um nome amigável e as listas de gêneros correspondentes.
 */

export interface MoodGenreMap {
	tmdb: number[]; // IDs de gênero do TMDB
	jikan: number[]; // IDs de gênero da Jikan (MyAnimeList)
	tvmaze: string[]; // Nomes de gênero da TVMaze
}

export interface MoodMetadata {
	slug: string; // identificador para URL (ex: "divertido")
	label: string; // nome em português para exibição
	emoji: string; // ícone/emoji representativo
	color: string; // cor temática (classe Tailwind ou código hexadecimal)
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
			jikan: [4], // Comedy
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
			jikan: [8, 41], // Drama, Suspense
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
			jikan: [8, 7, 40], // Drama, Mystery, Psychological
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
			jikan: [15, 36], // Kids, Slice of Life
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
			jikan: [1, 2], // Action, Adventure
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
			jikan: [22], // Romance
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
			jikan: [14, 39, 41], // Horror, Police, Suspense
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
			jikan: [8, 13, 46], // Drama, Historical, Award Winning
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
			jikan: [10, 24], // Fantasy, Sci-Fi
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
			jikan: [2, 15, 4], // Adventure, Kids, Comedy
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
			jikan: [7, 41], // Mystery, Suspense
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
			jikan: [1, 30, 19], // Action, Sports, Music
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
