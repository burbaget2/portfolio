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
        <h1 style={{ fontSize: '4rem', fontWeight: 700, marginBottom: '1rem', lineHeight: 1.2 }}>
          Hi, I'm a UX Designer
        </h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '2rem', opacity: 0.9 }}>
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

