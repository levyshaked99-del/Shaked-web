const WHATSAPP_PHONE = '972585812518'

export const WHATSAPP_PREFILL_MESSAGE = 'היי שקד, אשמח לקבל הדמיה של דף הבית לעסק שלי'

const encodedWhatsAppText = encodeURIComponent(WHATSAPP_PREFILL_MESSAGE)

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedWhatsAppText}`

export const WHATSAPP_URL_SHORT = WHATSAPP_URL

export const CONTACT_EMAIL = 'shakedlevy007@gmail.com'
export const CONTACT_PHONE = '058-581-2518'
export const CONTACT_PHONE_HREF = 'tel:+972585812518'
