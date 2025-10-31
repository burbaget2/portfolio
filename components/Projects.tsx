import Link from 'next/link'
import { projects } from '@/data/projects'

export default function Projects() {
  return (
    <section id="projects" className="section-oroya">
      <div className="container">
        <div className="quote-oroya">
          "On ne va pas tourner autour du pot."
        </div>
        
        <div className="section-header-oroya">NOS RÉALISATIONS</div>
        <h2 className="section-brand-name">FEATURED PROJECTS</h2>
        
        <div className="thumbnail-grid-staggered">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="project-thumbnail"
            >
              {project.thumbnail && (
                <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
                  <img 
                    src={project.thumbnail} 
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              )}
              <div className="project-thumbnail-content">
                <h3 className="project-thumbnail-title">
                  {project.title}
                </h3>
                <p className="project-thumbnail-description">
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

