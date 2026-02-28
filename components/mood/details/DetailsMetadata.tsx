'use client';

import { motion, Variants } from 'framer-motion';
import { Calendar, Clock, Play, Star } from 'lucide-react';

interface DetailsMetadataProps {
	year?: string;
	rating?: number | null;
	episodeRuntime?: number;
	numberOfEpisodes?: number;
}

const itemVariants: Variants = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			type: 'spring' as const,
			stiffness: 100,
			damping: 12,
		},
	},
};

export function DetailsMetadata({
	year,
	rating,
	episodeRuntime,
	numberOfEpisodes,
}: DetailsMetadataProps) {
	return (
		<motion.div
			className='flex flex-wrap gap-4 text-sm text-white/80'
			variants={itemVariants}
		>
			{year && (
				<span className='flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full'>
					<Calendar className='h-4 w-4' />
					{year}
				</span>
			)}
			{rating && (
				<span className='flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full'>
					<Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
					{rating.toFixed(1)}
				</span>
			)}
			{episodeRuntime && (
				<span className='flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full'>
					<Clock className='h-4 w-4' />
					{episodeRuntime} min
				</span>
			)}
			{numberOfEpisodes && (
				<span className='flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full'>
					<Play className='h-4 w-4' />
					{numberOfEpisodes} episódios
				</span>
			)}
		</motion.div>
	);
}
