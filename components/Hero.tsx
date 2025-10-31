export default function Hero() {
  return (
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
      }}
    >
      <div className="container" style={{ textAlign: 'center' }}>
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
    </section>
  )
}

