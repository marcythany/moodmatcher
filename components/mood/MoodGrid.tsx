import { moodMappings } from '@/lib/utils/moodMappings';
import { MoodCard } from './MoodCard';

export function MoodGrid() {
	return (
		<section aria-labelledby='mood-grid-title'>
			<h2 id='mood-grid-title' className='sr-only'>
				Selecione seu humor
			</h2>
			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6'>
				{moodMappings.map((mood) => (
					<MoodCard key={mood.slug} mood={mood} />
				))}
			</div>
		</section>
	);
}
