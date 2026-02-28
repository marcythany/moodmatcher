import { TitleDetailsView } from '@/components/mood/TitleDetailsView';
import { getAnimeDetails } from '@/lib/apis/jikan';
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

	const [prefix, type, numericId] = id.split('-');
	if (!prefix || !type || !numericId) notFound();

	let details = null;
	if (prefix === 'tmdb' && type === 'movie') {
		details = await getMovieDetails(parseInt(numericId, 10));
	} else if (prefix === 'jikan') {
		details = await getAnimeDetails(parseInt(numericId, 10));
	} else if (prefix === 'tvmaze') {
		details = await getSeriesDetails(parseInt(numericId, 10));
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
