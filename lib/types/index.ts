// lib/types/index.ts

// Tipo base para exibição na grade de resultados
export interface Title {
	id: string; // ID único composto (ex: "tmdb-movie-123")
	tmdbId?: number;
	jikanId?: number;
	tvmazeId?: number;
	title: string;
	overview: string; // Descrição curta
	posterPath: string | null; // Caminho relativo ou URL completa
	backdropPath?: string | null;
	year: string; // Ano de lançamento ou início
	rating: number | null; // Nota média (0-10)
	genres: string[]; // Lista de nomes de gêneros
	type: 'movie' | 'anime' | 'series';
	// Informações de streaming/disponibilidade (pode ser preenchido depois)
	streaming?: {
		provider?: string;
		link?: string;
	};
}

// Tipo para página de detalhes (estende Title com mais campos)
export interface TitleDetails extends Title {
	// Informações estendidas
	synopsis: string; // Sinopse completa (pode ser igual ao overview se a API não fornecer outra)
	cast: CastMember[]; // Elenco principal
	director?: string; // Diretor (para filmes)
	creators?: string[]; // Criadores (para séries)
	studio?: string; // Estúdio (para animes)
	numberOfEpisodes?: number; // Para séries e animes
	numberOfSeasons?: number; // Para séries
	episodeRuntime?: number; // Duração média dos episódios (minutos)
	status: string; // Status da produção (em andamento, finalizada, etc.)
	trailer?: string; // Link do trailer (YouTube)
	imdbId?: string; // ID IMDb (se disponível)
	tmdbRating?: number; // Nota específica da API
	jikanRating?: number; // Nota específica da API
	tvmazeRating?: number; // Nota específica da API
	// Onde assistir (pode vir de TMDB Watch Providers)
	watchProviders?: WatchProvider[];
}

export interface CastMember {
	name: string;
	character: string; // Nome do personagem ou "Director", "Creator"
	profilePath?: string | null; // Foto do ator
}

export interface WatchProvider {
	providerName: string; // Ex: "Netflix", "Amazon Prime"
	logoPath: string; // Caminho do logo
	link: string; // Link direto para o título no serviço
}

// Tipos auxiliares para requisições
export interface Genre {
	id: number;
	name: string;
}
