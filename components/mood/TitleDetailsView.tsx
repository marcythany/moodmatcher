'use client';

import { motion, Variants } from 'framer-motion';
import {
	DetailsCast,
	DetailsCredits,
	DetailsGenres,
	DetailsHeader,
	DetailsHero,
	DetailsMetadata,
	DetailsPoster,
	DetailsSynopsis,
	DetailsTrailer,
	DetailsWatchProviders,
} from './details';

import { TitleDetails } from '@/lib/types';

interface TitleDetailsViewProps {
	details: TitleDetails;
}

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
};

export function TitleDetailsView({ details }: TitleDetailsViewProps) {
	return (
		<motion.div
			className='relative min-h-screen'
			initial='hidden'
			animate='visible'
			variants={containerVariants}
		>
			<div className='absolute inset-0 bg-linear-to-b from-black/60 via-black to-black/60 pointer-events-none' />

			<div className='relative z-10'>
				<DetailsHero
					backdropPath={details.backdropPath}
					title={details.title}
				/>

				<div className='container mx-auto px-4 -mt-32 md:-mt-48 relative z-20'>
					<div className='flex flex-col md:flex-row gap-8 md:gap-12'>
						<DetailsPoster
							posterPath={details.posterPath}
							title={details.title}
						/>

						<motion.div
							className='flex-1 space-y-6'
							variants={containerVariants}
						>
							<DetailsHeader
								type={details.type}
								status={details.status}
								title={details.title}
							/>
							<DetailsMetadata
								year={details.year}
								rating={details.rating}
								episodeRuntime={details.episodeRuntime}
								numberOfEpisodes={details.numberOfEpisodes}
							/>
							<DetailsGenres genres={details.genres} />
							<DetailsSynopsis
								synopsis={details.synopsis}
								overview={details.overview}
							/>
							<DetailsCredits
								director={details.director}
								creators={details.creators}
								studio={details.studio}
							/>
							<DetailsCast cast={details.cast} />
							<DetailsWatchProviders providers={details.watchProviders || []} />
							<DetailsTrailer trailer={details.trailer} />
						</motion.div>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
