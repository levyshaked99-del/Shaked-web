export interface ValuePillar {
  id: string
  title: string
  whisper: string
}

export const VALUE_HEADLINE = 'תמורה שעולה בבירור על ההשקעה.'
export const VALUE_SUBLINE =
  'משלמים על מה שבאמת מקדם את העסק — לא על רעש, לא על תבניות, לא על מה שלא משרת אתכם.'

export const VALUE_PILLARS: ValuePillar[] = [
  {
    id: 'design',
    title: 'עיצוב בהתאמה אישית',
    whisper: 'כל פרויקט נולד מאפס, בהתאם למותג ולקהל.',
  },
  {
    id: 'dev',
    title: 'פיתוח מודרני וביצועים גבוהים',
    whisper: 'מהיר, יציב ומוכן לצמיחה.',
  },
  {
    id: 'seo',
    title: 'SEO בסיסי מובנה',
    whisper: 'מבנה נכון למנועי חיפוש מהיום הראשון.',
  },
  {
    id: 'comms',
    title: 'תקשורת ישירה',
    whisper: 'ליווי אישי לאורך כל הפרויקט.',
  },
  {
    id: 'value',
    title: 'תמורה גבוהה למחיר',
    whisper: 'יותר ערך ממה שמשלמים.',
  },
  {
    id: 'warranty',
    title: '30 ימי אחריות',
    whisper: 'שקט נפשי לאחר ההשקה.',
  },
]
