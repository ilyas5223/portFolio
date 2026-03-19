import React, { useState } from 'react'

export default function Marquee({ items, reverse = false, speed = 120 }) {
  const doubled = [...items, ...items, ...items, ...items]
  const [paused, setPaused] = useState(false)

  return (
    <div className="overflow-hidden py-4 border-y" style={{ borderColor: 'var(--border)' }}>
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          display: 'flex',
          width: 'max-content',
          animation: `marquee ${speed}s linear infinite ${reverse ? 'reverse' : ''}`,
          animationPlayState: paused ? 'paused' : 'running',
          willChange: 'transform',
        }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-8 px-8"
            style={{ whiteSpace: 'nowrap' }}
          >
            <span
              style={{
                fontFamily: '"Fraunces", serif',
                fontSize: '0.9rem',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--ink-soft)',
                letterSpacing: '0.02em',
              }}
            >
              {item}
            </span>
            <span style={{ color: 'var(--accent)', fontSize: '0.5rem' }}>✦</span>
          </div>
        ))}
      </div>
    </div>
  )
}