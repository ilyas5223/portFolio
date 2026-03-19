import { useEffect } from 'react'

export function useScrollReveal(deps = []) {
  useEffect(() => {
    const selectors = '.reveal-up, .reveal-right, .reveal-scale, .reveal-clip, .word-reveal, .timeline-line'
    const elements = document.querySelectorAll(selectors)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, deps)
}
