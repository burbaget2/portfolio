export default function About() {
  return (
    <section id="about" className="section-burbs about-section">
      <div className="container">
        <h2 className="section-brand-name">About Me</h2>
        
        <div style={{ maxWidth: '800px', fontSize: 'var(--font-size-md)', lineHeight: 'var(--leading-relaxed)', marginTop: 'var(--space-8)' }}>
          <p style={{ marginBottom: 'var(--space-6)' }}>
            I'm a seasoned UX Designer & Design Lead, passionate about crafting product and service experiences that 
            simplify tasks, clarify information, and feel delightful to use. With decades of experience, I've delivered 
            seamless digital solutions for global brands and everyday users alike.
          </p>
          <p style={{ marginBottom: 'var(--space-12)' }}>
            I'm guided by user needs and a user-centered approach. I bridge design and engineering by rapidly translating 
            ideas into working code. Using tools like Claude Code, Cursor, and modern design systems, I "vibe code" 
            end-to-end flows that can be tested, iterated, and shipped quickly, ensuring real user feedback drives constant 
            improvement.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-8)', marginTop: 'var(--space-12)' }}>
            <div>
              <h3 className="all-caps" style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-2)' }}>User Research</h3>
              <p style={{ color: 'var(--text-light)' }}>Understanding user needs and behaviors</p>
            </div>
            <div>
              <h3 className="all-caps" style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-2)' }}>End-to-end UX Strategy</h3>
              <p style={{ color: 'var(--text-light)' }}>Crafting an end-to-end vision and validating</p>
            </div>
            <div>
              <h3 className="all-caps" style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-2)' }}>Prototyping</h3>
              <p style={{ color: 'var(--text-light)' }}>Using AI tools to create working prototypes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

