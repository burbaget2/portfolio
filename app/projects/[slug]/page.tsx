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
        <article className="section-oroya">
          <div className="container" style={{ maxWidth: '1000px' }}>
            <Link 
              href="/#projects"
              style={{
                display: 'inline-block',
                marginBottom: '3rem',
                color: 'var(--text-light)',
                textDecoration: 'none',
                fontSize: '0.875rem',
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
                  whiteSpace: 'pre-line',
                }}>
                  {project.longDescription}
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

