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
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '1rem 0',
        backgroundColor: isScrolled ? 'var(--background)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        transition: 'all 0.3s ease',
        boxShadow: isScrolled ? '0 2px 20px var(--shadow)' : 'none',
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#home" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)' }}>
          Portfolio
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

