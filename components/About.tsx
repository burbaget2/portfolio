export default function About() {
  return (
    <section id="about" className="section" style={{ backgroundColor: 'var(--background-alt)' }}>
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">Get to know me better</p>
        <div style={{ maxWidth: '800px', fontSize: '1.125rem', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1.5rem' }}>
            I'm a passionate UX Designer focused on creating meaningful digital experiences that 
            blend aesthetics with functionality. My approach combines user research, creative design, 
            and strategic thinking to deliver solutions that users love.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            With a keen eye for detail and a user-centered mindset, I specialize in transforming 
            complex problems into intuitive, elegant interfaces that delight users and drive 
            business success.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>User Research</h3>
              <p style={{ color: 'var(--text-light)' }}>Understanding user needs and behaviors</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>UI Design</h3>
              <p style={{ color: 'var(--text-light)' }}>Creating visually appealing interfaces</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Prototyping</h3>
              <p style={{ color: 'var(--text-light)' }}>Bringing ideas to life</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

