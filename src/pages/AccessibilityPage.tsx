import { SiteNav } from '../components/layout/SiteNav'
import { Footer } from '../components/layout/Footer'
import { GrainOverlay } from '../components/ui/GrainOverlay'
import { CONTACT_EMAIL } from '../constants/contact'
import { usePageMeta } from '../hooks/usePageMeta'

const SECTIONS = [
  {
    title: 'מחויבות לנגישות',
    paragraphs: [
      'אנו מחויבים להנגיש את האתר לאנשים עם מוגבלות, על מנת לאפשר לכל אדם גישה שוויונית לתוכן ולשירותים המוצעים בו.',
      'האתר פותח בהתאם לתקן הישראלי ת"י 5568 לנגישות תכנים באינטרנט ברמת AA, ובהתאם להנחיות WCAG 2.1 ברמה AA.',
    ],
  },
  {
    title: 'התאמות שבוצעו באתר',
    paragraphs: [
      'מבנה סמנטי ברור עם כותרות, אזורי תוכן וניווט.',
      'תמיכה מלאה בכיווניות RTL ובשפה העברית.',
      'ניווט מלא באמצעות מקלדת, כולל תפריט נייד.',
      'סימון פוקוס ברור לכל רכיבי האינטראקציה.',
      'תמיכה בהעדפת reduced motion של המערכת.',
      'טפסים עם תוויות, שדות חובה ומשוב נגיש.',
      'קישור "דלג לתוכן" בתחילת כל עמוד.',
    ],
  },
  {
    title: 'תאימות דפדפנים וטכנולוגיות',
    paragraphs: [
      'האתר נבדק בדפדפנים מודרניים: Chrome, Firefox, Safari ו-Edge.',
      'האתר תומך בקוראי מסך נפוצים, כולל VoiceOver ו-NVDA.',
      'האתר מותאם לשימוש במכשירים ניידים ובמחשב שולחני.',
    ],
  },
  {
    title: 'מגבלות ידועות',
    paragraphs: [
      'אנימציות תצוגה בדף הבית עשויות להיות מופחתות כאשר מופעלת העדפת reduced motion, אך חלק מהתוכן הוויזואלי נשאר דекורטיבי.',
      'אנו ממשיכים לשפר את הנגישות באופן שוטף.',
    ],
  },
  {
    title: 'יצירת קשר בנושא נגישות',
    paragraphs: [
      'אם נתקלתם בבעיית נגישות באתר, נשמח לקבל פנייה ולטפל בה בהקדם.',
      'אנו מתחייבים להשיב לפניות נגישות תוך 5 ימי עסקים.',
    ],
    email: true,
  },
] as const

export function AccessibilityPage() {
  usePageMeta('accessibility')

  return (
    <>
      <GrainOverlay />
      <div className="relative bg-white">
        <SiteNav fixed />

        <main id="main-content" className="relative mx-auto max-w-[760px] px-6 pb-16 pt-28 md:px-10 md:pt-32 lg:px-16 lg:pt-36">
          <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-extrabold leading-tight tracking-tight text-text">
            הצהרת נגישות
          </h1>
          <p className="mt-4 text-sm text-muted">עודכן לאחרונה: יוני 2026</p>

          <div className="mt-12 space-y-12">
            {SECTIONS.map((section) => (
              <section key={section.title} aria-labelledby={`a11y-${section.title}`}>
                <h2
                  id={`a11y-${section.title}`}
                  className="text-xl font-bold tracking-tight text-text"
                >
                  {section.title}
                </h2>
                <div className="mt-4 space-y-3">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-[0.9375rem] leading-[1.85] text-text/65 md:text-base">
                      {paragraph}
                    </p>
                  ))}
                  {'email' in section && section.email && (
                    <p className="text-[0.9375rem] leading-[1.85] text-text/65 md:text-base">
                      ניתן לפנות אלינו בדוא&quot;ל:{' '}
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="text-text underline decoration-text/25 underline-offset-2 transition-colors hover:decoration-text/50"
                        dir="ltr"
                      >
                        {CONTACT_EMAIL}
                      </a>
                    </p>
                  )}
                </div>
              </section>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}
