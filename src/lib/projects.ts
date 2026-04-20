import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface ProjectFrontmatter {
  title: string
  slug: string
  date: string
  tags: string[]
  featured: boolean
  order: number
  summary: string
}

export interface Project extends ProjectFrontmatter {
  content: string
}

const projectsDir = path.join(process.cwd(), 'src/content/projects')

export function getAllProjects(): Project[] {
  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith('.mdx'))
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(projectsDir, file), 'utf-8')
      const { data, content } = matter(raw)
      return { ...(data as ProjectFrontmatter), content }
    })
    .sort((a, b) => a.order - b.order)
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug)
}
