import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'image.tmdb.org',
				pathname: '/t/p/**',
			},
			{
				protocol: 'https',
				hostname: 'static.tvmaze.com',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'cdn.myanimelist.net',
				pathname: '/**',
			},
			// Adicionar AniList
			{
				protocol: 'https',
				hostname: '*.anilist.co', // permite qualquer subdomínio de anilist.co
				pathname: '/**',
			},
		],
	},
};

export default nextConfig;
