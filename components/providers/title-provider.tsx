'use client';

import { createContext, useContext, useState } from 'react';

interface TitleContextType {
	currentTitle: string | null;
	setCurrentTitle: (title: string | null) => void;
}

const TitleContext = createContext<TitleContextType | undefined>(undefined);

export function TitleProvider({ children }: { children: React.ReactNode }) {
	const [currentTitle, setCurrentTitle] = useState<string | null>(null);

	return (
		<TitleContext.Provider value={{ currentTitle, setCurrentTitle }}>
			{children}
		</TitleContext.Provider>
	);
}

export function useTitle() {
	const context = useContext(TitleContext);
	if (context === undefined) {
		throw new Error('useTitle must be used within a TitleProvider');
	}
	return context;
}
