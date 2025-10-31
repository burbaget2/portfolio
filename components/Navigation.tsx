'use client'

import { useState, useEffect } from 'react'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={isScrolled ? 'nav-scrolled' : ''}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '1rem 0',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a 
          href="#home" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem', 
            textDecoration: 'none',
            color: 'var(--text)',
          }}
        >
          <img 
            src="/images/tonyheadshot.png" 
            alt="Tony Burbage"
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid var(--border)',
            }}
          />
          <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>
            Tony's Portfolio
          </span>
        </a>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <a href="#about" style={{ color: 'var(--text)' }}>About</a>
          <a href="#projects" style={{ color: 'var(--text)' }}>Projects</a>
          <a href="#contact" style={{ color: 'var(--text)' }}>Contact</a>
        </div>
      </div>
    </nav>
  )
}

