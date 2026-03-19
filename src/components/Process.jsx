import React from 'react'

const STEPS = [
  {
    phase: 'Phase 01',
    title: 'Discovery',
    desc: "I ask the uncomfortable questions upfront — about constraints, failure modes, and what success actually means to you. I review any existing code, architecture, or docs before the proposal, not after. Better to find the landmines early.",
    bullets: [
      'Review existing codebase, docs, or product before the first call',
      'Define success metrics — outcomes, not just a feature list',
      'Surface risks and constraints that will affect scope and timeline',
    ],
  },
  {
    phase: 'Phase 02',
    title: 'Proposal',
    desc: "You get a concrete plan: milestones, timeline, and a fixed scope with pricing. If something is genuinely uncertain I'll say so — you'll get a range with reasoning, not a number I made up to win the project.",
    bullets: [
      'Milestone-by-milestone breakdown with clear deliverables',
      'Fixed pricing — no hidden add-ons or vague line items',
      '48-hour turnaround from discovery call to written proposal',
    ],
  },
  {
    phase: 'Phase 03',
    title: 'Build',
    desc: "Short iterations with weekly demos. I don't go dark for three weeks and surface with something unrecognizable. Every check-in has a clear status: what shipped, what's next, and any decisions that need your input.",
    bullets: [
      'Weekly demos — never more than a week without something to show',
      'Staging environment access throughout, not just at handoff',
      'Decisions that need your input are flagged immediately, not at deadline',
    ],
  },
  {
    phase: 'Phase 04',
    title: 'Launch & Handoff',
    desc: "We ship, monitor, and fix whatever surfaces. I can stay on for the next iteration or hand over with full documentation — runbooks, architecture notes, and a walkthrough. No cliff edges, no 'good luck with that'.",
    bullets: [
      'Production monitoring for the first two weeks post-launch',
      'Full handoff: architecture docs, runbooks, and deployment notes',
      'Optional retainer for ongoing iterations or support',
    ],
  },
]

const PRINCIPLES = [
  {
    title: 'No surprises',
    subtitle: 'Communication standard',
    detail: "Scope changes are discussed before they're built. Blockers surface in the weekly update, not the final demo. I'd rather have an awkward conversation early than an expensive one late.",
  },
  {
    title: 'Always visible',
    subtitle: 'Project transparency',
    detail: "You have access to the repo, staging environment, and project board throughout. I'm available during business hours across timezones. You'll never wonder where things stand.",
  },
  {
    title: 'You own it completely',
    subtitle: 'Clean handoffs',
    detail: "Every engagement ends with full documentation and a walkthrough of anything you need to maintain it. No lock-in, no black boxes, no knowledge hoarding.",
  },
]

const STATS = [
  { n: '< 24h',  l: 'Response time' },
  { n: '1–2',    l: 'Projects at a time' },
  { n: 'Weekly', l: 'Check-ins & demos' },
  { n: '100%',   l: 'Documented handoffs' },
]

const cardBase = "p-7 transition-all duration-400"
const cardStyle = { background: 'var(--white)', border: '1px solid var(--border)' }
const hover = {
  onMouseEnter: e => e.currentTarget.style.borderColor = 'var(--accent)',
  onMouseLeave: e => e.currentTarget.style.borderColor = 'var(--border)',
}

export default function Experience() {
  return (
    <section
      id="process"
      className="section-pad px-6 lg:px-10"
      style={{ background: 'var(--bg-2)' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p className="section-label reveal-right">Process</p>
          <h2 className="display-lg reveal-up delay-1">
            Clear steps,<br />
            <span style={{
              color: 'var(--accent)',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.82em',
              fontWeight: 400,
              letterSpacing: '-0.02em',
            }}>no surprises_</span>
          </h2>
        </div>

        {/* Column labels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
          <p className="mono-sm reveal-right">The Four Phases</p>
          <p className="mono-sm reveal-right delay-1 hidden lg:block">How I Work</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ── PHASE CARDS: order-1 to order-4 on mobile ── */}

          {/* Phase 1 */}
          <div className={`${cardBase} reveal-up delay-1 order-1 lg:order-none`} style={cardStyle} {...hover} data-cursor="hover">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.2rem', color: 'var(--ink)' }}>
                {STEPS[0].title}
              </h3>
              <span className="mono-sm px-2 py-0.5" style={{ background: 'var(--accent-ll)', color: 'var(--accent)', border: '1px solid var(--accent)' }}>
                Starts here
              </span>
            </div>
            <div className="mb-3">
              <span style={{ fontFamily: '"Outfit", sans-serif', fontSize: '0.875rem', color: 'var(--accent)', fontWeight: 500 }}>
                {STEPS[0].phase}
              </span>
            </div>
            <p className="body-text mb-4" style={{ fontSize: '0.85rem' }}>{STEPS[0].desc}</p>
            <ul className="space-y-1.5">
              {STEPS[0].bullets.map((b, j) => (
                <li key={j} className="flex gap-3">
                  <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '0.1rem' }}>→</span>
                  <span className="body-text" style={{ fontSize: '0.8125rem' }}>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Principle 1 */}
          <div className={`${cardBase} reveal-up delay-1 order-5 lg:order-none`} style={cardStyle} {...hover} data-cursor="hover">
            <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '0.25rem' }}>
              {PRINCIPLES[0].title}
            </h3>
            <div className="mb-3">
              <span style={{ fontFamily: '"Outfit", sans-serif', fontSize: '0.875rem', color: 'var(--accent)', fontWeight: 500 }}>
                {PRINCIPLES[0].subtitle}
              </span>
            </div>
            <p className="body-text" style={{ fontSize: '0.85rem' }}>{PRINCIPLES[0].detail}</p>
          </div>

          {/* Phase 2 */}
          <div className={`${cardBase} reveal-up delay-2 order-2 lg:order-none`} style={cardStyle} {...hover} data-cursor="hover">
            <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '0.25rem' }}>
              {STEPS[1].title}
            </h3>
            <div className="mb-3">
              <span style={{ fontFamily: '"Outfit", sans-serif', fontSize: '0.875rem', color: 'var(--accent)', fontWeight: 500 }}>
                {STEPS[1].phase}
              </span>
            </div>
            <p className="body-text mb-4" style={{ fontSize: '0.85rem' }}>{STEPS[1].desc}</p>
            <ul className="space-y-1.5">
              {STEPS[1].bullets.map((b, j) => (
                <li key={j} className="flex gap-3">
                  <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '0.1rem' }}>→</span>
                  <span className="body-text" style={{ fontSize: '0.8125rem' }}>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Principle 2 */}
          <div className={`${cardBase} reveal-up delay-2 order-6 lg:order-none`} style={cardStyle} {...hover} data-cursor="hover">
            <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '0.25rem' }}>
              {PRINCIPLES[1].title}
            </h3>
            <div className="mb-3">
              <span style={{ fontFamily: '"Outfit", sans-serif', fontSize: '0.875rem', color: 'var(--accent)', fontWeight: 500 }}>
                {PRINCIPLES[1].subtitle}
              </span>
            </div>
            <p className="body-text" style={{ fontSize: '0.85rem' }}>{PRINCIPLES[1].detail}</p>
          </div>

          {/* Phase 3 */}
          <div className={`${cardBase} reveal-up delay-3 order-3 lg:order-none`} style={cardStyle} {...hover} data-cursor="hover">
            <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '0.25rem' }}>
              {STEPS[2].title}
            </h3>
            <div className="mb-3">
              <span style={{ fontFamily: '"Outfit", sans-serif', fontSize: '0.875rem', color: 'var(--accent)', fontWeight: 500 }}>
                {STEPS[2].phase}
              </span>
            </div>
            <p className="body-text mb-4" style={{ fontSize: '0.85rem' }}>{STEPS[2].desc}</p>
            <ul className="space-y-1.5">
              {STEPS[2].bullets.map((b, j) => (
                <li key={j} className="flex gap-3">
                  <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '0.1rem' }}>→</span>
                  <span className="body-text" style={{ fontSize: '0.8125rem' }}>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Principle 3 */}
          <div className={`${cardBase} reveal-up delay-3 order-7 lg:order-none`} style={cardStyle} {...hover} data-cursor="hover">
            <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '0.25rem' }}>
              {PRINCIPLES[2].title}
            </h3>
            <div className="mb-3">
              <span style={{ fontFamily: '"Outfit", sans-serif', fontSize: '0.875rem', color: 'var(--accent)', fontWeight: 500 }}>
                {PRINCIPLES[2].subtitle}
              </span>
            </div>
            <p className="body-text" style={{ fontSize: '0.85rem' }}>{PRINCIPLES[2].detail}</p>
          </div>

          {/* Phase 4 */}
          <div className={`${cardBase} reveal-up delay-4 order-4 lg:order-none`} style={cardStyle} {...hover} data-cursor="hover">
            <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '0.25rem' }}>
              {STEPS[3].title}
            </h3>
            <div className="mb-3">
              <span style={{ fontFamily: '"Outfit", sans-serif', fontSize: '0.875rem', color: 'var(--accent)', fontWeight: 500 }}>
                {STEPS[3].phase}
              </span>
            </div>
            <p className="body-text mb-4" style={{ fontSize: '0.85rem' }}>{STEPS[3].desc}</p>
            <ul className="space-y-1.5">
              {STEPS[3].bullets.map((b, j) => (
                <li key={j} className="flex gap-3">
                  <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '0.1rem' }}>→</span>
                  <span className="body-text" style={{ fontSize: '0.8125rem' }}>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div
            className="reveal-scale delay-4 p-8 order-8 lg:order-none"
            style={{ background: 'var(--ink)', border: '1px solid var(--ink)' }}
          >
            <p className="mono-sm mb-6" style={{ color: 'var(--accent)', letterSpacing: '0.2em' }}>
              Working style
            </p>
            <div className="grid grid-cols-2 gap-6">
              {STATS.map((m) => (
                <div key={m.l}>
                  <p style={{
                    fontFamily: '"Fraunces", serif',
                    fontSize: '1.75rem',
                    fontWeight: 300,
                    color: 'var(--accent)',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}>
                    {m.n}
                  </p>
                  <p style={{
                    fontFamily: '"Outfit", sans-serif',
                    fontSize: '0.75rem',
                    color: 'var(--bg)',
                    opacity: 0.6,
                    marginTop: '0.3rem',
                  }}>
                    {m.l}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}