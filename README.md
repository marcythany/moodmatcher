# 🎭 MoodMatcher

**Encontre o filme, série ou anime perfeito para o seu momento.**

MoodMatcher é um aplicativo que recomenda títulos com base no seu humor atual. Selecione uma emoção e descubra um mundo de conteúdo que combina com você.

🔗 **Link ao vivo:** [moodmatcher.vercel.app](https://moodmatcher.vercel.app)

## ✨ Funcionalidades

- **Seleção por Humor:** Interface intuitiva com 12 cards representando diferentes emoções.
- **Resultados Unificados:** Grade de resultados combinando filmes, séries e animes em um só lugar.
- **Filtros Dinâmicos:** Opção para filtrar por tipo de mídia (filme, série, anime).
- **Páginas de Detalhe:** Informações completas sobre cada título, incluindo sinopse, elenco e onde assistir.
- **Design Imersivo:** Cores de fundo e animações que se adaptam à emoção escolhida.

## 🛠️ Tecnologias & Arquitetura

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Server Components, Server Actions)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/) (com cores OKLCH para uma paleta emocional vibrante)
- **Animações:** [Framer Motion](https://www.framer.com/motion/) para transições suaves
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (acessíveis e customizáveis)
- **Gerenciamento de Estado no Cliente:** [TanStack Query](https://tanstack.com/query/latest) (para cache e requisições na página de detalhes)
- **APIs:**
  - **TMDB:** Para imagens e detalhes de filmes (requisições roteadas via `API Routes` para proteger a chave).
  - **Jikan API:** Para dados de animes do MyAnimeList.
  - **TVMaze API:** Para informações de séries ocidentais.
- **Deploy:** [Vercel](https://vercel.com) (com integração contínua e variáveis de ambiente)

## 🚀 Principais Desafios e Soluções

- **Orquestração de APIs:** Como unificar dados de três fontes diferentes? A solução foi criar uma camada de normalização nos Server Components. Cada API tem sua própria função de busca, e os resultados são combinados e transformados em um formato `Title` padronizado antes de serem passados para os componentes de UI.

- **Mapeamento Humor -> Gênero:** O maior desafio conceitual. Resolvi criando um arquivo de configuração (`moodMappings.ts`) que traduz um `slug` amigável (ex: `divertido`) para os IDs de gênero correspondentes em cada API (TMDB: 35, Jikan: 4, TVMaze: 'Comedy'). Isso centraliza a lógica e facilita a adição de novos humores.

- **Performance e Experiência do Usuário:**
  - Usei **Server Components** para buscar dados em paralelo (`Promise.all`), eliminando o "waterfall" de requisições no cliente.
  - Implementei **Skeleton Loaders** com shadcn/ui para uma experiência de carregamento fluida.
  - Criei uma **API Route** (`/api/tmdb/image`) para servir imagens do TMDB, mantendo minha chave de API segura e adicionando uma camada de cache.

## ▶️ Como Rodar Localmente

1. Clone o repositório:
   `git clone https://github.com/seu-usuario/moodmatcher.git`

2. Instale as dependências:
   `pnpm install` (ou `npm install`)

3. Crie um arquivo `.env.local` e adicione sua chave da API do TMDB:
   `TMDB_API_KEY=sua_chave_aqui`

4. Rode o servidor de desenvolvimento:
   `pnpm dev`

5. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.
