'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export type SkillNode = { name: string; category: string }

interface Props {
  nodes: SkillNode[]
  onHover: (node: SkillNode | null) => void
  onNodeClick: (node: SkillNode | null) => void
  selectedNode: SkillNode | null
  selectedCategory: string | null
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

export default function SkillSphere({ nodes, onHover, onNodeClick, selectedNode, selectedCategory }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const labelsContainerRef = useRef<HTMLDivElement>(null)
  const labelEls = useRef<(HTMLSpanElement | null)[]>([])

  const onHoverRef = useRef(onHover)
  const onClickRef = useRef(onNodeClick)
  const selectedNodeRef = useRef(selectedNode)
  const selectedCategoryRef = useRef(selectedCategory)

  useEffect(() => { onHoverRef.current = onHover }, [onHover])
  useEffect(() => { onClickRef.current = onNodeClick }, [onNodeClick])
  useEffect(() => { selectedNodeRef.current = selectedNode }, [selectedNode])
  useEffect(() => { selectedCategoryRef.current = selectedCategory }, [selectedCategory])

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return
    const canvas = canvasRef.current as HTMLCanvasElement
    const container = containerRef.current as HTMLDivElement

    const isDark = () => document.documentElement.classList.contains('dark')
    const defaultColor = () => isDark() ? 0x555555 : 0xc0c0c0
    const activeColor = () => isDark() ? 0xf0f0f0 : 0x0a0a0a
    const lineColorHex = () => isDark() ? 0x444444 : 0xd8d8d8

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 1000)
    camera.position.z = 300

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)

    const group = new THREE.Group()
    scene.add(group)

    const positions = fibonacciSphere(nodes.length, 155)
    const sharedGeo = new THREE.SphereGeometry(5, 10, 10)
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
      const lineMat = new THREE.LineBasicMaterial({ color: lineColorHex(), transparent: true, opacity: 0.15 })
      const ls = new THREE.LineSegments(lineGeo, lineMat)
      group.add(ls)
      lineObjects.push(ls)
    })

    // Pulse ring system
    type PulseRing = { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; t: number; posIdx: number }
    let pulseRings: PulseRing[] = []

    function spawnPulse(posIdx: number) {
      const geo = new THREE.RingGeometry(6, 8, 32)
      const mat = new THREE.MeshBasicMaterial({
        color: activeColor(),
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
        depthWrite: false,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.copy(positions[posIdx])
      mesh.lookAt(positions[posIdx].clone().multiplyScalar(2))
      group.add(mesh)
      pulseRings.push({ mesh, mat, t: 0, posIdx })
    }

    function getActiveIndices(): number[] {
      const selNode = selectedNodeRef.current
      const selCat = selectedCategoryRef.current
      if (selNode) {
        const idx = nodes.findIndex(n => n.name === selNode.name)
        return idx >= 0 ? [idx] : []
      }
      if (selCat) return nodes.map((n, i) => n.category === selCat ? i : -1).filter(i => i >= 0)
      return []
    }

    function updateNodeColors(hovIdx: number) {
      const activeIndices = getActiveIndices()
      materials.forEach((mat, i) => {
        mat.color.setHex(activeIndices.includes(i) || i === hovIdx ? activeColor() : defaultColor())
      })
    }

    // Interaction state
    let hoveredIndex = -1
    let isDragging = false
    let hasMoved = false
    let prevX = 0, prevY = 0
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2(-9999, -9999)

    function onPointerDown(e: PointerEvent) {
      isDragging = true
      hasMoved = false
      prevX = e.clientX
      prevY = e.clientY
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

      if (isDragging) {
        const dx = e.clientX - prevX, dy = e.clientY - prevY
        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) hasMoved = true
        group.rotation.y += dx * 0.008
        group.rotation.x += dy * 0.008
        prevX = e.clientX
        prevY = e.clientY
        return
      }

      raycaster.setFromCamera(mouse, camera)
      const hits = raycaster.intersectObjects(nodeMeshes)
      const newIdx = hits.length > 0 ? (hits[0].object.userData.index as number) : -1
      if (newIdx !== hoveredIndex) {
        hoveredIndex = newIdx
        updateNodeColors(hoveredIndex)
        onHoverRef.current(newIdx >= 0 ? nodes[newIdx] : null)
      }
      canvas.style.cursor = newIdx >= 0 ? 'pointer' : 'grab'
    }

    function onPointerUp() {
      if (!hasMoved && isDragging) {
        raycaster.setFromCamera(mouse, camera)
        const hits = raycaster.intersectObjects(nodeMeshes)
        if (hits.length > 0) {
          onClickRef.current(nodes[hits[0].object.userData.index as number])
        } else {
          onClickRef.current(null)
        }
      }
      isDragging = false
    }

    function onPointerLeave() {
      isDragging = false
      mouse.set(-9999, -9999)
      if (hoveredIndex !== -1) {
        hoveredIndex = -1
        updateNodeColors(hoveredIndex)
        onHoverRef.current(null)
      }
      canvas.style.cursor = 'grab'
    }

    function onWheel(e: WheelEvent) {
      const rect = canvas.getBoundingClientRect()
      if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
        e.preventDefault()
      }
    }

    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('pointerup', onPointerUp)
    canvas.addEventListener('wheel', onWheel, { passive: false })
    canvas.style.cursor = 'grab'

    const ro = new ResizeObserver(() => {
      const w = container.clientWidth, h = container.clientHeight
      if (!w || !h) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    })
    ro.observe(container)

    const projVec = new THREE.Vector3()
    let rafId: number
    let frameCount = 0
    let lastDark = isDark()
    let lastActiveKey = ''

    function animate() {
      rafId = requestAnimationFrame(animate)
      frameCount++

      // Sync dark mode
      const nowDark = isDark()
      if (nowDark !== lastDark) {
        lastDark = nowDark
        updateNodeColors(hoveredIndex)
        lineObjects.forEach(ls => (ls.material as THREE.LineBasicMaterial).color.setHex(lineColorHex()))
      }

      // Sync selection state
      const selNode = selectedNodeRef.current
      const selCat = selectedCategoryRef.current
      const activeKey = `${selNode?.name ?? ''}|${selCat ?? ''}`
      if (activeKey !== lastActiveKey) {
        lastActiveKey = activeKey
        pulseRings.forEach(r => { group.remove(r.mesh); r.mesh.geometry.dispose(); r.mat.dispose() })
        pulseRings = []
        frameCount = 0
        updateNodeColors(hoveredIndex)
      }

      // Spawn pulses for active nodes (staggered)
      const activeIndices = getActiveIndices()
      activeIndices.forEach((idx, j) => {
        if ((frameCount + j * 22) % 70 === 0) spawnPulse(idx)
      })

      // Animate pulses
      const alive: PulseRing[] = []
      for (const ring of pulseRings) {
        ring.t += 0.016
        const s = 1 + ring.t * 5
        ring.mesh.scale.set(s, s, s)
        ring.mat.opacity = Math.max(0, 0.5 * (1 - ring.t))
        if (ring.t < 1) { alive.push(ring) } else {
          group.remove(ring.mesh)
          ring.mesh.geometry.dispose()
          ring.mat.dispose()
        }
      }
      pulseRings = alive

      if (!isDragging) group.rotation.y += 0.003

      renderer.render(scene, camera)

      // Update HTML label positions after render
      const W = container.clientWidth
      const H = container.clientHeight
      nodeMeshes.forEach((mesh, i) => {
        projVec.setFromMatrixPosition(mesh.matrixWorld)
        projVec.project(camera)
        const x = (projVec.x + 1) / 2 * W
        const y = -(projVec.y - 1) / 2 * H
        const opacity = Math.max(0, Math.min(1, (0.6 - projVec.z) * 2))
        const el = labelEls.current[i]
        if (el) {
          el.style.transform = `translate(${x + 8}px, ${y - 5}px)`
          el.style.opacity = String(opacity)
        }
      })
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
      lineObjects.forEach(ls => { ls.geometry.dispose(); (ls.material as THREE.LineBasicMaterial).dispose() })
      pulseRings.forEach(r => { r.mesh.geometry.dispose(); r.mat.dispose() })
      renderer.dispose()
    }
  }, [nodes])

  return (
    <div ref={containerRef} className="relative w-full h-[580px]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div ref={labelsContainerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {nodes.map((node, i) => (
          <span
            key={i}
            ref={el => { labelEls.current[i] = el }}
            className="absolute top-0 left-0 font-[var(--font-mono-loaded,var(--font-mono))] text-[10px] text-[var(--color-fg-muted)] whitespace-nowrap"
            style={{ opacity: 0 }}
          >
            {node.name}
          </span>
        ))}
      </div>
    </div>
  )
}
