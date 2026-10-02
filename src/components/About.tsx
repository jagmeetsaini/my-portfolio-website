'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { site } from '@/content/site'
import RevealOnScroll from './ui/RevealOnScroll'

const zoom = {
  rest: { scale: 1 },
  hover: { scale: 1.04 },
}

export default function About() {
  return (
    <section className="flex flex-col py-[clamp(100px,14vh,180px)] relative" id="about">
      <div className="max-w-[1440px] mx-auto px-[clamp(20px,5vw,80px)] flex flex-col flex-1 w-full">

        <RevealOnScroll>
          <div className="flex items-center justify-between pt-4 border-t border-[var(--color-line)] font-[var(--font-mono-loaded,var(--font-mono))] text-[11px] text-[var(--color-fg-faint)]">
            <span className="uppercase tracking-[0.1em]">01 / about</span>
            <span className="tracking-[0.04em]">est. 2021 — present</span>
          </div>
        </RevealOnScroll>

        <div className="mt-14 grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-[clamp(40px,6.25vw,80px)] items-stretch max-[900px]:grid-cols-1 max-[900px]:gap-10">

          <RevealOnScroll delay={80}>
            <div className="flex flex-col">
              <h2
                className="font-[var(--font-display-loaded,var(--font-display))] font-medium tracking-[-0.045em] leading-[0.98] text-balance"
                style={{ fontSize: 'clamp(40px,5.94vw,76px)' }}
              >
                Building systems quiet enough to{' '}
                <span className="text-[var(--color-fg-faint)]">sleep through.</span>
              </h2>
              <div className="mt-10 flex flex-col gap-[18px] max-w-[560px] text-[17px] leading-[1.65] text-[var(--color-fg-soft)] text-pretty">
                {(site.bio as readonly string[]).map((para, i) => (
                  <p
                    key={i}
                    className="[&_strong]:font-semibold [&_strong]:text-[var(--color-fg)] [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-1 hover:[&_a]:decoration-2"
                    dangerouslySetInnerHTML={{ __html: para }}
                  />
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={160}>
            <figure className="m-0 flex flex-col gap-3.5 max-[900px]:max-w-[420px]">
              <motion.div
                initial="rest"
                whileHover="hover"
                className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-[var(--color-paper)]"
              >
                <motion.div
                  variants={zoom}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src="/me.png"
                    alt="Jagmeet Singh, black and white portrait"
                    fill
                    sizes="(max-width: 900px) 420px, 600px"
                    className="object-cover object-[50%_30%] grayscale contrast-[1.05]"
                  />
                </motion.div>
              </motion.div>
            </figure>
          </RevealOnScroll>

        </div>
      </div>
    </section>
  )
}
