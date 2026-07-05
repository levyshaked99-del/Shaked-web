import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Reveal } from '../ui/Reveal'
import { SectionShell } from '../ui/SectionShell'
import { ValueCard } from './ValueCard'
import { ValueClosing } from './ValueClosing'
import { VALUE_CARDS } from './valueCardsData'

export function ValueSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <SectionShell ref={ref} id="value" tone="soft">
      <Reveal variant="blur" className="text-center">
        <h2 className="mx-auto max-w-[680px] text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.15] tracking-tight text-text">
          אתר הוא לא רק כרטיס ביקור.
        </h2>
        <p className="mx-auto mt-5 max-w-[540px] text-base leading-[1.7] text-text/60 md:text-lg">
          הוא כלי שעוזר לעסק שלך לצמוח,
          <br className="hidden sm:block" />
          לבנות אמון ולהפוך יותר מבקרים ללקוחות.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-7 md:mt-20 md:grid-cols-2 md:gap-8 lg:mt-24 lg:gap-10">
        {VALUE_CARDS.map((card, index) => (
          <ValueCard key={card.id} card={card} index={index} inView={inView} />
        ))}
      </div>

      <ValueClosing inView={inView} />
    </SectionShell>
  )
}
