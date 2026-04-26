# Project Cards Redesign

**Date:** 2026-04-26  
**Scope:** `src/components/Projects.tsx` + `src/app/projects/page.tsx`

## Overview

Replace the current list-row layout with a card grid. Each card has a custom SVG illustration, a bottom-to-top fill on hover, and the illustration floats + rotates on hover. Applied to both the homepage Projects section and the All Projects page.

## Card Structure

Each card (top → bottom):

1. **Top row** — mono index (`01`, `02`, `03`) left · arrow button (`↗`) right
2. **Illustration area** — custom SVG centered, min-height ~140px
3. **Title** — display font, ~20px, medium weight
4. **Description** — summary text, 13px, muted color
5. **Tags** — pill badges, monospace, uppercase, 10px

## Grid Layout

- Desktop (≥900px): 3 columns, `gap-4`
- Tablet (600–899px): 2 columns
- Mobile (<600px): 1 column

## Hover Behavior

**Fill animation:**  
`::after` pseudo-element covers the card. Rests at `translateY(100%)`. On hover slides to `translateY(0)` — bottom-to-top fluid wipe. Duration 450ms, `cubic-bezier(0.76, 0, 0.24, 1)`. Uses `var(--color-fg)` so it's black in light mode, white in dark mode automatically.

**Text/tag color inversion:**  
All text and tag borders transition to `var(--color-bg)` on hover (contrast against the fill).

**SVG illustration:**  
On card hover: `translateY(-8px) rotate(-5deg) scale(1.05)`. Duration 450ms, `cubic-bezier(0.23, 1, 0.32, 1)`. Card body stays flat — only the SVG moves.

## SVG Illustrations (per slug)

| Slug | Illustration |
|---|---|
| `siem-integration` | Network topology: 4 dashed-border rectangles connected via dashed lines to a central filled circle. Extra 2 boxes on right connected to center. |
| `region-automation` | Orbital diagram: outer dashed circle, inner solid circle, center dot, 4 orbit dots (N/S/E/W), 2 inner ring dots. |
| `s3-pipeline` | 4 vertical rounded rectangles (varying heights) with a horizontal tick line near top and downward flow arrows at bottom. |

SVG illustrations are defined in a `const ILLUSTRATIONS` map keyed by slug inside a new `ProjectCard` client component. Future projects without a matching slug get a generic fallback (grid of dots).

## Component Architecture

- **`src/components/ui/ProjectCard.tsx`** — new `'use client'` component. Accepts `{ proj, idx }`. Contains the card markup and illustration map. Client component needed for hover interactions via Framer Motion or pure CSS (pure CSS preferred — no extra dependency).
- **`src/components/Projects.tsx`** — server component, imports `ProjectCard`, renders 3-col grid.
- **`src/app/projects/page.tsx`** — server component, imports `ProjectCard`, renders same grid with all projects.

## Dark Mode

`var(--color-fg)` fill + `var(--color-bg)` text inversion is already dark-mode-aware via existing CSS tokens. SVG strokes use `currentColor` so they invert automatically when text color changes on hover.

## What Does NOT Change

- Section heading, label, and "all projects →" link in `Projects.tsx`
- Page heading in `projects/page.tsx`
- Routing (`/projects/[slug]`)
- MDX content files
