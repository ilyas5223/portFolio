import React, { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

const links = [
  { label: 'Services', id: 'services' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Process', id: 'process' },
  // { label: 'Blog', id: 'blog' },
  { label: 'FAQs', id: 'faqs' },
  { label: 'Contact', id: 'contact' },
]

export default function Navbar({ visible }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const { dark, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      for (let i = links.length - 1; i >= 0; i--) {
        const el = document.getElementById(links[i].id)
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActive(links[i].id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && mobileOpen) setMobileOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  const goTo = (id) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 transition-all duration-600"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        background: scrolled ? 'rgba(var(--bg-rgb, 248,243,234), 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-soft)' : '1px solid transparent',
        transition: 'opacity 0.8s ease, transform 0.8s var(--ease-expo), background 0.5s ease, border-color 0.5s ease',
        // For dark mode
        backgroundColor: scrolled
          ? dark ? 'rgba(13,13,15,0.88)' : 'rgba(248,243,234,0.88)'
          : 'transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-[72px]">
        {/* Logo / Monogram */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="relative group"
          data-cursor="hover"
        >
          <div
            className="w-9 h-9 flex items-center justify-center border transition-all duration-300 group-hover:border-[var(--accent)]"
            style={{ borderColor: 'var(--border)' }}
          >
            <span
              style={{
                fontFamily: '"Fraunces", serif',
                fontSize: '1.25rem',
                fontWeight: 300,
                color: 'var(--ink)',
              }}
            >
              AI
            </span>
          </div>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => goTo(link.id)}
              data-cursor="hover"
              className="relative group py-1"
              style={{
                fontFamily: '"Outfit", sans-serif',
                fontSize: '0.8125rem',
                fontWeight: active === link.id ? 500 : 300,
                color: active === link.id ? 'var(--accent)' : 'var(--ink-soft)',
                letterSpacing: '0.02em',
                transition: 'color 0.25s ease',
              }}
            >
              {link.label}
              <span
                className="absolute bottom-0 left-0 h-px bg-[var(--accent)] transition-all duration-300"
                style={{ width: active === link.id ? '100%' : '0%' }}
              />
            </button>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Dark mode toggle */}
          <button
            onClick={toggle}
            className="theme-toggle"
            data-cursor="hover"
            title="Toggle theme"
            aria-label="Toggle dark mode"
          />

          {/* Hire me CTA */}
          <button
            onClick={() => goTo('contact')}
            data-cursor="hover"
            className="hidden md:block btn-mag text-xs py-2.5 px-5"
          >
            <span className="flex items-center gap-2">
              Hire Me
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-1.5"
            onClick={() => setMobileOpen(v => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            data-cursor="hover"
          >
            <span aria-hidden="true" className={`block w-5 h-px transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[9px]' : ''}`} style={{ background: 'var(--ink)' }} />
            <span aria-hidden="true" className={`block w-5 h-px transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} style={{ background: 'var(--ink)' }} />
            <span aria-hidden="true" className={`block w-5 h-px transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} style={{ background: 'var(--ink)' }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-nav"
        className="md:hidden overflow-hidden transition-all duration-500"
        aria-label="Mobile navigation"
        style={{
          maxHeight: mobileOpen ? '400px' : '0px',
          background: dark ? 'rgba(13,13,15,0.97)' : 'rgba(248,243,234,0.97)',
          borderTop: mobileOpen ? '1px solid var(--border)' : 'none',
        }}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => { setMobileOpen(false); goTo(link.id) }}
              className="text-left text-link"
              tabIndex={mobileOpen ? 0 : -1}
              style={{
                fontFamily: '"Outfit", sans-serif',
                fontSize: '1.1rem',
                fontWeight: 300,
                color: 'var(--ink)',
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { setMobileOpen(false); goTo('contact') }}
            className="btn-mag w-fit mt-2"
            tabIndex={mobileOpen ? 0 : -1}
          >
            <span>Hire Me</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
