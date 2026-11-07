import { PROJECTS } from '../../ProjectsSection/projectsData'

export interface HeroProject {
  id: string
  number: string
  title: string
  category: string
  previewImage: string
  objectFit?: 'cover' | 'contain'
  objectPosition?: string
}

/** Per-project preview fit — 1440×900 (16:10) WebP assets under /public/projects */
const HERO_PREVIEW_FIT: Partial<
  Record<string, { objectFit?: HeroProject['objectFit']; objectPosition?: string }>
> = {
  abnei: { objectFit: 'cover', objectPosition: 'top' },
  katana: { objectFit: 'cover', objectPosition: 'top' },
  'astoria-estates': { objectFit: 'cover', objectPosition: 'top' },
}

export const HERO_PROJECTS: HeroProject[] = PROJECTS.map(
  ({ id, number, title, category, previewImage }) => ({
    id,
    number,
    title,
    category,
    previewImage: previewImage.replace(/\.png$/, '.webp'),
    ...HERO_PREVIEW_FIT[id],
  }),
)

export const HERO_PROJECT_COUNT = HERO_PROJECTS.length
