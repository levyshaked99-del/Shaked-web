export interface Project {
  id: string
  number: string
  title: string
  category: string
  description: string
  href: string
  preview: 'image'
  previewImage: string
  externalUrl: string
  isDemo: true
}

export const PROJECTS: Project[] = [
  {
    id: 'abnei',
    number: '01',
    title: 'אבני – בנייה יוקרתית ושיפוצים',
    category: 'בנייה · שיפוצים',
    description:
      'אתר תדמית יוקרתי לחברת בנייה ושיפוצים. עיצוב פרימיום, חוויית משתמש מודרנית, הירו מרשים והתאמה מלאה למובייל.',
    href: 'https://shipotzim.vercel.app/',
    externalUrl: 'https://shipotzim.vercel.app/',
    preview: 'image',
    previewImage: '/projects/abnei-shipotzim.png',
    isDemo: true,
  },
  {
    id: 'katana',
    number: '02',
    title: 'Katana',
    category: 'עיצוב אתרים · דף נחיתה פרימיום',
    description:
      'אתר תדמית מודרני עם עיצוב נקי, אנימציות חלקות וחוויית משתמש ממוקדת המרה. נבנה בדגש על ביצועים, קריאות ועיצוב מקצועי.',
    href: 'https://katana-eosin.vercel.app/',
    externalUrl: 'https://katana-eosin.vercel.app/',
    preview: 'image',
    previewImage: '/projects/katana.png',
    isDemo: true,
  },
  {
    id: 'astoria-estates',
    number: '03',
    title: 'Astoria Estates',
    category: 'נדל״ן · יוקרה',
    description:
      'אתר נדל"ן יוקרתי עם שפה ויזואלית פרימיום, טיפוגרפיה אלגנטית, אנימציות חלקות וחוויית משתמש מודרנית המותאמת למותגי יוקרה.',
    href: 'https://astoria-estates-bice.vercel.app/',
    externalUrl: 'https://astoria-estates-bice.vercel.app/',
    preview: 'image',
    previewImage: '/projects/astoria-estates.png',
    isDemo: true,
  },
]
