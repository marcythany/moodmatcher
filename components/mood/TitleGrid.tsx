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
		if (filter === 'movies') return title.type === 'movie';
		if (filter === 'series') return title.type === 'series';
		if (filter === 'anime') return title.type === 'anime';
		return false;
	});

	return (
		<section aria-labelledby='results-title'>
			<h2 id='results-title' className='sr-only'>
				Resultados
			</h2>
			<TitleFilters value={filter} onValueChange={setFilter} />
			{filteredTitles.length === 0 ?
				<p className='text-center text-muted-foreground py-12' role='status'>
					Nenhum título encontrado para este filtro.
				</p>
			:	<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6'>
					{filteredTitles.map((title) => (
						<TitleCard key={title.id} title={title} />
					))}
				</div>
			}
		</section>
	);
}

export function TitleGridSkeleton() {
	return (
		<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
			{Array.from({ length: 10 }).map((_, i) => (
				<div key={i} className='space-y-3'>
					<Skeleton className='aspect-2/3 w-full rounded-lg' />
					<Skeleton className='h-4 w-3/4' />
					<Skeleton className='h-4 w-1/2' />
				</div>
			))}
		</div>
	);
}
