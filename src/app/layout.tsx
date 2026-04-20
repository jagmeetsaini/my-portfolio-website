import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import Cursor from '@/components/ui/Cursor'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-display-loaded',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-loaded',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Jagmeet Singh Saini — Cloud & SRE Engineer',
  description: 'Portfolio of Jagmeet Singh Saini — cloud, SRE & DevOps engineer.',
  icons: { icon: '/logo.svg', shortcut: '/logo.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="grain" aria-hidden />
          <Cursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
