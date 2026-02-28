import { MoodGrid } from '@/components/mood/MoodGrid';

export default function HomePage() {
	return (
		<main className='container mx-auto px-4 py-12'>
			<div className='text-center mb-12'>
				<h1 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
					MoodMatcher
				</h1>
				<p className='text-xl text-muted-foreground mt-4 max-w-2xl mx-auto'>
					Selecione seu humor e descubra filmes, séries e animes que combinam
					com você.
				</p>
			</div>
			<MoodGrid />
		</main>
	);
}
