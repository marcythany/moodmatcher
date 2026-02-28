'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface HeaderProps {
	showBack?: boolean;
	backUrl?: string;
}

export function Header({ showBack = false, backUrl }: HeaderProps) {
	const router = useRouter();

	const handleBack = () => {
		if (backUrl) {
			router.push(backUrl);
		} else {
			router.back();
		}
	};

	return (
		<header className='sticky top-0 z-50 w-full glass-dark border-b border-white/10'>
			<div className='container flex h-16 items-center'>
				<nav
					className='flex items-center gap-4'
					aria-label='Navegação principal'
				>
					{showBack && (
						<Button
							variant='ghost'
							size='icon'
							onClick={handleBack}
							aria-label='Voltar para página anterior'
							className='hover:bg-white/10'
						>
							<ChevronLeft className='h-5 w-5' />
						</Button>
					)}
					<Link
						href='/'
						className='flex items-center gap-2 font-semibold text-foreground hover:text-primary transition-colors'
						aria-label='Ir para página inicial'
					>
						<Home className='h-5 w-5' />
						<span className='hidden sm:inline text-lg'>MoodMatcher</span>
					</Link>
				</nav>
			</div>
		</header>
	);
}
