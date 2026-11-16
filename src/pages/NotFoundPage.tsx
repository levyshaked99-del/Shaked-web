import { Link } from 'react-router-dom'
import { SiteNav } from '../components/layout/SiteNav'
import { Footer } from '../components/layout/Footer'
import { GrainOverlay } from '../components/ui/GrainOverlay'
import { usePageMeta } from '../hooks/usePageMeta'

export function NotFoundPage() {
  usePageMeta('notFound')

  return (
    <>
      <GrainOverlay />
      <div className="relative min-h-screen bg-white">
        <SiteNav fixed />

        <main
          id="main-content"
          tabIndex={-1}
          className="relative mx-auto flex min-h-[70vh] max-w-[560px] flex-col items-center justify-center px-6 pb-16 pt-28 text-center md:px-10 md:pt-32 lg:px-16"
        >
          <p className="text-xs font-semibold tracking-[0.22em] text-muted">404</p>
          <h1 className="mt-5 text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight text-text">
            הדף לא נמצא
          </h1>
          <p className="mt-5 text-[0.9375rem] leading-[1.85] text-text/65 md:text-base">
            הקישור שביקשתם אינו קיים או הוסר. אפשר לחזור לדף הבית או ליצור קשר.
          </p>
          <nav className="mt-10 flex flex-wrap items-center justify-center gap-3" aria-label="ניווט מהיר">
            <Link
              to="/"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-depth-md transition-shadow duration-300 hover:shadow-depth-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              חזרה לדף הבית
            </Link>
            <Link
              to="/contact"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-black/[0.1] bg-white px-8 py-3.5 text-sm font-semibold text-text shadow-depth-sm transition-colors duration-300 hover:border-black/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              יצירת קשר
            </Link>
          </nav>
        </main>
      </div>
      <Footer showCta={false} />
    </>
  )
}