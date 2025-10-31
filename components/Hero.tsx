export default function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        paddingTop: '5rem',
      }}
    >
      <div className="container" style={{ textAlign: 'center' }}>
        <h1 className="hero-title-oroya" style={{ color: 'white' }}>
          UX Designer & Creative
        </h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '3rem', opacity: 0.95, fontWeight: 300 }}>
          Creating beautiful and intuitive user experiences
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#projects" className="btn" style={{ background: 'white', color: '#667eea' }}>
            View My Work
          </a>
          <a href="#contact" className="btn btn-secondary" style={{ borderColor: 'white', color: 'white' }}>
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  )
}

