export type WhyUsIconId = 'search' | 'lightbulb' | 'pen' | 'rocket'

export interface WhyUsPrinciple {
  id: string
  number: string
  title: string
  description: string
  highlights: [string, string, string]
  icon: WhyUsIconId
  /** Accessible description of the CSS stage illustration */
  illustrationAlt: string
}

export const WHY_US_EYEBROW = 'הגישה שלנו'

export const WHY_US_HEADLINE = 'לפני שמעצבים אתר,\nמבינים את העסק.'

export const WHY_US_PARAGRAPH =
  'כל אתר מתחיל בהבנת העסק, ממשיך בתכנון מדויק ומסתיים בחוויה שבונה אמון ומובילה לפעולה.'

export const WHY_US_PRINCIPLES: WhyUsPrinciple[] = [
  {
    id: 'understand',
    number: '01',
    title: 'מבינים את העסק',
    description:
      'מחקר, ניתוח קהל יעד ומתחרים כדי לבנות אסטרטגיה מדויקת לאתר שמייצר תוצאות.',
    highlights: ['מחקר ומיפוי', 'קהל יעד', 'מטרות עסקיות'],
    icon: 'search',
    illustrationAlt: 'מחקר והבנת העסק — קהל יעד, מתחרים ומטרות',
  },
  {
    id: 'plan',
    number: '02',
    title: 'מתכננים חוויה',
    description:
      'ארכיטקטורת מידע, מסעות משתמש ואפיון מדויק שמוביל את הגולשים בדרך הנכונה.',
    highlights: ['ארכיטקטורת מידע', 'מסעות משתמש', 'Wireframes'],
    icon: 'lightbulb',
    illustrationAlt: 'תכנון חוויה — wireframes, מבנה האתר ו-UX',
  },
  {
    id: 'design',
    number: '03',
    title: 'מעצבים ומפתחים',
    description:
      'עיצוב מודרני, נקי ומותאם למותג, ופיתוח חוויה מהירה, נגישה וקלה לניהול.',
    highlights: ['מערכת עיצוב', 'פיתוח נקי', 'רספונסיביות'],
    icon: 'pen',
    illustrationAlt: 'עיצוב ופיתוח — מערכת עיצוב, מסכים רספונסיביים',
  },
  {
    id: 'launch',
    number: '04',
    title: 'משיקים וממשיכים',
    description:
      'בדיקות איכות, השקה חלקה וליווי מתמשך עם מדידה, שיפור ועדכונים.',
    highlights: ['בדיקות איכות', 'השקה חלקה', 'מדידה ושיפור'],
    icon: 'rocket',
    illustrationAlt: 'השקה וליווי — בדיקות, ביצועים ונגישות',
  },
]
