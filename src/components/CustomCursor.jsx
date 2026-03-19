import React, { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * CustomCursor -- renders ONLY on devices with a fine pointer (mouse/trackpad).
 * 
 * Accessibility guarantees:
 * - Touch screens: this component renders nothing (CSS hides ring/dot too)
 * - Reduced motion: rAF lerp is replaced with instant positioning (no lag)
 * - Keyboard focus: cursor is irrelevant for keyboard nav; focus-visible
 *   outlines in CSS handle keyboard user visibility instead
 */
export default function CustomCursor() {
  const ringRef = useRef(null)
  const dotRef  = useRef(null)
  const labelRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    // Only activate on true pointer devices -- never on touch
    const isPointerDevice = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    ).matches
    if (!isPointerDevice) return

    const ring  = ringRef.current
    const dot   = dotRef.current
    const label = labelRef.current
    if (!ring || !dot) return

    let mx = -200, my = -200
    let rx = -200, ry = -200
    let raf

    const lerp = (a, b, t) => a + (b - a) * t

    const onMove = ({ clientX: x, clientY: y }) => {
      mx = x; my = y
      dot.style.left = x + 'px'
      dot.style.top  = y + 'px'
      if (label) { label.style.left = x + 'px'; label.style.top = y + 'px' }
    }

    const tick = () => {
      // Reduced motion: snap to position instantly (factor = 1, no trail)
      const factor = reduced ? 1 : 0.1
      rx = lerp(rx, mx, factor)
      ry = lerp(ry, my, factor)
      ring.style.left = rx + 'px'
      ring.style.top  = ry + 'px'
      raf = requestAnimationFrame(tick)
    }

    const onOver  = e => { if (e.target.closest('[data-cursor]')) ring.classList.add('hovering') }
    const onOut   = () => ring.classList.remove('hovering')
    const onDown  = () => ring.classList.add('clicking')
    const onUp    = () => ring.classList.remove('clicking')

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout',  onOut)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup',   onUp)
    raf = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout',  onOut)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup',   onUp)
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  return (
    <>
      <div id="cursor-ring" ref={ringRef} aria-hidden="true" />
      <div id="cursor-dot"  ref={dotRef}  aria-hidden="true" />
      <div id="cursor-label" ref={labelRef} aria-hidden="true" />
    </>
  )
}
