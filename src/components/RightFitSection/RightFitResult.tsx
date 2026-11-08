import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import type { PersonalizedResult } from './rightFitTypes'

interface RightFitResultProps {
  result: PersonalizedResult
  onRestart: () => void
}

const primaryBtn =
  'group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-depth-md transition-shadow duration-300 hover:shadow-depth-lg'

export function RightFitResult({ result, onRestart }: RightFitResultProps) {
  return (
    <div className="space-y-6" role="status" aria-live="polite">
      <div>
        <h3 className="text-[clamp(1.25rem,2.5vw,1.65rem)] font-bold tracking-tight text-text">{result.headline}</h3>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-text/60 md:text-base">{result.description}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link to="/contact" className={primaryBtn}>
          {result.primaryCta}
          <ArrowLeft size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden />
        </Link>
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="text-sm font-medium text-text/45 underline-offset-4 transition-colors duration-300 hover:text-text/70 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-story-purple/35 focus-visible:ring-offset-2"
      >
        התחילו מחדש
      </button>
    </div>
  )
}
