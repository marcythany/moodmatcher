'use client';

import { motion, Variants } from 'framer-motion';
import { Play } from 'lucide-react';

interface DetailsTrailerProps {
	trailer?: string;
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

export function DetailsTrailer({ trailer }: DetailsTrailerProps) {
	if (!trailer) return null;

	return (
		<motion.div variants={itemVariants}>
			<motion.a
				href={trailer}
				target='_blank'
				rel='noopener noreferrer'
				className='inline-flex items-center gap-2 bg-primary/90 hover:bg-primary text-white px-6 py-3 my-5 rounded-lg font-medium transition-colors'
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
			>
				<Play className='h-5 w-5' />
				Assistir Trailer
			</motion.a>
		</motion.div>
	);
}
