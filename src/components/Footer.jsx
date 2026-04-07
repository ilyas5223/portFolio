import React from 'react'
import { Github, Linkedin, Twitter } from 'lucide-react'

const FOOTER_BG   = '#0D0D0F'
const FOOTER_TEXT = '#F0E8D8'

const year = new Date().getFullYear()

const navCols = [
  {
    title: 'Navigate',
    links: [
      { label: 'About',      id: 'about'      },
      { label: 'Skills',     id: 'skills'     },
      { label: 'Projects',   id: 'projects'   },
      { label: 'Experience', id: 'experience' },
    ],
  },
  {
    title: 'More',
    links: [
      // { label: 'Blog',    id: 'blog'    },
      { label: 'FAQs',    id: 'faqs'    },
      { label: 'Contact', id: 'contact' },
    ],
  },
]

const socials = [
  { icon: <Github  size={16} strokeWidth={1.5} />, href: 'https://github.com/ilyas5223',                      label: 'GitHub'   },
  { icon: <Linkedin size={16} strokeWidth={1.5} />, href: 'https://www.linkedin.com/in/ali-ilyas-b343463a8/', label: 'LinkedIn' },
  { icon: <Twitter  size={16} strokeWidth={1.5} />, href: 'https://x.com/Ily5223',                           label: 'Twitter'  },
]

export default function Footer() {
  const goTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer style={{ background: FOOTER_BG, color: FOOTER_TEXT }}>

      {/* Large CTA Block */}
      <div
        className="px-6 lg:px-10 py-20 lg:py-28"
        style={{ borderBottom: `1px solid rgba(255,255,255,0.06)` }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div>
              <p
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.65rem',
                  color: 'var(--accent)',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <span style={{ display: 'inline-block', width: '2rem', height: '1px', background: 'var(--accent)' }} />
                Let's collaborate
              </p>
              <h2
                style={{
                  fontFamily: '"Fraunces", serif',
                  fontSize: 'clamp(3rem, 7vw, 6rem)',
                  fontWeight: 300,
                  lineHeight: 0.92,
                  letterSpacing: '-0.03em',
                  color: FOOTER_TEXT,
                }}
              >
                Have a project<br />
                in <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>mind?</em>
              </h2>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-6">
              <p
                style={{
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: '0.9375rem',
                  fontWeight: 300,
                  color: `rgba(240,232,216,0.55)`,
                  maxWidth: '36ch',
                  lineHeight: 1.7,
                }}
              >
                I'm accepting select new clients for 2025. Let's talk about what we can build together.
              </p>

              {/* ── Fixed: no flex-wrap, whitespace-nowrap on both buttons ── */}
              <div className="flex gap-4">
                <button
                  onClick={() => goTo('contact')}
                  data-cursor="hover"
                  style={{
                    fontFamily: '"Outfit", sans-serif',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '1rem 1rem',
                    background: 'var(--accent)',
                    color: FOOTER_BG,
                    border: '1px solid var(--accent)',
                    transition: 'background 0.3s ease, color 0.3s ease',
                    cursor: 'none',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'var(--accent)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'var(--accent)'
                    e.currentTarget.style.color = FOOTER_BG
                  }}
                >
                  Start a Project
                </button>
                <a
                  href="mailto:aliilyas5223@gmail.com"
                  data-cursor="hover"
                  style={{
                    fontFamily: '"Outfit", sans-serif',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '1rem 2rem',
                    background: 'transparent',
                    color: 'rgba(240,232,216,0.7)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    transition: 'border-color 0.3s ease, color 0.3s ease',
                    cursor: 'none',
                    textDecoration: 'none',
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--accent)'
                    e.currentTarget.style.color = 'var(--accent)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                    e.currentTarget.style.color = 'rgba(240,232,216,0.7)'
                  }}
                >
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div
        className="px-6 lg:px-10 py-16"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-[2fr_1fr_1fr] gap-12">

          {/* Brand */}
          <div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              data-cursor="hover"
              style={{
                fontFamily: '"Fraunces", serif',
                fontSize: '2rem',
                fontWeight: 300,
                color: FOOTER_TEXT,
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'none',
                display: 'block',
                marginBottom: '1.25rem',
              }}
            >
              Ali<span style={{ color: 'var(--accent)' }}>.</span>
            </button>
            <p
              style={{
                fontFamily: '"Outfit", sans-serif',
                fontSize: '0.875rem',
                fontWeight: 300,
                color: 'rgba(240,232,216,0.45)',
                maxWidth: '28ch',
                lineHeight: 1.7,
              }}
            >
              Full Stack Developer crafting elegant, performant web experiences.
            </p>

            <div className="flex gap-4 mt-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  data-cursor="hover"
                  style={{
                    color: 'rgba(240,232,216,0.35)',
                    transition: 'color 0.25s ease',
                    cursor: 'none',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,232,216,0.35)'}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {navCols.map((col) => (
            <div key={col.title}>
              <p
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.65rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  marginBottom: '1.25rem',
                }}
              >
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => goTo(link.id)}
                      data-cursor="hover"
                      style={{
                        fontFamily: '"Outfit", sans-serif',
                        fontSize: '0.875rem',
                        fontWeight: 300,
                        color: 'rgba(240,232,216,0.5)',
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'none',
                        transition: 'color 0.25s ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = FOOTER_TEXT}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,232,216,0.5)'}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Currently building */}
          {/* <div>
            <p
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginBottom: '1.25rem',
              }}
            >
              Currently building
            </p>
            <div
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
                padding: '1.25rem',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '0.6rem',
                    color: '#4ade80',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  Active
                </span>
              </div>
              <p
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '0.95rem',
                  color: 'rgba(240,232,216,0.7)',
                  lineHeight: 1.4,
                }}
              >
                Open-source React component library for design systems
              </p>
            </div>
          </div> */}

        </div>
      </div>

      {/* Copyright bar */}
      <div className="px-6 lg:px-10 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.65rem',
              color: 'rgba(240,232,216,0.25)',
              letterSpacing: '0.05em',
            }}
          >
            © {year} Ali Ilyas. All rights reserved.
          </p>
        </div>
      </div>

    </footer>
  )
}