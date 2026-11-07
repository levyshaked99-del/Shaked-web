export const ACCENT_STYLES = {
  purple: {
    badge: 'border-story-purple/10 bg-story-purple-soft/50 text-story-purple/70',
    subtitle: 'text-story-purple/55',
    button:
      'border-black/[0.08] text-text/60 hover:border-story-purple/30 hover:bg-story-purple-soft/40 hover:text-text/80',
  },
  blue: {
    badge: 'border-story-blue/10 bg-story-blue-soft/50 text-story-blue/70',
    subtitle: 'text-story-blue/55',
    button:
      'border-black/[0.08] text-text/60 hover:border-story-blue/30 hover:bg-story-blue-soft/40 hover:text-text/80',
  },
  gold: {
    badge: 'border-black/[0.06] bg-secondary text-text/50',
    subtitle: 'text-text/45',
    button:
      'border-black/[0.1] text-text/65 hover:border-black/[0.2] hover:bg-text hover:text-white',
  },
} as const

export type WebsiteTypeAccent = keyof typeof ACCENT_STYLES

export interface WebsiteTypeCardData {
  id: string
  accent: WebsiteTypeAccent
  previewImage: string
  badge: string
  title: string
  subtitle: string
  description: string
  href: string
}

export const WEBSITE_TYPES_INTRO = {
  label: 'איזה פתרון מתאים לעסק שלך?',
  heading: 'לכל עסק יש מטרה שונה.\nבוא נבחר את האתר שמתאים לך.',
} as const

export const WEBSITE_TYPE_CARDS: WebsiteTypeCardData[] = [
  {
    id: 'landing',
    accent: 'purple',
    previewImage: '/images/services/landing-preview.webp',
    badge: 'אני רוצה',
    title: 'לקבל יותר פניות',
    subtitle: 'Landing Page',
    description:
      'עמוד ממוקד שנבנה כדי להמיר מבקרים לפניות. מתאים לעסקים שמריצים פרסום ורוצים מקסימום תוצאות.',
    href: '/services/landing',
  },
  {
    id: 'business',
    accent: 'blue',
    previewImage: '/images/services/business-preview.webp',
    badge: 'אני רוצה',
    title: 'להציג את העסק שלי',
    subtitle: 'Business Website',
    description:
      'אתר שמציג את העסק, השירותים, העבודות, ויוצר אמון מול לקוחות חדשים.',
    href: '/services/brand',
  },
  {
    id: 'premium',
    accent: 'gold',
    previewImage: '/images/services/premium-preview.webp',
    badge: 'אני צריך',
    title: 'פתרון ייחודי לעסק שלי',
    subtitle: 'Premium Website',
    description:
      'פתרון בהתאמה אישית לעסקים שרוצים חוויית משתמש יוצאת דופן, פונקציונליות מתקדמת ועיצוב ברמה הגבוהה ביותר.',
    href: '/services/premium',
  },
]
