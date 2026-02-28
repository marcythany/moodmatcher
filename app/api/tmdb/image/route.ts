import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const imagePath = searchParams.get('path');

	if (!imagePath) {
		return new NextResponse('Missing path', { status: 400 });
	}

	const TMDB_IMAGE_URL =
		process.env.NEXT_PUBLIC_TMDB_IMAGE_URL || 'https://image.tmdb.org/t/p';
	const imageUrl = `${TMDB_IMAGE_URL}/original${imagePath}`;

	try {
		const response = await fetch(imageUrl);

		if (!response.ok) {
			return new NextResponse('Image not found', { status: response.status });
		}

		const imageBlob = await response.blob();

		return new NextResponse(imageBlob, {
			status: 200,
			headers: {
				'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
				'Cache-Control': 'public, max-age=86400',
			},
		});
	} catch (error) {
		console.error('Error proxying TMDB image:', error);
		return new NextResponse('Internal Server Error', { status: 500 });
	}
}
