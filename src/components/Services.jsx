import { useEffect, useRef } from 'react'
import Marquee from './Marquee'

const marqueeItems = [
  'JavaScript', 'Tailwind CSS', 'Bootstrap', 'React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL',
  'RESTful API', 'OAuth2.0', 'Express', 'bcrypt', 'Hostinger', 'Vercel', 'GitHub Version control', 'Test-driven development', 'Performance optimization', 'SEO best practices',
]

/*
  Service copy is written in the same voice as the rest of this portfolio:
  direct, first-person, no marketing fluff. Claims point at real, shippable
  evidence — the projects in Projects.jsx — instead of invented metrics.
*/
const SERVICES = [
  {
    title: 'MVP & Product Launch',
    description:
      "I take a product from blank repo to production — SkyfurnitureCA (dual-currency e-commerce, built solo for a real client) and ragbase (a multi-tenant SaaS with Stripe billing) were both shipped this way. I know which corners are safe to cut in v1 — and which ones will cost you at scale.",
    outcome: 'Shipped fast. Built to survive what comes after launch.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind'],
  },
  {
    title: 'APIs & Backends',
    description:
      'Clean, observable APIs that hold up under real production load. I design systems I would want to inherit — documented, testable, with sensible error handling and the instrumentation to catch issues before users do.',
    outcome: 'Rate-limited, validated, and documented — production-grade, not just working.',
    tags: ['Node.js', 'Express', 'Auth', 'RESTful APIs'],
  },
  {
    title: 'Dashboards & Internal Tools',
    description:
      'The best internal tool is the one your team actually uses. I build admin panels and operational dashboards with the same care as customer-facing products — because the people using them are your team, and their time matters.',
    outcome: 'Less manual ops. More time for work that actually matters.',
    tags: ['React', 'Charts', 'Role-based access'],
  },
  {
    title: 'Performance & Refactors',
    description:
      "I hunt down slow queries and bloated responses with the profiler open, not guesses. Refactored large codebases with zero downtime and no regressions. Performance work is detective work — I like it.",
    outcome: 'Measurable gains with benchmarks, not vague improvements.',
    tags: ['Audits', 'Optimization', 'Best practices'],
  },
]

function TiltCard({ children }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const onMove = (e) => {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      card.style.transform = `perspective(800px) rotateX(${y * -8}deg) rotateY(${x * 8}deg) scale(1.02)`
    }
    const onLeave = () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)'
    }

    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      style={{ transition: 'transform 0.3s var(--ease-expo)', willChange: 'transform' }}
    >
      {children}
    </div>
  )
}

export default function About() {
  return (
    <>
      <Marquee items={marqueeItems} direction="rtl" speed={120} />

      <section id="services" className="section-pad px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">

          {/* ── Section Header ── */}
          <div className="mb-12">
            <p className="section-label reveal-right">Services</p>

            <div className="grid lg:grid-cols-2 gap-6 items-end">
              <h2 className="display-lg reveal-up delay-1">
                Full-stack work,<br />
                <span style={{
                  color: 'var(--accent)',
                  textDecoration: 'underline',
                  textDecorationThickness: '3px',
                  textUnderlineOffset: '6px',
                }}>done right.</span>
              </h2>

              <p
                className="body-text reveal-up delay-2"
                style={{ maxWidth: '52ch' }}
              >
                I take on select projects where I can do my best work —
                greenfield builds, scaling challenges, and codebases that need
                a clear path forward. I ask why before how. And I care about
                what happens after launch.
              </p>
            </div>
          </div>

          {/* ── Service Cards Grid ── */}
          <div className="grid sm:grid-cols-2 gap-5">
            {SERVICES.map((service, i) => (
              <TiltCard key={service.title}>
                <article
                  className={`reveal-scale delay-${i + 1} h-full`}
                  style={{
                    background: 'var(--white)',
                    border: '1px solid var(--border)',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                  data-cursor="hover"
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--accent)'
                    e.currentTarget.style.boxShadow = '0 8px 32px -8px rgba(193,123,74,0.15)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {/* Index */}
                  <span
                    style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: '0.6rem',
                      color: 'var(--accent)',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      marginBottom: '1.25rem',
                      display: 'block',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                      fontWeight: 500,
                      color: 'var(--ink)',
                      lineHeight: 1.25,
                      letterSpacing: '-0.01em',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="body-text"
                    style={{
                      fontSize: '0.875rem',
                      lineHeight: 1.7,
                      flexGrow: 1,
                      marginBottom: '1rem',
                    }}
                  >
                    {service.description}
                  </p>

                  {/* Outcome */}
                  <p
                    style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: '0.7rem',
                      color: 'var(--accent)',
                      letterSpacing: '0.04em',
                      marginBottom: '1.25rem',
                    }}
                  >
                    ↳ {service.outcome}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                    {service.tags.map((tag) => (
                      <span key={tag} className="chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </TiltCard>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}