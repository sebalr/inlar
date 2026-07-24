// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';

// Storage mode:
// - "local": edita contenido en tu filesystem durante desarrollo.
// - "github": edita contenido desde el sitio publicado, commiteando al repo.
// Setea NEXT_PUBLIC_KEYSTATIC_STORAGE_KIND=github en producción (+ vars de GitHub App).
// Ver: https://keystatic.com/docs/github-mode
const storageKind = (process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE_KIND as 'local' | 'github') || 'local';

export default config({
	storage:
		storageKind === 'github'
			? {
					kind: 'github',
					repo: {
						// TODO reemplazar con tu repo de GitHub
						owner: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER || 'user',
						name: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_NAME || 'repo',
					},
				}
			: { kind: 'local' },
	ui: {
		brand: { name: 'INLAR' },
	},
	collections: {
		posts: collection({
			label: 'Posts',
			slugField: 'title',
			path: 'src/content/posts/*',
			format: { contentField: 'content' },
			entryLayout: 'content',
			schema: {
				title: fields.slug({ name: { label: 'Título' } }),
				description: fields.text({
					label: 'Descripción',
					description: 'Resumen breve para SEO y listados (máx. 160 caracteres).',
					multiline: true,
				}),
				publishedAt: fields.date({
					label: 'Fecha de publicación',
					defaultValue: { kind: 'today' },
				}),
				coverImage: fields.image({
					label: 'Imagen de portada',
					directory: 'public/images/posts',
					publicPath: '/images/posts/',
				}),
				content: fields.markdoc({ label: 'Contenido' }),
			},
		}),
	},
});
