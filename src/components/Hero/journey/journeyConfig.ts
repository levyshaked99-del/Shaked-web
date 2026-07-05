import type { MaterialType } from '../showcase/stageMaterials'

export interface JourneyStage {
  id: number
  stage: string
  label: string
  material: MaterialType
  duration: number
}

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: 1,
    stage: '01',
    label: 'רעיון',
    material: 'paper',
    duration: 4000,
  },
  {
    id: 2,
    stage: '02',
    label: 'אפיון',
    material: 'blueprint',
    duration: 4000,
  },
  {
    id: 3,
    stage: '03',
    label: 'עיצוב',
    material: 'design',
    duration: 4000,
  },
  {
    id: 4,
    stage: '04',
    label: 'פיתוח',
    material: 'code',
    duration: 4000,
  },
  {
    id: 5,
    stage: '05',
    label: 'השקה',
    material: 'product',
    duration: 4500,
  },
]
