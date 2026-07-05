export interface WhyUsPrinciple {
  id: string
  number: string
  title: string
  description: string
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
    description: 'מחקר, קהל יעד,\nמתחרים ומטרות.',
  },
  {
    id: 'plan',
    number: '02',
    title: 'מתכננים חוויה',
    description: 'Wireframes,\nמבנה האתר,\nחוויית משתמש.',
  },
  {
    id: 'design',
    number: '03',
    title: 'מעצבים ומפתחים',
    description: 'עיצוב מותאם,\nפיתוח נקי,\nResponsive.',
  },
  {
    id: 'launch',
    number: '04',
    title: 'משיקים וממשיכים',
    description: 'בדיקות,\nאופטימיזציה,\nליווי לאחר העלייה לאוויר.',
  },
]
