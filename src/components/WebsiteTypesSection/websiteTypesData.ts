export interface WebsiteTypeRow {
  id: string
  number: string
  title: string
  description: string
  price: string
  href: string
}

export const WEBSITE_TYPE_ROWS: WebsiteTypeRow[] = [
  {
    id: 'brand',
    number: '01',
    title: 'אתר תדמית',
    description: 'לעסקים שרוצים נוכחות מקצועית.',
    price: '₪2,900+',
    href: '/services/brand',
  },
  {
    id: 'landing',
    number: '02',
    title: 'דף נחיתה',
    description: 'לקמפיינים ולמכירות.',
    price: '₪1,900+',
    href: '/services/landing',
  },
  {
    id: 'premium',
    number: '03',
    title: 'אתר פרימיום',
    description: 'לעסקים שרוצים חוויית משתמש יוצאת דופן.',
    price: '₪4,900+',
    href: '/services/premium',
  },
]
