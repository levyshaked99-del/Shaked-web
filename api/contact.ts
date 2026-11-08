import type { VercelRequest, VercelResponse } from '@vercel/node'

const MAX = { name: 120, phone: 40, email: 254, message: 4000 } as const

function trim(value: unknown, max: number): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= MAX.email
}

async function sendEmail(payload: {
  name: string
  phone: string
  email: string
  message: string
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_NOT_CONFIGURED')

  const to = process.env.CONTACT_TO_EMAIL || 'shakedlevy007@gmail.com'
  const from = process.env.RESEND_FROM || 'פנייה מהאתר <onboarding@resend.dev>'
  const subject = `פנייה חדשה מהאתר — ${payload.name}`
  const html = `
    <p><strong>שם:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>טלפון:</strong> ${escapeHtml(payload.phone)}</p>
    <p><strong>אימייל:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>הודעה:</strong></p>
    <p>${escapeHtml(payload.message).replace(/\n/g, '<br>')}</p>
  `.trim()

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to: [to], reply_to: payload.email, subject, html }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`RESEND_FAILED:${res.status}:${detail.slice(0, 200)}`)
  }
}

async function appendNotion(payload: {
  name: string
  phone: string
  email: string
  message: string
}): Promise<void> {
  const token = process.env.NOTION_TOKEN
  const databaseId = process.env.NOTION_DATABASE_ID
  if (!token || !databaseId) return

  const titleKey = process.env.NOTION_TITLE_PROP || 'Name'
  const emailKey = process.env.NOTION_EMAIL_PROP || 'Email'
  const phoneKey = process.env.NOTION_PHONE_PROP || 'Phone'
  const messageKey = process.env.NOTION_MESSAGE_PROP || 'Message'

  const properties: Record<string, unknown> = {
    [titleKey]: { title: [{ text: { content: payload.name } }] },
    [emailKey]: { email: payload.email },
    [phoneKey]: { rich_text: [{ text: { content: payload.phone } }] },
    [messageKey]: { rich_text: [{ text: { content: payload.message } }] },
  }

  const res = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ parent: { database_id: databaseId }, properties }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`NOTION_FAILED:${res.status}:${detail.slice(0, 200)}`)
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'method_not_allowed' })
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body

  if (body?.company) {
    return res.status(200).json({ ok: true })
  }

  const name = trim(body?.name, MAX.name)
  const phone = trim(body?.phone, MAX.phone)
  const email = trim(body?.email, MAX.email)
  const message = trim(body?.message, MAX.message)

  if (!name || !phone || !email || !message || !isValidEmail(email)) {
    return res.status(400).json({ error: 'invalid_payload' })
  }

  const payload = { name, phone, email, message }

  const hasResend = Boolean(process.env.RESEND_API_KEY)
  const hasNotion = Boolean(process.env.NOTION_TOKEN && process.env.NOTION_DATABASE_ID)

  if (!hasResend && !hasNotion) {
    return res.status(503).json({ error: 'not_configured' })
  }

  const errors: string[] = []

  if (hasResend) {
    try {
      await sendEmail(payload)
    } catch (e) {
      errors.push(e instanceof Error ? e.message : 'email_failed')
    }
  }

  if (hasNotion) {
    try {
      await appendNotion(payload)
    } catch (e) {
      errors.push(e instanceof Error ? e.message : 'notion_failed')
    }
  }

  if (errors.length > 0 && (!hasResend || errors.some((m) => m.startsWith('RESEND')))) {
    if (hasNotion && !errors.some((m) => m.startsWith('NOTION'))) {
      return res.status(200).json({ ok: true, partial: true })
    }
    return res.status(502).json({ error: 'delivery_failed' })
  }

  return res.status(200).json({ ok: true })
}
