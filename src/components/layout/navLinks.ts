import type { MouseEvent } from 'react'
import type { NavigateFunction } from 'react-router-dom'
import { WHATSAPP_URL } from '../../constants/contact'

export const HOME_NAV_HREF = '/#hero'
export const WHY_US_NAV_HREF = '/#why-us'
export const SERVICES_NAV_HREF = '/services'

export const DESKTOP_NAV_LINKS = [
  { label: 'ראשי', href: HOME_NAV_HREF },
  { label: 'שירותים', href: SERVICES_NAV_HREF },
  { label: 'פרויקטים', href: '/projects' },
  { label: 'יצירת קשר', href: '/contact' },
  { label: 'אודות', href: '/about' },
] as const

export const MOBILE_NAV_LINKS = [
  { label: 'ראשי', href: HOME_NAV_HREF },
  { label: 'שירותים', href: SERVICES_NAV_HREF },
  { label: 'פרויקטים', href: '/projects' },
  { label: 'יצירת קשר', href: '/contact' },
  { label: 'אודות', href: '/about' },
  {
    label: 'קבלו הדמיה בחינם',
    href: WHATSAPP_URL,
    highlight: true,
    external: true,
    highlightSubline: 'בלי התחייבות, תוך 48 שעות',
  },
] as const

export type NavLinkItem = (typeof MOBILE_NAV_LINKS)[number]

export function handleHomeNavClick(
  event: MouseEvent<HTMLAnchorElement>,
  pathname: string,
  navigate: NavigateFunction,
) {
  event.preventDefault()

  if (pathname !== '/') {
    navigate(HOME_NAV_HREF)
    return
  }

  window.scrollTo({ top: 0, behavior: 'smooth' })
  window.history.replaceState(null, '', HOME_NAV_HREF)
}

export function handleWhyUsNavClick(
  event: MouseEvent<HTMLAnchorElement>,
  pathname: string,
  navigate: NavigateFunction,
) {
  event.preventDefault()

  const scrollToWhyUs = () => {
    document.getElementById('why-us')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', WHY_US_NAV_HREF)
  }

  if (pathname !== '/') {
    navigate(WHY_US_NAV_HREF)
    return
  }

  scrollToWhyUs()
}

export function getNavClickHandler(
  href: string,
  pathname: string,
  navigate: NavigateFunction,
) {
  if (href === HOME_NAV_HREF) {
    return (event: MouseEvent<HTMLAnchorElement>) => handleHomeNavClick(event, pathname, navigate)
  }
  if (href === WHY_US_NAV_HREF) {
    return (event: MouseEvent<HTMLAnchorElement>) => handleWhyUsNavClick(event, pathname, navigate)
  }
  return undefined
}

export function isNavLinkActive(
  pathname: string,
  hash: string,
  href: string,
  label?: string,
) {
  if (label === 'קבלו הדמיה בחינם') return false

  if (href === HOME_NAV_HREF) {
    return pathname === '/' && (hash === '#hero' || hash === '')
  }

  if (href === SERVICES_NAV_HREF) {
    return pathname === SERVICES_NAV_HREF || pathname.startsWith(`${SERVICES_NAV_HREF}/`)
  }

  if (href.startsWith('/#')) {
    const linkHash = href.slice(1)
    return pathname === '/' && hash === linkHash
  }

  return pathname === href
}
