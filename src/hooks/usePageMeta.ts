import { useEffect } from 'react'
import { DEFAULT_DESCRIPTION, PAGE_SEO, type PageSeoKey } from '../constants/seo'

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

export function usePageMeta(page: PageSeoKey) {
  useEffect(() => {
    const { title, description } = PAGE_SEO[page]
    document.title = title
    setMeta('description', description)
    setMeta('og:title', title, true)
    setMeta('og:description', description, true)
    setMeta('og:url', window.location.href, true)
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)
  }, [page])
}

export function useDefaultPageMeta() {
  useEffect(() => {
    document.title = PAGE_SEO.home.title
    setMeta('description', DEFAULT_DESCRIPTION)
  }, [])
}
