'use client'

import Link from 'next/link'
import { projects } from '@/data/projects'

export default function Projects() {
  return (
    <section id="projects" className="section-burbs">
      <div className="container">
        <h2 className="section-brand-name">Projects</h2>
        
        <div className="thumbnail-grid-staggered">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="project-thumbnail"
            >
              {project.thumbnail && (
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', flexShrink: 0 }}>
                  <img 
                    src={project.thumbnail} 
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    onError={(e) => {
                      console.error('Thumbnail failed to load:', project.thumbnail);
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

