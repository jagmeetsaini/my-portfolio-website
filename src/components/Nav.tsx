'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { site } from '@/content/site'

export default function Nav() {
  const [hidden, setHidden] = useState(false)
  const [time, setTime] = useState('—')
  const lastY = useRef(0)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    function updateTime() {
      const t = new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false, timeZone: 'Asia/Kolkata',
      })
      setTime(t + ' IST')
    }
    updateTime()
    const id = setInterval(updateTime, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY
      setHidden(y > 300 && y > lastY.current)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      aria-label="Primary"
      className={`fixed top-0 left-0 right-0 z-50 grid grid-cols-[1fr_auto_1fr] items-center px-[clamp(20px,5vw,80px)] py-[22px] pointer-events-none transition-[transform,opacity] duration-[400ms] ${hidden ? '-translate-y-full opacity-0' : ''}`}
    >
      <a
        href="#top"
        className="pointer-events-auto justify-self-start inline-flex items-center px-3 py-2 border border-[var(--color-line)] rounded-full bg-[var(--color-bg)]/80 backdrop-blur-md"
      >
        <img src="/logo.svg" alt={site.name} className="h-[22px] w-auto" />
      </a>

      <div className="pointer-events-auto justify-self-center inline-flex items-center gap-2.5 font-mono text-[12px] tracking-widest px-[18px] py-2.5 border border-[var(--color-line)] rounded-full bg-[var(--color-bg)]/80 backdrop-blur-md text-[var(--color-fg)] max-sm:hidden">
        <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-[pulse_2s_ease-in-out_infinite]" />
        {time}
      </div>

      <div className="pointer-events-auto justify-self-end flex items-center gap-3">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
          className="inline-flex items-center justify-center w-[42px] h-[42px] rounded-full border border-[var(--color-line)] bg-[var(--color-bg)]/80 backdrop-blur-md text-[var(--color-fg)] transition-transform duration-[200ms] hover:scale-[1.04]"
        >
          {mounted && theme === 'dark' ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
        <a
        href="#contact"
        className="inline-flex items-center gap-2.5 font-mono text-[13px] font-medium px-[18px] py-[11px] rounded-full bg-[var(--color-fg)] text-[var(--color-bg)] transition-transform duration-[200ms] hover:scale-[1.04]"
      >
        Let&apos;s talk
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
      </div>
    </nav>
  )
}
