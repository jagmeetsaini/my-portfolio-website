# Skills Constellation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Skills section marquee + pill grid with an interactive 3D rotating constellation — skill nodes on a sphere (left), hover info panel (right).

**Architecture:** Three.js (already installed) renders a Fibonacci-distributed sphere of gray node meshes inside a `SkillSphere` client component. A `SkillsViz` client wrapper owns hover state and renders the info panel. `Skills.tsx` stays a server component, derives the flat node list from `skillGroups`, and passes it down. Editing `skills.ts` is the only action needed to add/remove skills.

**Tech Stack:** Next.js 16 (static export), Three.js (already installed), Tailwind CSS v4, CSS custom properties for theming.

---

### Task 1: Create `SkillSphere.tsx`

**Files:**
- Create: `src/components/ui/SkillSphere.tsx`

- [ ] **Step 1: Create the file**

Create `src/components/ui/SkillSphere.tsx` with the full content below:

```tsx
'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export type SkillNode = { name: string; category: string }

interface Props {
  nodes: SkillNode[]
  onHover: (node: SkillNode | null) => void
}

function fibonacciSphere(n: number, radius: number): THREE.Vector3[] {
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

export default function SkillSphere({ nodes, onHover }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const onHoverRef = useRef(onHover)

  useEffect(() => { onHoverRef.current = onHover }, [onHover])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const isDark = () => document.documentElement.classList.contains('dark')
    const defaultColor = () => isDark() ? 0x555555 : 0xc0c0c0
    const hoveredColor = () => isDark() ? 0xf0f0f0 : 0x0a0a0a
    const lineColorHex = () => isDark() ? 0x555555 : 0xc0c0c0

    // Scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 350

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)

    const group = new THREE.Group()
    scene.add(group)

    // Nodes
    const positions = fibonacciSphere(nodes.length, 180)
    const sharedGeo = new THREE.SphereGeometry(4, 8, 8)
    const materials: THREE.MeshBasicMaterial[] = []
    const nodeMeshes: THREE.Mesh[] = []

    nodes.forEach((node, i) => {
      const mat = new THREE.MeshBasicMaterial({ color: defaultColor() })
      materials.push(mat)
      const mesh = new THREE.Mesh(sharedGeo, mat)
      mesh.position.copy(positions[i])
      mesh.userData = { node, index: i }
      group.add(mesh)
      nodeMeshes.push(mesh)
    })

    // Lines between same-category nodes
    const categoryMap = new Map<string, number[]>()
    nodes.forEach((n, i) => {
      if (!categoryMap.has(n.category)) categoryMap.set(n.category, [])
      categoryMap.get(n.category)!.push(i)
    })

    const lineObjects: THREE.LineSegments[] = []
    categoryMap.forEach((indices) => {
      if (indices.length < 2) return
      const pts: THREE.Vector3[] = []
      for (let a = 0; a < indices.length; a++) {
        for (let b = a + 1; b < indices.length; b++) {
          pts.push(positions[indices[a]].clone(), positions[indices[b]].clone())
        }
      }
      const lineGeo = new THREE.BufferGeometry().setFromPoints(pts)
      const lineMat = new THREE.LineBasicMaterial({
        color: lineColorHex(),
        transparent: true,
        opacity: 0.12,
      })
      const ls = new THREE.LineSegments(lineGeo, lineMat)
      group.add(ls)
      lineObjects.push(ls)
    })

    // Raycaster
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2(-9999, -9999)
    let hoveredIndex = -1

    function updateColors() {
      materials.forEach((mat, i) => {
        mat.color.setHex(i === hoveredIndex ? hoveredColor() : defaultColor())
      })
    }

    // Interaction
    let isDragging = false
    let prevX = 0
    let prevY = 0

    function onPointerDown(e: PointerEvent) {
      isDragging = true
      prevX = e.clientX
      prevY = e.clientY
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

      if (isDragging) {
        group.rotation.y += (e.clientX - prevX) * 0.01
        group.rotation.x += (e.clientY - prevY) * 0.01
        prevX = e.clientX
        prevY = e.clientY
        return
      }

      raycaster.setFromCamera(mouse, camera)
      const hits = raycaster.intersectObjects(nodeMeshes)
      const newIdx = hits.length > 0 ? (hits[0].object.userData.index as number) : -1
      if (newIdx !== hoveredIndex) {
        hoveredIndex = newIdx
        updateColors()
        onHoverRef.current(newIdx >= 0 ? nodes[newIdx] : null)
      }
    }

    function onPointerUp() {
      isDragging = false
    }

    function onPointerLeave() {
      isDragging = false
      mouse.set(-9999, -9999)
      if (hoveredIndex !== -1) {
        hoveredIndex = -1
        updateColors()
        onHoverRef.current(null)
      }
    }

    function onWheel(e: WheelEvent) {
      const rect = canvas.getBoundingClientRect()
      const inside =
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top && e.clientY <= rect.bottom
      if (inside) e.preventDefault()
    }

    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('pointerup', onPointerUp)
    canvas.addEventListener('wheel', onWheel, { passive: false })

    // Resize
    const ro = new ResizeObserver(() => {
      const w = container.clientWidth
      const h = container.clientHeight
      if (w === 0 || h === 0) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    })
    ro.observe(container)

    // Animation loop
    let rafId: number
    let lastDark = isDark()

    function animate() {
      rafId = requestAnimationFrame(animate)
      const nowDark = isDark()
      if (nowDark !== lastDark) {
        lastDark = nowDark
        updateColors()
        lineObjects.forEach(ls => {
          ;(ls.material as THREE.LineBasicMaterial).color.setHex(lineColorHex())
        })
      }
      if (!isDragging) group.rotation.y += 0.003
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('pointerup', onPointerUp)
      canvas.removeEventListener('wheel', onWheel)
      ro.disconnect()
      sharedGeo.dispose()
      materials.forEach(m => m.dispose())
      lineObjects.forEach(ls => {
        ls.geometry.dispose()
        ;(ls.material as THREE.LineBasicMaterial).dispose()
      })
      renderer.dispose()
    }
  }, [nodes])

  return (
    <div ref={containerRef} className="w-full h-[520px]">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
```

- [ ] **Step 2: Verify file exists**

```bash
ls src/components/ui/SkillSphere.tsx
```

Expected: file listed, no error.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/SkillSphere.tsx
git commit -m "feat: add SkillSphere Three.js constellation component"
```

---

### Task 2: Create `SkillsViz.tsx`

**Files:**
- Create: `src/components/SkillsViz.tsx`

- [ ] **Step 1: Create the file**

Create `src/components/SkillsViz.tsx`:

```tsx
'use client'

import { useState } from 'react'
import SkillSphere, { type SkillNode } from './ui/SkillSphere'

export default function SkillsViz({ nodes }: { nodes: SkillNode[] }) {
  const [hovered, setHovered] = useState<SkillNode | null>(null)

  return (
    <div className="flex gap-8 items-center max-[768px]:flex-col">
      <div className="flex-[3] min-w-0">
        <SkillSphere nodes={nodes} onHover={setHovered} />
      </div>
      <div className="flex-[2] flex flex-col justify-center min-h-[160px] max-[768px]:min-h-[80px]">
        {hovered ? (
          <>
            <span className="font-[var(--font-mono-loaded,var(--font-mono))] text-[11px] text-[var(--color-fg-faint)] uppercase tracking-[0.1em] mb-3">
              {hovered.category}
            </span>
            <span
              className="font-[var(--font-display-loaded,var(--font-display))] font-medium tracking-[-0.03em] leading-none text-[var(--color-fg)]"
              style={{ fontSize: 'clamp(28px,3vw,42px)' }}
            >
              {hovered.name}
            </span>
          </>
        ) : (
          <span className="font-[var(--font-mono-loaded,var(--font-mono))] text-[12px] text-[var(--color-fg-faint)] tracking-[0.04em]">
            // hover a node
          </span>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SkillsViz.tsx
git commit -m "feat: add SkillsViz wrapper with hover info panel"
```

---

### Task 3: Update `Skills.tsx`

**Files:**
- Modify: `src/components/Skills.tsx`

- [ ] **Step 1: Replace full file contents**

Replace `src/components/Skills.tsx` with:

```tsx
import { skillGroups } from '@/content/skills'
import RevealOnScroll from './ui/RevealOnScroll'
import SkillsViz from './SkillsViz'

export default function Skills() {
  const totalCount = skillGroups.reduce((acc, g) => acc + g.pills.length, 0)
  const nodes = skillGroups.flatMap(g =>
    g.pills.map(name => ({ name, category: g.name }))
  )

  return (
    <section className="py-[clamp(100px,14vh,180px)]" id="skills">
      <div className="max-w-[1440px] mx-auto px-[clamp(20px,5vw,80px)]">
        <RevealOnScroll>
          <div className="flex items-center justify-between mb-3.5">
            <span className="font-[var(--font-mono-loaded,var(--font-mono))] text-[11px] text-[var(--color-fg-faint)] uppercase tracking-[0.1em]">
              04 / skills
            </span>
            <span className="font-[var(--font-mono-loaded,var(--font-mono))] text-[12px] text-[var(--color-fg-muted)] tracking-[0.04em]">
              {totalCount} tools &amp; counting
            </span>
          </div>
          <h2
            className="font-[var(--font-display-loaded,var(--font-display))] font-medium tracking-[-0.035em] leading-none mb-16"
            style={{ fontSize: 'clamp(36px,5.5vw,72px)' }}
          >
            The stack I ship on.
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={80}>
          <SkillsViz nodes={nodes} />
        </RevealOnScroll>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Start dev server and verify**

```bash
npm run dev
```

Open http://localhost:3000 and scroll to Skills section. Verify:
- Gray dots distributed on a sphere, slowly rotating
- Dragging the sphere rotates it
- Hovering a node: that dot turns black (light mode) / white (dark mode), right panel shows skill name + category
- Moving off nodes: right panel returns to `// hover a node`
- Toggle dark mode: sphere dot colors update live
- Resize browser: canvas redraws correctly
- Scrolling over the sphere doesn't accidentally scroll the page while dragging

- [ ] **Step 3: Commit**

```bash
git add src/components/Skills.tsx
git commit -m "feat: replace skills grid with interactive 3D constellation"
```

---

### Task 4: Build verification

**Files:** none

- [ ] **Step 1: Run build**

```bash
npm run build
```

Expected: completes with no errors, all 7 static pages generated.

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: no new errors beyond the pre-existing ones in `Nav.tsx` and `projects/[slug]/page.tsx`.
