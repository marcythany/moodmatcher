'use client';

import { useTitle } from '@/components/providers/title-provider';
import { moodMappings } from '@/lib/utils/moodMappings';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export function Breadcrumb() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const from = searchParams.get('from'); // slug da emoção (presente apenas na página de detalhes)
	const { currentTitle } = useTitle();

	// Divide o pathname em segmentos ignorando vazios
	const segments = useMemo(
		() => pathname.split('/').filter(Boolean),
		[pathname],
	);

	// Se não houver segmentos, não renderiza (página inicial)
	if (segments.length === 0) return null;

	// Determina o tipo de página
	const isMoodPage = segments[0] === 'mood' && segments.length === 2;
	const isTitlePage = segments[0] === 'title' && segments.length === 2;

	// Monta os itens do breadcrumb
	const items = [];

	// Item Home (sempre presente)
	items.push({
		label: <Home className='h-4 w-4' />,
		href: '/',
		isLast: false,
		'aria-label': 'Página inicial',
	});

	if (isMoodPage) {
		// Página de sugestões: /mood/[slug]
		const slug = segments[1];
		const mood = moodMappings.find((m) => m.slug === slug);
		const label = mood ? mood.label : slug;

		items.push({
			label,
			href: `/mood/${slug}`, // mesmo link, mas será o último (sem link)
			isLast: true,
		});
	} else if (isTitlePage) {
		// Página de detalhes: /title/[id]
		const titleId = segments[1];

		// Se temos o parâmetro "from", adicionamos o item da emoção
		if (from) {
			const mood = moodMappings.find((m) => m.slug === from);
			const moodLabel = mood ? mood.label : from;
			items.push({
				label: moodLabel,
				href: `/mood/${from}`,
				isLast: false,
			});
		}

		// Último item: título do filme (vindo do contexto) ou fallback "Detalhes"
		items.push({
			label: currentTitle || 'Detalhes',
			href: `/title/${titleId}`, // mesmo link, mas sem link visual
			isLast: true,
		});
	} else {
		// Fallback para outras rotas (ex: /alguma-coisa)
		for (let i = 0; i < segments.length; i++) {
			const isLast = i === segments.length - 1;
			const segment = segments[i];
			// Tenta encontrar um mood (caso seja um slug direto)
			const mood = moodMappings.find((m) => m.slug === segment);
			const label = mood ? mood.label : decodeURIComponent(segment);
			const href = '/' + segments.slice(0, i + 1).join('/');

			items.push({
				label,
				href,
				isLast,
			});
		}
	}

	return (
		<nav aria-label='Breadcrumb' className='py-2'>
			<ol className='flex flex-wrap items-center gap-1 text-sm text-muted-foreground'>
				{items.map((item, index) => (
					<li key={index} className='flex items-center'>
						{index > 0 && (
							<ChevronRight className='h-4 w-4 mx-1' aria-hidden='true' />
						)}
						{item.isLast ?
							<span className='font-medium text-foreground' aria-current='page'>
								{item.label}
							</span>
						:	<Link
								href={item.href}
								className='hover:text-foreground transition-colors'
								aria-label={item['aria-label']}
							>
								{item.label}
							</Link>
						}
					</li>
				))}
			</ol>
		</nav>
	);
}
