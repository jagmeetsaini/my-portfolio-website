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

This is a **statically exported** Next.js 16 portfolio site (`output: 'export'`). All pages are pre-rendered at build time — there is no server runtime.

### Content layer

All site content lives in `src/content/`:
- `site.ts` — single source of truth for personal info, bio, stats, roles (used across multiple components)
- `experience.ts` — typed `Job[]` array rendered by `Experience.tsx`
- `skills.ts` — skills data rendered by `Skills.tsx`
- `projects/*.mdx` — one MDX file per project with gray-matter frontmatter (`title`, `slug`, `date`, `tags`, `featured`, `order`, `summary`)

**To add a project:** create a new `.mdx` file in `src/content/projects/` with the required frontmatter fields. The `order` field controls sort order; `featured: true` surfaces it on the homepage.

### Project data flow

`src/lib/projects.ts` reads MDX files at build time using `fs` + `gray-matter`. This module is **Node.js only** (uses `fs`) — do not import it in client components. The dynamic route `src/app/projects/[slug]/page.tsx` uses `generateStaticParams()` to pre-render all project pages.

### Routing

- `/` — single-page portfolio with all sections (Hero, About, Experience, Projects, Skills, Contact)
- `/projects` — project listing
- `/projects/[slug]` — individual project detail page (MDX content rendered via `dangerouslySetInnerHTML`)

### Styling

Tailwind CSS v4 with CSS custom properties for theming. Design tokens (`--color-fg`, `--color-fg-muted`, `--color-line`, etc.) are defined in `globals.css` and used throughout via inline Tailwind classes. Fonts are referenced via CSS variables (`--font-display`, `--font-mono`).

### UI primitives

`src/components/ui/` contains reusable interactive primitives:
- `RevealOnScroll.tsx` — Framer Motion scroll-triggered entrance animation
- `MagneticButton.tsx` — cursor-attracted button using Framer Motion
- `Cursor.tsx` — custom cursor implementation

These wrap Framer Motion and are used throughout section components.
