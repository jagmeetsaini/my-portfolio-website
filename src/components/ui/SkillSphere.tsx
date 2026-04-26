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
    if (!canvasRef.current || !containerRef.current) return
    const canvas = canvasRef.current as HTMLCanvasElement
    const container = containerRef.current as HTMLDivElement

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

    // Interaction state
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
