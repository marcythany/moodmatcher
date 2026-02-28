'use client';

import { Badge } from '@/components/ui/badge';
import { motion, Variants } from 'framer-motion';
import { Award, Film, Tv } from 'lucide-react';

interface DetailsHeaderProps {
	type: 'movie' | 'anime' | 'series';
	status?: string;
	title: string;
}

const typeLabels = {
	movie: { icon: Film, text: 'Filme' },
	anime: { icon: Award, text: 'Anime' },
	series: { icon: Tv, text: 'Série' },
};

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

export function DetailsHeader({ type, status, title }: DetailsHeaderProps) {
	const TypeIcon = typeLabels[type].icon;

	return (
		<motion.div variants={itemVariants} className='space-y-4'>
			<div className='flex items-center gap-2'>
				<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
					<Badge
						variant='outline'
						className='flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border-white/20 text-white px-3 py-1'
					>
						<TypeIcon className='h-3.5 w-3.5' />
						{typeLabels[type].text}
					</Badge>
				</motion.div>
				{status && (
					<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
						<Badge
							variant='secondary'
							className='bg-white/10 backdrop-blur-sm text-white border-white/20'
						>
							{status}
						</Badge>
					</motion.div>
				)}
			</div>
			<motion.h1
				className='text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight'
				variants={itemVariants}
			>
				{title}
			</motion.h1>
		</motion.div>
	);
}
