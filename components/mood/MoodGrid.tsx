import { moodMappings } from '@/lib/utils/moodMappings';
import { MoodCard } from './MoodCard';

export function MoodGrid() {
	return (
		<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
			{moodMappings.map((mood) => (
				<MoodCard key={mood.slug} mood={mood} />
			))}
		</div>
	);
}
