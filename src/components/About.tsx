import Image from 'next/image'
import { site } from '@/content/site'
import RevealOnScroll from './ui/RevealOnScroll'

export default function About() {
  return (
    <section className="flex flex-col py-[clamp(100px,14vh,180px)] relative" id="about">
      <div className="max-w-[1440px] mx-auto px-[clamp(20px,5vw,80px)] flex flex-col flex-1 w-full">

        <RevealOnScroll>
          <div className="flex items-center justify-between mb-8">
            <span className="font-[var(--font-mono-loaded,var(--font-mono))] text-[11px] text-[var(--color-fg-faint)] uppercase tracking-[0.1em]">
              01 / about
            </span>
            <span className="font-[var(--font-mono-loaded,var(--font-mono))] text-[12px] text-[var(--color-fg-muted)] tracking-[0.04em]">
              est. 2021 — present
            </span>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-2 gap-[clamp(40px,6vw,80px)] flex-1 max-[900px]:grid-cols-1 max-[900px]:gap-10">

          <RevealOnScroll delay={80}>
            <div className="flex flex-col justify-center h-full gap-8">
              <h2
                className="font-[var(--font-display-loaded,var(--font-display))] font-medium tracking-[-0.035em] leading-[1.05]"
                style={{ fontSize: 'clamp(36px,5.5vw,72px)' }}
              >
                Building systems quiet enough to sleep through.
              </h2>
              <div className="flex flex-col gap-4">
                {(site.bio as readonly string[]).map((para, i) => (
                  <p
                    key={i}
                    className="text-[var(--color-fg-soft)] leading-[1.55]"
                    style={{ fontSize: 'clamp(15px,1.15vw,18px)' }}
                    dangerouslySetInnerHTML={{ __html: para }}
                  />
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={160}>
            <div className="flex items-center justify-center h-full">
              <div className="max-w-[420px] mx-auto w-full aspect-[3/4] border border-[var(--color-line-strong)] rounded-[10px] bg-[var(--color-accent-soft)] relative overflow-hidden">
                <Image
                  src="/avatar.png"
                  alt="Jagmeet Singh Saini"
                  fill
                  className="object-cover object-[center_25%]"
                />
                <div className="absolute bottom-5 left-5 bg-[var(--color-bg)] border border-[var(--color-line)] px-3.5 py-2 rounded-full font-[var(--font-mono-loaded,var(--font-mono))] text-[12px] inline-flex items-center gap-2 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.25)] z-10">
                  <span className="w-[7px] h-[7px] rounded-full bg-green-600 animate-[pulse_2s_ease-in-out_infinite]" />
                  Hello, I&apos;m Jagmeet.
                </div>
              </div>
            </div>
          </RevealOnScroll>

        </div>
      </div>
    </section>
  )
}
