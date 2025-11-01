import { Project } from '@/data/projects'

interface ProjectHeaderProps {
  project: Project
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <header>
      <h1 className="section-title">
        {project.title}
      </h1>
      {(project.role || project.year || project.award) && (
        <div style={{ 
          display: 'flex', 
          gap: 'var(--space-8)', 
          flexWrap: 'wrap',
          marginBottom: 'var(--space-8)',
          color: 'var(--text)',
          fontSize: 'var(--font-size-base)',
        }}>
          {project.role && <span>{project.role}</span>}
          {project.year && <span>{project.year}</span>}
          {project.award && (
            <span style={{ color: 'var(--primary)', fontWeight: 'var(--font-semibold)' }}>
              🏆 {project.award}
            </span>
          )}
        </div>
      )}
      <div style={{ 
        padding: 'var(--space-6)',
        backgroundColor: 'var(--accent-warm)',
        borderRadius: 'var(--radius-md)',
      }}>
        <p style={{ 
          fontSize: 'var(--font-size-lg)', 
          lineHeight: 'var(--leading-relaxed)', 
          color: 'var(--text)',
          marginBottom: 0,
        }}>
          {project.description}
        </p>
      </div>
    </header>
  )
}

