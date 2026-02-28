'use client';

import { CastMember } from '@/lib/types';
import { motion, Variants } from 'framer-motion';
import { Users } from 'lucide-react';
import Image from 'next/image';

interface DetailsCastProps {
	cast: CastMember[];
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

export function DetailsCast({ cast }: DetailsCastProps) {
	if (!cast || cast.length === 0) return null;

	return (
		<motion.div className='space-y-4' variants={itemVariants}>
			<h2 className='text-xl font-semibold text-white flex items-center gap-2'>
				<Users className='h-5 w-5' />
				Elenco Principal
			</h2>
			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
				{cast.slice(0, 5).map((member, i) => (
					<motion.div
						key={i}
						className='bg-white/5 rounded-lg p-3 backdrop-blur-sm hover:bg-white/10 transition-colors'
						whileHover={{ y: -4 }}
						transition={{ type: 'spring', stiffness: 300 }}
					>
						{member.profilePath ?
							<Image
								src={member.profilePath}
								alt={member.name}
								width={60}
								height={60}
								className='rounded-full mx-auto mb-2 ring-2 ring-white/20'
							/>
						:	<div className='w-15 h-15 rounded-full bg-white/10 mx-auto mb-2 flex items-center justify-center'>
								<span className='text-white/40 text-xs'>?</span>
							</div>
						}
						<p className='font-medium text-sm text-white text-center truncate'>
							{member.name}
						</p>
						<p className='text-xs text-white/60 text-center truncate'>
							{member.character}
						</p>
					</motion.div>
				))}
			</div>
		</motion.div>
	);
}
