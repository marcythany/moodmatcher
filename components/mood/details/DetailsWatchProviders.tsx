'use client';

import { WatchProvider } from '@/lib/types';
import { motion, Variants } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface DetailsWatchProvidersProps {
	providers: WatchProvider[];
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

export function DetailsWatchProviders({
	providers,
}: DetailsWatchProvidersProps) {
	if (!providers || providers.length === 0) return null;

	return (
		<motion.div className='space-y-4' variants={itemVariants}>
			<h2 className='text-xl font-semibold text-white'>Onde assistir</h2>
			<div className='flex flex-wrap gap-3'>
				{providers.map((provider, i) => (
					<motion.a
						key={i}
						href={provider.link}
						target='_blank'
						rel='noopener noreferrer'
						className='group flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 hover:bg-white/20 transition-all'
						whileHover={{ scale: 1.05, y: -2 }}
						whileTap={{ scale: 0.98 }}
					>
						{provider.logoPath ?
							<Image
								src={provider.logoPath}
								alt={provider.providerName}
								width={24}
								height={24}
								className='rounded'
							/>
						:	<div className='w-6 h-6 bg-white/20 rounded' />}
						<span className='text-sm font-medium text-white'>
							{provider.providerName}
						</span>
						<ExternalLink className='h-3.5 w-3.5 text-white/40 group-hover:text-white/60 transition-colors' />
					</motion.a>
				))}
			</div>
		</motion.div>
	);
}
