import { Project } from '@/data/projects'

interface ProjectDetailsProps {
  project: Project
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <section style={{ marginTop: '4rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
        {project.achievements && project.achievements.length > 0 && (
          <div>
            <h3 className="all-caps" style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text)' }}>
              Key Achievements
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {project.achievements.map((achievement, index) => (
                <li 
                  key={index}
                  style={{
                    marginBottom: '0.75rem',
                    paddingLeft: '1.5rem',
                    position: 'relative',
                    color: 'var(--text)',
                  }}
                >
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    color: 'var(--primary)',
                  }}>•</span>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
            <h3 className="all-caps" style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text)' }}>
              Technologies & Skills
            </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {project.tags.map((tag, index) => (
              <span
                key={index}
                style={{
                  padding: '0.5rem 1rem',
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

        {project.externalLinks && project.externalLinks.length > 0 && (
          <div>
            <h3 className="all-caps" style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text)' }}>
              External Links
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {project.externalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--primary)',
                    textDecoration: 'underline',
                    fontSize: '0.875rem',
                  }}
                >
                  {link.label} →
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

