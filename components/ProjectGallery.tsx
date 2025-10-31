import ProjectImage from './ProjectImage'
import { ProjectImage as ProjectImageType } from '@/data/projects'

interface ProjectGalleryProps {
  images: ProjectImageType[]
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  if (!images || images.length === 0) return null

  return (
    <section style={{ marginTop: '4rem' }}>
      <h2 className="section-header-oroya" style={{ marginBottom: '2rem' }}>
        PROJECT GALLERY
      </h2>
      <div style={{ display: 'grid', gap: '4rem' }}>
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

