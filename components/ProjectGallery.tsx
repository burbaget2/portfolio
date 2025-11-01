import ProjectImage from './ProjectImage'
import { ProjectImage as ProjectImageType } from '@/data/projects'

interface ProjectGalleryProps {
  images: ProjectImageType[]
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  if (!images || images.length === 0) return null

  return (
    <section style={{ marginTop: 'var(--space-16)' }}>
      <h2 style={{ marginBottom: 'var(--space-8)', fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-bold)', color: 'var(--text)' }}>
        PROJECT GALLERY
      </h2>
      <div style={{ display: 'grid', gap: 'var(--space-16)' }}>
        {images.map((image, index) => (
          <ProjectImage
            key={index}
            src={image.src}
            alt={image.alt}
            description={image.description}
          />
        ))}
      </div>
    </section>
  )
}

