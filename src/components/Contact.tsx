'use client'

import { useState } from 'react'
import { site } from '@/content/site'
import RevealOnScroll from './ui/RevealOnScroll'
import MagneticButton from './ui/MagneticButton'

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    try {
      const res = await fetch('https://formspree.io/f/placeholder', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) { setStatus('sent'); form.reset() }
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="py-[clamp(100px,14vh,180px)]" id="contact">
      <div className="max-w-[1440px] mx-auto px-[clamp(20px,5vw,80px)]">

        <RevealOnScroll>
          <div className="flex items-baseline justify-between gap-10 mb-16 flex-wrap">
            <span className="font-[var(--font-mono-loaded,var(--font-mono))] text-[11px] text-[var(--color-fg-faint)] uppercase tracking-[0.1em]">
              05 / contact
            </span>
            <span className="font-[var(--font-mono-loaded,var(--font-mono))] text-[12px] text-[var(--color-fg-muted)] tracking-[0.04em]">
              response time &lt; 24h
            </span>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-2 gap-20 items-start max-[900px]:grid-cols-1 max-[900px]:gap-12">

          {/* Left: headline + channels */}
          <RevealOnScroll delay={80}>
            <div>
              <h2
                className="font-[var(--font-display-loaded,var(--font-display))] font-medium tracking-[-0.04em] leading-[0.95] mb-10"
                style={{ fontSize: 'clamp(48px,7vw,96px)' }}
              >
                Got infra that<br />
                <em className="font-normal italic">keeps you up?</em><br />
                Let&apos;s fix it.
              </h2>

              <p className="text-[var(--color-fg-soft)] leading-[1.55] mb-10" style={{ fontSize: 'clamp(16px,1.3vw,18px)' }}>
                Cloud audits, IaC refactors, CI/CD rescue missions, on-call hygiene —
                or just a chat about your architecture. Drop a line.
              </p>

              <div className="border-t border-[var(--color-line)]">
                {[
                  { k: 'Email', v: site.email, v_display: site.email, href: `mailto:${site.email}`, arr: '↗' },
                  { k: 'LinkedIn', v: '/in/jagmeet-singh-saini', href: site.linkedin, arr: '↗', target: '_blank' },
                  { k: 'Résumé', v: 'PDF · 120kb', href: site.resumePath, arr: '↓', download: true },
                ].map(({ k, v, href, arr, target, download }) => (
                  <a
                    key={k}
                    href={href}
                    target={target}
                    download={download}
                    rel={target ? 'noopener noreferrer' : undefined}
                    className="flex justify-between items-center py-[18px] border-b border-[var(--color-line)] hover:pl-3 transition-[padding-left] duration-[300ms] group"
                  >
                    <span className="font-[var(--font-mono-loaded,var(--font-mono))] text-[11px] text-[var(--color-fg-muted)] uppercase tracking-[0.06em]">
                      {k}
                    </span>
                    <span className="font-[var(--font-mono-loaded,var(--font-mono))] text-[13px] text-[var(--color-fg)] inline-flex items-center gap-2.5">
                      {v}
                      <span className="inline-block group-hover:translate-x-1 group-hover:-translate-y-1 transition-[translate] duration-[300ms]">
                        {arr}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Right: form card */}
          <RevealOnScroll delay={160}>
            <form
              onSubmit={handleSubmit}
              className="grid gap-[18px] p-8 border border-[var(--color-line-strong)] rounded-[10px] bg-[var(--color-paper)]"
            >
              <div className="grid grid-cols-2 gap-[18px] max-[540px]:grid-cols-1">
                <div className="flex flex-col gap-2">
                  <label className="font-[var(--font-mono-loaded,var(--font-mono))] text-[11px] text-[var(--color-fg-muted)] uppercase tracking-[0.08em]">
                    Name
                  </label>
                  <input
                    name="name"
                    required
                    type="text"
                    placeholder="Your name"
                    className="bg-transparent border-0 border-b border-[var(--color-line)] py-2.5 text-[15px] text-[var(--color-fg)] placeholder:text-[var(--color-fg-faint)] outline-none focus:border-[var(--color-fg)] focus:pl-1.5 transition-[border-color,padding-left] duration-[200ms]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-[var(--font-mono-loaded,var(--font-mono))] text-[11px] text-[var(--color-fg-muted)] uppercase tracking-[0.08em]">
                    Email
                  </label>
                  <input
                    name="email"
                    required
                    type="email"
                    placeholder="you@company.com"
                    className="bg-transparent border-0 border-b border-[var(--color-line)] py-2.5 text-[15px] text-[var(--color-fg)] placeholder:text-[var(--color-fg-faint)] outline-none focus:border-[var(--color-fg)] focus:pl-1.5 transition-[border-color,padding-left] duration-[200ms]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-[var(--font-mono-loaded,var(--font-mono))] text-[11px] text-[var(--color-fg-muted)] uppercase tracking-[0.08em]">
                  Project / role
                </label>
                <input
                  name="subject"
                  type="text"
                  placeholder="Cloud audit, full-time role, contract gig…"
                  className="bg-transparent border-0 border-b border-[var(--color-line)] py-2.5 text-[15px] text-[var(--color-fg)] placeholder:text-[var(--color-fg-faint)] outline-none focus:border-[var(--color-fg)] focus:pl-1.5 transition-[border-color,padding-left] duration-[200ms]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-[var(--font-mono-loaded,var(--font-mono))] text-[11px] text-[var(--color-fg-muted)] uppercase tracking-[0.08em]">
                  What&apos;s on your mind?
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell me about the problem, stack, timeline…"
                  className="bg-transparent border-0 border-b border-[var(--color-line)] py-2.5 text-[15px] text-[var(--color-fg)] placeholder:text-[var(--color-fg-faint)] outline-none focus:border-[var(--color-fg)] focus:pl-1.5 transition-[border-color,padding-left] duration-[200ms] resize-none leading-[1.5]"
                />
              </div>

              <div className="flex items-center gap-4 mt-2">
                <MagneticButton
                  type="submit"
                  disabled={status === 'sending' || status === 'sent'}
                  className="inline-flex items-center gap-2.5 px-[22px] py-[14px] font-[var(--font-mono-loaded,var(--font-mono))] text-[13px] font-medium rounded-full border border-[var(--color-fg)] bg-[var(--color-fg)] text-[var(--color-bg)] transition-[transform,opacity] duration-[200ms] hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent ✓' : (
                    <>
                      Send it
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </MagneticButton>
                {status === 'error' && (
                  <span className="font-[var(--font-mono-loaded,var(--font-mono))] text-[12px] text-red-500">
                    Something went wrong — email directly instead.
                  </span>
                )}
              </div>
            </form>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
