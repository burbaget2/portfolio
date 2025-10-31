import { Project } from '@/data/projects'

interface ProjectHeaderProps {
  project: Project
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <header style={{ marginBottom: '4rem' }}>
      {project.client && (
        <div className="section-header-oroya" style={{ marginBottom: '0.5rem' }}>
          {project.client}
        </div>
      )}
      <h1 className="section-brand-name" style={{ marginBottom: '1rem' }}>
        {project.title}
      </h1>
      {(project.role || project.year || project.award) && (
        <div style={{ 
          display: 'flex', 
          gap: '2rem', 
          flexWrap: 'wrap',
          marginBottom: '2rem',
          color: 'var(--text-light)',
          fontSize: '1rem',
        }}>
          {project.role && <span>{project.role}</span>}
          {project.year && <span>{project.year}</span>}
          {project.award && (
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>
              🏆 {project.award}
            </span>
          )}
        </div>
      )}
      <p style={{ 
        fontSize: '1.25rem', 
        lineHeight: 1.8, 
        color: 'var(--text-light)',
        maxWidth: '800px',
      }}>
        {project.description}
      </p>
    </header>
  )
}

