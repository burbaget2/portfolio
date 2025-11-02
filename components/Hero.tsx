'use client'

import { useEffect, useState } from 'react'

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    // Use requestAnimationFrame for smoother updates
    let ticking = false
    const optimizedScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', optimizedScroll, { passive: true })
    return () => window.removeEventListener('scroll', optimizedScroll)
  }, [])

  // Create morphing wave path based on scroll - more noticeable motion
  // Increased movement amplitude for more visible morphing
  const morphFactor = Math.sin(scrollY * 0.008) * 40 // More movement when you scroll
  const morphFactor2 = Math.cos(scrollY * 0.01) * 30 // Secondary movement for variation
  // Single smooth curve with peak and rising right side
  const wavePath = `M0,${200 + morphFactor} C${400 + morphFactor2},${150 + morphFactor + morphFactor2} ${800 - morphFactor2},${300 - morphFactor + morphFactor2} 1200,${140 + morphFactor} L1200,350 L0,350 Z`
  return (
    <>
      <section
        id="home"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--background)',
          color: 'var(--text)',
          paddingTop: '5rem',
          paddingBottom: '6rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h1 className="hero-title-burbs" style={{ color: 'var(--text)' }}>
            Hi! I'm Tony
          </h1>
          <p style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-12)', color: 'var(--text-light)', fontWeight: 'var(--font-light)' }}>
            End-to-end UX and service design, and a groundbreaker in AI-based design implementation
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#projects" className="btn">
              View My Work
            </a>
            <a href="#contact" className="btn btn-secondary">
              Get In Touch
            </a>
          </div>
        </div>
        <div 
          className="wave-divider" 
          style={{ 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            right: 0, 
            width: '100%',
            pointerEvents: 'none',
          }}
        >
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 1200 350" 
            preserveAspectRatio="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block', width: '100%', height: '100%' }}
          >
            <path d={wavePath} fill="var(--accent-warm)"/>
            
          </svg>
          {/* Coffee stain image */}
          <img 
            src="/images/CoffeeStain.png"
            alt=""
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '80px',
              width: '120px',
              height: 'auto',
              opacity: 0.6,
              pointerEvents: 'none',
              transform: 'rotate(-15deg)',
            }}
          />
        </div>
      </section>
    </>
  )
}

