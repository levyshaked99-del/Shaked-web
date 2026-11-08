import type {
  RightFitAudience,
  RightFitChallenge,
  RightFitGoal,
  RightFitIndustry,
} from './rightFitTypes'

export interface RightFitOption<T extends string> {
  id: T
  label: string
  description: string
}

export interface RightFitQuestion {
  step: 1 | 2 | 3 | 4
  heading: string
  description: string
}

export const RIGHT_FIT_EYEBROW = 'THE RIGHT FIT'

export const RIGHT_FIT_HEADLINE = 'לפני שמשקיעים באתר, כדאי לוודא שבונים את הדבר הנכון.'

export const RIGHT_FIT_SUPPORTING =
  'ארבע שאלות קצרות שיעזרו לנו להבין את העסק שלכם, את הצרכים שלו ואת מידת ההתאמה לפרויקט.'

export const RIGHT_FIT_QUESTIONS: RightFitQuestion[] = [
  {
    step: 1,
    heading: 'באיזה תחום העסק שלכם?',
    description: 'בחרו את התחום שהכי מתאר את הפעילות שלכם.',
  },
  {
    step: 2,
    heading: 'מה הכי חשוב לכם להשיג באמצעות האתר?',
    description: 'נבין יחד אילו מטרות העסק שלכם יושבות במרכז.',
  },
  {
    step: 3,
    heading: 'איזה סוג לקוחות או פרויקטים הייתם רוצים למשוך?',
    description: 'זה עוזר לנו לחשוב על המסר והמבנה הנכונים.',
  },
  {
    step: 4,
    heading: 'מה האתגר המרכזי שלכם כיום?',
    description: 'נזהה מה כדאי לשים בראש סדר העדיפויות.',
  },
]

export const INDUSTRY_OPTIONS: RightFitOption<RightFitIndustry>[] = [
  { id: 'interior', label: 'עיצוב פנים', description: 'מעצבי פנים וסטודיואים לעיצוב.' },
  { id: 'architecture', label: 'אדריכלות', description: 'משרדי אדריכלות ותכנון.' },
  { id: 'contractors', label: 'קבלנות ושיפוצים', description: 'קבלנים וחברות שיפוצים.' },
  { id: 'real_estate', label: 'בנייה ונדל״ן', description: 'יזמים, בנייה ופיתוח נדל״ן.' },
  { id: 'other', label: 'תחום אחר', description: 'כל ענף אחר — תמיד מוזמנים.' },
]

export const GOAL_OPTIONS: RightFitOption<RightFitGoal>[] = [
  { id: 'portfolio', label: 'להציג תיק עבודות בצורה מקצועית ומרשימה', description: '' },
  { id: 'new_clients', label: 'למשוך לקוחות ופרויקטים חדשים', description: '' },
  { id: 'filter_leads', label: 'לסנן פניות ולמשוך לקוחות שמתאימים לנו', description: '' },
  { id: 'brand', label: 'לבנות מותג ולבדל את העסק מהמתחרים', description: '' },
  { id: 'combined', label: 'שילוב של כמה מטרות', description: '' },
]

export const AUDIENCE_OPTIONS: RightFitOption<RightFitAudience>[] = [
  { id: 'private_clients', label: 'לקוחות פרטיים שמחפשים עיצוב או שיפוץ', description: '' },
  { id: 'luxury_projects', label: 'פרויקטים גדולים ויוקרתיים', description: '' },
  { id: 'business_clients', label: 'לקוחות עסקיים ומסחריים', description: '' },
  { id: 'diverse', label: 'פרויקטים מגוונים — ללא התמחות מסוימת', description: '' },
  { id: 'undefined_audience', label: 'עדיין לא הגדרנו', description: '' },
]

export const CHALLENGE_OPTIONS: RightFitOption<RightFitChallenge>[] = [
  { id: 'showcase', label: 'קשה להציג את העבודות שלנו בצורה מקצועית', description: '' },
  { id: 'irrelevant_leads', label: 'אנחנו מקבלים פניות לא מספיק רלוונטיות', description: '' },
  { id: 'referrals_only', label: 'רוב הלקוחות מגיעים דרך המלצות ורשתות חברתיות', description: '' },
  { id: 'differentiation', label: 'קשה להסביר ללקוחות מה מייחד אותנו', description: '' },
  { id: 'no_digital', label: 'עדיין אין לנו נוכחות דיגיטלית מסודרת', description: '' },
]

export function optionsForStep(step: 1 | 2 | 3 | 4) {
  switch (step) {
    case 1:
      return INDUSTRY_OPTIONS
    case 2:
      return GOAL_OPTIONS
    case 3:
      return AUDIENCE_OPTIONS
    case 4:
      return CHALLENGE_OPTIONS
  }
}

export type AnswerKey = keyof import('./rightFitTypes').RightFitAnswers

export function answerKeyForStep(step: 1 | 2 | 3 | 4): AnswerKey {
  const keys: AnswerKey[] = ['industry', 'goal', 'audience', 'challenge']
  return keys[step - 1]
}
