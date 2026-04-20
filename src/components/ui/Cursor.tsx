'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = window.innerWidth / 2, my = window.innerHeight / 2
    let dx = mx, dy = my, rx = mx, ry = my

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', onMove)

    let raf: number
    function tick() {
      dx += (mx - dx) * 0.9; dy += (my - dy) * 0.9
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18
      dot!.style.transform = `translate(${dx}px,${dy}px) translate(-50%,-50%)`
      ring!.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`
      raf = requestAnimationFrame(tick)
    }
    tick()

    const addHover = (el: Element) => {
      el.addEventListener('mouseenter', () => ring.classList.add('!w-16', '!h-16', '!bg-[var(--color-fg)]', '[mix-blend-mode:difference]'))
      el.addEventListener('mouseleave', () => ring.classList.remove('!w-16', '!h-16', '!bg-[var(--color-fg)]', '[mix-blend-mode:difference]'))
    }
    document.querySelectorAll('a,button,.proj,.skill-pill,input,textarea').forEach(addHover)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-[var(--color-fg)] w-9 h-9 will-change-transform transition-[width,height,background] duration-[250ms]"
      />
      <div
        ref={dotRef}
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[var(--color-fg)] w-1.5 h-1.5 will-change-transform"
      />
    </>
  )
}
