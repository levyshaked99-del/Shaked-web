export type PreviewFit = 'contain' | 'cover'

export interface ProjectPreviewPresentation {
  fit: PreviewFit
  position?: string
  background?: 'white' | 'secondary'
}

export interface ProjectCaseStudy {
  disclaimer: string
  conceptRationale: string
  objectives: readonly string[]
  uxDecisions: readonly string[]
  /** Observable facts only — hosting URL pattern, layout, locale */
  verifiedImplementation?: readonly string[]
}

export interface Project {
  id: string
  number: string
  title: string
  conceptLabel: string
  industryEn: string
  industryLine: string
  /** Short label for hero / legacy imports */
  category: string
  conceptDescription: string
  capabilities: readonly string[]
  href: string
  preview: 'image'
  previewImage: string
  previewPresentation: ProjectPreviewPresentation
  externalUrl: string
  caseStudy: ProjectCaseStudy
  isDemo: true
}

export const PROJECTS: Project[] = [
  {
    id: 'abnei',
    number: '01',
    title: 'אבני',
    conceptLabel: 'CONCEPT PROJECT 01',
    industryEn: 'Construction & Renovation',
    industryLine: 'אתר עסקי לחברת בנייה ושיפוצים',
    category: 'בנייה יוקרתית · שיפוצים',
    conceptDescription:
      'אתר תדמית יוקרתי עם הירו כהה, טיפוגרפיה בולטת ומסלול ברור מהכרת השירותים ועד פנייה להצעת מחיר.',
    capabilities: ['UI/UX Design', 'Web Development', 'Creative Direction'],
    href: 'https://shipotzim.vercel.app/',
    externalUrl: 'https://shipotzim.vercel.app/',
    preview: 'image',
    previewImage: '/projects/abnei.png',
    previewPresentation: { fit: 'contain', position: 'top center', background: 'secondary' },
    isDemo: true,
    caseStudy: {
      disclaimer:
        'פרויקט קונספט ודמו — לא עבודה עבור לקוח אמיתי. תכנים, המלצות ומספרים באתר הדמו הם להמחשה בלבד.',
      conceptRationale:
        'נוכחות דיגיטלית לבנייה יוקרתית צריכה להרגיש מדויקת ויציבה כמו החומרים בפרויקט — לא כמו תבנית שיווקית. הקונספט נשען על צילום אדריכלי חזק ועל מבנה תוכן שקוף.',
      objectives: [
        'לחזק אמון לפני כל שיחת מכירה',
        'להציג תהליך עבודה ושירותים בצורה מסודרת',
        'להניע להצעת מחיר וליצירת קשר',
      ],
      uxDecisions: [
        'הירו עם ניגודיות גבוהה ו-CTA ברור להצעת מחיר',
        'ניווט קצר לפרויקטים, שירותים ותהליך',
        'מסלול גלילה RTL: הוכחה ויזואלית → שקיפות → פנייה',
      ],
      verifiedImplementation: [
        'אתר דמו חי בכתובת shipotzim.vercel.app',
        'פריסה רספונסיבית למובייל ולדסקטופ',
      ],
    },
  },
  {
    id: 'noma',
    number: '02',
    title: 'NOMA',
    conceptLabel: 'CONCEPT PROJECT 02',
    industryEn: 'Interior Design',
    industryLine: 'אתר מותג לסטודיו לעיצוב פנים',
    category: 'עיצוב פנים · תדמית',
    conceptDescription:
      'אתר מותג רגוע עם דגש על צילום, סיפור סטודיו ומסלול שמוביל משיחת היכרות ועד יצירת קשר.',
    capabilities: ['UI/UX Design', 'Web Development', 'Brand Experience'],
    href: 'https://noma-web-zeta.vercel.app/',
    externalUrl: 'https://noma-web-zeta.vercel.app/',
    preview: 'image',
    previewImage: '/projects/noma.png',
    previewPresentation: { fit: 'contain', position: 'top center', background: 'secondary' },
    isDemo: true,
    caseStudy: {
      disclaimer:
        'פרויקט קונספט ודמו. פרסונות, ציטוטים ופרטי קשר באתר הם פיקטיביים למטרות הדגמה.',
      conceptRationale:
        'מותג עיצוב פנים נבנה דרך קצב וחומריות, לא דרך עומס. הקונספט משאיר אוויר לצילום ומחבר בין סטודיו לאופן החיים של הלקוח.',
      objectives: [
        'להציג גישת סטודיו פרימיום ואישית',
        'להסביר תהליך לפני הצגת פרויקטים',
        'להוביל לשיחת היכרות ללא לחץ מסחרי',
      ],
      uxDecisions: [
        'הירו ויזואלי עם טיפוגרפיה שקטה',
        'ציטוטים ומקטעי ערך להנכחת גישה',
        'צעדי תהליך ממוספרים ויצירת קשר בולטת',
      ],
      verifiedImplementation: [
        'אתר דמו חי בכתובת noma-web-zeta.vercel.app',
        'פריסה רספונסיבית למובייל ולדסקטופ',
      ],
    },
  },
]
