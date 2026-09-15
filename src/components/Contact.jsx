import React, { useState, useId } from 'react'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'

const FORMSPREE_ID = 'xgonpldl';

const socials = [
  {
    icon: <Github size={18} strokeWidth={1.5} />,
    label: 'GitHub',
    value: 'github.com/ilyas5223',
    href: 'https://github.com/ilyas5223',
  },
  {
    icon: <Linkedin size={18} strokeWidth={1.5} />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/ali-ilyas-b343463a8',
    href: 'https://www.linkedin.com/in/ali-ilyas-b343463a8/',
  },
  {
    icon: <Twitter size={18} strokeWidth={1.5} />,
    label: 'Twitter / X',
    value: '@Ily5223',
    href: 'https://x.com/Ily5223',
  },
  {
    icon: <Mail size={18} strokeWidth={1.5} />,
    label: 'Email',
    value: 'aliilyas5223@gmail.com',
    href: 'mailto:aliilyas5223@gmail.com',
  },
]

const WHAT_YOU_GET = [
  'AI voice agents + call dashboard',
  'Cold outreach engines you own',
  'Broken automation rescue',
  'n8n & Make.com builds',
  'RAG chatbots over your docs',
  'Custom endpoints & CRM sync',
]

export default function Contact() {
  const formId = useId()
  const [form, setForm]     = useState({ name: '', email: '', company: '', budget: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [errMsg, setErrMsg] = useState('')

  const set = (k) => (e) => setForm(prev => ({ ...prev, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.email.trim())   e.email   = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email address'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('loading')

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name:     form.name,
          email:    form.email,
          company:  form.company,
          budget:   form.budget,
          message:  form.message,
          _subject: `Portfolio enquiry from ${form.name}`,
        }),
      })

      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', company: '', budget: '', message: '' })
      } else {
        const data = await res.json().catch(() => ({}))
        setErrMsg(data?.errors?.[0]?.message || 'Something went wrong. Please try again or email me directly.')
        setStatus('error')
      }
    } catch (_) {
      setErrMsg('Network error. Check your connection or email me directly at aliilyas5223@gmail.com')
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-pad px-6 lg:px-10"
    >
      <div className="max-w-7xl mx-auto">

        {/* Top: Big headline */}
        <div className="mb-16 text-center">
          <p className="section-label justify-center reveal-right">Contact</p>
          <h2
            id="contact-heading"
            className="display-xl reveal-up delay-1"
            style={{ maxWidth: '14ch', margin: '0 auto', textAlign: 'center' }}
          >
            Tell me what is{' '}
            <span style={{
              color: 'var(--accent)',
              borderBottom: '3px solid var(--accent)',
              paddingBottom: '0.05em',
            }}>ringing out</span>
          </h2>
          <p className="body-text reveal-up delay-2 mt-6 mx-auto" style={{ maxWidth: '46ch', textAlign: 'center' }}>
            Missed calls after hours, an automation that quietly broke, or a pipeline that sends nothing.
            Describe it in two lines and I will tell you whether I can help — including when the answer is no.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-start">

          {/* Left: Info */}
          <div>
            {/* What you get */}
            <div
              className="reveal-scale delay-2 p-6 mb-4"
              style={{
                background: 'var(--white)',
                border: '1px solid var(--border)',
                position: 'relative',
              }}
            >
              <span
                className="mono-sm px-3 py-1"
                style={{
                  position: 'absolute',
                  top: '-0.85rem',
                  right: '1.25rem',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  color: 'var(--accent)',
                  letterSpacing: '0.1em',
                }}
              >
                5+ production apps shipped
              </span>

              <p
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '1rem',
                  color: 'var(--ink)',
                  marginBottom: '0.6rem',
                }}
              >
                What you get
              </p>

              <p className="body-text" style={{ fontSize: '0.8rem', lineHeight: 1.7, marginBottom: '1.1rem' }}>
                Built by an engineer, not assembled from no-code parts. Everything
                runs in your own accounts and your own name, so you can hand it to
                anyone later — including someone who is not me.
              </p>

              <div
                className="grid grid-cols-2 gap-x-4 gap-y-0 pt-4"
                style={{ borderTop: '1px solid var(--border-soft)' }}
              >
                {WHAT_YOU_GET.map((item) => (
                  <div key={item} className="flex items-center gap-2 py-1.5">
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        background: 'var(--accent)',
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: '"Outfit", sans-serif',
                        fontSize: '0.75rem',
                        color: 'var(--ink-soft)',
                        fontWeight: 300,
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="space-y-0 mb-8 reveal-right">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="group flex items-center gap-5 py-5 border-b transition-all duration-300"
                  style={{ borderColor: 'var(--border)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.paddingLeft = '0.75rem'
                    e.currentTarget.style.borderColor = 'var(--accent)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.paddingLeft = '0'
                    e.currentTarget.style.borderColor = 'var(--border)'
                  }}
                >
                  <span
                    className="w-10 h-10 flex items-center justify-center border transition-all duration-300"
                    style={{ borderColor: 'var(--border)', color: 'var(--accent)' }}
                  >
                    {s.icon}
                  </span>

                  <div className="flex-1">
                    <p className="mono-sm">{s.label}</p>
                    <p
                      style={{
                        fontFamily: '"Outfit", sans-serif',
                        fontSize: '0.875rem',
                        color: 'var(--ink)',
                        fontWeight: 400,
                        marginTop: '0.1rem',
                      }}
                    >
                      {s.value}
                    </p>
                  </div>

                  <svg
                    className="group-hover:translate-x-1 group-hover:opacity-100 opacity-0 transition-all duration-300"
                    width="16" height="16"
                    fill="none" viewBox="0 0 24 24"
                    stroke="var(--accent)"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="reveal-up delay-2">
            {status === 'sent' ? (
              <div
                className="flex flex-col items-center justify-center text-center py-20 px-10"
                style={{ background: 'var(--white)', border: '1px solid var(--border)', minHeight: '520px' }}
                role="alert"
                aria-live="polite"
              >
                <div
                  className="w-16 h-16 flex items-center justify-center border mb-6"
                  style={{ borderColor: 'var(--accent)' }}
                  aria-hidden="true"
                >
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="var(--accent)" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: '"Fraunces", serif',
                    fontSize: '2rem',
                    fontWeight: 300,
                    color: 'var(--ink)',
                    marginBottom: '0.75rem',
                  }}
                >
                  Message received.
                </h3>
                <p className="body-text mb-8" style={{ maxWidth: '36ch' }}>
                  I'll be in touch within 24 hours — usually the same day if you wrote during UK or European hours.
                </p>
                <button
                  onClick={() => { setStatus('idle'); setErrors({}) }}
                  className="btn-ghost"
                  data-cursor="hover"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
                style={{ background: 'var(--white)', border: '1px solid var(--border)', padding: '2.5rem' }}
              >
                <p className="mono-sm mb-8">Send a message</p>

                {status === 'error' && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="mb-5 p-4 flex gap-3 items-start"
                    style={{ background: '#FFF1F2', border: '1px solid #FCA5A5' }}
                  >
                    <svg aria-hidden="true" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#DC2626" strokeWidth={2} style={{ flexShrink: 0, marginTop: '0.1rem' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    </svg>
                    <p style={{ fontFamily: '"Outfit", sans-serif', fontSize: '0.875rem', color: '#DC2626', fontWeight: 300 }}>
                      {errMsg}
                    </p>
                  </div>
                )}

                {/* Row 1 — full width on mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor={`${formId}-name`} className="mono-sm block mb-2">
                      Full Name <span aria-hidden="true" style={{ color: 'var(--accent)' }}>*</span>
                    </label>
                    <input
                      id={`${formId}-name`}
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={set('name')}
                      onBlur={() => {
                        if (!form.name.trim()) setErrors(e => ({ ...e, name: 'Name is required' }))
                        else setErrors(e => { const n = { ...e }; delete n.name; return n })
                      }}
                      placeholder="Write your name"
                      className="field"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? `${formId}-name-err` : undefined}
                      style={{ borderColor: errors.name ? '#DC2626' : undefined }}
                    />
                    {errors.name && (
                      <p id={`${formId}-name-err`} role="alert" style={{ fontFamily: '"Outfit", sans-serif', fontSize: '0.75rem', color: '#DC2626', marginTop: '0.25rem' }}>
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor={`${formId}-email`} className="mono-sm block mb-2">
                      Email <span aria-hidden="true" style={{ color: 'var(--accent)' }}>*</span>
                    </label>
                    <input
                      id={`${formId}-email`}
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={set('email')}
                      onBlur={() => {
                        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
                          setErrors(e => ({ ...e, email: 'Enter a valid email' }))
                        else setErrors(e => { const n = { ...e }; delete n.email; return n })
                      }}
                      placeholder="your@email.com"
                      className="field"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? `${formId}-email-err` : undefined}
                      style={{ borderColor: errors.email ? '#DC2626' : undefined }}
                    />
                    {errors.email && (
                      <p id={`${formId}-email-err`} role="alert" style={{ fontFamily: '"Outfit", sans-serif', fontSize: '0.75rem', color: '#DC2626', marginTop: '0.25rem' }}>
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2 — full width on mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor={`${formId}-company`} className="mono-sm block mb-2">Company</label>
                    <input
                      id={`${formId}-company`}
                      type="text"
                      autoComplete="organization"
                      value={form.company}
                      onChange={set('company')}
                      placeholder="Write company/project name"
                      className="field"
                    />
                  </div>
                  <div>
                    <label htmlFor={`${formId}-budget`} className="mono-sm block mb-2">Budget Range</label>
                    <select
                      id={`${formId}-budget`}
                      value={form.budget}
                      onChange={set('budget')}
                      className="field appearance-none"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238892A4' stroke-width='1.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
                    >
                      <option value="">Select range</option>
                      <option value="under-500">Under $500</option>
                      <option value="500-1000">$500 – $1000</option>
                      <option value="1000-1500">$1000 – $1500</option>
                      <option value="1500+">$1500+</option>
                      <option value="discuss">Let's discuss</option>
                    </select>
                  </div>
                </div>

                <div className="mb-7">
                  <label htmlFor={`${formId}-message`} className="mono-sm block mb-2">
                    Message <span aria-hidden="true" style={{ color: 'var(--accent)' }}>*</span>
                  </label>
                  <textarea
                    id={`${formId}-message`}
                    rows={5}
                    value={form.message}
                    onChange={set('message')}
                    onBlur={() => {
                      if (!form.message.trim()) setErrors(e => ({ ...e, message: 'Message is required' }))
                      else setErrors(e => { const n = { ...e }; delete n.message; return n })
                    }}
                    placeholder="Tell me about your project, timeline, and what you're hoping to achieve..."
                    className="field resize-none"
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? `${formId}-message-err` : undefined}
                    style={{ borderColor: errors.message ? '#DC2626' : undefined }}
                  />
                  {errors.message && (
                    <p id={`${formId}-message-err`} role="alert" style={{ fontFamily: '"Outfit", sans-serif', fontSize: '0.75rem', color: '#DC2626', marginTop: '0.25rem' }}>
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-mag w-full justify-center"
                  data-cursor="hover"
                  aria-disabled={status === 'loading'}
                  style={{ opacity: status === 'loading' ? 0.7 : 1 }}
                >
                  <span className="flex items-center gap-3 justify-center">
                    {status === 'loading' ? (
                      <>
                        <svg aria-hidden="true" className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg aria-hidden="true" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                  </span>
                </button>

                <p className="mono-sm mt-4 text-center" style={{ color: 'var(--ink-faint)', letterSpacing: '0.05em', textTransform: 'none', fontSize: '0.65rem' }}>
                  Or email directly:{' '}
                  <a href="mailto:aliilyas5223@gmail.com" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
                    aliilyas5223@gmail.com
                  </a>
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}