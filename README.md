# INLAR — Landing para Next.js (App Router) + Keystatic

Landing del estudio jurídico INLAR lista para copiar a un proyecto Next.js 14 (App Router) con Tailwind, y **Keystatic** configurado para el blog (modo `local` en dev, modo `github` en producción).

---

## ⚠️ Cómo extraer esto como proyecto Next.js único (recomendado)

Lovable corre sobre TanStack Start + Vite, así que este repo tiene, obligatoriamente, la app de Lovable en la raíz y el proyecto Next.js acá dentro. Para tener **un solo proyecto Next.js con estructura estándar** (sin `nextjs-export/`, sin doble `src/`, sin doble `package.json`), hacé esto **una vez fuera de Lovable**:

1. En Lovable, apretá **Download ZIP** y descomprimí el proyecto.
2. Creá una carpeta nueva para tu repo, por ej. `inlar-web/`.
3. Copiá **solo** el contenido de `nextjs-export/` a la raíz de `inlar-web/` (que `app/`, `keystatic.config.ts`, `tailwind.config.ts`, `src/content/`, este README, etc. queden en la raíz).
4. Inicializá Next.js estándar en esa carpeta:
   ```bash
   cd inlar-web
   npm init -y
   npm install next@latest react@latest react-dom@latest
   npm install @keystatic/core @keystatic/next @markdoc/markdoc
   npm install react-hook-form zod @hookform/resolvers lucide-react
   npm install -D typescript @types/react @types/node tailwindcss postcss autoprefixer @tailwindcss/typography
   npx tailwindcss init -p
   ```
   Después mergeá el `tailwind.config.ts` de este export con el generado.
5. Agregá scripts en `package.json`:
   ```json
   { "scripts": { "dev": "next dev", "build": "next build", "start": "next start" } }
   ```
6. `npm run dev` → http://localhost:3000 (landing) y `/keystatic` (admin).
7. Subilo a GitHub y deployá en Vercel. Para editar el blog desde producción, configurá Keystatic en modo `github` (ver más abajo).

Estructura final (un solo proyecto, un solo `package.json`, un solo `src/`):

```
inlar-web/
├── app/                    (layout, page, api, blog, keystatic)
├── src/content/posts/
├── public/
├── keystatic.config.ts
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

> No puedo generar esa estructura como raíz **dentro** de Lovable: Lovable requiere TanStack Start + Vite en la raíz. El paso de arriba se hace una sola vez y a partir de ahí trabajás el proyecto Next.js en Cursor/VSCode + Vercel.

---

## Archivos

### Landing

- `app/page.tsx` — landing completa (client component)
- `app/layout.tsx` — metadata, fonts (`next/font/google`), JSON-LD, `lang="es-AR"`
- `app/api/contact/route.ts` — endpoint del formulario (TODO: conectar Resend / Nodemailer)
- `tailwind.config.ts` — extensión con paleta `inlar.*` y familias

### Keystatic (blog)

- `keystatic.config.ts` — schema de la colección `posts` + storage (`local` | `github`)
- `app/keystatic/keystatic.ts` — Admin UI (client)
- `app/keystatic/layout.tsx` — layout del admin
- `app/keystatic/[[...params]]/page.tsx` — catch-all del admin
- `app/api/keystatic/[...params]/route.ts` — route handler de Keystatic
- `app/blog/page.tsx` — listado del blog usando el Reader API
- `app/blog/[slug]/page.tsx` — post individual (Markdoc → React)
- `src/content/posts/bienvenida.mdoc` — post de ejemplo

## Instalación

1. Copiá los archivos a las rutas correspondientes de tu proyecto Next.js.
2. Instalá dependencias:
   ```bash
   npm install @keystatic/core @keystatic/next @markdoc/markdoc
   npm install react-hook-form zod @hookform/resolvers
   # opcional para prosa del blog:
   npm install -D @tailwindcss/typography
   ```
3. **Merge** `tailwind.config.ts` con el que ya tenés (agregá `theme.extend.colors.inlar`, `fontFamily`, y si querés `@tailwindcss/typography` en `plugins`).
4. En `app/globals.css` asegurate de tener las `@tailwind` directives y el fondo `bg-inlar-cream`.
5. Reemplazá los placeholders en `app/page.tsx`:
   - `INLAR.whatsapp` — número en formato E.164 sin `+` (ej: `5491155551234`)
   - `INLAR.googleSchedulerUrl` — link de Google Appointment Schedules
   - `INLAR.email`, `INLAR.telefono`, `INLAR.direccion`, redes sociales
   - Imágenes (`HERO_IMG`, `NOSOTRAS_IMG`) por fotos reales
6. Configurá reCAPTCHA v3 para el formulario de contacto:

   ```env
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=tu_site_key_publica
   RECAPTCHA_SECRET_KEY=tu_secret_key_privada
   RECAPTCHA_MIN_SCORE=0.5
   ```

   - El formulario usa la acción `contact_form`.
   - El backend rechaza cualquier envío sin token, con score bajo o con acción incorrecta.

## Keystatic — modo local (desarrollo)

```bash
npm run dev
```

- Admin UI: http://127.0.0.1:3000/keystatic
- Los posts se guardan en `src/content/posts/*.mdoc`
- El blog público lee esos archivos en `/blog`

## Keystatic — modo GitHub (producción)

Para editar contenido desde el sitio publicado y commitear al repo:

1. Seguí la guía oficial: https://keystatic.com/docs/github-mode
   - Creá una GitHub App conectada a tu repo.
2. Definí variables de entorno (en `.env.local` y en tu hosting):
   ```env
   NEXT_PUBLIC_KEYSTATIC_STORAGE_KIND=github
   NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER=tu-usuario-o-org
   NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_NAME=tu-repo
   KEYSTATIC_GITHUB_CLIENT_ID=...
   KEYSTATIC_GITHUB_CLIENT_SECRET=...
   KEYSTATIC_SECRET=...   # openssl rand -hex 32
   ```
3. Deploy en Vercel/Netlify (requiere runtime Node.js, no edge).
4. Autorizá la GitHub App visitando `/keystatic` en el sitio publicado.

## Formulario

El formulario de contacto ya envía email con Brevo y valida reCAPTCHA v3 antes de aceptar el mensaje.

- El cliente obtiene el token con `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` justo antes de enviar.
- La ruta `app/api/contact/route.ts` verifica el token con `RECAPTCHA_SECRET_KEY` y compara el score con `RECAPTCHA_MIN_SCORE`.
- Si querés ajustar el filtro anti-spam, subí o bajá `RECAPTCHA_MIN_SCORE` según el tráfico real.

## SEO

- `metadata` global en `app/layout.tsx` + `metadata` propio en cada page.
- JSON-LD `LegalService` embebido.
- Cambiá `metadataBase` por tu dominio final antes de publicar.
- Agregá `public/robots.txt` y `app/sitemap.ts` (Next lo genera automáticamente).

## Vars

Build-time (Next.js inlines NEXT*PUBLIC*\* into the client JS during next build/next-on-pages build step — must be present in the build environment, not just in wrangler.jsonc):

- NEXT_PUBLIC_RECAPTCHA_SITE_KEY
- NEXT_PUBLIC_KEYSTATIC_STORAGE_KIND
- NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER
- NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_NAME

Since pnpm deploy (opennextjs-cloudflare deploy) runs the Next build itself, these need to be exported in the shell/CI env (or a .env.production file) before that command runs. Having them in wrangler.jsonc's vars only makes them available to the deployed Worker at runtime — it does nothing for the build step, so if the build step's env doesn't see them, they'll bake in as empty strings on the client.

Runtime-only (read via process.env inside app/api/contact/route.ts, server-side, never touch the client bundle — only need to exist in the Worker's runtime env):

- CONTACT_FORM_SENDER — already correctly in wrangler.jsonc vars (non-secret, fine as plaintext)
- CONTACT_FORM_RECIPIENT — same, fine as-is
- RECAPTCHA_MIN_SCORE — optional, not currently in wrangler.jsonc, defaults to 0.5 if unset

Runtime secrets — these should not go in wrangler.jsonc's plaintext vars (that file is likely committed to git). Set them with:
wrangler secret put BREVO_API_KEY
wrangler secret put RECAPTCHA_SECRET_KEY
This stores them encrypted and injects them into process.env at request time in the Worker, without ever needing to be present during the build.
