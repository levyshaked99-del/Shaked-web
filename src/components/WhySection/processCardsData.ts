export type ProcessIconId = 'target' | 'compass' | 'sparkles' | 'zap'

export interface ProcessCardData {
  id: string
  icon: ProcessIconId
  title: string
  description: string
}

export const PROCESS_CARDS: ProcessCardData[] = [
  {
    id: 'discover',
    icon: 'target',
    title: 'מבינים את העסק לעומק',
    description:
      'לפני שמעצבים, אנחנו לומדים את העסק, קהל היעד והיתרון שלכם כדי שכל החלטה תהיה מדויקת.',
  },
  {
    id: 'strategy',
    icon: 'compass',
    title: 'בונים אסטרטגיה מדויקת',
    description:
      'מתכננים את מבנה האתר, מסלול המשתמש והתוכן כך שהאתר יעבוד בצורה חכמה וברורה.',
  },
  {
    id: 'design',
    icon: 'sparkles',
    title: 'מעצבים חוויית משתמש',
    description:
      'מעצבים ממשק מודרני, נקי ואינטואיטיבי שמחזק את המותג ויוצר רושם מקצועי.',
  },
  {
    id: 'build',
    icon: 'zap',
    title: 'מפתחים אתר שמייצר תוצאות',
    description:
      'מפתחים אתר מהיר, מאובטח, מותאם למובייל ול-SEO, עם ביצועים גבוהים וחוויית שימוש מצוינת.',
  },
]
