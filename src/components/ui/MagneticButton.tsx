'use client'

import { useRef, ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  download?: boolean | string
  disabled?: boolean
}

export default function MagneticButton({ children, className = '', href, onClick, type, download, disabled }: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)

  function onMove(e: React.MouseEvent) {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left - r.width / 2
    const y = e.clientY - r.top - r.height / 2
    el.style.transform = `translate(${x * 0.2}px,${y * 0.3}px)`
  }

  function onLeave() {
    if (ref.current) ref.current.style.transform = ''
  }

  if (href) {
    return (
      <a ref={ref} href={href} download={download} className={className} onMouseMove={onMove} onMouseLeave={onLeave}>
        {children}
      </a>
    )
  }
  return (
    <button ref={ref} type={type ?? 'button'} onClick={onClick} disabled={disabled} className={className} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </button>
  )
}
