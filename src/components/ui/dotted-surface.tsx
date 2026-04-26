'use client'

import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const themeRef = useRef(resolvedTheme)

  useEffect(() => {
    themeRef.current = resolvedTheme
  }, [resolvedTheme])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const SEPARATION = 100
    const AMOUNTX = 60
    const AMOUNTY = 80

    const REPULSION_RADIUS   = 350
    const REPULSION_STRENGTH = 180

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000)
    camera.position.set(0, 355, 1220)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const positions: number[] = []
    const colors: number[] = []
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        positions.push(
          ix * SEPARATION - (AMOUNTX * SEPARATION) / 2,
          0,
          iy * SEPARATION - (AMOUNTY * SEPARATION) / 2,
        )
        colors.push(0.1, 0.1, 0.1)
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 6, vertexColors: true, transparent: true, opacity: 0.75, sizeAttenuation: true,
    })
    scene.add(new THREE.Points(geometry, material))

    const raycaster  = new THREE.Raycaster()
    const mouse      = new THREE.Vector2(99999, 99999)
    const wavePlane  = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
    const mouseWorld = new THREE.Vector3(99999, 0, 99999)

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x =  (e.clientX / window.innerWidth)  * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
      raycaster.setFromCamera(mouse, camera)
      raycaster.ray.intersectPlane(wavePlane, mouseWorld)
    }

    const handleMouseLeave = () => {
      mouse.set(99999, 99999)
      mouseWorld.set(99999, 0, 99999)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    let count = 0
    let animationId: number
    const r2 = REPULSION_RADIUS * REPULSION_RADIUS
    const color = new THREE.Color()

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      const pos = geometry.attributes.position.array as Float32Array
      const col = geometry.attributes.color.array as Float32Array
      const isDark = themeRef.current === 'dark'
      let i = 0

      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const idx = i * 3
          const x   = pos[idx]
          const z   = pos[idx + 2]

          const wave =
            Math.sin((ix + count) * 0.3) * 50 +
            Math.sin((iy + count) * 0.5) * 50

          const dx = x - mouseWorld.x
          const dz = z - mouseWorld.z
          const repulsion = REPULSION_STRENGTH * Math.exp(-(dx * dx + dz * dz) / r2)

          pos[idx + 1] = wave + repulsion

          if (isDark) {
            const hue = ((ix * 0.04 + iy * 0.025 + count * 0.6) % 1 + 1) % 1
            color.setHSL(hue, 1.0, 0.5)
          } else {
            const lightness = 0.08 + 0.06 * ((Math.sin((ix + count) * 0.3) + Math.sin((iy + count) * 0.5)) / 4 + 0.5)
            color.setHSL(0, 0, lightness)
          }

          col[idx]     = color.r
          col[idx + 1] = color.g
          col[idx + 2] = color.b

          i++
        }
      }

      geometry.attributes.position.needsUpdate = true
      geometry.attributes.color.needsUpdate = true
      renderer.render(scene, camera)
      count += 0.02
    }

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn('pointer-events-none absolute inset-0 z-0 overflow-hidden', className)}
      {...props}
    />
  )
}
