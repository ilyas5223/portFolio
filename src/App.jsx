import React, { useState, Suspense, lazy } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { useScrollReveal } from './hooks/useScrollReveal'

// Critical path -- loaded immediately (above fold)
import Preloader    from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar       from './components/Navbar'
import Hero         from './components/Hero'

// Below-fold sections -- lazy loaded
// Each becomes its own chunk; browser fetches them only when needed.
// Improves Lighthouse TTI and LCP significantly.
const Services      = lazy(() => import('./components/Services'))
const Skills     = lazy(() => import('./components/Skills'))
const Projects   = lazy(() => import('./components/Projects'))
const Process = lazy(() => import('./components/Process'))
// const Blog       = lazy(() => import('./components/Blog'))
const FAQ        = lazy(() => import('./components/FAQ'))
const Contact    = lazy(() => import('./components/Contact'))
const Footer     = lazy(() => import('./components/Footer'))
const BackToTop  = lazy(() => import('./components/BackToTop'))

/** Minimal loading placeholder -- same height as section to prevent layout shift */
function SectionSkeleton() {
  return (
    <div
      aria-hidden="true"
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
      }}
    >
      <div
        style={{
          width: 28, height: 28,
          border: '2px solid var(--border)',
          borderTopColor: 'var(--accent)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function PortfolioContent() {
  const [loaded, setLoaded] = useState(false)
  useScrollReveal([loaded])

  return (
    <div className="grain-overlay">
      <Preloader onDone={() => setLoaded(true)} />
      <CustomCursor />
      <ScrollProgress />
      <Navbar visible={loaded} />

      {/*
        id="main-content" is the target for the skip link in index.html.
        tabIndex={-1} allows focus() to be called on it programmatically
        without making it part of the natural tab order.
      */}
      <main id="main-content" tabIndex={-1} style={{ outline: 'none' }}>
        <Hero />

        <Suspense fallback={<SectionSkeleton />}>
          <Services />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Process />
        </Suspense>

        {/* <Suspense fallback={<SectionSkeleton />}>
          <Blog />
        </Suspense> */}

        <Suspense fallback={<SectionSkeleton />}>
          <FAQ />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <Suspense fallback={null}>
        <BackToTop />
      </Suspense>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  )
}
