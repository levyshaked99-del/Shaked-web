export const SITE_NAME = 'שקד לוי · אתרים למעצבי פנים ושיפוצים'

export const DEFAULT_DESCRIPTION =
  'אתרים למעצבי פנים, אדריכלים וקבלני שיפוצים. אתר תיק עבודות שמציג את הפרויקטים שלכם ברמה שמגיעה להם. הדמיה של דף הבית בחינם.'

export const PAGE_SEO = {
  home: {
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
  },
  about: {
    title: 'אודות — שקד לוי',
    description: 'הכירו את שקד לוי — בונה אתרים לעסקים שרוצים להיראות מקצועיים, לבנות אמון ולהפוך מבקרים ללקוחות.',
  },
  projects: {
    title: 'פרויקטים — שקד לוי',
    description:
      'מבחר פרויקטי קונספט עם אתר חי — אסטרטגיה, עיצוב חוויית משתמש ופיתוח: בנייה ועיצוב פנים.',
  },
  contact: {
    title: 'יצירת קשר — שקד לוי',
    description: 'צרו קשר לתיאום פגישת אפיון ללא התחייבות. בואו נדבר על הפרויקט הבא שלכם.',
  },
  services: {
    title: 'שירותים — שקד לוי',
    description: 'גלו את סוגי האתרים, החבילות והשירותים — מסודרים וברורים, כדי שתוכלו לבחור את הפתרון המתאים לעסק.',
  },
  serviceBrand: {
    title: 'אתר תדמית — שקד לוי',
    description: 'אתר תדמית מקצועי לעסקים — עיצוב בהתאמה אישית, SEO בסיסי וליווי מלא.',
  },
  serviceLanding: {
    title: 'דף נחיתה — שקד לוי',
    description: 'דף נחיתה ממוקד המרה לקמפיינים, פרסום ומכירת שירותים.',
  },
  servicePremium: {
    title: 'אתר פרימיום — שקד לוי',
    description: 'אתר פרימיום עם עיצוב ייחודי, אנימציות וחוויית משתמש מתקדמת.',
  },
  accessibility: {
    title: 'הצהרת נגישות — שקד לוי',
    description: 'הצהרת נגישות האתר בהתאם לתקן הישראלי ת"י 5568 ו-WCAG 2.1 ברמה AA.',
  },
} as const

export type PageSeoKey = keyof typeof PAGE_SEO
