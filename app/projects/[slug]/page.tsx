import { notFound } from 'next/navigation'
import { projects } from '@/data/projects'
import Navigation from '@/components/Navigation'
import ProjectHeader from '@/components/ProjectHeader'
import ProjectGallery from '@/components/ProjectGallery'
import ProjectDetails from '@/components/ProjectDetails'
import Link from 'next/link'

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <>
      <Navigation />
      <main style={{ paddingTop: '6rem' }}>
        <article className="section-burbs" style={{ paddingTop: 0 }}>
          <div className="container" style={{ maxWidth: '1000px' }}>
            <Link 
              href="/#projects"
              style={{
                display: 'inline-block',
                marginBottom: '2rem',
                color: 'var(--accent-warm-dark)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 700,
              }}
            >
              ← Back to Projects
            </Link>

            <ProjectHeader project={project} />

            {project.longDescription && (
              <section style={{ marginTop: '3rem' }}>
                <div style={{
                  fontSize: '1.125rem',
                  lineHeight: 1.8,
                  color: 'var(--text)',
                }}>
                  {project.longDescription.split('\n\n').map((paragraph, index) => {
                    const trimmed = paragraph.trim();
                    // Check if paragraph is a markdown link [text](url)
                    const markdownLinkMatch = trimmed.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
                    if (markdownLinkMatch) {
                      return (
                        <p key={index} style={{ marginBottom: '1.5rem' }}>
                          <a href={markdownLinkMatch[2]} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
                            {markdownLinkMatch[1]}
                          </a>
                        </p>
                      );
                    }
                    // Check if paragraph starts with bold text like **Header:** and rest is regular text
                    const boldHeaderMatch = trimmed.match(/^\*\*([^*]+):\*\*\s*(.*)$/);
                    if (boldHeaderMatch) {
                      return (
                        <div key={index} style={{ 
                          marginBottom: '1.5rem', 
                          padding: '1.5rem',
                          backgroundColor: 'var(--accent-warm)',
                          borderRadius: '0.5rem',
                        }}>
                          <h3 style={{ 
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            marginBottom: '0.5rem',
                            color: 'var(--text)',
                          }}>
                            {boldHeaderMatch[1]}
                          </h3>
                          {boldHeaderMatch[2] && (
                            <p style={{ marginBottom: 0, color: 'var(--text)' }}>
                              {boldHeaderMatch[2]}
                            </p>
                          )}
                        </div>
                      );
                    }
                    return (
                      <p key={index} style={{ marginBottom: '1.5rem' }}>
                        {trimmed}
                      </p>
                    );
                  })}
                </div>
              </section>
            )}

            <ProjectGallery images={project.images} />

            <ProjectDetails project={project} />
          </div>
        </article>
      </main>
    </>
  )
}

