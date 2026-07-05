import type { LucideIcon } from 'lucide-react'
import {
  Clock,
  Globe,
  Link2,
  Mail,
  MessageCircle,
  Palette,
  Phone,
  Search,
  Share2,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  User,
  UserPlus,
  Database,
  FolderOpen,
  Layers,
  DollarSign,
  Images,
  MousePointer2,
  Send,
} from 'lucide-react'

export interface GrowthOrbitCard {
  label: string
  icon: LucideIcon
}

export interface GrowthFeature {
  label: string
  icon: LucideIcon
}

export interface WebsiteGrowthBenefit {
  id: string
  number: string
  showcaseHeadline: string
  description: string
  hubLabel: string
  hubSubtitle: string
  cards: GrowthOrbitCard[]
  features: GrowthFeature[]
}

export const WEBSITE_GROWTH_BADGE = 'חלק מהערך שאתם מקבלים'

export const WEBSITE_GROWTH_BENEFITS: WebsiteGrowthBenefit[] = [
  {
    id: 'always-on',
    number: '01',
    showcaseHeadline: 'אתר שעובד בשבילך, גם כשאתה לא.',
    description:
      'אתר מקצועי מאפשר ללקוחות להכיר את העסק, להבין את הערך ולהשאיר פנייה — בכל שעה, גם כשאתה לא זמין.',
    hubLabel: '24/7',
    hubSubtitle: 'האתר עובד בשבילך',
    cards: [
      { label: 'מבקר נכנס', icon: User },
      { label: 'יוצר אמון', icon: Shield },
      { label: 'נשלחת פנייה', icon: Send },
      { label: 'העסק צומח', icon: TrendingUp },
    ],
    features: [
      { label: 'עובד 24/7', icon: Clock },
      { label: 'מייצר יותר פניות', icon: UserPlus },
      { label: 'בונה אמון', icon: Shield },
      { label: 'חושף את העסק ללקוחות חדשים', icon: Globe },
    ],
  },
  {
    id: 'hub',
    number: '02',
    showcaseHeadline: 'הלקוח מקבל את כל המידע במקום אחד.',
    description:
      'שירותים, מחירים, עבודות ודרכי התקשרות — הכל מסודר באתר אחד ברור, נגיש וקל לניווט.',
    hubLabel: 'All in One',
    hubSubtitle: 'הכל במקום אחד',
    cards: [
      { label: 'שירותים', icon: Layers },
      { label: 'מחירים', icon: DollarSign },
      { label: 'גלריה', icon: Images },
      { label: 'יצירת קשר', icon: Phone },
    ],
    features: [
      { label: 'מידע מרוכז', icon: Layers },
      { label: 'חוויה ברורה', icon: MousePointer2 },
      { label: 'פחות בלבול', icon: Shield },
      { label: 'יותר פניות', icon: UserPlus },
    ],
  },
  {
    id: 'differentiation',
    number: '03',
    showcaseHeadline: 'מבדיל אותך מהמתחרים.',
    description:
      'כשלקוחות משווים בין עסקים, אתר מקצועי יוצר רושם ראשוני חזק ומציב אותך כבחירה הראשונה.',
    hubLabel: 'Unique',
    hubSubtitle: 'בולט מהשאר',
    cards: [
      { label: 'עיצוב', icon: Palette },
      { label: 'מיתוג', icon: Sparkles },
      { label: 'אמון', icon: Shield },
      { label: 'חוויה', icon: MousePointer2 },
    ],
    features: [
      { label: 'עיצוב ייחודי', icon: Palette },
      { label: 'מיתוג מדויק', icon: Sparkles },
      { label: 'אמון מיידי', icon: Shield },
      { label: 'חוויה פרימיום', icon: MousePointer2 },
    ],
  },
  {
    id: 'enquiries',
    number: '04',
    showcaseHeadline: 'מייצר פניות בצורה מסודרת.',
    description:
      'טפסים, WhatsApp ומייל — כל פנייה מגיעה למקום הנכון, בצורה ברורה ונוחה לניהול.',
    hubLabel: 'Leads',
    hubSubtitle: 'פניות מסודרות',
    cards: [
      { label: 'טופס', icon: Mail },
      { label: 'WhatsApp', icon: MessageCircle },
      { label: 'מייל', icon: Send },
      { label: 'CRM', icon: Database },
    ],
    features: [
      { label: 'טפסי יצירת קשר', icon: Mail },
      { label: 'WhatsApp', icon: MessageCircle },
      { label: 'מעקב פניות', icon: Database },
      { label: 'תגובה מהירה', icon: Clock },
    ],
  },
  {
    id: 'channels',
    number: '05',
    showcaseHeadline: 'חושף את העסק ללקוחות חדשים.',
    description:
      'גוגל, רשתות חברתיות, קישורים והמלצות — האתר נותן לכל מקור מסגרת מקצועית להמיר מבקרים.',
    hubLabel: 'Reach',
    hubSubtitle: 'נראות רחבה',
    cards: [
      { label: 'Google', icon: Search },
      { label: 'Facebook', icon: Share2 },
      { label: 'קישור', icon: Link2 },
      { label: 'המלצות', icon: Star },
    ],
    features: [
      { label: 'נוכחות בגוגל', icon: Search },
      { label: 'שיתוף ברשתות', icon: Share2 },
      { label: 'קישורים חיצוניים', icon: Link2 },
      { label: 'המלצות לקוחות', icon: Star },
    ],
  },
  {
    id: 'trust',
    number: '06',
    showcaseHeadline: 'בונה אמון כבר מהרגע הראשון.',
    description:
      'עוד לפני השיחה, הלקוח רואה עבודות, שירותים וביקורות — ומרגיש בטוח יותר לבחור בך.',
    hubLabel: 'Trust',
    hubSubtitle: 'אמון מהרגע הראשון',
    cards: [
      { label: 'ביקורות', icon: Star },
      { label: 'פרויקטים', icon: FolderOpen },
      { label: 'שירותים', icon: Layers },
      { label: 'יצירת קשר', icon: Phone },
    ],
    features: [
      { label: 'ביקורות ודירוגים', icon: Star },
      { label: 'תיק עבודות', icon: FolderOpen },
      { label: 'שקיפות מלאה', icon: Shield },
      { label: 'מוכנות לפנייה', icon: UserPlus },
    ],
  },
]
