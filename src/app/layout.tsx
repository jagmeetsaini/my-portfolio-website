import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import GoogleAnalytics from '@/components/GoogleAnalytics'
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

const SITE_URL = 'https://jagmeet.cloud'
const SITE_NAME = 'Jagmeet Singh Saini'
const TITLE = 'Jagmeet Singh Saini — Cloud & SRE Engineer'
const DESCRIPTION =
  'Portfolio of Jagmeet Singh Saini, a cloud, SRE & DevOps engineer building reliable infrastructure on AWS and Azure.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s | ${SITE_NAME}` },
  description: DESCRIPTION,
  keywords: [
    'Jagmeet Singh Saini',
    'SRE engineer',
    'site reliability engineer',
    'cloud engineer',
    'DevOps engineer',
    'AWS',
    'Azure',
    'Terraform',
    'Kubernetes',
    'portfolio',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  icons: { icon: '/logo.svg', shortcut: '/logo.svg' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body>
        <GoogleAnalytics />
        <ThemeProvider>
          <div className="grain" aria-hidden />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
