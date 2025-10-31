export default function About() {
  return (
    <section id="about" className="section-oroya">
      <div className="container">
        <div className="quote-oroya">
          "Design is not just what it looks like and feels like. Design is how it works."
          <div className="quote-attribution">— Steve Jobs</div>
        </div>
        
        <div className="section-header-oroya">À PROPOS</div>
        <h2 className="section-brand-name">ABOUT ME</h2>
        
        <div style={{ maxWidth: '800px', fontSize: '1.125rem', lineHeight: 1.8, marginTop: '2rem' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            I'm a passionate UX Designer focused on creating meaningful digital experiences that 
            blend aesthetics with functionality. My approach combines user research, creative design, 
            and strategic thinking to deliver solutions that users love.
          </p>
          <p style={{ marginBottom: '3rem' }}>
            With a keen eye for detail and a user-centered mindset, I specialize in transforming 
            complex problems into intuitive, elegant interfaces that delight users and drive 
            business success.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            <div>
              <h3 className="all-caps" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>User Research</h3>
              <p style={{ color: 'var(--text-light)' }}>Understanding user needs and behaviors</p>
            </div>
            <div>
              <h3 className="all-caps" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>UI Design</h3>
              <p style={{ color: 'var(--text-light)' }}>Creating visually appealing interfaces</p>
            </div>
            <div>
              <h3 className="all-caps" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Prototyping</h3>
              <p style={{ color: 'var(--text-light)' }}>Bringing ideas to life</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

