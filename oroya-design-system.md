# OROYA.fr Design System Documentation

**Source:** [oroya.fr](https://www.oroya.fr)  
**Analysis Date:** October 31, 2025  
**Purpose:** Template for portfolio styling and layout design

---

## 📐 Layout Structure

### Overall Page Architecture

The site follows a **single-page scrolling layout** with distinct sections:

1. **Navigation Bar** - Fixed/Sticky header
2. **Hero Section** - Full-width introduction with animated text
3. **Expertise Section** - Grid of service offerings
4. **Portfolio/Projects** - Showcase of work
5. **About Section** - Agency information
6. **Testimonials** - Client feedback
7. **Contact Form** - Call-to-action section
8. **Footer** - Links and branding

### Grid System

- **Main Container:** Max-width constrained, centered layout
- **Grid Layout:** Responsive grid system for cards/sections
- **Spacing:** Generous white space between sections
- **Sections:** Each major section has distinct background treatments

---

## 🎨 Typography

### Heading Hierarchy

**H1 - Hero Titles**
- Large, bold, attention-grabbing
- Examples: "Agence de marketing, communication et développement à Tours"
- Often split across multiple lines for dramatic effect

**H2 - Section Headers**
- Format: "SECTION NAME" (all caps, bold) + "BRAND NAME" (below)
- Example: 
  ```
  LES EXPERTISES
  OROYA
  ```
- Used to introduce major sections

**H3 - Subsection Headers**
- All caps, bold
- Examples: "MARKETING", "IDENTITÉ VISUELLE", "CRÉATION DE SITES INTERNET"
- Used for service/feature cards

**Body Text**
- Clean, readable font
- Standard line height for readability
- Used for descriptions and content

### Typography Patterns

**Quotes/Testimonials:**
- Italicized, stylized quotes
- Attribution with quotation marks
- Examples: "L'élégance dépasse le temps." - Armani

**Section Labels:**
- All caps styling for emphasis
- Bold weight for headers
- Separation between label and brand name

---

## 🎨 Color Scheme

Based on analysis:
- **Primary Background:** Light/White (with transparent overlays)
- **Text Color:** Dark/Black (rgb(0, 0, 0))
- **Accent Colors:** Likely brand colors (not captured in basic analysis)
- **Section Backgrounds:** Alternating light/dark sections for visual interest

### Recommended Color Variables
```css
--primary-bg: #FFFFFF or light neutral
--secondary-bg: #F8F8F8 or similar
--text-primary: #000000 or very dark gray
--text-secondary: #666666 or medium gray
--accent: [Brand-specific color]
```

---

## 📦 Component Patterns

### 1. Navigation

**Structure:**
- Horizontal navigation bar
- Links: Accueil | À propos | Nos prestations | Nos réalisations | Contact
- Social media icons (Facebook, LinkedIn, Instagram)
- Footer links: Accessibilité | Mentions légales | Gestion des cookies

**Design Notes:**
- Clean, minimal navigation
- Fixed/sticky positioning for accessibility
- Social icons in footer

### 2. Hero Section

**Elements:**
- Animated/large text display
- Split text effect (letters spaced individually)
- Video background (optional)
- Call-to-action button: "Découvrez nos prestations !"

**Layout:**
- Full-width
- Centered content
- Large typography

### 3. Service/Expertise Cards

**Structure:**
- Grid layout (responsive)
- 6 service categories displayed
- Each card shows: Icon/Visual + Title
- Examples: MARKETING, IDENTITÉ VISUELLE, CRÉATION DE SITES INTERNET, etc.

**Design Pattern:**
- Card-based design
- Hover effects likely present
- Consistent spacing and sizing

### 4. Portfolio/Projects Section

**Layout:**
- Grid of project items
- Image + Project Name + Description
- "Voir les réalisations OROYA" link/button

**Example Projects:**
- L'Entracte | Atelier de coiffure végétal
- ZEBRAL – Identité de marque
- SEDECO – Plaquette commerciale
- NO CONTEST – Flyer

**Visual Treatment:**
- Project thumbnails/images
- Clean, minimal card design
- Hover interactions

### 5. About Section

**Content Pattern:**
- Quote/Testimonial style opening: "Petits mais costauds."
- Section header: "UNE AGENCE TOURANGELLE À TAILLE HUMAINE"
- Body text describing agency (15 years experience, mission, values)
- Call-to-action: "Découvrez l'agence OROYA"

### 6. Testimonials Section

**Structure:**
- Section header: "LES TÉMOIGNAGES DE NOS CLIENTS"
- Quote introduction: "Un témoignage vaut plus qu'un long discours."
- Multiple testimonial cards:
  - Client name + role/company
  - Quote text
  - Attributed to client

**Example Testimonials:**
- Barbara BILLAC - Directrice Générale chez CAP MONÉTIQUE
- Céline RONCE FABRE - Responsable Communication chez Humensia
- Marie-Agnès LAUVIN - Médecin Radiologue
- etc.

### 7. Contact/CTA Section

**Layout:**
- Section header: "PRENONS RENDEZ-VOUS"
- Hook text: "Si vous avez scrollé jusque là, c'est que vous êtes intéressé."
- Contact form:
  - Name/Prenom field
  - Email field
  - Telephone field
  - Message textarea
  - Privacy consent checkbox
  - Submit button

**Design:**
- Centered form
- Clean input styling
- Clear call-to-action

### 8. Footer

**Elements:**
- Decorative elements (cactus illustrations mentioned)
- Copyright: "© OROYA - Agence de communication et développement à Tours - 2025"
- Footer links: Accessibilité | Mentions légales | Gestion des cookies

---

## 🎭 Visual Design Patterns

### Spacing & Rhythm

- **Section Padding:** Generous vertical spacing (5rem+ between sections)
- **Card Spacing:** Consistent gaps in grids (2rem gap)
- **Content Width:** Constrained max-width for readability
- **Vertical Rhythm:** Consistent spacing scale

### Visual Effects

1. **Animated Text:** Letters appear individually/spaced (hero section)
2. **Video Backgrounds:** Optional video elements
3. **Hover Effects:** Interactive elements on cards/buttons
4. **Transitions:** Smooth animations between states

### Quote Integration

Quotes used as:
- Section separators
- Visual interest
- Cultural/artistic references
- Examples: Armani, "La Pie qui chante", Nokia

---

## 📱 Responsive Design

### Breakpoints
- Mobile: 375px viewport (tested)
- Tablet: Likely 768px+
- Desktop: 1280px+ (analyzed)

### Responsive Patterns
- Grid collapses to single column on mobile
- Navigation likely hamburger menu on mobile
- Text sizes adjust for readability
- Images scale proportionally

---

## 🔧 Implementation Notes for Portfolio

### Key Design Principles to Adopt:

1. **Typography Hierarchy**
   - Use H2 pattern: "SECTION NAME" + "YOUR NAME"
   - All caps for section headers
   - Large, bold hero text

2. **Section Structure**
   - Clear section separation
   - Alternating backgrounds
   - Consistent padding

3. **Card-Based Layouts**
   - Use grids for services/projects
   - Consistent card styling
   - Hover effects for interactivity

4. **Visual Interest**
   - Use quotes/testimonials as separators
   - Add decorative elements
   - Consider subtle animations

5. **Call-to-Actions**
   - Clear, prominent buttons
   - Consistent styling
   - Action-oriented language

6. **Color Usage**
   - Light, clean backgrounds
   - Dark text for readability
   - Accent colors sparingly

---

## 📊 Content Structure Template

```
1. Navigation
   - Logo/Brand
   - Menu items
   - Social links (optional in nav, definitely in footer)

2. Hero Section
   - Large headline
   - Subheadline
   - CTA button
   - Optional: background video/image

3. Services/Skills (Grid)
   - 6+ service cards
   - Icon + Title format

4. Portfolio/Projects
   - Grid of projects
   - Image + Title + Description
   - "View more" link

5. About
   - Quote/intro
   - Section header
   - Body text
   - CTA

6. Testimonials (if applicable)
   - Client quotes
   - Attribution
   - Grid or carousel

7. Contact/CTA
   - Hook text
   - Contact form
   - Submission button

8. Footer
   - Copyright
   - Legal links
   - Social links
   - Decorative elements
```

---

## 🎯 Design Recommendations

### To Match OROYA Style:

1. **Keep it Clean:** Minimal, professional aesthetic
2. **Use White Space:** Generous spacing creates elegance
3. **Typography First:** Let typography carry the design
4. **Subtle Interactions:** Smooth, purposeful animations
5. **Content Hierarchy:** Clear visual flow from top to bottom
6. **Brand Consistency:** Consistent use of colors and fonts

### Adaptations for Portfolio:

- Replace "Services" with "Skills" or "Expertise"
- Portfolio section becomes "Featured Projects"
- Testimonials could be "Recommendations" or removed
- Contact section for freelance/work inquiries

---

## 📝 Notes

- Site uses sophisticated typography treatment
- Clean, professional aesthetic
- Excellent use of whitespace
- Strong visual hierarchy
- Smooth scrolling experience
- Professional but approachable tone

**Next Steps:**
1. Review screenshots in `website-analysis/` folder
2. Extract specific color values from screenshots
3. Note font choices (likely custom/web fonts)
4. Observe animation timing and effects
5. Adapt this structure to your portfolio content

---

*This documentation is based on automated analysis and website content. For precise measurements and color codes, refer to the screenshots and inspect the live site.*

