export default function Projects() {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Redesigned checkout flow reducing cart abandonment by 30%. Focused on simplifying user journey and improving conversion rates.',
      tags: ['UX Research', 'UI Design', 'Prototyping'],
    },
    {
      title: 'Mobile Banking App',
      description: 'Created intuitive mobile experience for financial management. Increased user engagement by 45% through improved navigation.',
      tags: ['Mobile Design', 'User Testing', 'Wireframing'],
    },
    {
      title: 'Healthcare Dashboard',
      description: 'Designed dashboard for healthcare providers to manage patient data efficiently. Improved task completion time by 40%.',
      tags: ['Dashboard Design', 'Data Visualization', 'Accessibility'],
    },
  ]

  return (
    <section id="projects" className="section-oroya">
      <div className="container">
        <div className="quote-oroya">
          "On ne va pas tourner autour du pot."
        </div>
        
        <div className="section-header-oroya">NOS RÉALISATIONS</div>
        <h2 className="section-brand-name">FEATURED PROJECTS</h2>
        
        <div className="card-grid-oroya">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card"
            >
              <h3 className="all-caps" style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text)' }}>
                {project.title}
              </h3>
              <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                {project.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: 'var(--background-alt)',
                      color: 'var(--text)',
                      borderRadius: '1rem',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

