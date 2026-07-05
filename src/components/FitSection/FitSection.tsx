import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Reveal } from '../ui/Reveal'
import { SectionShell } from '../ui/SectionShell'
import { FitCard } from './FitCard'
import { FIT_CARDS } from './fitCardsData'

export function FitSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <SectionShell ref={ref} id="fit" tone="bright">
      <Reveal variant="blur" className="text-center">
        <h2 className="mx-auto max-w-[720px] text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.15] tracking-tight text-text">
          האתר הזה נבנה עבור עסקים שרוצים לצמוח.
        </h2>
        <p className="mx-auto mt-6 max-w-[580px] text-base leading-[1.75] text-text/60 md:text-lg">
          לא משנה באיזה תחום אתם עובדים,
          <br className="hidden sm:block" />
          אם האתר שלכם צריך לייצר יותר אמון,
          <br className="hidden md:block" />
          יותר פניות ויותר לקוחות —
          <br className="hidden sm:block" />
          אנחנו כנראה מתאימים.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-2 md:gap-8 lg:mt-24 lg:gap-10">
        {FIT_CARDS.map((card, index) => (
          <FitCard key={card.id} card={card} index={index} inView={inView} />
        ))}
      </div>
    </SectionShell>
  )
}
