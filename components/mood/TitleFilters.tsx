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
			<TabsList className='grid w-full max-w-md grid-cols-4 glass-dark border-0'>
				<TabsTrigger
					value='all'
					className='flex items-center gap-2 cursor-pointer data-[state=active]:bg-white/20'
					aria-label='Todos os tipos'
				>
					<List className='h-4 w-4' />
					<span className='hidden sm:inline'>Todos</span>
				</TabsTrigger>
				<TabsTrigger
					value='movies'
					className='flex items-center gap-2 cursor-pointer data-[state=active]:bg-white/20'
					aria-label='Apenas filmes'
				>
					<Film className='h-4 w-4' />
					<span className='hidden sm:inline'>Filmes</span>
				</TabsTrigger>
				<TabsTrigger
					value='series'
					className='flex items-center gap-2 cursor-pointer data-[state=active]:bg-white/20'
					aria-label='Apenas séries'
				>
					<Tv className='h-4 w-4' />
					<span className='hidden sm:inline'>Séries</span>
				</TabsTrigger>
				<TabsTrigger
					value='anime'
					className='flex items-center gap-2 cursor-pointer data-[state=active]:bg-white/20'
					aria-label='Apenas animes'
				>
					<Sparkles className='h-4 w-4' />
					<span className='hidden sm:inline'>Animes</span>
				</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}
