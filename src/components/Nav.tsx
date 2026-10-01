'use client'

import { useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent } from 'react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

const glassPill = 'border border-[var(--color-line)] rounded-full bg-[color-mix(in_srgb,var(--color-bg)_80%,transparent)] backdrop-blur-md'

export default function Nav() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const lastY = useRef(0)
  const progressRef = useRef<HTMLSpanElement>(null)
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false)

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY
      setHidden(y > 300 && y > lastY.current)
      setScrolled(y > 24)
      lastY.current = y
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const isDark = mounted && resolvedTheme === 'dark'
  const lightRef = useRef<HTMLButtonElement>(null)
  const darkRef = useRef<HTMLButtonElement>(null)

  function onToggleKey(e: KeyboardEvent<HTMLDivElement>) {
    if (['ArrowLeft', 'ArrowUp'].includes(e.key)) {
      e.preventDefault()
      setTheme('light')
      lightRef.current?.focus()
    } else if (['ArrowRight', 'ArrowDown'].includes(e.key)) {
      e.preventDefault()
      setTheme('dark')
      darkRef.current?.focus()
    }
  }

  const radioClass = 'relative w-8 h-8 inline-flex items-center justify-center rounded-full transition-colors duration-[350ms] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-fg)]'

  return (
    <nav
      aria-label="Primary"
      className={cn(
        'fixed top-0 left-0 right-0 z-50 h-16 border-b transition-[transform,opacity,background-color,border-color] duration-[400ms] ease-[var(--ease)]',
        scrolled
          ? 'bg-[color-mix(in_srgb,var(--color-bg)_80%,transparent)] backdrop-blur-md backdrop-saturate-[1.4] border-[var(--color-line)]'
          : 'bg-transparent border-transparent',
        hidden && '-translate-y-full opacity-0'
      )}
    >
      <div className="max-w-[1440px] h-full mx-auto px-[clamp(20px,5vw,64px)] flex items-center justify-between">
        <a href="#top" aria-label="Jagmeet — back to top" className={cn('h-10 inline-flex items-center gap-3 px-4', glassPill)}>
          <span aria-hidden className="relative w-2 h-2 flex-none">
            <span className="status-ping absolute inset-0 rounded-full bg-[#22c55e]" />
            <span className="absolute inset-0 rounded-full bg-[#22c55e]" />
          </span>
          <span className="flex items-baseline font-[var(--font-mono-loaded,var(--font-mono))] text-[13px] text-[var(--color-fg)]">
            <span className="font-medium tracking-[0.08em]">JAGMEET</span>
            <span className="italic text-[var(--color-fg-muted)]">.cloud</span>
          </span>
        </a>

        <div
          role="radiogroup"
          aria-label="Theme"
          onKeyDown={onToggleKey}
          className={cn('relative h-10 inline-flex items-center p-[3px]', glassPill)}
        >
          <span
            aria-hidden
            className={cn(
              'absolute top-[3px] left-[3px] w-8 h-8 rounded-full bg-[var(--color-fg)] transition-transform duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
              isDark ? 'translate-x-8' : 'translate-x-0'
            )}
          />
          <button
            ref={lightRef}
            type="button"
            role="radio"
            aria-checked={!isDark}
            aria-label="Light theme"
            tabIndex={isDark ? -1 : 0}
            onClick={() => setTheme('light')}
            className={cn(radioClass, isDark ? 'text-[var(--color-fg-muted)]' : 'text-[var(--color-bg)]')}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
            </svg>
          </button>
          <button
            ref={darkRef}
            type="button"
            role="radio"
            aria-checked={isDark}
            aria-label="Dark theme"
            tabIndex={isDark ? 0 : -1}
            onClick={() => setTheme('dark')}
            className={cn(radioClass, isDark ? 'text-[var(--color-bg)]' : 'text-[var(--color-fg-muted)]')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </button>
        </div>
      </div>

      <span
        ref={progressRef}
        aria-hidden
        style={{ transform: 'scaleX(0)' }}
        className={cn(
          'absolute left-0 right-0 -bottom-px h-px bg-[var(--color-fg)] origin-left transition-opacity duration-[400ms]',
          scrolled ? 'opacity-100' : 'opacity-0'
        )}
      />
    </nav>
  )
}
