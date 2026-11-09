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

const HERO_PREVIEW_FIT: Partial<
  Record<string, { objectFit?: HeroProject['objectFit']; objectPosition?: string }>
> = {
  abnei: { objectFit: 'contain', objectPosition: 'top center' },
  noma: { objectFit: 'contain', objectPosition: 'top center' },
}

export const HERO_PROJECTS: HeroProject[] = PROJECTS.map(
  ({ id, number, title, category, previewImage, previewPresentation }) => ({
    id,
    number,
    title,
    category,
    previewImage,
    objectFit: previewPresentation.fit,
    objectPosition: previewPresentation.position ?? 'top center',
    ...HERO_PREVIEW_FIT[id],
  }),
)

export const HERO_PROJECT_COUNT = HERO_PROJECTS.length
