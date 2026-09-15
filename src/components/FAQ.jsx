import React, { useState, useRef } from 'react'

const faqs = [
  {
    q: 'What exactly do you build?',
    a: "Three things. AI voice agents that answer the phone, check availability and book the appointment -- with a dashboard showing every call, transcript and latency figure. Cold outreach engines: verified lead list, sequence, and sending infrastructure on your own domain. And rescue work on automations or agents someone else half-built. Everything else on this page is the engineering underneath those.",
    tag: 'Services',
  },
  {
    q: 'Why does the dashboard matter so much?',
    a: "Because without it you are trusting the agent instead of checking it. Most AI receptionists are a black box -- you never find out what yours said, or why a caller hung up. Mine logs every call with the transcript, recording, response latency and whether it actually booked. In week one you read those transcripts and tell me what to tighten. None of the cheap voice builds ship this, and every serious voice product does.",
    tag: 'Voice AI',
  },
  {
    q: 'What makes you different from the no-code crowd?',
    a: "Most people selling voice agents and automations are marketers who can wire two no-code tools together. That works until your calendar changes. I am an engineer -- the booking logic, the custom function endpoints, the CRM sync and the dashboard are all code I wrote. That is why the response time lands under half a second instead of the three-second pause that makes callers hang up, and why the jobs they keep failing at are the ones I find straightforward.",
    tag: 'General',
  },
  {
    q: 'What happens if you disappear?',
    a: "Everything runs in your own account, in your name, on your card -- the phone number, the platform, the domain. I record a short handover video showing whoever runs your front desk how to change the hours and the script. If I vanished tomorrow it would keep running, and you could hand it to anyone.",
    tag: 'Ownership',
  },
  {
    q: 'Can you guarantee results?',
    a: "No, and anyone who does is either lying or padding the price to cover the lie. What I guarantee is the deliverable: for outreach, a verified list with bounce rate under 3% -- over 5% and I rebuild it free. For voice, an agent that survives you trying to break it on a call with me before you pay. Results depend on your offer and your market, which are not mine to promise.",
    tag: 'Expectations',
  },
  {
    q: 'Is cold email going to burn my domain?',
    a: "It would, from your main domain at volume. So I never send from it. Separate lookalike domain, its own inboxes, warmed for two weeks, capped around forty a day per inbox, SPF/DKIM/DMARC configured properly, and a real unsubscribe in every message. Your primary domain never sends a single cold email.",
    tag: 'Outreach',
  },
  {
    q: 'My automation broke and I did not build it. Can you fix it?',
    a: "Usually, and this is the work I like most. Give me read access and I will tell you the probable cause in about twenty minutes -- often a missing idempotency guard re-firing records on retry, which shows up as duplicates rather than errors, which is why nothing is in your logs. Diagnosis is free. If it is not worth fixing I will say so rather than bill you to find out.",
    tag: 'Rescue',
  },
  {
    q: 'Where are you based, and what is your availability?',
    a: "Punjab, Pakistan -- PKT, which is UTC+5. In practice I overlap comfortably with UK and European mornings and can take US East Coast calls in my evening. I take on a small number of projects at a time so delivery stays on the timeline I quoted: a voice agent live in about a week, an outreach engine in five to seven days, rescue work in 24 to 48 hours.",
    tag: 'Availability',
  },
  {
    q: 'What is your stack?',
    a: "VAPI and Retell for voice, n8n for automation, Twilio for telephony, Next.js and React on the front, Node and TypeScript behind it, Supabase or PostgreSQL for data, Vercel for hosting. Apify for scraping. I pick per problem rather than per habit, but that is the combination I reach for.",
    tag: 'Technical',
  },
  {
    q: 'Will you do the full-stack work too -- dashboards, APIs, a RAG chatbot?',
    a: "Yes, and it is where the interesting problems are: multi-tenant dashboards, custom endpoints, RAG over your own documentation with citations back to the source page. SkyfurnitureCA and ragbase in the Projects section were both built this way. In practice this tends to start as an add-on to an automation or voice project rather than as the first thing we do together.",
    tag: 'Technical',
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
