import React, { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Preloader({ onDone }) {
  const loaderRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('counting') // counting | reveal | done
  const reduced = useReducedMotion()

  useEffect(() => {
    // Users who prefer reduced motion don't need to wait for a decorative counter.
    // Skip the preloader entirely and call onDone immediately.
    if (reduced) {
      setPhase('done')
      onDone?.()
      return
    }

    // Count up to 100
    const duration = 1800
    const start = performance.now()
    const easeOut = (t) => 1 - Math.pow(1 - t, 2)

    let raf
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      setProgress(Math.floor(easeOut(t) * 100))
      if (t < 1) { raf = requestAnimationFrame(tick) }
      else {
        setProgress(100)
        setTimeout(() => {
          setPhase('reveal')
          setTimeout(() => {
            setPhase('done')
            onDone?.()
          }, 900)
        }, 200)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone, reduced])

  if (phase === 'done') return null

  return (
    <div
      id="preloader"
      ref={loaderRef}
      className={phase === 'reveal' ? 'exit' : ''}
      style={{ background: '#0D0D0F' }}
      aria-hidden="true"
      role="presentation"
    >
      {/* Top-left label */}
      <div className="absolute top-8 left-10 mono-sm text-clay-500 tracking-widest opacity-60">
        Ali Ilyas
      </div>

      {/* Center content */}
      <div className="flex flex-col items-center gap-8">
        {/* Monogram */}
        <div
          className="relative"
          style={{
            opacity: phase === 'reveal' ? 0 : 1,
            transform: phase === 'reveal' ? 'scale(1.1)' : 'scale(1)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        >
          <div
            className="w-20 h-20 flex items-center justify-center border"
            style={{ borderColor: '#C17B4A' }}
          >
            <span
              style={{
                fontFamily: '"Fraunces", serif',
                fontSize: '2.5rem',
                fontWeight: 300,
                color: '#F8F3EA',
              }}
            >
              A
            </span>
          </div>
          {/* Spinning ring */}
          <svg
            className="absolute -inset-3 animate-spin-slow"
            viewBox="0 0 100 100"
            style={{ width: 104, height: 104, position: 'absolute', top: -12, left: -12 }}
          >
            <circle
              cx="50" cy="50" r="47"
              fill="none"
              stroke="#C17B4A"
              strokeWidth="0.5"
              strokeDasharray="6 12"
              opacity="0.4"
            />
          </svg>
        </div>

        {/* Progress counter */}
        <div
          className="text-center"
          style={{
            opacity: phase === 'reveal' ? 0 : 1,
            transition: 'opacity 0.4s ease',
          }}
        >
          <span
            style={{
              fontFamily: '"Fraunces", serif',
              fontSize: 'clamp(3rem, 8vw, 5rem)',
              fontWeight: 300,
              color: '#F8F3EA',
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            {String(progress).padStart(2, '0')}
          </span>
          <span
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.7rem',
              color: '#C17B4A',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              display: 'block',
              marginTop: '0.5rem',
            }}
          >
            Loading
          </span>
        </div>

        {/* Progress bar */}
        <div
          style={{
            width: '200px',
            height: '1px',
            background: 'rgba(255,255,255,0.1)',
            opacity: phase === 'reveal' ? 0 : 1,
            transition: 'opacity 0.4s ease',
          }}
        >
          <div
            style={{
              height: '1px',
              background: '#C17B4A',
              width: `${progress}%`,
              transition: 'width 0.05s linear',
            }}
          />
        </div>
      </div>

      {/* Bottom */}
      <div
        className="absolute bottom-8 right-10 mono-sm tracking-widest opacity-40"
        style={{ color: '#F8F3EA' }}
      >
        ✦ Full Stack Developer
      </div>
    </div>
  )
}
