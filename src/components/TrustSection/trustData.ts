export interface TrustPanelData {
  id: string
  title: string
  description: string
  /** Visual layout: text on left, animation on right (LTR grid) */
  textFirst: boolean
}

export const TRUST_PANELS: TrustPanelData[] = [
  {
    id: 'transparency',
    title: 'שקיפות ויושרה',
    description:
      'אנחנו ממליצים על הפתרון שנכון לעסק שלכם, מסבירים מראש מה כלול בפרויקט ומה לא, ודואגים שתמיד תדעו בדיוק באיזה שלב הפרויקט נמצא.',
    textFirst: true,
  },
  {
    id: 'quality',
    title: 'איכות ללא פשרות',
    description:
      'כל אתר נבנה מאפס, תוך הקפדה על כל פרט קטן, ללא שימוש בתבניות מוכנות וללא קיצורי דרך.',
    textFirst: false,
  },
  {
    id: 'support',
    title: 'ליווי אישי',
    description:
      'לאורך כל הפרויקט עובדים ישירות מול שקד לוי, עם תקשורת ברורה ועדכונים מסודרים עד לעליית האתר לאוויר.',
    textFirst: true,
  },
]

export const TIMELINE_STAGES = ['אפיון', 'עיצוב', 'פיתוח', 'השקה'] as const

export const DETAIL_LABELS = [
  'ריווח',
  'טיפוגרפיה',
  'יישור כפתורים',
  'אייקונים',
  'התאמה לנייד',
] as const

export const TRUST_NOTIFICATIONS = [
  'אפיון אושר',
  'העיצוב מוכן',
  'האתר בפיתוח',
  'האתר עלה לאוויר',
] as const
