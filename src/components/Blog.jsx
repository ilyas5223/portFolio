import React, { useState } from 'react'

const posts = [
  {
    id: 1,
    tag: 'Architecture',
    title: 'Micro-Frontends in 2025: Patterns That Survive Production',
    excerpt: 'After migrating three large applications to micro-frontend architectures, here are the patterns that worked — and the anti-patterns that nearly cost us everything.',
    readTime: '8 min',
    date: 'Jan 15, 2025',
    colorScheme: { bg: '#FEF3C7', accent: '#D97706' },
    featured: true,
  },
  {
    id: 2,
    tag: 'Performance',
    title: 'React Server Components: A Pragmatic, No-Nonsense Guide',
    excerpt: "RSC is the biggest shift in React's history. This is a practical breakdown of when to use them, when not to, and how to debug them in production.",
    readTime: '12 min',
    date: 'Dec 4, 2024',
    colorScheme: { bg: '#DCFCE7', accent: '#16A34A' },
    featured: false,
  },
  {
    id: 3,
    tag: 'DevOps',
    title: 'Zero-Downtime Deployments with Docker & Kubernetes',
    excerpt: 'A production-tested walkthrough of our deployment pipeline that ensures zero downtime during releases, even at 10k requests per minute.',
    readTime: '10 min',
    date: 'Nov 18, 2024',
    colorScheme: { bg: '#DBEAFE', accent: '#2563EB' },
    featured: false,
  },
  {
    id: 4,
    tag: 'Career',
    title: 'From Junior to Senior: What Nobody Actually Tells You',
    excerpt: 'Technical skills are just the beginning. What actually separates senior developers from mid-level ones is mostly about communication, judgment, and ownership.',
    readTime: '6 min',
    date: 'Oct 30, 2024',
    colorScheme: { bg: '#FCE7F3', accent: '#BE185D' },
    featured: false,
  },
  {
    id: 5,
    tag: 'Database',
    title: 'PostgreSQL Query Optimization: The Deep Dive',
    excerpt: 'How I reduced a critical query from 4200ms to 85ms using indexing strategies, query planning, and materialized views. With benchmarks.',
    readTime: '14 min',
    date: 'Sep 12, 2024',
    colorScheme: { bg: '#EDE9FE', accent: '#7C3AED' },
    featured: false,
  },
]

export default function Blog() {
  const [hoveredId, setHoveredId] = useState(null)
  const featured = posts.find(p => p.featured)
  const rest = posts.filter(p => !p.featured)

  return (
    <section id="blog" className="section-pad px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <p className="section-label reveal-right">Blog</p>
            <h2 className="display-lg reveal-up delay-1">
              Thoughts &<br />
              <span style={{
                background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-l) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>writings</span>
            </h2>
          </div>
          <a href="#" className="btn-ghost self-start reveal-up delay-2" data-cursor="hover">
            All Articles ↗
          </a>
        </div>

        {/* Featured post */}
        {featured && (
          <article
            className="reveal-up delay-2 mb-6 p-8 lg:p-12 cursor-pointer group transition-all duration-500"
            style={{
              background: hoveredId === featured.id ? featured.colorScheme.bg : 'var(--white)',
              border: `1px solid ${hoveredId === featured.id ? featured.colorScheme.accent + '44' : 'var(--border)'}`,
              boxShadow: hoveredId === featured.id ? `0 16px 60px -12px ${featured.colorScheme.accent}22` : 'none',
            }}
            onMouseEnter={() => setHoveredId(featured.id)}
            onMouseLeave={() => setHoveredId(null)}
            data-cursor="view"
          >
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <span
                    className="mono-sm px-3 py-1"
                    style={{
                      background: featured.colorScheme.bg,
                      color: featured.colorScheme.accent,
                      border: `1px solid ${featured.colorScheme.accent}33`,
                    }}
                  >
                    {featured.tag}
                  </span>
                  <span
                    className="mono-sm px-2 py-0.5"
                    style={{ color: 'var(--accent)', background: 'var(--accent-ll)', border: '1px solid var(--accent)' }}
                  >
                    Featured
                  </span>
                </div>

                {/* FIX: on hover the bg is always a light pastel, so title must be dark.
                    Use colorScheme.accent which is always saturated + dark enough to
                    contrast on its own pastel. Off-hover: var(--ink) as normal. */}
                <h3
                  style={{
                    fontFamily: '"Fraunces", serif',
                    fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                    fontWeight: 300,
                    color: hoveredId === featured.id ? featured.colorScheme.accent : 'var(--ink)',
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                    marginBottom: '1rem',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {featured.title}
                </h3>

                <p className="body-text mb-6">{featured.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="mono-sm">{featured.date}</span>
                    <span className="mono-sm">{featured.readTime} read</span>
                  </div>
                  <span
                    style={{
                      fontFamily: '"Outfit", sans-serif',
                      fontSize: '0.8rem',
                      color: featured.colorScheme.accent,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    Read article
                    <svg
                      className="group-hover:translate-x-1 transition-transform duration-200"
                      width="14" height="14"
                      fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Visual side */}
              <div
                className="h-52 lg:h-64 flex items-center justify-center"
                style={{
                  background: featured.colorScheme.bg,
                  border: `1px solid ${featured.colorScheme.accent}22`,
                }}
              >
                <span
                  style={{
                    fontFamily: '"Fraunces", serif',
                    fontSize: '6rem',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: featured.colorScheme.accent,
                    opacity: 0.2,
                    lineHeight: 1,
                    userSelect: 'none',
                  }}
                >
                  {featured.tag[0]}
                </span>
              </div>
            </div>
          </article>
        )}

        {/* Rest of posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {rest.map((post, i) => (
            <article
              key={post.id}
              className={`reveal-up delay-${(i % 4) + 2} p-6 cursor-pointer group transition-all duration-400`}
              style={{
                background: hoveredId === post.id ? post.colorScheme.bg : 'var(--white)',
                border: `1px solid ${hoveredId === post.id ? post.colorScheme.accent + '44' : 'var(--border)'}`,
                transform: hoveredId === post.id ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: hoveredId === post.id ? `0 12px 40px -8px ${post.colorScheme.accent}22` : 'none',
              }}
              onMouseEnter={() => setHoveredId(post.id)}
              onMouseLeave={() => setHoveredId(null)}
              data-cursor="view"
            >
              <span
                className="mono-sm inline-block mb-4 px-2 py-0.5"
                style={{
                  background: post.colorScheme.bg,
                  color: post.colorScheme.accent,
                  border: `1px solid ${post.colorScheme.accent}33`,
                }}
              >
                {post.tag}
              </span>

              {/* FIX: same fix as featured — accent color on hover so title is
                  always readable against the light pastel card bg in both themes */}
              <h3
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '1rem',
                  fontWeight: 400,
                  color: hoveredId === post.id ? post.colorScheme.accent : 'var(--ink)',
                  lineHeight: 1.35,
                  marginBottom: '0.75rem',
                  transition: 'color 0.3s ease',
                }}
              >
                {post.title}
              </h3>

              <p className="body-text line-clamp-2 mb-4" style={{ fontSize: '0.8rem' }}>
                {post.excerpt}
              </p>

              <div
                className="flex items-center justify-between pt-4"
                style={{ borderTop: '1px solid var(--border-soft)' }}
              >
                <span className="mono-sm">{post.readTime} read</span>
                <svg
                  className="group-hover:translate-x-1 transition-transform duration-200"
                  width="14" height="14"
                  fill="none" viewBox="0 0 24 24"
                  stroke={post.colorScheme.accent}
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}