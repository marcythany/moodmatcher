'use client';

import { TitleProvider } from '@/components/providers/title-provider';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { Suspense } from 'react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='min-h-screen bg-background'>
			<TitleProvider>
				<div className='container mx-auto px-4 py-6'>
					<Suspense fallback={<div className='py-2'>...</div>}>
						<Breadcrumb />
					</Suspense>
					<main className='mt-4'>{children}</main>
				</div>
			</TitleProvider>
		</div>
	);
}
