import {
  CONTACT_EMAIL,
  WHATSAPP_URL,
} from '../../constants/contact'

export {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  WHATSAPP_URL,
  WHATSAPP_URL_SHORT,
} from '../../constants/contact'

export const CONTACT_TIMELINE = [
  { number: '01', title: 'שלח פנייה' },
  { number: '02', title: 'שיחת אפיון' },
  { number: '03', title: 'הצעת מחיר' },
  { number: '04', title: 'יוצאים לדרך' },
] as const

export const CONTACT_INFO = [
  {
    icon: 'phone' as const,
    label: 'שיחת אפיון ללא התחייבות',
    href: WHATSAPP_URL,
    whatsapp: true,
  },
  { icon: 'clock' as const, label: 'מענה אישי' },
  { icon: 'map' as const, label: 'ישראל' },
  {
    icon: 'mail' as const,
    label: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
] as const
