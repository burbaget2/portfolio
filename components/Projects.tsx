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
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">A selection of my recent work</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {projects.map((project, index) => (
            <div
              key={index}
              style={{
                padding: '2rem',
                borderRadius: '1rem',
                backgroundColor: 'var(--background-alt)',
                border: '1px solid var(--border)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.boxShadow = '0 10px 30px var(--shadow)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{project.title}</h3>
              <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                {project.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: 'var(--primary)',
                      color: 'white',
                      borderRadius: '1rem',
                      fontSize: '0.875rem',
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

