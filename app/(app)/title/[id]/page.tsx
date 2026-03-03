import { TitleDetailsView } from '@/components/mood/TitleDetailsView';
import { getAnimeDetails } from '@/lib/apis/anilist'; // ← novo import
import { getMovieDetails } from '@/lib/apis/tmdb';
import { getSeriesDetails } from '@/lib/apis/tvmaze';
import { getMoodBySlug } from '@/lib/utils/moodMappings';
import { moodDarkBgColors } from '@/lib/utils/utils';
import { notFound } from 'next/navigation';
import { TitleClient } from './title-client';

interface PageProps {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ from?: string }>;
}

export default async function TitlePage({ params, searchParams }: PageProps) {
	const { id } = await params;
	const { from } = await searchParams;

	// Formato esperado: "anilist-123" ou "tmdb-movie-456" ou "tvmaze-789"
	const parts = id.split('-');
	if (parts.length < 2) notFound();

	const prefix = parts[0];
	const numericId = parts[parts.length - 1]; // pega o último segmento que deve ser o número

	let details = null;
	if (prefix === 'tmdb' && parts[1] === 'movie') {
		details = await getMovieDetails(parseInt(numericId, 10));
	} else if (prefix === 'anilist') {
		// ← novo prefixo
		details = await getAnimeDetails(parseInt(numericId, 10));
	} else if (prefix === 'tvmaze') {
		details = await getSeriesDetails(parseInt(numericId, 10));
	} else {
		// Opcional: manter compatibilidade com IDs antigos "jikan-..."
		if (prefix === 'jikan') {
			// Redirecionar ou tentar buscar no AniList? Melhor redirecionar para 404 ou fazer busca por título?
			// Por simplicidade, vamos retornar 404.
			notFound();
		}
	}

	if (!details) notFound();

	let bgClass = 'bg-background';
	if (from) {
		const mood = getMoodBySlug(from);
		if (mood && moodDarkBgColors[mood.color]) {
			bgClass = moodDarkBgColors[mood.color];
		}
	}

	return (
		<main className={`min-h-screen ${bgClass}`}>
			<TitleClient details={details}>
				<TitleDetailsView details={details} />
			</TitleClient>
		</main>
	);
}
