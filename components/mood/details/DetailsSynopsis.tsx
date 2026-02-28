'use client';

import { motion, Variants } from 'framer-motion';

interface DetailsSynopsisProps {
	synopsis: string;
	overview: string;
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

export function DetailsSynopsis({ synopsis, overview }: DetailsSynopsisProps) {
	return (
		<motion.div className='space-y-2' variants={itemVariants}>
			<h2 className='text-xl font-semibold text-white'>Sinopse</h2>
			<p className='text-white/70 leading-relaxed text-lg'>
				{synopsis || overview}
			</p>
		</motion.div>
	);
}
