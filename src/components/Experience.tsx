'use client'

import { useState } from 'react'
import { experience } from '@/content/experience'
import RevealOnScroll from './ui/RevealOnScroll'

export default function Experience() {
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <section className="py-[clamp(100px,14vh,180px)]" id="experience">
      <div className="max-w-[1440px] mx-auto px-[clamp(20px,5vw,80px)]">
        <RevealOnScroll>
          <div className="flex items-baseline justify-between gap-10 mb-16 flex-wrap">
            <div>
              <span className="font-[var(--font-mono-loaded,var(--font-mono))] text-[11px] text-[var(--color-fg-faint)] uppercase tracking-[0.1em] mb-3.5 block">
                02 / experience
              </span>
              <h2
                className="font-[var(--font-display-loaded,var(--font-display))] font-medium tracking-[-0.035em] leading-none max-w-[16ch]"
                style={{ fontSize: 'clamp(36px,5.5vw,72px)' }}
              >
                Four years making production behave.
              </h2>
            </div>
            <span className="font-[var(--font-mono-loaded,var(--font-mono))] text-[12px] text-[var(--color-fg-muted)] tracking-[0.04em]">
              2021 → now
            </span>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={80}>
          <ol
            className="relative list-none p-0 m-0 before:content-[''] before:absolute before:left-[11px] before:top-7 before:bottom-7 before:w-px before:bg-[var(--color-line)]"
          >
            {experience.map((job, idx) => {
              const isOpen = openIdx === idx
              return (
                <li key={idx} className="relative pl-12 py-1">
                  {/* Spine node */}
                  <span
                    className={`absolute left-1 top-9 w-3.5 h-3.5 rounded-full border-[1.5px] border-[var(--color-fg)] transition-colors duration-[200ms] ${isOpen ? 'bg-[var(--color-fg)]' : 'bg-[var(--color-bg)]'} ${idx === 0 ? 'shadow-[0_0_0_6px_rgba(10,10,10,0.04)] before:content-[""] before:absolute before:-inset-1.5 before:rounded-full before:border before:border-[var(--color-fg)] before:opacity-0 before:animate-[tlPulse_2.4s_ease-out_infinite]' : ''}`}
                    aria-hidden
                  />

                  <button
                    aria-expanded={isOpen}
                    onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                    className="w-full grid grid-cols-[1fr_auto] items-center gap-5 py-[22px] pr-[22px] border-t border-[var(--color-line)] text-left transition-[padding-left] duration-[360ms] hover:pl-2 focus-visible:outline-2 focus-visible:outline-[var(--color-fg)] focus-visible:outline-offset-4 cursor-pointer"
                  >
                    <div className="min-w-0 grid gap-1.5">
                      <div className="inline-flex items-center gap-2.5 font-[var(--font-mono-loaded,var(--font-mono))] text-[12px] text-[var(--color-fg-muted)] tracking-[0.04em]">
                        <span className="whitespace-nowrap">{job.start} — {job.end ?? 'Present'}</span>
                        <span className={`font-[var(--font-mono-loaded,var(--font-mono))] text-[10px] uppercase tracking-widest px-2 py-[3px] rounded-full border ${job.end === null ? 'bg-[var(--color-fg)] text-[var(--color-bg)] border-[var(--color-fg)]' : 'border-[var(--color-line)] text-[var(--color-fg-muted)]'}`}>
                          {job.end === null ? '● Now' : job.type}
                        </span>
                      </div>
                      <h3
                        className="font-[var(--font-display-loaded,var(--font-display))] font-medium tracking-[-0.02em] leading-[1.15]"
                        style={{ fontSize: 'clamp(22px,2.1vw,30px)' }}
                      >
                        {job.role}{' '}
                        <span className="text-[var(--color-fg-muted)] font-normal">@ {job.company}</span>
                      </h3>
                      <div className="inline-flex gap-2 font-[var(--font-mono-loaded,var(--font-mono))] text-[12px] text-[var(--color-fg-faint)] flex-wrap">
                        <span>{job.location}</span><span>·</span><span>{job.type}</span>
                      </div>
                    </div>
                    <span
                      className={`w-9 h-9 rounded-full border border-[var(--color-line)] inline-flex items-center justify-center text-[var(--color-fg-muted)] transition-[transform,background,color,border-color] duration-[360ms] flex-shrink-0 ${isOpen ? 'rotate-180 bg-[var(--color-fg)] text-[var(--color-bg)] border-[var(--color-fg)]' : 'group-hover:bg-[var(--color-fg)]'}`}
                      aria-hidden
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </button>

                  {/* Last item bottom border */}
                  {idx === experience.length - 1 && (
                    <div className="border-b border-[var(--color-line)]" />
                  )}

                  {/* Collapsible body */}
                  <div
                    className="grid overflow-hidden transition-[grid-template-rows,opacity,padding] duration-[520ms] ease-[var(--ease)] pr-14 max-[600px]:pr-0"
                    style={{
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                      opacity: isOpen ? 1 : 0,
                      paddingTop: isOpen ? 18 : 0,
                      paddingBottom: isOpen ? 26 : 0,
                    }}
                  >
                    <div className="overflow-hidden grid gap-4 min-h-0">
                      <p className="text-[16px] leading-[1.55] text-[var(--color-fg-soft)] max-w-[62ch]">{job.lede}</p>
                      <ul className="grid gap-2 max-w-[64ch] list-none p-0">
                        {job.bullets.map((b, bi) => (
                          <li
                            key={bi}
                            className="relative pl-[22px] text-[var(--color-fg-soft)] text-[15px] leading-[1.55] before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-3 before:h-px before:bg-[var(--color-fg-faint)]"
                          >
                            {b}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {job.stack.map((chip) => (
                          <span
                            key={chip}
                            className="font-[var(--font-mono-loaded,var(--font-mono))] text-[11px] text-[var(--color-fg-muted)] border border-[var(--color-line)] px-2.5 py-1 rounded-full bg-[var(--color-bg)]"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </RevealOnScroll>
      </div>
    </section>
  )
}
