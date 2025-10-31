'use client'

import { useEffect, useState, useRef } from 'react'

export default function About() {
  const [scrollY, setScrollY] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Create morphing wave path based on scroll position
  const morphFactor = Math.sin(scrollY * 0.005) * 40
  const morphFactor2 = Math.cos(scrollY * 0.008) * 25
  const wavePath = `M0,${175 + morphFactor} C${150 + morphFactor2},${310 + morphFactor} ${300 - morphFactor2},${40 - morphFactor} ${450 + morphFactor2},${175 + morphFactor} C${600 - morphFactor2},${310 + morphFactor} ${750 + morphFactor2},${40 - morphFactor} ${900 - morphFactor2},${175 + morphFactor} C${1050 + morphFactor2},${310 + morphFactor} ${1200 - morphFactor2},${40 - morphFactor} ${1200 - morphFactor2},${40 - morphFactor} L1200,350 L0,350 Z`
  return (
    <section id="about" ref={sectionRef} className="section-oroya hero-about-flow" style={{ position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="section-brand-name">ABOUT ME</h2>
        
        <div style={{ maxWidth: '800px', fontSize: '1.125rem', lineHeight: 1.8, marginTop: '2rem' }}>
          <p style={{ marginBottom: '3rem' }}>
            I'm a seasoned UX Designer & Design Lead, passionate about crafting product and service experiences that simplify tasks, clarify information, and feel delightful to use. With decades of experience, I've delivered seamless digital solutions for global brands and everyday users alike. I'm guided by user needs, and a user-centered approach. I bridge design and engineering by rapidly translating ideas into working code. Using tools like Claude Code, Cursor, and modern design systems, I "vibe code" end-to-end flows that can be tested, iterated, and shipped quickly, ensuring real user feedback drives constant improvement.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            <div>
              <h3 className="all-caps" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>User Research</h3>
              <p style={{ color: 'var(--text-light)' }}>Understanding user needs and behaviors</p>
            </div>
            <div>
              <h3 className="all-caps" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>End-to-end UX Strategy</h3>
              <p style={{ color: 'var(--text-light)' }}>Crafting an end-to-end vision and validating</p>
            </div>
            <div>
              <h3 className="all-caps" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Prototyping</h3>
              <p style={{ color: 'var(--text-light)' }}>Using AI tools to create working prototypes that can be validated and even shipped</p>
            </div>
          </div>
        </div>
      </div>
      <div 
        className="wave-divider" 
        style={{ 
          transform: 'rotate(180deg)', 
          top: 0, 
          bottom: 'auto',
        }}
      >
        <svg viewBox="0 0 1200 350" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d={wavePath} fill="var(--background)" style={{ transition: 'd 0.3s ease-out' }}/>
        </svg>
      </div>
    </section>
  )
}

