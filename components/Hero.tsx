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

  // Create morphing wave path based on scroll - waves will deform as you scroll
  // Made more pronounced so you can see it clearly
  const morphFactor = Math.sin(scrollY * 0.01) * 60 // Creates wave morphing effect
  const morphFactor2 = Math.cos(scrollY * 0.015) * 50 // Second wave for more complex morphing
  const morphFactor3 = Math.sin(scrollY * 0.008) * 30 // Third factor for additional variation
  const wavePath = `M0,${175 + morphFactor} C${150 + morphFactor2},${310 + morphFactor + morphFactor3} ${300 - morphFactor2},${40 - morphFactor + morphFactor3} ${450 + morphFactor2},${175 + morphFactor} C${600 - morphFactor2},${310 + morphFactor - morphFactor3} ${750 + morphFactor2},${40 - morphFactor - morphFactor3} ${900 - morphFactor2},${175 + morphFactor} C${1050 + morphFactor2},${310 + morphFactor + morphFactor3} ${1200 - morphFactor2},${40 - morphFactor + morphFactor3} ${1200 - morphFactor2},${40 - morphFactor + morphFactor3} L1200,350 L0,350 Z`
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
          <h1 className="hero-title-oroya" style={{ color: 'var(--text)' }}>
            UX Designer & Creative
          </h1>
          <p style={{ fontSize: '1.5rem', marginBottom: '3rem', color: 'var(--text-light)', fontWeight: 300 }}>
            Creating beautiful and intuitive user experiences
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
            pointerEvents: 'none',
          }}
        >
          <svg viewBox="0 0 1200 350" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d={wavePath} fill="var(--accent-warm)"/>
          </svg>
        </div>
      </section>
    </>
  )
}

