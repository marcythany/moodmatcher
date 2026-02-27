import { Badge } from '@/components/ui/badge';
import { TitleDetails } from '@/lib/types';
import { Award, Calendar, Clock, Film, Star, Tv } from 'lucide-react';
import Image from 'next/image';

interface TitleDetailsViewProps {
	details: TitleDetails;
}

export function TitleDetailsView({ details }: TitleDetailsViewProps) {
	const typeLabels = {
		movie: { icon: Film, text: 'Filme' },
		anime: { icon: Award, text: 'Anime' },
		series: { icon: Tv, text: 'Série' },
	};
	const TypeIcon = typeLabels[details.type].icon;

	return (
		<div className='space-y-8'>
			{/* Hero section com backdrop */}
			<div className='relative h-64 md:h-96 w-full rounded-lg overflow-hidden'>
				{details.backdropPath ?
					<Image
						src={details.backdropPath}
						alt={details.title}
						fill
						className='object-cover'
						priority
					/>
				:	<div className='w-full h-full bg-linear-to-r from-primary/20 to-secondary/20' />
				}
				<div className='absolute inset-0 bg-linear-to-t from-background to-transparent' />
			</div>

			{/* Conteúdo principal */}
			<div className='container mx-auto px-4 -mt-32 relative z-10'>
				<div className='flex flex-col md:flex-row gap-8'>
					{/* Poster */}
					<div className='w-48 md:w-64 shrink-0'>
						{details.posterPath ?
							<Image
								src={details.posterPath}
								alt={details.title}
								width={300}
								height={450}
								className='rounded-lg shadow-xl'
							/>
						:	<div className='w-full aspect-2/3 bg-muted rounded-lg flex items-center justify-center'>
								<span className='text-muted-foreground'>Sem imagem</span>
							</div>
						}
					</div>

					{/* Informações */}
					<div className='flex-1 space-y-4'>
						<div className='flex items-center gap-2'>
							<Badge variant='outline' className='flex items-center gap-1'>
								<TypeIcon className='h-3 w-3' />
								{typeLabels[details.type].text}
							</Badge>
							{details.status && (
								<Badge variant='secondary'>{details.status}</Badge>
							)}
						</div>

						<h1 className='text-3xl md:text-4xl font-bold'>{details.title}</h1>

						<div className='flex flex-wrap gap-4 text-sm text-muted-foreground'>
							{details.year && (
								<span className='flex items-center gap-1'>
									<Calendar className='h-4 w-4' />
									{details.year}
								</span>
							)}
							{details.rating && (
								<span className='flex items-center gap-1'>
									<Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
									{details.rating.toFixed(1)}
								</span>
							)}
							{details.episodeRuntime && (
								<span className='flex items-center gap-1'>
									<Clock className='h-4 w-4' />
									{details.episodeRuntime} min
								</span>
							)}
							{details.numberOfEpisodes && (
								<span>{details.numberOfEpisodes} episódios</span>
							)}
							{details.numberOfSeasons && (
								<span>{details.numberOfSeasons} temporadas</span>
							)}
						</div>

						<div className='flex flex-wrap gap-2'>
							{details.genres.map((genre) => (
								<Badge key={genre} variant='secondary'>
									{genre}
								</Badge>
							))}
						</div>

						<div className='space-y-2'>
							<h2 className='text-xl font-semibold'>Sinopse</h2>
							<p className='text-muted-foreground leading-relaxed'>
								{details.synopsis || details.overview}
							</p>
						</div>

						{details.director && (
							<div>
								<h3 className='font-semibold'>Diretor</h3>
								<p className='text-muted-foreground'>{details.director}</p>
							</div>
						)}

						{details.creators && details.creators.length > 0 && (
							<div>
								<h3 className='font-semibold'>Criadores</h3>
								<p className='text-muted-foreground'>
									{details.creators.join(', ')}
								</p>
							</div>
						)}

						{details.studio && (
							<div>
								<h3 className='font-semibold'>Estúdio</h3>
								<p className='text-muted-foreground'>{details.studio}</p>
							</div>
						)}

						{details.cast && details.cast.length > 0 && (
							<div className='space-y-2'>
								<h2 className='text-xl font-semibold'>Elenco</h2>
								<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
									{details.cast.slice(0, 6).map((member, i) => (
										<div key={i} className='flex items-center gap-2'>
											{member.profilePath ?
												<Image
													src={member.profilePath}
													alt={member.name}
													width={40}
													height={40}
													className='rounded-full object-cover'
												/>
											:	<div className='w-10 h-10 rounded-full bg-muted' />}
											<div className='overflow-hidden'>
												<p className='font-medium text-sm truncate'>
													{member.name}
												</p>
												<p className='text-xs text-muted-foreground truncate'>
													{member.character}
												</p>
											</div>
										</div>
									))}
								</div>
							</div>
						)}

						{details.watchProviders && details.watchProviders.length > 0 && (
							<div className='space-y-2'>
								<h2 className='text-xl font-semibold'>Onde assistir</h2>
								<div className='flex flex-wrap gap-3'>
									{details.watchProviders.map((provider, i) => (
										<a
											key={i}
											href={provider.link}
											target='_blank'
											rel='noopener noreferrer'
											className='flex items-center gap-2 p-2 border rounded-lg hover:bg-accent transition-colors'
										>
											{provider.logoPath ?
												<Image
													src={provider.logoPath}
													alt={provider.providerName}
													width={30}
													height={30}
													className='rounded'
												/>
											:	<div className='w-8 h-8 bg-muted rounded' />}
											<span className='text-sm font-medium'>
												{provider.providerName}
											</span>
										</a>
									))}
								</div>
							</div>
						)}

						{details.trailer && (
							<div className='space-y-2'>
								<h2 className='text-xl font-semibold'>Trailer</h2>
								<a
									href={details.trailer}
									target='_blank'
									rel='noopener noreferrer'
									className='inline-flex items-center gap-2 text-primary hover:underline'
								>
									Assistir no YouTube
								</a>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
