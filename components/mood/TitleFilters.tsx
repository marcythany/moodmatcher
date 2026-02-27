'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Film, List, Sparkles, Tv } from 'lucide-react';

export type FilterValue = 'all' | 'movies' | 'series' | 'anime';

interface TitleFiltersProps {
	value: FilterValue;
	onValueChange: (value: FilterValue) => void;
}

export function TitleFilters({ value, onValueChange }: TitleFiltersProps) {
	return (
		<Tabs
			value={value}
			onValueChange={(val) => onValueChange(val as FilterValue)}
		>
			<TabsList className='grid w-full max-w-md grid-cols-4'>
				<TabsTrigger value='all' className='flex items-center gap-2'>
					<List className='h-4 w-4' />
					<span className='hidden sm:inline'>Todos</span>
				</TabsTrigger>
				<TabsTrigger value='movies' className='flex items-center gap-2'>
					<Film className='h-4 w-4' />
					<span className='hidden sm:inline'>Filmes</span>
				</TabsTrigger>
				<TabsTrigger value='series' className='flex items-center gap-2'>
					<Tv className='h-4 w-4' />
					<span className='hidden sm:inline'>Séries</span>
				</TabsTrigger>
				<TabsTrigger value='anime' className='flex items-center gap-2'>
					<Sparkles className='h-4 w-4' />
					<span className='hidden sm:inline'>Animes</span>
				</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}
