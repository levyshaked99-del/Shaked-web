import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  DEFAULT_DESCRIPTION,
  OG_IMAGE_URL,
  PAGE_SEO,
  SITE_ORIGIN,
  type PageSeoKey,
} from '../constants/seo'

function setMeta(name: string, content: string, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
  let element = document.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    if (property) {
      element.setAttribute('property', name)
    } else {
      element.setAttribute('name', name)
    }
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function setCanonical(href: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

export function usePageMeta(page: PageSeoKey) {
  const { pathname } = useLocation()

  useEffect(() => {
    const seo = PAGE_SEO[page]
    const { title, description } = seo
    const canonicalUrl = `${SITE_ORIGIN}${pathname === '/' ? '/' : pathname}`

    document.title = title
    setMeta('description', description)
    setCanonical(canonicalUrl)

    const robots = 'robots' in seo && seo.robots ? seo.robots : 'index, follow'
    setMeta('robots', robots)

    setMeta('og:type', 'website', true)
    setMeta('og:locale', 'he_IL', true)
    setMeta('og:site_name', 'שקד לוי', true)
    setMeta('og:title', title, true)
    setMeta('og:description', description, true)
    setMeta('og:url', canonicalUrl, true)
    setMeta('og:image', OG_IMAGE_URL, true)
    setMeta('og:image:width', '1200', true)
    setMeta('og:image:height', '630', true)

    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)
    setMeta('twitter:image', OG_IMAGE_URL)
  }, [page, pathname])
}

export function useDefaultPageMeta() {
  useEffect(() => {
    document.title = PAGE_SEO.home.title
    setMeta('description', DEFAULT_DESCRIPTION)
  }, [])
}