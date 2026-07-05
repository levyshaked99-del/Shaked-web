import { useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal } from '../ui/Reveal'
import { AccordionPanel } from './AccordionPanel'
import { FAQ_ITEMS } from './faqData'

interface FaqAccordionProps {
  inView: boolean
}

export function FaqAccordion({ inView }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <div>
      <Reveal variant="blur" className="mb-10 text-center md:mb-12">
        <h3 className="text-[clamp(1.35rem,2.8vw,1.85rem)] font-bold leading-snug tracking-tight text-text">
          שאלות נפוצות
        </h3>
      </Reveal>

      <motion.div
        className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white px-5 py-2 shadow-depth-md md:rounded-[28px] md:px-10 md:py-4 lg:px-12"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <ul className="m-0 p-0" aria-label="שאלות נפוצות">
          {FAQ_ITEMS.map((item, index) => (
            <AccordionPanel
              key={item.id}
              id={item.id}
              label={item.question}
              description={item.answer}
              isOpen={openId === item.id}
              onToggle={() => handleToggle(item.id)}
              index={index}
              inView={inView}
              isLast={index === FAQ_ITEMS.length - 1}
              variant="faq"
            />
          ))}
        </ul>
      </motion.div>
    </div>
  )
}
