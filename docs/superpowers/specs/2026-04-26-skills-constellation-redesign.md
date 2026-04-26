# Skills Constellation Redesign

**Date:** 2026-04-26  
**Scope:** `src/components/Skills.tsx`, new `src/components/SkillsViz.tsx`, new `src/components/ui/SkillSphere.tsx`

## Overview

Replace the current marquee + pill-grid Skills section with an interactive 3D constellation — skill nodes distributed on a rotating sphere on the left, an info panel on the right that shows the hovered skill's name and category.

## Layout

Section header row: `04 / SKILLS` label left, `{count} tools & counting` right — unchanged.  
Below heading: two-column layout.

- **Left (~60%)**: Three.js canvas, 520px tall, transparent background, sphere of gray nodes
- **Right (~40%)**: Info panel, vertically centered
  - Idle: `// hover a node` in faint monospace
  - Active: skill name (display font, large) + category (mono, muted, small)

Mobile (<768px): stack vertically — canvas top, info panel below.

Current marquee strip and pill grid are removed. The sphere is the sole visual.

## Data

`src/content/skills.ts` is the **only** file to edit when managing skills. No changes to its structure.

The flat node list is derived automatically:

```ts
const nodes = skillGroups.flatMap(g =>
  g.pills.map(name => ({ name, category: g.name }))
)
```

- Add skill: append to a `pills` array
- Remove skill: delete from `pills`
- Add category: add new `{ name, pills }` entry
- Zero changes to any component required

## SkillSphere Component

**File:** `src/components/ui/SkillSphere.tsx`  
**Type:** `'use client'`  
**Props:** `{ nodes: { name: string; category: string }[], onHover: (node: { name: string; category: string } | null) => void }`

### Node Distribution

Fibonacci sphere algorithm — evenly distributes N points on a sphere surface (radius 180):

```ts
function fibonacciSphere(n: number, radius: number) {
  return Array.from({ length: n }, (_, i) => {
    const theta = Math.acos(1 - (2 * (i + 0.5)) / n)
    const phi = Math.PI * (1 + Math.sqrt(5)) * i
    return new THREE.Vector3(
      radius * Math.sin(theta) * Math.cos(phi),
      radius * Math.sin(theta) * Math.sin(phi),
      radius * Math.cos(theta)
    )
  })
}
```

### Node Appearance

- Geometry: `THREE.SphereGeometry(4, 8, 8)`
- Material: `THREE.MeshBasicMaterial`
- Default color: `#c0c0c0` (light mode) / `#555555` (dark mode)
- Hovered color: `#0a0a0a` (light mode) / `#f0f0f0` (dark mode)
- Dark mode detected per-frame via `document.documentElement.classList.contains('dark')`

### Lines

- Connect all node pairs within the same category
- `THREE.LineSegments` with `THREE.LineBasicMaterial`, opacity `0.12`, transparent
- Same dark-mode color logic as nodes

### Rotation & Interaction

- **Auto-rotation**: `mesh.rotation.y += 0.003` per frame (applied to a parent `THREE.Group` containing all nodes + lines)
- **Drag to rotate**:
  - `pointerdown` → record start position, set `isDragging = true`
  - `pointermove` → if dragging, compute delta, apply `group.rotation.y += deltaX * 0.01`, `group.rotation.x += deltaY * 0.01`
  - `pointerup` → set `isDragging = false`, resume auto-rotation
- **Scroll-lock**: `wheel` event on canvas calls `e.preventDefault()` while pointer is inside canvas bounds
- **Hover / Raycasting**:
  - `mousemove` on canvas → update `THREE.Raycaster` from mouse position
  - `raycaster.intersectObjects(nodeMeshes)` — take first hit
  - On hit: color that mesh to hovered color, call `onHover(node)`
  - On no hit: reset all to default color, call `onHover(null)`

### Renderer Setup

```ts
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
renderer.setClearColor(0x000000, 0)  // transparent background
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(canvas.clientWidth, canvas.clientHeight)
```

Camera: `THREE.PerspectiveCamera(60, width/height, 0.1, 1000)`, positioned at `z = 350`.

### Resize

`ResizeObserver` on canvas container — calls `renderer.setSize` + updates camera aspect on resize.

### Cleanup

`useEffect` returns cleanup: `renderer.dispose()`, cancel animation frame, remove event listeners.

## SkillsViz Component

**File:** `src/components/SkillsViz.tsx`  
**Type:** `'use client'`  
**Props:** `{ nodes: { name: string; category: string }[] }`

Owns `hoveredNode` state (`null | { name, category }`).  
Renders two-column layout with `SkillSphere` (left) and info panel (right).

Info panel markup:
- Idle: `<span>// hover a node</span>` in `font-mono text-[var(--color-fg-faint)] text-[12px]`
- Active: skill name in display font `clamp(28px,3vw,42px)`, category in mono `text-[12px] text-[var(--color-fg-muted)]`

## Skills Component

**File:** `src/components/Skills.tsx`  
**Type:** server component (unchanged)

- Derives `nodes` from `skillGroups`
- Keeps section heading + count
- Renders `<SkillsViz nodes={nodes} />`
- Removes marquee and pill grid

## What Does NOT Change

- `src/content/skills.ts` structure
- Section ID (`id="skills"`)
- Section heading text and label
- Tools count display
