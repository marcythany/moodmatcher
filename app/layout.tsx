import { ThemeProvider } from '@/components/providers/theme-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
});

export const metadata: Metadata = {
	title: 'MoodMatcher - Encontre filmes, séries e animes pelo seu humor',
	description:
		'Selecione seu humor e descubra recomendações perfeitas para você.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='pt-BR' className={inter.variable} suppressHydrationWarning>
			<body className='min-h-screen bg-background font-sans antialiased'>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
