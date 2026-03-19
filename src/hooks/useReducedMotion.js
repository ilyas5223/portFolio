import { useState, useEffect } from 'react'

/**
 * Returns true when the user has requested reduced motion
 * via their OS or browser accessibility settings.
 *
 * Used to gate ALL JS-driven animation:
 * - rAF cursor trailing
 * - parallax
 * - typewriter
 * - counter animations
 * - preloader counter
 *
 * The CSS @media (prefers-reduced-motion: reduce) block
 * in index.css handles the CSS side automatically.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}
