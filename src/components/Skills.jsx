import React, { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

const BAND_LABELS = { 1: 'Proficient', 2: 'Advanced', 3: 'Expert' }

const categories = [
  {
    label: 'Frontend',
    icon: '◈',
    color: '#C17B4A',
    skills: [
      { name: 'React / Next.js', years: 4, band: 3 },
      { name: 'TypeScript',      years: 4, band: 3 },
      { name: 'Tailwind CSS',    years: 3, band: 3 },
      { name: 'Bootstrap',       years: 2, band: 3 },
      { name: 'CSS Animation',   years: 4, band: 2 },
    ],
  },
  {
    label: 'Backend',
    icon: '◉',
    color: '#8B9E88',
    skills: [
      { name: 'Node.js / Express', years: 5, band: 3 },
      { name: 'RESTful APIs',          years: 3, band: 3 },
      { name: 'OAuth2.0',           years: 3, band: 3 },
      { name: 'Hash/bcrypt', years: 3, band: 3 },
      { name: 'PostgreSQL',        years: 4, band: 3 },
    ],
  },
  {
    label: 'DevOps',
    icon: '◆',
    color: '#7BA5B0',
    skills: [
      { name: 'Git / GitHub', years: 3, band: 3 },
      { name: 'CI/CD Pipelines',  years: 4, band: 3 },
      { name: 'Hostinger',     years: 3, band: 3 },
      { name: 'Vercel/Netlify',        years: 2, band: 3 },
      { name: 'Render/Railway',     years: 3, band: 3 },
    ],
  },
]

// Radar chart using band (1-3) instead of arbitrary %
function RadarChart({ skills, color }) {
  const size = 220
  const center = size / 2
  const radius = 85
  const levels = 3 // matches our 3 bands

  const angleStep = (Math.PI * 2) / skills.length

  const getPoint = (idx, r) => ({
    x: center + r * Math.sin(idx * angleStep),
    y: center - r * Math.cos(idx * angleStep),
  })

  const gridCircles = Array.from({ length: levels }, (_, i) => {
    const r = (radius / levels) * (i + 1)
    const points = skills.map((_, idx) => getPoint(idx, r))
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ') + 'Z'
  })

  // Use band/3 ratio instead of level/100
  const dataPoints = skills.map((s, idx) => getPoint(idx, (s.band / 3) * radius))
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ') + 'Z'

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[220px] mx-auto">
      {/* Grid */}
      {gridCircles.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="var(--border)" strokeWidth="1" opacity={0.5} />
      ))}
      {/* Axes */}
      {skills.map((_, idx) => {
        const pt = getPoint(idx, radius)
        return (
          <line
            key={idx}
            x1={center} y1={center}
            x2={pt.x} y2={pt.y}
            stroke="var(--border)"
            strokeWidth="1"
            opacity={0.5}
          />
        )
      })}
      {/* Data area */}
      <path d={dataPath} fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.5" />
      {/* Data points */}
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill={color} />
      ))}
      {/* Labels */}
      {skills.map((s, idx) => {
        const pt = getPoint(idx, radius + 18)
        return (
          <text
            key={idx}
            x={pt.x}
            y={pt.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--ink-soft)"
            fontSize="7"
            fontFamily="JetBrains Mono"
          >
            {s.name.split(' ')[0]}
          </text>
        )
      })}
    </svg>
  )
}


function SkillBar({ name, years, band, animate, color }) {
  return (
    <div className="mb-5">
      <div className="flex justify-between mb-2">
        <span
          style={{
            fontFamily: '"Outfit", sans-serif',
            fontSize: '0.8125rem',
            color: 'var(--ink-soft)',
            fontWeight: 300,
          }}
        >
          {name}
        </span>
        <div className="flex items-center gap-3">
          <span
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.65rem',
              color: 'var(--ink-faint)',
              letterSpacing: '0.05em',
            }}
          >
            {years} yr{years > 1 ? 's' : ''}
          </span>
          <span
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.6rem',
              color: animate ? color : 'var(--ink-faint)',
              background: animate ? color + '18' : 'transparent',
              padding: '0.1rem 0.4rem',
              border: `1px solid ${animate ? color + '44' : 'transparent'}`,
              transition: 'all 0.6s ease',
            }}
          >
            {BAND_LABELS[band]}
          </span>
        </div>
      </div>
      {/* 3-segment band -- not a continuous % bar */}
      <div
        className="flex gap-1"
        role="meter"
        aria-label={`${name}: ${BAND_LABELS[band]}, ${years} year${years > 1 ? 's' : ''} experience`}
        aria-valuenow={band}
        aria-valuemin={1}
        aria-valuemax={3}
      >
        {[1, 2, 3].map(seg => (
          <div
            key={seg}
            style={{
              flex: 1,
              height: '3px',
              background: seg <= band && animate ? color : 'var(--border)',
              transition: `background 0.5s ease ${(seg - 1) * 0.12}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [animate, setAnimate] = useState(false)
  const sectionRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) { setAnimate(true); return }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [reduced])

  const active = categories[activeIdx]

  const tools = ['VS Code', 'Figma', 'Postman','Bash', 'Neon.db', 'GitHub Actions']

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-pad px-6 lg:px-10"
      style={{ background: 'var(--bg-2)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="section-label reveal-right">Skills</p>
            <h2 className="display-lg reveal-up delay-1">
              My technical<br />
              <span style={{
                display: 'inline',
                background: 'var(--accent)',
                color: 'var(--bg)',
                padding: '0 0.2em',
                letterSpacing: '-0.01em',
              }}>arsenal</span>
            </h2>
          </div>
          <p
            className="body-text reveal-up delay-2 max-w-sm text-left md:text-right"
          >
            Constantly evolving. Always improving. Building with the right tool for the job.
          </p>
        </div>

        {/* Category tabs */}
        <div
          className="flex flex-wrap gap-2 mb-12 reveal-up delay-2 pb-8"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          {categories.map((cat, i) => (
            <button
              key={cat.label}
              onClick={() => { setActiveIdx(i); setAnimate(false); setTimeout(() => setAnimate(true), 50) }}
              data-cursor="hover"
              className="flex items-center gap-2 px-3 py-3 transition-all duration-300"
              style={{
                fontFamily: '"Outfit", sans-serif',
                fontSize: '0.8125rem',
                fontWeight: 400,
                background: activeIdx === i ? 'var(--ink)' : 'var(--white)',
                color: activeIdx === i ? 'var(--bg)' : 'var(--ink-soft)',
                border: `1px solid ${activeIdx === i ? 'var(--ink)' : 'var(--border)'}`,
              }}
            >
              <span style={{ color: activeIdx === i ? active.color : cat.color }}>
                {cat.icon}
              </span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-[1fr_auto] gap-16 items-start">
          {/* Left: Skill bars */}
          <div className="reveal-up delay-2">
            <div className="mb-6">
              <h3
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '1.5rem',
                  color: 'var(--ink)',
                  marginBottom: '0.25rem',
                }}
              >
                {active.label} Development
              </h3>
              <p className="mono-sm">{active.skills.length} core skills tracked</p>
            </div>
            {active.skills.map((skill) => (
              <SkillBar key={skill.name} {...skill} animate={animate} color={active.color} />
            ))}
          </div>

          {/* Right: Radar chart */}
          <div className="hidden lg:block reveal-scale delay-3">
            <div
              className="p-8"
              style={{
                background: 'var(--white)',
                border: '1px solid var(--border)',
                width: '280px',
              }}
            >
              <p className="mono-sm mb-4 text-center">Skill Radar</p>
              <RadarChart skills={active.skills} color={active.color} />
            </div>
          </div>
        </div>

        {/* Tools */}
        <div className="mt-16 pt-10 reveal-up delay-4" style={{ borderTop: '1px solid var(--border)' }}>
          <p className="mono-sm mb-5">Tools & Platforms</p>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <span key={tool} className="chip" data-cursor="hover">{tool}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
