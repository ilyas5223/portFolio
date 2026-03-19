import { useState, useEffect, useRef } from 'react'

export function useCounter(target, duration = 2000, suffix = '') {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const numericTarget = parseInt(target.replace(/\D/g, ''))
    const start = performance.now()
    const easeOut = (t) => 1 - Math.pow(1 - t, 3)

    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      setCount(Math.floor(easeOut(progress) * numericTarget))
      if (progress < 1) requestAnimationFrame(update)
      else setCount(numericTarget)
    }

    requestAnimationFrame(update)
  }, [started, target, duration])

  const display = target.includes('+')
    ? `${count}+`
    : target.includes('%')
    ? `${count}%`
    : target.includes('★')
    ? `${(count / 10).toFixed(1)}★`
    : `${count}${suffix}`

  return { ref, display }
}
