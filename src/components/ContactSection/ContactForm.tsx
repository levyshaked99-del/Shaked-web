import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useId, useState, type FormEvent } from 'react'
import { WHATSAPP_URL } from '../../constants/contact'
import { EASE_PREMIUM } from '../../motion/easing'
import { fadeUp } from '../../motion/variants'
import { WhatsAppIcon } from './WhatsAppIcon'

const fieldClass =
  'w-full border-0 border-b border-black/[0.08] bg-transparent px-0 py-3.5 text-[0.9375rem] text-text placeholder:text-text/50 transition-colors duration-300 focus:border-brand/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 md:text-base'

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const nameId = useId()
  const phoneId = useId()
  const emailId = useId()
  const messageId = useId()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        className="flex min-h-[420px] flex-col justify-center py-8"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: EASE_PREMIUM }}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-tight text-text">
          תודה על הפנייה.
        </h2>
        <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-text/60 md:text-base">
          קיבלתי את ההודעה ואחזור אליך תוך 24 שעות לתיאום שיחת אפיון.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-8"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      aria-label="טופס יצירת קשר"
      noValidate
    >
      <div className="space-y-7">
        <div>
          <label htmlFor={nameId} className="mb-2 block text-xs font-medium tracking-wide text-muted">
            שם מלא
          </label>
          <input
            id={nameId}
            type="text"
            name="name"
            required
            autoComplete="name"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor={phoneId} className="mb-2 block text-xs font-medium tracking-wide text-muted">
            טלפון
          </label>
          <input
            id={phoneId}
            type="tel"
            name="phone"
            required
            autoComplete="tel"
            className={fieldClass}
            dir="ltr"
          />
        </div>

        <div>
          <label htmlFor={emailId} className="mb-2 block text-xs font-medium tracking-wide text-muted">
            אימייל
          </label>
          <input
            id={emailId}
            type="email"
            name="email"
            required
            autoComplete="email"
            className={fieldClass}
            dir="ltr"
          />
        </div>

        <div>
          <label htmlFor={messageId} className="mb-2 block text-xs font-medium tracking-wide text-muted">
            ספר לי על העסק שלך
          </label>
          <textarea
            id={messageId}
            name="message"
            required
            rows={4}
            autoComplete="off"
            className={`${fieldClass} resize-none leading-relaxed`}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3.5">
          <motion.button
            type="submit"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-depth-md transition-shadow duration-300 hover:shadow-depth-lg"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            שלח פנייה
            <ArrowLeft
              size={14}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
              aria-hidden
            />
          </motion.button>

          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="דברו איתי בוואטסאפ — נפתח בחלון חדש"
            className="group inline-flex items-center gap-2 rounded-full border border-black/[0.1] bg-white px-7 py-3.5 text-sm font-medium text-text/75 shadow-depth-sm transition-all duration-300 hover:border-[#4D7C5F]/25 hover:text-text hover:shadow-glow-green-soft"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <WhatsAppIcon size={15} className="text-[#5C8A6E]/70 transition-colors duration-300 group-hover:text-[#4D7C5F]" />
            או דברו איתי בוואטסאפ
          </motion.a>
        </div>

        <p className="text-xs leading-relaxed text-muted">
          כל פנייה מקבלת מענה אישי תוך 24 שעות.
        </p>
      </div>
    </motion.form>
  )
}
