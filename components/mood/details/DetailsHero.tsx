'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

interface DetailsHeroProps {
	backdropPath?: string | null;
	title: string;
}

const itemVariants: Variants = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			type: 'spring',
			stiffness: 100,
			damping: 12,
		},
	},
};

export function DetailsHero({ backdropPath, title }: DetailsHeroProps) {
	return (
		<motion.div
			className='relative h-[50vh] md:h-[60vh] w-full overflow-hidden'
			variants={itemVariants}
		>
			{backdropPath ?
				<Image
					src={backdropPath}
					alt={title}
					fill
					className='object-cover'
					priority
					sizes='100vw'
				/>
			:	<div className='w-full h-full bg-linear-to-br from-primary/30 via-primary/10 to-secondary/30' />
			}
			<div className='absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent' />
		</motion.div>
	);
}
