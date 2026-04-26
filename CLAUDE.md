# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev       # Start dev server at localhost:3000
npm run build     # Static export to /out (output: 'export')
npm run lint      # ESLint (no test suite exists)
```

No test framework is configured.

## Architecture

This is a **statically exported** Next.js 16 portfolio site (`output: 'export'`). All pages are pre-rendered at build time — there is no server runtime. `next/image` optimization is disabled (`images: { unoptimized: true }`) because static export has no image server.

### Content layer

All site content lives in `src/content/`:
- `site.ts` — single source of truth for personal info, bio, stats, roles (used across multiple components)
- `experience.ts` — typed `Job[]` array rendered by `Experience.tsx`
- `skills.ts` — skills data rendered by `Skills.tsx`
- `projects/*.mdx` — one MDX file per project with gray-matter frontmatter (`title`, `slug`, `date`, `tags`, `featured`, `order`, `summary`)

**To add a project:** create a new `.mdx` file in `src/content/projects/` with the required frontmatter fields. The `order` field controls sort order; `featured: true` surfaces it on the homepage.

### Project data flow

`src/lib/projects.ts` reads MDX files at build time using `fs` + `gray-matter`. This module is **Node.js only** (uses `fs`) — do not import it in client components. The dynamic route `src/app/projects/[slug]/page.tsx` uses `generateStaticParams()` to pre-render all project pages.

**MDX gotcha:** `gray-matter` returns the file body as a raw markdown string. Project detail pages render it via `dangerouslySetInnerHTML` — the `@mdx-js` packages are installed but do **not** process project bodies. Do not use JSX components inside `.mdx` files; write standard Markdown (or HTML) only.

### Routing

- `/` — single-page portfolio with all sections (Hero, About, Experience, Projects, Skills, Contact)
- `/projects` — project listing
- `/projects/[slug]` — individual project detail page (MDX content rendered via `dangerouslySetInnerHTML`)

### Styling

Tailwind CSS v4 with CSS custom properties for theming. Design tokens (`--color-fg`, `--color-fg-muted`, `--color-line`, etc.) are defined in `globals.css` and used throughout via inline Tailwind classes. Fonts are referenced via CSS variables (`--font-display`, `--font-mono`).

Dark mode is toggled by `next-themes`, which adds/removes `class="dark"` on `<html>`. Dark mode overrides are defined as `html.dark { ... }` in `globals.css` — not via `@media (prefers-color-scheme)`.

Font variables follow a two-step pattern: Next.js injects `--font-display-loaded` / `--font-mono-loaded` once fonts are ready; CSS falls back to the stack in `--font-display` / `--font-mono` to avoid FOUT.

### Client boundary

Any component using Framer Motion, `next-themes`, or browser APIs must be a Client Component (`'use client'`). `src/lib/projects.ts` uses Node.js `fs` — never import it from a Client Component.

### UI primitives

`src/components/ui/` contains reusable interactive primitives:
- `RevealOnScroll.tsx` — Framer Motion scroll-triggered entrance animation
- `MagneticButton.tsx` — cursor-attracted button using Framer Motion
- `Cursor.tsx` — custom cursor implementation
- `DottedSurface.tsx` — Three.js animated particle grid used as the Hero section background; the `three` dependency exists solely for this component

Use `cn()` from `src/lib/utils.ts` (a `clsx` wrapper) for conditional Tailwind classes throughout the codebase.

### Path alias

`@/*` resolves to `src/*` (configured in `tsconfig.json`). Use `@/` for all internal imports.

### Content with embedded HTML

`site.bio` in `src/content/site.ts` contains HTML string fragments (e.g. `<strong>`, `<a>` tags) rendered via `dangerouslySetInnerHTML` in `About.tsx`. When editing bio copy, write valid HTML, not JSX.

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) deploys automatically on push:
- `main` → production S3 bucket + CloudFront invalidation (`/*`)
- `development` → staging S3 bucket (no CDN invalidation)

HTML/JSON files are served with `no-cache`; all other assets get `immutable` long-term cache headers. Auth uses OIDC (no stored access keys). Required GitHub secrets: `AWS_OIDC_ROLE_ARN`, `AWS_REGION`, `CLOUDFRONT_DISTRIBUTION_ID`. Bucket names are hardcoded: `jagmeet-prod-portfolio` (prod) and `jagmeet-dev-portfolio` (staging).
