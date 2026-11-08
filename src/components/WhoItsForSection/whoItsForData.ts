export interface WhoItsForAudience {
  id: string
  title: string
  description: string
  imageSrc: string
  imageAlt: string
}

export const WHO_ITS_FOR_EYEBROW = "WHO IT'S FOR"

export const WHO_ITS_FOR_HEADLINE = 'אתרים שמדברים בשפת העיצוב, האדריכלות והביצוע.'

export const WHO_ITS_FOR_SUPPORTING =
  'אנחנו מביאים התמחות וניסיון מעולמות העיצוב, האדריכלות והשיפוצים — ויוצרים פתרונות דיגיטליים לעסקים שרוצים לקחת את הנוכחות שלהם קדימה.'

export const WHO_ITS_FOR_AUDIENCES: WhoItsForAudience[] = [
  {
    id: 'interior',
    title: 'מעצבי פנים',
    description: 'סטודיואים ומעצבים שמציגים שפה ויזואלית, פרויקטים ותהליך עבודה.',
    imageSrc: '/images/who-its-for/interior.jpg',
    imageAlt: 'סלון מעוצב עם ריהוט ניטרלי ותאורה טבעית — עיצוב פנים',
  },
  {
    id: 'architecture',
    title: 'אדריכלים',
    description: 'משרדים שצריכים אתר שמשקף תכנון, דיוק ורמת ביצוע גבוהה.',
    imageSrc: '/images/who-its-for/architecture.jpg',
    imageAlt: 'חזית מבנה מודרני עם קווים גאומטריים — אדריכלות',
  },
  {
    id: 'renovation',
    title: 'קבלנים וחברות שיפוצים',
    description: 'עסקים שמציגים אמינות, היקפים והוכחות עבודה בשטח.',
    imageSrc: '/images/who-its-for/renovation.jpg',
    imageAlt: 'צוות בטיחות באתר בנייה עם רשתות ברזל — שיפוצים ובנייה',
  },
  {
    id: 'building-design',
    title: 'בנייה ועיצוב',
    description: 'חברות שמשלבות בנייה, פיתוח או מוצר עם זהות מקצועית ברורה.',
    imageSrc: '/images/who-its-for/building-design.jpg',
    imageAlt: 'מרחב משרדי מודרני עם חומרים ותאורה מעוצבים — בנייה ועיצוב',
  },
]
