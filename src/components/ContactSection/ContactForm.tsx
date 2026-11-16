import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useId, useRef, useState, type FormEvent, type RefObject } from 'react'
import { useNavigate } from 'react-router-dom'
import { WHATSAPP_URL } from '../../constants/contact'
import { fadeUp } from '../../motion/variants'
import { WhatsAppIcon } from './WhatsAppIcon'

const fieldClass =
  'w-full border-0 border-b border-black/[0.08] bg-transparent px-0 py-3.5 text-[0.9375rem] text-text placeholder:text-text/50 transition-colors duration-300 focus:border-brand/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 md:text-base'

type SubmitState = 'idle' | 'submitting' | 'error'

type FieldKey = 'name' | 'phone' | 'email' | 'message'

type FieldErrors = Partial<Record<FieldKey, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateFields(payload: Record<FieldKey, string>): FieldErrors {
  const errors: FieldErrors = {}
  if (!payload.name.trim()) {
    errors.name = 'נא למלא שם מלא.'
  }
  if (!payload.phone.trim()) {
    errors.phone = 'נא למלא מספר טלפון.'
  } else if (payload.phone.replace(/\D/g, '').length < 9) {
    errors.phone = 'נא למלא מספר טלפון תקין.'
  }
  if (!payload.email.trim()) {
    errors.email = 'נא למלא כתובת אימייל.'
  } else if (!EMAIL_PATTERN.test(payload.email.trim())) {
    errors.email = 'נא למלא כתובת אימייל תקינה.'
  }
  if (!payload.message.trim()) {
    errors.message = 'נא לספר קצת על העסק.'
  }
  return errors
}

const FIELD_ORDER: FieldKey[] = ['name', 'phone', 'email', 'message']

export function ContactForm() {
  const navigate = useNavigate()
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const nameId = useId()
  const phoneId = useId()
  const emailId = useId()
  const messageId = useId()
  const companyId = useId()
  const nameErrorId = useId()
  const phoneErrorId = useId()
  const emailErrorId = useId()
  const messageErrorId = useId()

  const nameRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  const fieldRefs: Record<FieldKey, RefObject<HTMLInputElement | HTMLTextAreaElement | null>> = {
    name: nameRef,
    phone: phoneRef,
    email: emailRef,
    message: messageRef,
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage(null)

    const form = event.currentTarget
    const data = new FormData(form)
    const payload = {
      name: String(data.get('name') ?? ''),
      phone: String(data.get('phone') ?? ''),
      email: String(data.get('email') ?? ''),
      message: String(data.get('message') ?? ''),
      company: String(data.get('company') ?? ''),
    }

    const validationErrors = validateFields({
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      message: payload.message,
    })

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors)
      setSubmitState('idle')
      const firstInvalid = FIELD_ORDER.find((key) => validationErrors[key])
      if (firstInvalid) {
        fieldRefs[firstInvalid].current?.focus()
      }
      return
    }

    setFieldErrors({})
    setSubmitState('submitting')

    const controller = new AbortController()
    const timeoutId = window.setTimeout(() => controller.abort(), 25_000)
    let navigated = false

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })

      if (!res.ok) {
        if (res.status === 503) {
          setErrorMessage('שליחת הטופס עדיין לא הוגדרה בשרת. בינתיים אפשר לפנות בוואטסאפ או במייל.')
        } else {
          setErrorMessage('לא הצלחנו לשלוח את הפנייה. נסו שוב או פנו בוואטסאפ.')
        }
        setSubmitState('error')
        return
      }

      navigated = true
      navigate('/thank-you', { replace: true })
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        setErrorMessage('הבקשה ארכה יותר מדי. נסו שוב או פנו בוואטסאפ.')
      } else {
        setErrorMessage('בעיית רשת. בדקו חיבור ונסו שוב, או פנו בוואטסאפ.')
      }
      setSubmitState('error')
    } finally {
      window.clearTimeout(timeoutId)
      if (!navigated) {
        setSubmitState((prev) => (prev === 'submitting' ? 'error' : prev))
      }
    }
  }

  const isSubmitting = submitState === 'submitting'

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
      <div className="sr-only" aria-hidden>
        <label htmlFor={companyId}>Company</label>
        <input id={companyId} type="text" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-7">
        <div>
          <label htmlFor={nameId} className="mb-2 block text-xs font-medium tracking-wide text-muted">
            שם מלא
          </label>
          <input
            ref={nameRef}
            id={nameId}
            type="text"
            name="name"
            required
            disabled={isSubmitting}
            autoComplete="name"
            aria-invalid={fieldErrors.name ? true : undefined}
            aria-describedby={fieldErrors.name ? nameErrorId : undefined}
            onChange={() => fieldErrors.name && setFieldErrors((prev) => ({ ...prev, name: undefined }))}
            className={fieldClass}
          />
          {fieldErrors.name && (
            <p id={nameErrorId} className="mt-2 text-sm font-medium text-text" role="alert">
              {fieldErrors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={phoneId} className="mb-2 block text-xs font-medium tracking-wide text-muted">
            טלפון
          </label>
          <input
            ref={phoneRef}
            id={phoneId}
            type="tel"
            name="phone"
            required
            disabled={isSubmitting}
            autoComplete="tel"
            aria-invalid={fieldErrors.phone ? true : undefined}
            aria-describedby={fieldErrors.phone ? phoneErrorId : undefined}
            onChange={() => fieldErrors.phone && setFieldErrors((prev) => ({ ...prev, phone: undefined }))}
            className={fieldClass}
            dir="ltr"
          />
          {fieldErrors.phone && (
            <p id={phoneErrorId} className="mt-2 text-sm font-medium text-text" role="alert">
              {fieldErrors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={emailId} className="mb-2 block text-xs font-medium tracking-wide text-muted">
            אימייל
          </label>
          <input
            ref={emailRef}
            id={emailId}
            type="email"
            name="email"
            required
            disabled={isSubmitting}
            autoComplete="email"
            aria-invalid={fieldErrors.email ? true : undefined}
            aria-describedby={fieldErrors.email ? emailErrorId : undefined}
            onChange={() => fieldErrors.email && setFieldErrors((prev) => ({ ...prev, email: undefined }))}
            className={fieldClass}
            dir="ltr"
          />
          {fieldErrors.email && (
            <p id={emailErrorId} className="mt-2 text-sm font-medium text-text" role="alert">
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={messageId} className="mb-2 block text-xs font-medium tracking-wide text-muted">
            ספר לי על העסק שלך
          </label>
          <textarea
            ref={messageRef}
            id={messageId}
            name="message"
            required
            disabled={isSubmitting}
            rows={4}
            autoComplete="off"
            aria-invalid={fieldErrors.message ? true : undefined}
            aria-describedby={fieldErrors.message ? messageErrorId : undefined}
            onChange={() => fieldErrors.message && setFieldErrors((prev) => ({ ...prev, message: undefined }))}
            className={`${fieldClass} resize-none leading-relaxed`}
          />
          {fieldErrors.message && (
            <p id={messageErrorId} className="mt-2 text-sm font-medium text-text" role="alert">
              {fieldErrors.message}
            </p>
          )}
        </div>
      </div>

      {submitState === 'error' && errorMessage && (
        <p className="text-sm font-medium leading-relaxed text-text" role="alert">
          {errorMessage}
        </p>
      )}

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3.5">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-depth-md transition-shadow duration-300 hover:shadow-depth-lg disabled:pointer-events-none disabled:opacity-60"
            whileHover={isSubmitting ? undefined : { y: -2 }}
            whileTap={isSubmitting ? undefined : { scale: 0.98 }}
          >
            {isSubmitting ? 'שולח…' : 'שלח פנייה'}
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
          כל פנייה מקבלת מענה אישי.
        </p>
      </div>
    </motion.form>
  )
}
