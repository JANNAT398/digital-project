import { useEffect } from 'react'
import { site } from '../config/site'

/**
 * Sets a unique document title, meta description and Open Graph tags for
 * the current page. Call it once at the top of any page component.
 */
export function useSEO({ title, description, image } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${site.name}` : site.name
    const desc = description || site.shortDescription
    const ogImage = image || `${site.url}/og-image.jpg`

    document.title = fullTitle

    const setMeta = (attr, key, content) => {
      if (!content) return
      let el = document.head.querySelector(`meta[${attr}="${key}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('name', 'description', desc)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:image', ogImage)
    setMeta('property', 'og:url', `${site.url}${window.location.pathname}`)
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', desc)
    setMeta('name', 'twitter:image', ogImage)
  }, [title, description, image])
}

export default useSEO
