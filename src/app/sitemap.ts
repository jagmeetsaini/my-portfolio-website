import type { MetadataRoute } from 'next'
import { getAllProjects } from '@/lib/projects'

// Required for static export (output: 'export') — see
// https://nextjs.org/docs/advanced-features/static-html-export
export const dynamic = 'force-static'

const BASE_URL = 'https://jagmeet.cloud'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE_URL}/projects`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ]

  const projectRoutes: MetadataRoute.Sitemap = getAllProjects().map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...projectRoutes]
}
