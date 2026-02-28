'use server';

// Exemplo de action para salvar preferências (pode ser expandido depois)
export async function saveMoodPreference(moodSlug: string) {
	// Implementar lógica (salvar em cookie, banco, etc)
	console.log('Mood salvo:', moodSlug);
}
