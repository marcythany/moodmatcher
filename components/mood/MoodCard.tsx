'use client';

import { Card, CardContent } from '@/components/ui/card';
import { MoodMetadata } from '@/lib/utils/moodMappings';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface MoodCardProps {
	mood: MoodMetadata;
}

export function MoodCard({ mood }: MoodCardProps) {
	// Mapeamento de cores para classes de fundo com opacidade
	const bgColorMap: Record<string, string> = {
		'amber-400': 'bg-amber-400/20',
		'blue-400': 'bg-blue-400/20',
		'purple-400': 'bg-purple-400/20',
		'green-300': 'bg-green-300/20',
		'red-500': 'bg-red-500/20',
		'pink-400': 'bg-pink-400/20',
		'gray-700': 'bg-gray-700/20',
		'yellow-400': 'bg-yellow-400/20',
		'indigo-400': 'bg-indigo-400/20',
		'orange-300': 'bg-orange-300/20',
		'teal-400': 'bg-teal-400/20',
		'lime-400': 'bg-lime-400/20',
	};

	const bgClass = bgColorMap[mood.color] || 'bg-primary/10';

	return (
		<Link href={`/mood/${mood.slug}`} className='block'>
			<motion.div
				whileHover={{ y: -6 }}
				transition={{ type: 'spring', stiffness: 400, damping: 17 }}
			>
				<Card
					className={`${bgClass} border-0 glass-dark hover:shadow-xl transition-all duration-300`}
				>
					<CardContent className='flex flex-col items-center justify-center p-8 text-center'>
						<span className='text-7xl mb-4' role='img' aria-label={mood.label}>
							{mood.emoji}
						</span>
						<h3 className='text-xl font-bold text-foreground'>{mood.label}</h3>
					</CardContent>
				</Card>
			</motion.div>
		</Link>
	);
}
