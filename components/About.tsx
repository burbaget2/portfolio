export default function About() {
  return (
    <section id="about" className="section-oroya about-section">
      <div className="container">
        <h2 className="section-brand-name">About Me</h2>
        
        <div style={{ maxWidth: '800px', fontSize: '1.125rem', lineHeight: 1.8, marginTop: '2rem' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            I'm a seasoned UX Designer & Design Lead, passionate about crafting product and service experiences that 
            simplify tasks, clarify information, and feel delightful to use. With decades of experience, I've delivered 
            seamless digital solutions for global brands and everyday users alike.
          </p>
          <p style={{ marginBottom: '3rem' }}>
            I'm guided by user needs and a user-centered approach. I bridge design and engineering by rapidly translating 
            ideas into working code. Using tools like Claude Code, Cursor, and modern design systems, I "vibe code" 
            end-to-end flows that can be tested, iterated, and shipped quickly, ensuring real user feedback drives constant 
            improvement.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            <div>
              <h3 className="all-caps" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>User Research</h3>
              <p style={{ color: 'var(--text-light)' }}>Understanding user needs and behaviors</p>
            </div>
            <div>
              <h3 className="all-caps" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>End-to-end UX Strategy</h3>
              <p style={{ color: 'var(--text-light)' }}>Crafting an end-to-end vision and validating</p>
            </div>
            <div>
              <h3 className="all-caps" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Prototyping</h3>
              <p style={{ color: 'var(--text-light)' }}>Using AI tools to create working prototypes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

