import React, { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

const roles = ['Full Stack Developer', 'React Architect', 'API Designer', 'System Builder']

function StatCounter({ value, label }) {
  const [displayed, setDisplayed] = useState('0')
  const ref = useRef(null)
  const started = useRef(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const num = parseInt(value.replace(/\D/g, ''))
    const suffix = value.replace(/[0-9]/g, '')

    // Reduced motion: show final value immediately, skip the count-up animation
    if (reduced) {
      setDisplayed(value)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 2000
        const startTime = performance.now()
        const ease = (t) => 1 - Math.pow(1 - t, 3)
        let raf
        const tick = (now) => {
          const t = Math.min((now - startTime) / duration, 1)
          setDisplayed(Math.floor(ease(t) * num) + suffix)
          if (t < 1) { raf = requestAnimationFrame(tick) }
          else setDisplayed(value)
        }
        raf = requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, reduced])

  return (
    <div ref={ref}>
      <p
        style={{
          fontFamily: '"Fraunces", serif',
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
          fontWeight: 300,
          color: 'var(--ink)',
          lineHeight: 1,
          letterSpacing: '-0.03em',
        }}
      >
        {displayed}
      </p>
      <p
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.65rem',
          color: 'var(--ink-faint)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginTop: '0.4rem',
        }}
      >
        {label}
      </p>
    </div>
  )
}

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [charIdx, setCharIdx] = useState(0)
  const heroRef = useRef(null)
  const parallaxRef = useRef(null)
  const reduced = useReducedMotion()

  // Typewriter -- skipped for reduced-motion users; shows first role statically
  useEffect(() => {
    if (reduced) {
      setText(roles[0])
      return
    }
    const current = roles[roleIdx]
    let timeout
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => { setCharIdx(c => c + 1); setText(current.slice(0, charIdx + 1)) }, 70)
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => { setCharIdx(c => c - 1); setText(current.slice(0, charIdx - 1)) }, 35)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setRoleIdx(r => (r + 1) % roles.length)
    }
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, roleIdx, reduced])

  // Mouse parallax -- disabled for reduced-motion users
  useEffect(() => {
    if (reduced) return
    const hero = heroRef.current
    const parallax = parallaxRef.current
    if (!hero || !parallax) return

    let mouseX = 0, mouseY = 0
    let curX = 0, curY = 0
    let rafId

    const onMove = (e) => {
      const rect = hero.getBoundingClientRect()
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 30
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 20
    }

    const tick = () => {
      curX += (mouseX - curX) * 0.04
      curY += (mouseY - curY) * 0.04
      parallax.style.transform = `translate(${curX}px, ${curY}px)`
      rafId = requestAnimationFrame(tick)
    }

    hero.addEventListener('mousemove', onMove, { passive: true })
    rafId = requestAnimationFrame(tick)
    return () => {
      hero.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [reduced])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden hero-bg-pattern"
      style={{ paddingTop: '72px' }}
    >
      {/* Ambient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(193,123,74,0.06), transparent)',
        }}
      />

      {/* Background letter */}
      <div
        className="absolute select-none pointer-events-none"
        style={{
          right: '-5vw',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: '"Fraunces", serif',
          fontSize: 'clamp(16rem, 35vw, 32rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'var(--accent)',
          opacity: 0.035,
          lineHeight: 1,
          userSelect: 'none',
        }}
      >
        AI
      </div>

      {/* Floating grid dots */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--ink) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full relative z-10">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
          {/* Left: Main content */}
          <div>
            {/* Status badge */}
            <div
              className="inline-flex items-center gap-3 mb-10 px-4 py-2 border"
              style={{
                borderColor: 'var(--border)',
                background: 'var(--white)',
                animation: 'fadeIn 0.6s ease 1.8s both',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.65rem',
                  color: 'var(--ink-soft)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                Available for new projects
              </span>
              <span style={{ color: 'var(--accent)', fontSize: '0.5rem' }}>✦</span>
            </div>

            {/* Name headline -- word by word */}
            <div className="overflow-hidden mb-3" style={{ lineHeight: 0.9 }}>
              <div
                style={{
                  fontFamily: '"Fraunces", serif',
                  fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                  fontWeight: 300,
                  color: 'var(--ink-soft)',
                  letterSpacing: '0.1em',
                  animation: 'fadeUp 0.8s var(--ease-expo) 1.9s both',
                }}
              >
                Hello, I'm
              </div>
            </div>

            {/* FIX: removed overflow-hidden so descenders (y) are not clipped */}
            <div>
              <h1
                style={{
                  fontFamily: '"Fraunces", serif',
                  fontSize: 'clamp(3.5rem, 9vw, 8.5rem)',
                  fontWeight: 300,
                  lineHeight: 1,
                  paddingBottom: '0.15em',
                  color: 'var(--ink)',
                  letterSpacing: '-0.03em',
                  animation: 'fadeUp 1s var(--ease-expo) 2s both',
                }}
              >
                Ali{' '}
                <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Ilyas</em>
              </h1>
            </div>

            {/* Typewriter role */}
            <div
              className="mt-6 flex items-center gap-3"
              style={{ animation: 'fadeUp 0.8s var(--ease-expo) 2.2s both' }}
            >
              <span className="accent-line" />
              <span
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.8rem',
                  color: 'var(--ink-soft)',
                  letterSpacing: '0.05em',
                  minWidth: '220px',
                }}
              >
                {text}
                <span
                  style={{
                    display: 'inline-block',
                    width: '2px',
                    height: '0.9em',
                    background: 'var(--accent)',
                    marginLeft: '2px',
                    animation: 'pulse 1s ease-in-out infinite',
                    verticalAlign: 'middle',
                  }}
                />
              </span>
            </div>

            {/* Bio */}
            <p
              className="body-text mt-8 max-w-xl"
              style={{ animation: 'fadeUp 0.8s var(--ease-expo) 2.35s both' }}
            >
              I build scalable, secure and beautifully crafted web applications -- from database to deployment. 
              Five years of turning complex problems into elegant, maintainable solutions that users love.
            </p>

            {/* CTAs */}
            <div
              className="flex gap-2 md:gap-4 mt-10"
              style={{ animation: 'fadeUp 0.8s var(--ease-expo) 2.5s both' }}
            >
              <button
                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                className="btn-mag"
                data-cursor="hover"
                style={{ padding: '0.6rem 1rem' }}
              >
                <span className="flex items-center gap-2 whitespace-nowrap">
                  View My Work
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
              <button
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="btn-ghost whitespace-nowrap"
                data-cursor="hover"
                style={{ padding: '0.6rem 1rem' }}
              >
                What you Get
              </button>
            </div>

            {/* Stats row */}
           
          </div>

          {/* Right: Parallax card */}
          <div
            className="hidden lg:block relative"
            ref={parallaxRef}
            style={{ animation: 'fadeIn 1s ease 2.2s both' }}
          >
            <div className="relative w-[340px]">
              {/* Outer decorative border */}
              <div
                className="absolute -top-5 -left-5 w-full h-full border"
                style={{ borderColor: 'var(--accent)', opacity: 0.25 }}
              />
              <div
                className="absolute -bottom-5 -right-5 w-full h-full border"
                style={{ borderColor: 'var(--border)' }}
              />

              {/* Main card */}
              <div
                className="relative overflow-hidden"
                style={{
                  background: 'var(--bg-2)',
                  border: '1px solid var(--border)',
                  padding: '2.5rem',
                  minHeight: '420px',
                }}
              >
                {/* Avatar */}
                <div className="flex flex-col items-center text-center mb-8">
                  <div
                    className="relative w-28 h-28 rounded-full flex items-center justify-center mb-4"
                    style={{ background: 'var(--accent-ll)', border: '1px solid var(--accent)' }}
                  >
                    <span
                      style={{
                        fontFamily: '"Fraunces", serif',
                        fontSize: '3.5rem',
                        fontWeight: 300,
                        fontStyle: 'italic',
                        color: 'var(--accent)',
                      }}
                    >
                      AI
                    </span>
                    {/* Status dot */}
                    <div
                      className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-500 border-2"
                      style={{ borderColor: 'var(--bg-2)' }}
                    />
                  </div>
                  <p
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: '1.25rem',
                      color: 'var(--ink)',
                    }}
                  >
                    Ali Ilyas
                  </p>
                  <p className="mono-sm mt-1">Full Stack Developer</p>
                </div>

                {/* Tech chips floating */}
                <div className="space-y-3">
                  {[
                    { label: 'React / Next.js', pct: 95 },
                    { label: 'Node.js', pct: 92 },
                    { label: 'PostgreSQL', pct: 88 },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between mb-1">
                        <span className="mono-sm" style={{ color: 'var(--ink-soft)' }}>{item.label}</span>
                        <span className="mono-sm">{item.pct}%</span>
                      </div>
                      <div className="skill-progress">
                        <div
                          className="skill-progress-fill"
                          style={{
                            '--target-width': `${item.pct}%`,
                            width: `${item.pct}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Location badge */}
                <div
                  className="mt-6 flex items-center gap-2"
                  style={{ paddingTop: '1rem', borderTop: '1px solid var(--border)' }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth={2}>
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                  <span className="mono-sm">Punjab, Pakistan</span>
                </div>
              </div>

              {/* Floating chips */}
              <div
                className="absolute -right-16 top-12 chip animate-float"
                style={{ animationDelay: '0s' }}
              >
                TypeScript
              </div>
              <div
                className="absolute -left-16 bottom-20 chip animate-float"
                style={{ animationDelay: '1.5s' }}
              >
                RESTful API
              </div>
              <div
                className="absolute -right-14 bottom-32 chip animate-float"
                style={{ animationDelay: '0.8s' }}
              >
                OAuth 2.0
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute hidden md:flex bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ animation: 'fadeIn 1s ease 3.2s both' }}
      >
        <span className="mono-sm tracking-[0.2em]" style={{ color: 'var(--ink-faint)' }}>scroll</span>
        <div
          className="w-px h-14 relative overflow-hidden"
          style={{ background: 'var(--border)' }}
        >
          <div
            className="absolute top-0 left-0 w-full bg-[var(--accent)]"
            style={{
              animation: 'scrollLine 2s ease-in-out infinite',
              height: '40%',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(350%); }
        }
      `}</style>
    </section>
  )
}