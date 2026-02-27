'use client';

import { Card, CardContent } from '@/components/ui/card';
import { MoodMetadata } from '@/lib/utils/moodMappings';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface MoodCardProps {
	mood: MoodMetadata;
}

export function MoodCard({ mood }: MoodCardProps) {
	return (
		<Link href={`/mood/${mood.slug}`} className='block'>
			<motion.div
				whileHover={{ y: -5 }}
				transition={{ type: 'spring', stiffness: 300 }}
			>
				<Card
					className={`cursor-pointer bg-${mood.color} hover:shadow-xl transition-shadow`}
				>
					<CardContent className='flex flex-col items-center justify-center p-6 text-center'>
						<span className='text-6xl mb-4'>{mood.emoji}</span>
						<h3 className='text-xl font-bold'>{mood.label}</h3>
					</CardContent>
				</Card>
			</motion.div>
		</Link>
	);
}
