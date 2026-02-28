'use client';

import { Badge } from '@/components/ui/badge';
import { motion, Variants } from 'framer-motion';

interface DetailsGenresProps {
	genres: string[];
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

export function DetailsGenres({ genres }: DetailsGenresProps) {
	return (
		<motion.div className='flex flex-wrap gap-2' variants={itemVariants}>
			{genres.map((genre) => (
				<motion.div
					key={genre}
					whileHover={{ scale: 1.05, y: -2 }}
					whileTap={{ scale: 0.95 }}
				>
					<Badge
						variant='secondary'
						className='bg-white/10 hover:bg-white/20 text-white border-white/20 cursor-default transition-colors'
					>
						{genre}
					</Badge>
				</motion.div>
			))}
		</motion.div>
	);
}
