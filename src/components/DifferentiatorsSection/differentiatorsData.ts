export interface ManifestoBeat {
  id: string
  statement: string
}

export const MANIFESTO_BEATS: ManifestoBeat[] = [
  { id: 'strategy', statement: 'אסטרטגיה לפני עיצוב.' },
  { id: 'business', statement: 'חשיבה עסקית לפני ויזואל.' },
  { id: 'purpose', statement: 'לכל החלטה — יש מטרה.' },
  { id: 'assets', statement: 'לא אתרים. נכסים דיגיטליים.' },
]

export const MANIFESTO_CLOSER = 'פיתוח מודרני. חשיבה לטווח ארוך.'
