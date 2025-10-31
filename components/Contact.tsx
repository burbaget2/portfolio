export default function Contact() {
  return (
    <section id="contact" className="section-oroya">
      <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
        <h2 className="section-brand-name">LET'S WORK TOGETHER</h2>
        
        <p className="section-subtitle" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
          I'd love to hear from you. Let's create something amazing together.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          <a
            href="mailto:your.email@example.com"
            className="btn btn-email"
            style={{ margin: '0 auto' }}
          >
            Send me an email
          </a>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '2rem', 
            marginTop: '3rem',
            flexWrap: 'wrap'
          }}>
            <a 
              href="https://linkedin.com/in/yourprofile" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: 'var(--text)', fontWeight: 500 }}
            >
              LinkedIn
            </a>
            <a 
              href="https://twitter.com/yourprofile" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: 'var(--text)', fontWeight: 500 }}
            >
              Twitter
            </a>
            <a 
              href="https://dribbble.com/yourprofile" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: 'var(--text)', fontWeight: 500 }}
            >
              Dribbble
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

