'use client'

import { useState, useEffect } from 'react'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      className={isScrolled ? 'nav-scrolled' : 'nav-default'}
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
          href="/#home" 
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
          <span style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-bold)' }}>
            Tony's Portfolio
          </span>
        </a>
        
        {/* Desktop Navigation */}
        <div className="desktop-nav" style={{ display: 'flex', gap: '2rem' }}>
          <a href="/#about" style={{ color: 'var(--accent-warm-dark)', fontWeight: 'var(--font-bold)' }}>About</a>
          <a href="/#projects" style={{ color: 'var(--accent-warm-dark)', fontWeight: 'var(--font-bold)' }}>Projects</a>
          <a href="/#contact" style={{ color: 'var(--accent-warm-dark)', fontWeight: 'var(--font-bold)' }}>Contact</a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            color: 'var(--text)',
          }}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isMobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-nav"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '1rem',
            padding: '1rem 2rem',
            backgroundColor: 'var(--background)',
            borderTop: '1px solid var(--border)',
          }}
        >
          <a 
            href="/#about" 
            onClick={handleLinkClick}
            style={{ 
              color: 'var(--accent-warm-dark)', 
              fontWeight: 'var(--font-bold)',
              padding: 'var(--space-3) 0',
              fontSize: 'var(--font-size-md)'
            }}
          >
            About
          </a>
          <a 
            href="/#projects" 
            onClick={handleLinkClick}
            style={{ 
              color: 'var(--accent-warm-dark)', 
              fontWeight: 'var(--font-bold)',
              padding: 'var(--space-3) 0',
              fontSize: 'var(--font-size-md)'
            }}
          >
            Projects
          </a>
          <a 
            href="/#contact" 
            onClick={handleLinkClick}
            style={{ 
              color: 'var(--accent-warm-dark)', 
              fontWeight: 'var(--font-bold)',
              padding: 'var(--space-3) 0',
              fontSize: 'var(--font-size-md)'
            }}
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  )
}

