import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Mapeamento das cores do moodMappings para classes Tailwind válidas
export const moodLightBgColors: Record<string, string> = {
	'amber-400': 'bg-amber-400/10',
	'blue-400': 'bg-blue-400/10',
	'purple-400': 'bg-purple-400/10',
	'green-300': 'bg-green-300/10',
	'red-500': 'bg-red-500/10',
	'pink-400': 'bg-pink-400/10',
	'gray-700': 'bg-gray-700/10',
	'yellow-400': 'bg-yellow-400/10',
	'indigo-400': 'bg-indigo-400/10',
	'orange-300': 'bg-orange-300/10',
	'teal-400': 'bg-teal-400/10',
	'lime-400': 'bg-lime-400/10',
};

// Cores de fundo escuras para dark mode (usar com opacidade)
export const moodDarkBgColors: Record<string, string> = {
	'amber-400': 'bg-amber-950/40',
	'blue-400': 'bg-blue-950/40',
	'purple-400': 'bg-purple-950/40',
	'green-300': 'bg-green-950/40',
	'red-500': 'bg-red-950/40',
	'pink-400': 'bg-pink-950/40',
	'gray-700': 'bg-gray-950/40',
	'yellow-400': 'bg-yellow-950/40',
	'indigo-400': 'bg-indigo-950/40',
	'orange-300': 'bg-orange-950/40',
	'teal-400': 'bg-teal-950/40',
	'lime-400': 'bg-lime-950/40',
};
