import { TitleGrid } from '@/components/mood/TitleGrid';
import { getAnimeByGenre } from '@/lib/apis/jikan';
import { getMoviesByGenre } from '@/lib/apis/tmdb';
import { getSeriesByGenre } from '@/lib/apis/tvmaze';
import { getMoodBySlug, moodToGenreMap } from '@/lib/utils/moodMappings';
import { moodDarkBgColors } from '@/lib/utils/utils';
import { notFound } from 'next/navigation';

interface PageProps {
	params: Promise<{ slug: string }>;
}

export default async function MoodPage({ params }: PageProps) {
	const { slug } = await params;

	const mood = getMoodBySlug(slug);
	if (!mood) notFound();

	const genres = moodToGenreMap[slug as keyof typeof moodToGenreMap];
	if (!genres) notFound();

	const [movies, animes, series] = await Promise.all([
		getMoviesByGenre(genres.tmdb),
		getAnimeByGenre(genres.jikan),
		getSeriesByGenre(genres.tvmaze),
	]);

	const allTitles = [...movies, ...animes, ...series];
	const bgClass = moodDarkBgColors[mood.color] || 'bg-background';

	return (
		<div className={`min-h-screen ${bgClass} rounded-4xl`}>
			<div className='container mx-auto px-4 py-8'>
				<header className='mb-8'>
					<h1 className='text-4xl md:text-5xl font-bold flex items-center gap-3 text-foreground'>
						<span className='text-5xl' role='img' aria-label={mood.label}>
							{mood.emoji}
						</span>
						<span>Você está se sentindo {mood.label.toLowerCase()}</span>
					</h1>
					<p className='text-muted-foreground text-lg mt-2'>
						Aqui estão algumas recomendações para você
					</p>
				</header>
				<TitleGrid initialTitles={allTitles} />
			</div>
		</div>
	);
}
