import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'image.tmdb.org',
				pathname: '/t/p/**', // Permite todas as imagens do TMDB
			},
			{
				protocol: 'https',
				hostname: 'static.tvmaze.com',
				pathname: '/**', // Permite todas as imagens da TVMaze
			},
			{
				protocol: 'https',
				hostname: 'cdn.myanimelist.net',
				pathname: '/**', // Permite todas as imagens do MyAnimeList (usado pela Jikan)
			},
		],
	},
};

export default nextConfig;
