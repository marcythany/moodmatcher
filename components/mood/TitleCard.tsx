import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Title } from '@/lib/types';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface TitleCardProps {
	title: Title;
}

export function TitleCard({ title }: TitleCardProps) {
	const typeColors = {
		movie: 'bg-blue-500',
		anime: 'bg-purple-500',
		series: 'bg-green-500',
	};

	return (
		<Link href={`/title/${title.id}`} className='block'>
			<Card className='h-full overflow-hidden hover:shadow-lg transition-shadow'>
				<div className='relative aspect-2/3 w-full'>
					{title.posterPath ?
						<Image
							src={title.posterPath}
							alt={title.title}
							fill
							className='object-cover'
							sizes='(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw'
						/>
					:	<div className='flex h-full items-center justify-center bg-muted'>
							<span className='text-muted-foreground'>Sem imagem</span>
						</div>
					}
					<Badge className={`absolute top-2 right-2 ${typeColors[title.type]}`}>
						{title.type === 'movie' ?
							'Filme'
						: title.type === 'anime' ?
							'Anime'
						:	'Série'}
					</Badge>
				</div>
				<CardContent className='p-4'>
					<h3 className='font-bold line-clamp-2'>{title.title}</h3>
					<p className='text-sm text-muted-foreground line-clamp-2 mt-1'>
						{title.overview}
					</p>
				</CardContent>
				<CardFooter className='p-4 pt-0 flex justify-between items-center'>
					<span className='text-sm text-muted-foreground'>{title.year}</span>
					{title.rating && (
						<div className='flex items-center gap-1'>
							<Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
							<span className='text-sm font-medium'>
								{title.rating.toFixed(1)}
							</span>
						</div>
					)}
				</CardFooter>
			</Card>
		</Link>
	);
}
