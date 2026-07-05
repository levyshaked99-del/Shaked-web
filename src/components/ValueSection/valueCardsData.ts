export interface ValueCardData {
  id: string
  title: string
  description: string[]
}

export const VALUE_CARDS: ValueCardData[] = [
  {
    id: 'trust',
    title: 'בונה אמון',
    description: [
      'לקוחות מחליטים תוך שניות',
      'אם לסמוך על עסק.',
      'אתר מקצועי יוצר רושם חזק',
      'עוד לפני השיחה הראשונה.',
    ],
  },
  {
    id: 'leads',
    title: 'מייצר פניות',
    description: [
      'כל עמוד וכל כפתור',
      'מתוכננים להוביל לפעולה.',
      'המטרה היא לא רק ביקורים —',
      'אלא יותר פניות איכותיות.',
    ],
  },
  {
    id: 'always-on',
    title: 'עובד גם כשאתה לא',
    description: [
      'האתר זמין 24/7.',
      'מציג את השירותים,',
      'הניסיון והיתרונות שלך',
      'בכל שעה ובכל מכשיר.',
    ],
  },
  {
    id: 'growth',
    title: 'צומח עם העסק',
    description: [
      'האתר נבנה לטווח ארוך.',
      'אפשר להרחיב,',
      'לשפר ולהוסיף יכולות',
      'ככל שהעסק גדל.',
    ],
  },
]
