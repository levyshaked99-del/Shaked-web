export type FitIconId = 'rocket' | 'growth' | 'network' | 'badge'

export interface FitCardData {
  id: string
  icon: FitIconId
  title: string
  lines: string[]
}

export const FIT_CARDS: FitCardData[] = [
  {
    id: 'starting',
    icon: 'rocket',
    title: 'עסקים בתחילת הדרך',
    lines: [
      'צריכים נוכחות מקצועית',
      'שנותנת ביטחון כבר מהרגע הראשון.',
    ],
  },
  {
    id: 'leads',
    icon: 'growth',
    title: 'עסקים שרוצים יותר פניות',
    lines: [
      'כשהאתר הקיים כבר לא מייצר תוצאות',
      'או לא משקף את רמת העסק.',
    ],
  },
  {
    id: 'referral',
    icon: 'network',
    title: 'עסקים שעובדים מפה לאוזן',
    lines: [
      'ורוצים מקור יציב ועקבי',
      'ללקוחות חדשים.',
    ],
  },
  {
    id: 'premium',
    icon: 'badge',
    title: 'עסקים שרוצים להיראות ברמה גבוהה יותר',
    lines: [
      'כשהמותג כבר התקדם,',
      'אבל האתר נשאר מאחור.',
    ],
  },
]
