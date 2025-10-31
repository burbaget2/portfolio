export default function Contact() {
  return (
    <section id="contact" className="section" style={{ backgroundColor: 'var(--background-alt)' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
        <h2 className="section-title">Let's Work Together</h2>
        <p className="section-subtitle">I'm always interested in new projects and opportunities</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          <a
            href="mailto:your.email@example.com"
            className="btn btn-email"
          >
            Send me an email
          </a>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
            <a href="https://dribbble.com/yourprofile" target="_blank" rel="noopener noreferrer">
              Dribbble
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

