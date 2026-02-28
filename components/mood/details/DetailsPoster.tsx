'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

interface DetailsPosterProps {
	posterPath?: string | null;
	title: string;
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

export function DetailsPoster({ posterPath, title }: DetailsPosterProps) {
	return (
		<motion.div
			className='w-48 md:w-72 shrink-0 mx-auto md:mx-0'
			variants={itemVariants}
			whileHover={{ scale: 1.02 }}
			transition={{ type: 'spring', stiffness: 300 }}
		>
			{posterPath ?
				<Image
					src={posterPath}
					alt={title}
					width={300}
					height={450}
					className='rounded-xl shadow-2xl ring-1 ring-white/10'
					priority
				/>
			:	<div className='w-full aspect-2/3 bg-white/5 rounded-xl backdrop-blur-sm flex items-center justify-center ring-1 ring-white/10'>
					<span className='text-white/40'>Sem imagem</span>
				</div>
			}
		</motion.div>
	);
}
