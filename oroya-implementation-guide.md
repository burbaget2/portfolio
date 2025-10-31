# Implementing OROYA-style Design in Your Portfolio

This guide helps you adapt the OROYA design patterns to your existing Next.js portfolio.

## 🎨 CSS Updates for OROYA Style

### Typography Styles

Add to `app/globals.css`:

```css
/* OROYA-style Typography */

/* Section Headers - OROYA Pattern */
.section-header-oroya {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.section-brand-name {
  font-size: 3rem;
  font-weight: 700;
  margin-top: 0;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Hero Text - Large & Bold */
.hero-title-oroya {
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

/* Quote Style */
.quote-oroya {
  font-style: italic;
  font-size: 1.25rem;
  color: var(--text-light);
  margin: 2rem 0;
  padding-left: 1rem;
  border-left: 3px solid var(--primary);
}

.quote-attribution {
  font-size: 0.875rem;
  color: var(--text-light);
  margin-top: 0.5rem;
  font-style: normal;
}

/* All Caps Headers */
.all-caps {
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-weight: 700;
}
```

### Layout Patterns

```css
/* OROYA Layout Patterns */

/* Section Spacing */
.section-oroya {
  padding: 6rem 0;
  position: relative;
}

.section-oroya:nth-child(even) {
  background-color: var(--background-alt);
}

/* Card Grid - OROYA Style */
.card-grid-oroya {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.service-card-oroya {
  padding: 2.5rem 2rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
}

.service-card-oroya:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.service-card-oroya h3 {
  font-size: 1.25rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 1rem;
}

/* Project Card - OROYA Style */
.project-card-oroya {
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.project-card-oroya:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.project-card-oroya img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.project-card-content {
  padding: 1.5rem;
}

/* Testimonial Card */
.testimonial-card-oroya {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.testimonial-card-oroya blockquote {
  font-style: italic;
  font-size: 1.125rem;
  margin-bottom: 1rem;
  color: var(--text);
}

.testimonial-card-oroya cite {
  font-size: 0.875rem;
  color: var(--text-light);
  font-style: normal;
}

/* Contact Form - OROYA Style */
.contact-form-oroya {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  padding: 3rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
}

.form-field-oroya {
  margin-bottom: 1.5rem;
}

.form-field-oroya label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--text);
}

.form-field-oroya input,
.form-field-oroya textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid var(--border);
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.form-field-oroya input:focus,
.form-field-oroya textarea:focus {
  outline: none;
  border-color: var(--primary);
}

.form-field-oroya textarea {
  min-height: 120px;
  resize: vertical;
}
```

## 📦 Component Updates

### Updated Projects Component (OROYA Style)

```tsx
// components/Projects.tsx
export default function Projects() {
  return (
    <section id="projects" className="section section-oroya">
      <div className="container">
        <div className="section-header-oroya">NOS RÉALISATIONS</div>
        <h2 className="section-brand-name">CRÉATIVES</h2>
        <p className="section-subtitle">
          "On ne va pas tourner autour du pot."
        </p>
        
        <div className="card-grid-oroya">
          {projects.map((project, index) => (
            <div key={index} className="project-card-oroya">
              <div className="project-card-content">
                <h3 className="all-caps">{project.title}</h3>
                <p style={{ color: 'var(--text-light)', marginTop: '1rem' }}>
                  {project.description}
                </p>
                <div style={{ marginTop: '1.5rem' }}>
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        marginRight: '0.5rem',
                        marginBottom: '0.5rem',
                        backgroundColor: 'var(--background-alt)',
                        borderRadius: '1rem',
                        fontSize: '0.875rem',
                        color: 'var(--text)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a href="#projects" className="btn">
            Voir toutes les réalisations
          </a>
        </div>
      </div>
    </section>
  )
}
```

### Updated About Component (OROYA Style)

```tsx
// components/About.tsx
export default function About() {
  return (
    <section id="about" className="section section-oroya">
      <div className="container">
        <div className="quote-oroya">
          "Petits mais costauds."
          <div className="quote-attribution">— La Pie qui chante</div>
        </div>
        
        <div className="section-header-oroya">À PROPOS</div>
        <h2 className="section-brand-name">MON PORTFOLIO</h2>
        
        <div style={{ maxWidth: '800px', fontSize: '1.125rem', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1.5rem' }}>
            [Your about text here]
          </p>
        </div>
        
        <div style={{ marginTop: '3rem' }}>
          <a href="#contact" className="btn">
            Découvrez mon portfolio
          </a>
        </div>
      </div>
    </section>
  )
}
```

## 🎯 Key Differences from Current Design

1. **Section Headers:** Use two-line format (SECTION NAME + BRAND NAME)
2. **Typography:** More emphasis on all-caps styling
3. **Spacing:** Generous section padding (6rem vs 5rem)
4. **Cards:** Lighter shadows, more subtle hover effects
5. **Quotes:** Integrated quotes as section separators
6. **Backgrounds:** Alternating section backgrounds

## 🔄 Migration Steps

1. **Update CSS:** Add OROYA-style classes to `globals.css`
2. **Update Components:** Modify components to use new classes
3. **Add Quotes:** Include quote elements in sections
4. **Adjust Spacing:** Increase section padding
5. **Refine Typography:** Apply all-caps and letter-spacing
6. **Test Responsiveness:** Ensure mobile views work well

## 📝 Content Adaptation

Replace OROYA-specific content:
- "OROYA" → Your name/brand
- "Services" → "Skills" or "Expertise"  
- "Réalisations" → "Projects" or "Portfolio"
- French quotes → English equivalents (or keep if appropriate)
- Agency language → Personal/freelance language

---

*This is a starting point. Customize colors, fonts, and spacing to match your brand while maintaining the elegant, clean aesthetic of the OROYA design.*

