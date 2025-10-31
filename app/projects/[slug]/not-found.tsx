import Link from 'next/link'
import Navigation from '@/components/Navigation'

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main style={{ paddingTop: '6rem', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Project Not Found</h1>
          <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>
            The project you're looking for doesn't exist.
          </p>
          <Link href="/#projects" className="btn">
            Back to Projects
          </Link>
        </div>
      </main>
    </>
  )
}

