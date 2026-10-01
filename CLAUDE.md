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

**MDX gotcha:** `gray-matter` returns the file body as a raw string, and `src/app/projects/[slug]/page.tsx` injects it **as-is** via `dangerouslySetInnerHTML`. Nothing converts Markdown to HTML. The `@mdx-js`/`@next/mdx` packages only handle `.mdx` files used as pages (`pageExtensions`), not project bodies. So Markdown syntax (`##`, `-` lists) in project files is not rendered as formatting; only raw HTML is. JSX components won't work either. Adding a Markdown→HTML step (e.g. in `getAllProjects()`) would require a new dependency.

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
- `dotted-surface.tsx` (exports `DottedSurface`) — Three.js animated particle grid used as the Hero section background

`three` is used only by `dotted-surface.tsx`.

### Skills rack

`Skills.tsx` (server) passes `skillGroups` from `src/content/skills.ts` to `SkillsRack.tsx` (client), which draws each group as a server-rack unit and each pill as a drive bay. Unit height is `ceil(pills / 4)` U. Adding a group or pill needs no component changes; `slug` and `blurb` are optional. Per-unit LED colours come from the `--spec-*` tokens by index (dark mode only). Light vs dark LED styling lives in the `.rack-*` classes at the bottom of `globals.css`, driven by `html.dark`, so the component never reads the theme in JS.

### Design docs

`docs/superpowers/specs/` and `docs/superpowers/plans/` hold dated design specs and implementation plans for past redesigns (the old skills constellation, project cards). The constellation docs are historical; it has been replaced by the rack. Check them before changing those features.

Use `cn()` from `src/lib/utils.ts` (a `clsx` wrapper) for conditional Tailwind classes throughout the codebase.

### Path alias

`@/*` resolves to `src/*` (configured in `tsconfig.json`). Use `@/` for all internal imports.

### Content with embedded HTML

`site.bio` in `src/content/site.ts` contains HTML string fragments (e.g. `<strong>`, `<a>` tags) rendered via `dangerouslySetInnerHTML` in `About.tsx`. When editing bio copy, write valid HTML, not JSX.

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) deploys on **manual trigger only** (`workflow_dispatch` — pushing to `main` or `development` does *not* auto-deploy; run it from the Actions tab):
- `main` → production S3 bucket + CloudFront invalidation (`/*`)
- `development` → staging S3 bucket + CloudFront invalidation (`/*`)

HTML/JSON files are served with `no-cache`; all other assets get `immutable` long-term cache headers. Auth uses OIDC (no stored access keys). Config comes from repo/environment variables (`AWS_REGION`, `S3_BUCKET`, `CLOUDFRONT_DIST_ID`) plus the `AWS_OIDC_ROLE_ARN` secret, scoped per GitHub Environment (`Development` / `Production`).
