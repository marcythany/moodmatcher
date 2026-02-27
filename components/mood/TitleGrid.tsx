'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Title } from '@/lib/types';
import { useState } from 'react';
import { TitleCard } from './TitleCard';
import { TitleFilters, type FilterValue } from './TitleFilters';

interface TitleGridProps {
	initialTitles: Title[];
}

export function TitleGrid({ initialTitles }: TitleGridProps) {
	const [filter, setFilter] = useState<FilterValue>('all');

	const filteredTitles = initialTitles.filter((title) => {
		if (filter === 'all') return true;
		// Mapeia o valor do filtro (plural) para o tipo do título (singular)
		if (filter === 'movies') return title.type === 'movie';
		if (filter === 'series') return title.type === 'series';
		if (filter === 'anime') return title.type === 'anime';
		return false;
	});

	return (
		<div className='space-y-6'>
			<TitleFilters value={filter} onValueChange={setFilter} />

			{filteredTitles.length === 0 ?
				<p className='text-center text-muted-foreground py-8'>
					Nenhum título encontrado para este filtro.
				</p>
			:	<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
					{filteredTitles.map((title) => (
						<TitleCard key={title.id} title={title} />
					))}
				</div>
			}
		</div>
	);
}

// Componente de loading para a grade
export function TitleGridSkeleton() {
	return (
		<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
			{Array.from({ length: 10 }).map((_, i) => (
				<div key={i} className='space-y-3'>
					<Skeleton className='aspect-2/3 w-full' />
					<Skeleton className='h-4 w-3/4' />
					<Skeleton className='h-4 w-1/2' />
				</div>
			))}
		</div>
	);
}
