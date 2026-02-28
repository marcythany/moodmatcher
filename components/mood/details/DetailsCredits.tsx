'use client';

import { motion, Variants } from 'framer-motion';

interface DetailsCreditsProps {
	director?: string;
	creators?: string[];
	studio?: string;
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

export function DetailsCredits({
	director,
	creators,
	studio,
}: DetailsCreditsProps) {
	const hasAny = director || (creators && creators.length > 0) || studio;
	if (!hasAny) return null;

	return (
		<motion.div
			className='grid grid-cols-1 sm:grid-cols-2 gap-4'
			variants={itemVariants}
		>
			{director && (
				<div className='bg-white/5 rounded-lg p-3 backdrop-blur-sm'>
					<h3 className='text-sm text-white/60 mb-1'>Diretor</h3>
					<p className='text-white font-medium'>{director}</p>
				</div>
			)}
			{creators && creators.length > 0 && (
				<div className='bg-white/5 rounded-lg p-3 backdrop-blur-sm'>
					<h3 className='text-sm text-white/60 mb-1'>Criadores</h3>
					<p className='text-white font-medium'>{creators.join(', ')}</p>
				</div>
			)}
			{studio && (
				<div className='bg-white/5 rounded-lg p-3 backdrop-blur-sm'>
					<h3 className='text-sm text-white/60 mb-1'>Estúdio</h3>
					<p className='text-white font-medium'>{studio}</p>
				</div>
			)}
		</motion.div>
	);
}
