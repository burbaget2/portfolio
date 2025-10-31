export interface ProjectImageProps {
  src: string
  alt: string
  description?: string
}

export default function ProjectImage({ src, alt, description }: ProjectImageProps) {
  return (
    <figure style={{ marginBottom: '3rem' }}>
      <div
        style={{
          width: '100%',
          borderRadius: '0.5rem',
          overflow: 'hidden',
          backgroundColor: 'var(--background-alt)',
          marginBottom: '1rem',
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        />
      </div>
      {description && (
        <figcaption style={{ 
          color: 'var(--text-light)', 
          fontSize: '0.875rem', 
          fontStyle: 'italic',
          textAlign: 'center',
        }}>
          {description}
        </figcaption>
      )}
    </figure>
  )
}

