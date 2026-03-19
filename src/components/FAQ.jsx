import React, { useState, useRef } from 'react'

const faqs = [
  {
    q: 'Are you available for freelance or contract work?',
    a: "Yes -- I take on select freelance and contract projects alongside my full-time work. I'm particularly drawn to challenging problems: SaaS platforms, complex APIs, performance audits, and greenfield builds. Reach out with your project details and let's see if we're a good fit.",
    tag: 'Availability',
  },
  {
    q: "What's your typical project process?",
    a: 'I follow a 5-phase approach: Discovery (understanding goals and constraints), Architecture (tech stack + system design), Development (iterative builds with weekly check-ins), QA & Testing (automated + manual), and finally Deployment & Handoff with complete documentation.',
    tag: 'Process',
  },
  {
    q: 'Do you work with designers, or can you handle design too?',
    a: "Both. I love collaborating with talented designers and can translate Figma designs with pixel-perfect precision. For smaller projects, I can handle UI/UX design myself -- years of implementation work has sharpened my design eye considerably.",
    tag: 'Design',
  },
  {
    q: "What's your preferred tech stack?",
    a: 'For most web applications: React/Next.js frontend, Node.js or Python/FastAPI backend, PostgreSQL as the primary datastore, Redis for caching, and AWS or Vercel for hosting. That said, I choose tools based on the problem -- I\'m framework-agnostic when the situation calls for it.',
    tag: 'Technical',
  },
  {
    q: 'Can you work on an existing legacy codebase?',
    a: "Absolutely -- and I actually enjoy it. There's a detective element to understanding legacy decisions and finding the safest path forward. I've successfully refactored several large codebases with zero downtime and no regressions.",
    tag: 'Technical',
  },
  {
    q: 'How do you handle communication during a project?',
    a: "Transparency is core to how I work. I provide weekly progress updates, use Linear or Notion for project management, and am available during business hours across timezones. You'll never be left wondering where things stand.",
    tag: 'Process',
  },
  {
    q: 'What makes you different from other full-stack developers?',
    a: "I combine deep technical expertise with product thinking and strong communication. I ask 'why' before 'how'. I care about building things that are maintainable, scalable, and actually solve the problem -- not just technically impressive.",
    tag: 'General',
  },
  {
    q: "What's your availability like?",
    a: "I'm based in San Francisco (PST) and typically take on 1-2 freelance projects at a time to ensure quality. For contract work, I can commit 20-40 hours/week. For full-time opportunities, I'm open to discussions.",
    tag: 'Availability',
  },
]

function AccordionItem({ faq, index, isOpen, onToggle }) {
  const bodyRef = useRef(null)

  return (
    <div
      className={`reveal-up delay-${(index % 5) + 1} border-b`}
      style={{ borderColor: 'var(--border)' }}
    >
      <button
        onClick={onToggle}
        data-cursor="hover"
        className="w-full flex items-start justify-between gap-6 py-7 text-left group"
      >
        <div className="flex items-start gap-4 flex-1">
          <span
            className="mono-sm mt-1 flex-shrink-0 px-2 py-0.5"
            style={{
              background: 'var(--accent-ll)',
              color: 'var(--accent)',
              border: '1px solid var(--accent)',
              opacity: isOpen ? 1 : 0.6,
              transition: 'opacity 0.25s ease',
            }}
          >
            {faq.tag}
          </span>
          <span
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: isOpen ? 'var(--accent)' : 'var(--ink)',
              fontWeight: 400,
              transition: 'color 0.3s ease',
              lineHeight: 1.3,
            }}
          >
            {faq.q}
          </span>
        </div>
        {/* Plus/minus icon */}
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300"
          style={{
            borderColor: isOpen ? 'var(--accent)' : 'var(--border)',
            background: isOpen ? 'var(--accent)' : 'transparent',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          <svg
            width="12" height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke={isOpen ? 'var(--bg)' : 'var(--ink-soft)'}
            strokeWidth={1.5}
          >
            <line x1="6" y1="0" x2="6" y2="12" />
            <line x1="0" y1="6" x2="12" y2="6" />
          </svg>
        </div>
      </button>

      {/* Answer with smooth height animation */}
      <div
        ref={bodyRef}
        style={{
          maxHeight: isOpen ? '400px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <p
          className="body-text pb-7 max-w-3xl"
          style={{
            fontSize: '0.9rem',
            paddingLeft: 'calc(2.5rem + 1rem)',
          }}
        >
          {faq.a}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <section
      id="faqs"
      className="section-pad px-6 lg:px-10"
      style={{ background: 'var(--bg-2)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
          {/* Sticky Left */}
          <div className="lg:sticky lg:top-28 reveal-right">
            <p className="section-label">FAQs</p>
            <h2 className="display-lg" style={{ marginBottom: '1.5rem' }}>
              Questions<br />
              & <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>answers</em>
            </h2>
            <p className="body-text mb-8" style={{ maxWidth: '28ch' }}>
              Everything you need to know before we work together.
            </p>
            <button
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="btn-mag"
              data-cursor="hover"
            >
              <span>Ask Me Directly</span>
            </button>

            {/* Progress indicator */}
            <div className="mt-12">
              <p className="mono-sm mb-4">
                {openIdx + 1} / {faqs.length}
              </p>
              <div
                className="h-px w-full"
                style={{ background: 'var(--border)' }}
              >
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    background: 'var(--accent)',
                    width: `${((openIdx + 1) / faqs.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Accordion */}
          <div
            style={{
              borderTop: '1px solid var(--border)',
            }}
          >
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
