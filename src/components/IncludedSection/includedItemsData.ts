export type IncludedBadge = 'included' | 'free' | 'recommended' | 'popular'

export interface IncludedItem {
  id: string
  label: string
  description: string
  badge?: IncludedBadge
}

export const INCLUDED_ITEMS: IncludedItem[] = [
  {
    id: 'brief',
    label: 'אפיון העסק',
    description:
      'נלמד את העסק, קהל היעד והמטרות לפני תחילת העבודה.',
  },
  {
    id: 'design',
    label: 'עיצוב מותאם אישית',
    description:
      'כל אתר מעוצב במיוחד עבור העסק שלכם. ללא תבניות מוכנות.',
    badge: 'included',
  },
  {
    id: 'seo',
    label: 'SEO בסיסי',
    description: 'מבנה אתר תקין למנועי חיפוש. (לא קידום אורגני מלא.)',
    badge: 'included',
  },
  {
    id: 'domain',
    label: 'דומיין',
    description:
      'הדומיין נרכש ונמצא בבעלות הלקוח. אנחנו דואגים לחיבור ולהגדרה כחלק מהפרויקט, אך עלות רכישת הדומיין וחידושו השנתי משולמת ישירות על ידי הלקוח.',
  },
  {
    id: 'hosting',
    label: 'אחסון',
    description:
      'האתר יעלה לאוויר על תשתית מהירה ומאובטחת. הלקוח משלם על שירות האחסון. אנחנו מבצעים את כל ההגדרות.',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    description: 'כפתור WhatsApp מחובר ישירות לעסק.',
  },
  {
    id: 'form',
    label: 'טופס יצירת קשר',
    description: 'טופס מקצועי המחובר לאימייל.',
  },
  {
    id: 'revisions',
    label: 'עד 3 סבבי תיקונים',
    description: 'כולל עד שלושה סבבי שינויים כחלק מהפרויקט.',
    badge: 'included',
  },
  {
    id: 'warranty',
    label: '30 ימי אחריות',
    description: 'לאחר העלייה לאוויר.',
    badge: 'free',
  },
]

export const BADGE_LABELS: Record<IncludedBadge, string> = {
  included: 'כלול',
  free: 'ללא עלות נוספת',
  recommended: 'מומלץ',
  popular: 'פופולרי',
}

export const ROW_STAGGER = 0.08
export const ROW_ANIM_DURATION = 0.5
