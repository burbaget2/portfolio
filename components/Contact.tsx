'use client'

export default function Contact() {
  return (
    <section id="contact" className="section-burbs">
      <div className="container">
        <h2 className="section-brand-name" style={{ marginBottom: '3rem' }}>CONTACT</h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* Left side - Contact Info */}
          <div>
            <h1 style={{ 
              fontSize: '3rem', 
              fontWeight: 700, 
              marginBottom: '2rem',
              lineHeight: 1.2
            }}>
              Tony Burbage
            </h1>
            
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 600, 
              marginBottom: '2rem' 
            }}>
              Senior UX Designer
            </h3>
            
            <div style={{ marginBottom: '2rem' }}>
              <a 
                href="mailto:burbaget@me.com"
                style={{ 
                  fontSize: '1.125rem',
                  color: 'var(--accent-warm-dark)',
                  textDecoration: 'none',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ flexShrink: 0 }}
                >
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m2 7 10 7 10-7"/>
                </svg>
                burbaget@me.com
              </a>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <a 
                href="https://www.linkedin.com/in/tony-burbage/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  fontSize: '1.125rem',
                  color: 'var(--accent-warm-dark)',
                  textDecoration: 'none',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  style={{ flexShrink: 0 }}
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                My LinkedIn
              </a>
            </div>
            
            <div>
              <h4 style={{ 
                fontSize: '1.125rem', 
                fontWeight: 700, 
                marginBottom: '0.5rem' 
              }}>
                Open To:
              </h4>
              <p style={{ fontSize: '1.125rem' }}>Hybrid Remote or Office</p>
            </div>
          </div>
          
          {/* Right side - Google Map */}
          <div style={{ 
            width: '100%', 
            height: '500px',
            borderRadius: '0.5rem',
            overflow: 'hidden',
            border: '1px solid var(--border)'
          }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d320133.0364852654!2d-114.31469844999999!3d51.02772395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x537170039f843fd5%3A0x266d3bb1b652b63a!2sCalgary%2C%20AB!5e0!3m2!1sen!2sca!4v1730484000000!5m2!1sen!2sca"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        
        {/* Mobile responsive layout */}
        <style jsx>{`
          @media (max-width: 768px) {
            div[style*="gridTemplateColumns"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </section>
  )
}

