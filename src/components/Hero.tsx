'use client'

import { useEffect, useRef } from 'react'
import { site } from '@/content/site'
import MagneticButton from './ui/MagneticButton'
import { DottedSurface } from './ui/dotted-surface'

export default function Hero() {
  const typerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = typerRef.current
    if (!el) return
    const roles = site.roles as readonly { word: string; color: string }[]
    let i = 0, j = 0, deleting = false
    el.style.setProperty('--role-color', roles[0].color)

    function tick() {
      const { word, color } = roles[i]
      el!.style.setProperty('--role-color', color)
      if (!deleting) {
        j++
        el!.textContent = word.slice(0, j)
        if (j === word.length) { deleting = true; setTimeout(tick, 1600); return }
        setTimeout(tick, 55 + Math.random() * 40)
      } else {
        j--
        // zero-width space keeps the span's line-height intact so layout never collapses
        el!.textContent = j === 0 ? '\u200b' : word.slice(0, j)
        if (j === 0) { deleting = false; i = (i + 1) % roles.length; setTimeout(tick, 280); return }
        setTimeout(tick, 28)
      }
    }
    setTimeout(tick, 1200)
  }, [])

  return (
    <header className="min-h-screen flex flex-col justify-center pt-[80px] pb-[60px] relative overflow-hidden" id="top">
      <DottedSurface />
      <div className="relative z-10 max-w-[1440px] mx-auto px-[clamp(20px,5vw,80px)] w-full">

        <div className="flex flex-col items-center text-center">

            <h1
              className="block font-[var(--font-display-loaded,var(--font-display))] font-medium tracking-[-0.04em] leading-[0.95] mb-2"
              style={{ fontSize: 'clamp(44px,6.5vw,110px)' }}
            >
              <span className="block overflow-hidden pb-[0.12em] whitespace-nowrap">
                <span className="inline-block animate-[rise_1.1s_var(--ease)_both]">Hi, I&apos;m Jagmeet</span>
              </span>
            </h1>

            <div
              className="mt-5 flex items-center justify-center font-[var(--font-display-loaded,var(--font-display))] font-normal tracking-[-0.02em] text-[var(--color-fg-muted)]"
              style={{ fontSize: 'clamp(18px,2.2vw,34px)' }}
            >
              <span
                className="font-[var(--font-mono-loaded,var(--font-mono))] text-[var(--color-fg-faint)] shrink-0 mr-3"
                style={{ fontSize: 'clamp(16px,1.4vw,20px)' }}
              >
                $ whoami —
              </span>
              <span
                ref={typerRef}
                className="font-medium whitespace-nowrap transition-colors duration-[400ms]"
                style={{ color: 'var(--role-color, var(--color-fg))' }}
              >
                Cloud Engineer
              </span>
            </div>

            <p
              className="mt-7 max-w-[52ch] mx-auto text-[var(--color-fg-soft)] leading-[1.5] opacity-0 animate-[fade_900ms_var(--ease)_750ms_forwards]"
              style={{ fontSize: 'clamp(14px,1.15vw,17px)' }}
            >
              I build cloud infrastructure that doesn&apos;t wake you up at 3 AM —
              shipping observable, automated, SOC-compliant systems on{' '}
              <strong className="text-[var(--color-fg)] font-medium">AWS &amp; Azure</strong>.
            </p>

            <div className="mt-8 flex gap-3 flex-wrap justify-center opacity-0 animate-[fade_900ms_var(--ease)_900ms_forwards]">
              <MagneticButton
                href="#contact"
                className="inline-flex items-center gap-2.5 px-[22px] py-[14px] font-[var(--font-mono-loaded,var(--font-mono))] text-[13px] font-medium rounded-full border border-[var(--color-fg)] bg-[var(--color-fg)] text-[var(--color-bg)] transition-transform duration-[200ms] hover:-translate-y-0.5"
              >
                Start a project
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </MagneticButton>
              <MagneticButton
                href={site.resumePath}
                download
                className="inline-flex items-center gap-2.5 px-[22px] py-[14px] font-[var(--font-mono-loaded,var(--font-mono))] text-[13px] font-medium rounded-full border border-[var(--color-fg)] bg-[var(--color-bg)] text-[var(--color-fg)] transition-[transform,background,color] duration-[200ms] hover:-translate-y-0.5 hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)]"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 2v8m0 0L3.5 6.5M7 10l3.5-3.5M2 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download résumé
              </MagneticButton>
            </div>
        </div>


      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-[clamp(20px,5vw,80px)] font-[var(--font-mono-loaded,var(--font-mono))] text-[11px] text-[var(--color-fg-muted)] uppercase tracking-widest flex items-center gap-2.5">
        <span className="inline-block w-10 h-px bg-[var(--color-fg-muted)] origin-left animate-[scrollLine_2s_ease-in-out_infinite]" />
        scroll
      </div>
    </header>
  )
}
