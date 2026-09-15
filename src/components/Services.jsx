import Marquee from './Marquee'

const marqueeItems = [
  'VAPI', 'Retell AI', 'n8n', 'Make.com', 'Twilio', 'Call transcripts', 'Sub-second latency',
  'Calendar booking logic', 'CRM sync', 'Idempotency guards', 'Error alerting', 'Cold email infrastructure',
  'SPF / DKIM / DMARC', 'Lead scraping & verification', 'Next.js', 'React', 'TypeScript', 'Node.js',
  'Supabase', 'PostgreSQL', 'Vercel',
]

/*
  Service copy is written in the same voice as the rest of this portfolio:
  direct, first-person, no marketing fluff. Claims point at real, shippable
  evidence — the projects in Projects.jsx — instead of invented metrics.
*/
const SERVICES = [
  {
    title: 'AI Voice Agent, With Receipts',
    description:
      "An inbound agent that answers in two rings, checks real availability and books the appointment — plus the dashboard that shows you every call, transcript, latency figure and outcome. Most AI receptionists are a black box; you never find out what yours said or why a caller hung up. With this one you are checking the agent, not trusting it.",
    outcome: 'Live in a week. Runs on your own account, in your name.',
    tags: ['VAPI', 'Retell AI', 'Twilio', 'Supabase'],
  },
  {
    title: 'Cold Outreach Engine',
    description:
      'ICP definition, a verified lead list scraped and enriched, a three-email sequence written in your voice, and sending infrastructure on your own domain — warmed, authenticated, capped. You own every piece of it. I am not renting you a seat in a tool you lose access to when we stop working together.',
    outcome: 'Bounce rate under 3%, or I rebuild the list free.',
    tags: ['Lead scraping', 'Email verification', 'SPF/DKIM/DMARC', 'Sequencing'],
  },
  {
    title: 'Automation Rescue',
    description:
      "The “it worked until it didn't” jobs. I diagnose and fix n8n, Make and voice-agent builds someone else half-finished — usually a missing idempotency guard re-firing records on retry, or no error alerting so nothing lands in the logs. Diagnosis is free; I will tell you if it is not worth fixing.",
    outcome: 'Named probable cause before you pay. Fixed in 24–48 hours.',
    tags: ['n8n', 'Make.com', 'Debugging', 'Error alerting'],
  },
  {
    title: 'The Backend No-Code Can’t Reach',
    description:
      'Where the automation stops and real software starts: custom function endpoints, CRM sync, multi-tenant dashboards, RAG over your own documentation. SkyfurnitureCA (dual-currency e-commerce, built solo for a real client) and ragbase (multi-tenant SaaS with Stripe billing) were both shipped this way.',
    outcome: 'The part that makes the agent fast instead of almost working.',
    tags: ['Next.js', 'React', 'Node.js', 'PostgreSQL'],
  },
]

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
                Automation that<br />
                <span style={{
                  color: 'var(--accent)',
                  textDecoration: 'underline',
                  textDecorationThickness: '3px',
                  textUnderlineOffset: '6px',
                }}>you can audit.</span>
              </h2>

              <p
                className="body-text reveal-up delay-2"
                style={{ maxWidth: '52ch' }}
              >
                Most people building voice agents and automations are marketers
                wiring two no-code tools together — and it works until your
                calendar changes. I am an engineer, so the booking logic, the
                CRM sync and the dashboard are all custom. That is also why you
                get to see inside instead of taking my word for it.
              </p>
            </div>
          </div>

          {/* ── Service Cards Grid ── */}
          <div className="grid sm:grid-cols-2 gap-5">
            {SERVICES.map((service, i) => (
                <article
                  key={service.title}
                  className={`reveal-scale delay-${i + 1} h-full`}
                  style={{
                    background: 'var(--white)',
                    border: '1px solid var(--border)',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    /*
                      No 3D tilt and no soft glow here on purpose. The card used
                      to rotate on perspective() and carry a wide accent-coloured
                      shadow; the transform promoted the card to its own GPU layer,
                      which re-rasterised the body copy and left it visibly blurred,
                      and the shadow washed the text at the card edges. A flat lift
                      plus a border colour reads the same and keeps the text sharp.
                    */
                    transition: 'border-color 0.3s ease, transform 0.3s var(--ease-expo)',
                  }}
                  data-cursor="hover"
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--accent)'
                    e.currentTarget.style.transform = 'translateY(-3px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.transform = 'none'
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
            ))}
          </div>

        </div>
      </section>
    </>
  )
}