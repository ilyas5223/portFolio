import React, { useState, useRef, useEffect } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

const projects = [
  {
    id: 5,
    num: '01',
    title: 'SkyfurnitureCA',
    category: 'E-Commerce Platform',
    year: '2025',
    desc: 'Full-stack e-commerce platform for a furniture client serving the US and Canadian market. Dual-currency storefront (USD/CAD), 20+ products across 10+ categories, mega-menu navigation, infinite scroll, quick-view modal, and a persistent cart — all built from scratch. Backend handles order contact via email and SMS, with rate-limited, validated API endpoints and a PostgreSQL data layer. Deployed on Railway with a custom domain.',
    impact: 'Dual-region storefront · Email + SMS order flow · Deployed to production',
    stack: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL', 'Nodemailer', 'Twilio', 'Railway'],
    live: 'https://skyfurniturecanada.com',
    github: 'https://github.com/ilyas5223/skyfurniture',
    featured: true,
    client: true,
    screenshot: '/screenshots/skyfurniture.png',
    mockupBg: '#FAF5F0',
    mockupAccent: '#8B6F5E',
  },
  {
    id: 1,
    num: '02',
    title: 'NovaMart',
    category: 'E-Commerce Platform',
    year: '2024',
    desc: 'High-performance e-commerce platform serving 50k+ concurrent users. Features real-time inventory, AI product recommendations, and seamless Stripe payments. Built with a microservices architecture for infinite scalability.',
    impact: '50k+ concurrent users · 2.3s avg page load · $2M GMV processed',
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe', 'AWS ECS'],
    live: '#',
    github: '#',
    featured: true,
    mockupBg: '#FEF3E2',
    mockupAccent: '#C17B4A',
  },
  {
    id: 2,
    num: '03',
    title: 'TaskFlow AI',
    category: 'Productivity SaaS',
    year: '2024',
    desc: 'AI-driven project management platform that intelligently assigns tasks, predicts bottlenecks, and surfaces insights. Serving 3,200+ active teams worldwide with 92% retention rate.',
    impact: '3.2k teams · 92% retention · 40% productivity increase reported',
    stack: ['React', 'Python', 'FastAPI', 'MongoDB', 'OpenAI API', 'K8s'],
    live: '#',
    github: '#',
    featured: true,
    mockupBg: '#EEF2FF',
    mockupAccent: '#6366F1',
  },
  {
    id: 3,
    num: '04',
    title: 'FinTrack Pro',
    category: 'FinTech Dashboard',
    year: '2023',
    desc: 'Personal finance dashboard with real-time portfolio tracking, automated budgeting, and ML-powered spending insights. Mobile-first, data-rich design.',
    impact: '8k active users · 4.8★ App Store rating · 180+ financial metrics',
    stack: ['Vue.js', 'Express', 'PostgreSQL', 'D3.js', 'Plaid API', 'ML'],
    live: '#',
    github: '#',
    featured: false,
    mockupBg: '#F0FDF4',
    mockupAccent: '#16A34A',
  },
  {
    id: 4,
    num: '05',
    title: 'DevConnect',
    category: 'Developer Network',
    year: '2023',
    desc: 'Social platform for developers — share projects, find collaborators, join coding challenges. Real-time messaging, code snippet sharing, and GitHub integration.',
    impact: '15k developers · 200+ daily active discussions · Open source core',
    stack: ['React', 'GraphQL', 'Node.js', 'MongoDB', 'Socket.io', 'Docker'],
    live: '#',
    github: '#',
    featured: false,
    mockupBg: '#F0F9FF',
    mockupAccent: '#0284C7',
  },
]

function BrowserMockup({ bg, accent, title, screenshot }) {
  return (
    <div
      aria-hidden="true"
      style={{
        border: '1px solid var(--border)',
        overflow: 'hidden',
        marginBottom: 0,
      }}
    >
      {/* Browser chrome bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '10px 14px',
          background: 'var(--bg-2)',
          borderBottom: '1px solid var(--border-soft)',
        }}
      >
        <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#FF5F57' }} />
        <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#FEBC2E' }} />
        <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#28C840' }} />
        <div style={{
          flex: 1, height: 16,
          background: 'var(--bg)',
          border: '1px solid var(--border-soft)',
          borderRadius: 2,
          marginLeft: 8,
        }} />
      </div>

      {/* Mockup canvas — real screenshot if available, SVG fallback otherwise */}
      <div style={{ height: 220, background: bg, position: 'relative', overflow: 'hidden' }}>
        {screenshot ? (
          <img
            src={screenshot}
            alt={`${title} website screenshot`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top',
              display: 'block',
            }}
          />
        ) : (
          <>
            <svg viewBox="0 0 480 160" style={{ width: '100%', height: '100%' }}>
              {/* Sidebar */}
              <rect x="0" y="0" width="60" height="160" fill={accent} opacity="0.12" />
              {[18, 42, 66, 90, 114].map((y, i) => (
                <rect key={i} x="8" y={y} width={i === 0 ? 44 : 32} height={7} rx="2" fill={accent} opacity={i === 0 ? 0.5 : 0.25} />
              ))}
              {/* Top nav */}
              <rect x="68" y="12" width="200" height="10" rx="2" fill={accent} opacity="0.4" />
              <rect x="68" y="30" width="120" height="6" rx="2" fill={accent} opacity="0.2" />
              {/* Cards row */}
              {[[72, 52], [192, 52], [312, 52]].map(([x, y], i) => (
                <g key={i}>
                  <rect x={x} y={y} width="108" height="70" rx="4" fill="white" opacity="0.6" stroke={accent} strokeWidth="0.5" strokeOpacity="0.2" />
                  <rect x={x + 10} y={y + 12} width="60" height="7" rx="2" fill={accent} opacity="0.35" />
                  <rect x={x + 10} y={y + 26} width="88" height="5" rx="1" fill={accent} opacity="0.18" />
                  <rect x={x + 10} y={y + 37} width="70" height="5" rx="1" fill={accent} opacity="0.14" />
                  <rect x={x + 10} y={y + 52} width="40" height="8" rx="2" fill={accent} opacity="0.3" />
                </g>
              ))}
              {/* Chart */}
              {[40, 65, 45, 80, 55, 70, 50].map((h, i) => (
                <rect key={i} x={72 + i * 14} y={140 - h} width="10" height={h} rx="2" fill={accent} opacity="0.25" />
              ))}
            </svg>
            {/* Project name watermark */}
            <div style={{
              position: 'absolute', bottom: 10, right: 14,
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.65rem',
              color: accent,
              opacity: 0.5,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              {title}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    if (reduced) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const onMove = (e) => {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      card.style.transform = `perspective(1000px) rotateX(${y * -6}deg) rotateY(${x * 6}deg)`
    }
    const onLeave = () => { card.style.transform = 'none' }
    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [reduced])

  return (
    <article
      className={`reveal-up delay-${(index % 4) + 1} project-card`}
      ref={cardRef}
      style={{ transition: 'transform 0.15s ease, border-color 0.4s ease, box-shadow 0.4s ease' }}
      data-cursor="view"
      aria-label={`Project: ${project.title} — ${project.category}`}
    >
      <BrowserMockup
        bg={project.mockupBg}
        accent={project.mockupAccent}
        title={project.title}
        screenshot={project.screenshot}
      />

      <div className="p-8 lg:p-10">
        <div className="grid lg:grid-cols-[auto_1fr] gap-6 lg:gap-10 items-start">
          <div className="project-number" aria-hidden="true">{project.num}</div>

          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="mono-sm" style={{ color: 'var(--accent)' }}>{project.category}</span>
              <span className="mono-sm" aria-hidden="true">·</span>
              <span className="mono-sm">{project.year}</span>
              {project.featured && (
                <span
                  className="mono-sm px-2 py-0.5"
                  style={{
                    background: 'var(--accent-ll)',
                    color: 'var(--accent)',
                    border: '1px solid var(--accent)',
                  }}
                >
                  Featured
                </span>
              )}
              {project.client && (
                <span
                  className="mono-sm px-2 py-0.5"
                  style={{
                    background: 'var(--bg-2)',
                    color: 'var(--ink-soft)',
                    border: '1px solid var(--border)',
                  }}
                >
                  Client Work
                </span>
              )}
            </div>

            <h3
              style={{
                fontFamily: '"Fraunces", serif',
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 300,
                color: 'var(--ink)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                marginBottom: '1rem',
              }}
            >
              {project.title}
            </h3>

            <p className="body-text mb-4" style={{ maxWidth: '60ch' }}>
              {project.desc}
            </p>

            <p
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.7rem',
                color: 'var(--accent)',
                letterSpacing: '0.05em',
                marginBottom: '1rem',
              }}
            >
              ↳ {project.impact}
            </p>

            <ul className="flex flex-wrap gap-2 mb-6" aria-label={`Tech stack for ${project.title}`}>
              {project.stack.map((t) => (
                <li key={t}><span className="chip">{t}</span></li>
              ))}
            </ul>

            <div
              className="flex flex-wrap gap-3 pt-5"
              style={{ borderTop: '1px solid var(--border-soft)' }}
            >
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-mag text-xs py-2.5 px-5"
                data-cursor="hover"
                aria-label={`View ${project.title} live demo (opens in new tab)`}
              >
                <span className="flex items-center gap-2">
                  Live Demo
                  <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
                <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-xs py-2.5 px-5"
                data-cursor="hover"
                aria-label={`View ${project.title} source code on GitHub (opens in new tab)`}
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const cats = ['All', 'E-Commerce', 'SaaS', 'FinTech', 'Developer Tools']

  const filtered = filter === 'All'
    ? projects
    : projects.filter(p => p.category.toLowerCase().includes(filter.toLowerCase().replace(' tools', '')))

  return (
    <section id="projects" className="section-pad px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-8">
          <div>
            <p className="section-label reveal-right">Projects</p>
            <h2 className="display-lg reveal-up delay-1">
              Selected<br />
              <span style={{
                color: 'transparent',
                WebkitTextStroke: '2px var(--accent)',
                letterSpacing: '-0.02em',
              }}>work</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 reveal-up delay-2">
            {cats.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                data-cursor="hover"
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.7rem',
                  letterSpacing: '0.06em',
                  padding: '0.5rem 1.25rem',
                  background: filter === cat ? 'var(--ink)' : 'transparent',
                  color: filter === cat ? 'var(--bg)' : 'var(--ink-soft)',
                  border: `1px solid ${filter === cat ? 'var(--ink)' : 'var(--border)'}`,
                  transition: 'all 0.25s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <div className="mt-12 flex justify-center reveal-up delay-3">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn-ghost px-6" data-cursor="hover">
            Explore All Projects on GitHub ↗
          </a>
        </div>
      </div>
    </section>
  )
}