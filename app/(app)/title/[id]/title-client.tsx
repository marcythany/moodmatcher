// app/(app)/title/[id]/title-client.tsx
'use client';

import { useTitle } from '@/components/providers/title-provider';
import { TitleDetails } from '@/lib/types';
import { useEffect } from 'react';

export function TitleClient({
	details,
	children,
}: {
	details: TitleDetails;
	children: React.ReactNode;
}) {
	const { setCurrentTitle } = useTitle();

	useEffect(() => {
		setCurrentTitle(details.title);
		return () => setCurrentTitle(null);
	}, [details.title, setCurrentTitle]);

	return <>{children}</>;
}
