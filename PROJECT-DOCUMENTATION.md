# Portfolio Website - Complete Project Documentation

## Overview

This is a Next.js portfolio website for Tony Burbage, a UX Designer & Design Lead. The website showcases 17 major projects from Tony's career, with a modern, clean design inspired by oroya.fr. The site is hosted on Vercel and uses GitHub Desktop for version control.

**Key Technologies:**
- Next.js 14 (App Router)
- React 18
- TypeScript
- CSS Custom Properties (for theming)
- Playwright (for content extraction)

---

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page (assembles all sections)
│   ├── globals.css         # Global styles, CSS variables, wave animations
│   └── projects/
│       └── [slug]/
│           ├── page.tsx    # Dynamic project detail pages
│           └── not-found.tsx
├── components/
│   ├── Navigation.tsx      # Fixed nav with frosted glass effect
│   ├── Hero.tsx            # Hero section with morphing wave background
│   ├── About.tsx           # About section with warm color background
│   ├── Projects.tsx        # Projects grid (client component)
│   ├── Contact.tsx         # Contact section
│   ├── ProjectHeader.tsx   # Reusable project header component
│   ├── ProjectGallery.tsx  # Reusable project image gallery
│   ├── ProjectImage.tsx    # Individual project image with description
│   └── ProjectDetails.tsx  # Project details (achievements, tags, links)
├── data/
│   └── projects.ts         # All 17 project definitions with images, descriptions, etc.
├── public/
│   └── images/
│       ├── tonyheadshot.png           # Navigation profile photo
│       └── projects/
│           ├── plotlystudio/         # Project-specific images (renamed)
│           ├── dashboards/
│           ├── retail/
│           ├── navarik/
│           ├── ea-games/
│           ├── peugeot/
│           ├── bodog/
│           ├── intel/
│           ├── ebookers/
│           ├── bestbuy-strategy/
│           ├── best-buy-vision/
│           ├── hr-block/
│           ├── fishtank/
│           ├── payload/
│           ├── queue/
│           ├── nike/
│           └── ignite-works/
└── package.json
```

---

## Design System & Styling

### Color Scheme (CSS Variables)

The site uses CSS custom properties for theming, supporting both light and dark modes based on system preferences:

**Light Mode:**
```css
--primary: #000000
--background: #ffffff
--text: #000000
--text-light: #666666
--accent-warm: #f5ebe6  /* Pinkish-beige for wave backgrounds */
```

**Dark Mode:**
```css
--primary: #ffffff
--background: #1a1a1a
--text: #f0f0f0
--text-light: #b0b0b0
--accent-warm: #2a241f  /* Darker warm tone for dark mode */
```

### Typography

Inspired by OROYA.fr design patterns:
- **Large Brand Names**: `clamp(2.5rem, 5vw, 4rem)` - Responsive, bold headings
- **Section Headers**: `1.25rem`, uppercase, letter-spacing `0.15em`
- **Body Text**: System font stack, `1.125rem` line-height `1.8`
- **Project Titles**: `0.875rem`, uppercase, letter-spacing `0.1em`
- **Project Descriptions**: `0.8125rem`, line-height `1.4-1.5`

### Layout Patterns

**OROYA-Inspired Sections:**
- Alternating background colors (`section-oroya` class)
- Large, bold brand-name style headings
- Consistent padding (`6rem` vertical)
- Max-width containers (`1200px`)

---

## Key Features Implemented

### 1. Frosted Glass Navigation Bar

**Location:** `components/Navigation.tsx`

**Behavior:**
- **At top of page**: Semi-transparent (`rgba(255, 255, 255, 0.9)`), subtle blur, NO shadow - blends with page
- **When scrolled**: Enhanced frosted glass (`backdrop-filter: blur(20px)`), drop shadow appears, border appears - creates separation

**Implementation:**
- Uses `isScrolled` state (scrollY > 50)
- Applies `.nav-scrolled` class conditionally
- CSS transition for smooth effect
- Includes user's mugshot (`tonyheadshot.png`) left of "Tony's Portfolio" title
- Fixed position with `z-index: 1000`

**Why this approach:** Creates a clean, integrated feel at the top, then visually "lifts" the nav when scrolling to show it's separate from content.

---

### 2. Morphing Wave Backgrounds

**Location:** `components/Hero.tsx`, `components/About.tsx`, `app/globals.css`

**Design:**
- Large wavy SVG curve (350px height) at bottom of Hero section
- Warm pinkish-beige color (`#f5ebe6`) flows from Hero into About section
- Another wave at bottom of About transitions back to white before Projects section

**Morphing Effect:**
- Wave shape **actually changes** as you scroll (not just parallax movement)
- Uses `Math.sin()` and `Math.cos()` functions with scroll position
- Three morph factors create complex, organic shape changes:
  - `morphFactor = Math.sin(scrollY * 0.02) * 50` - Vertical peaks/valleys
  - `morphFactor2 = Math.cos(scrollY * 0.025) * 40` - Horizontal shifts
  - `morphFactor3 = Math.sin(scrollY * 0.015) * 25` - Additional variation
- SVG path recalculates on every scroll event
- Uses `requestAnimationFrame` for smooth performance

**Why this approach:** Creates a dynamic, living background that responds to user interaction, making the page feel more engaging and modern.

**Technical Details:**
- Wave positioned absolutely behind content (`z-index: 0`)
- Content has `z-index: 1` to stay above
- `overflow: visible` to prevent clipping
- No CSS transitions on path (would interfere with real-time morphing)

---

### 3. Uniform Project Cards Grid

**Location:** `components/Projects.tsx`, `app/globals.css`

**Layout:**
- CSS Grid: `repeat(auto-fill, minmax(300px, 1fr))`
- `align-items: stretch` ensures all cards same height
- Cards use `height: 100%` to fill grid cells

**Card Structure:**
1. **Image Thumbnail**: 16:9 aspect ratio, `object-fit: cover`
2. **Content Area**: Flex column with min-height `180px`
   - **Title**: Reserved space for 2 lines (`min-height: 2.6em`, `line-clamp: 2`)
   - **Description**: Up to 5 lines (`line-clamp: 5`, `line-height: 1.5`)

**Uniform Heights:**
- All cards stretch to match tallest card in each row
- Title area always reserves space for 2 lines (even if title is shorter)
- Description area has consistent height with 5-line limit
- Ensures visual consistency across the grid

**Why this approach:** Creates a clean, professional grid where all cards align perfectly, making the portfolio look polished and organized.

---

### 4. Dynamic Project Pages

**Location:** `app/projects/[slug]/page.tsx`

**Features:**
- Next.js dynamic routing based on project slug
- Static generation for all projects at build time
- Reusable components: `ProjectHeader`, `ProjectGallery`, `ProjectDetails`
- "Back to Projects" link
- 404 handling for invalid slugs

**Project Data Structure:** See `data/projects.ts` for full TypeScript interface

---

### 5. Image Organization & Naming

**Problem Solved:** Initially, images had generic names (`image-2.png`, `image-3.png`) that caused conflicts across projects. All images have been renamed to be project-specific.

**Naming Convention:**
- Format: `[project-slug]-[number].[ext]`
- Examples:
  - `plotly-thumbnail.png`, `plotly-1.png`, `plotly-2.png`, `plotly-3.png`
  - `retail-thumbnail.png`, `retail-1.png`, `retail-2.png`, etc.

**Folder Structure:**
- Each project has its own folder: `public/images/projects/[project-folder]/`
- Project folder names match slugs (e.g., `plotlystudio`, `bestbuy-strategy`)
- Only project-specific images in each folder (duplicates cleaned up)

**Image References:**
- All paths in `data/projects.ts` use the new project-specific names
- Thumbnails and gallery images properly mapped
- Broken image handling: Images with missing files show as empty space (no broken icon)

---

## Content Extraction History

### Initial Approach
- Used Playwright to extract content from Squarespace portfolio
- Base URL: `https://cheetah-accordion-l9n5.squarespace.com/`
- Challenge: Squarespace uses hash-based routing (`#/project-name/`), which required special handling

### Extraction Scripts Created
1. `extract-portfolio-content.js` - General content extraction
2. `extract-project-content-improved.js` - Handles hash routing better
3. `extract-all-project-pages.js` - Batch extraction (had issues with hash routing)
4. Individual extraction scripts for specific projects:
   - `extract-bestbuy-strategy.js`
   - `extract-bestbuy-united-vision.js`
   - `extract-plotly-studio.js`
   - `extract-ignite-works.js`

### Final Content Source
- Content manually verified and corrected from user-provided URLs
- Images organized and mapped to correct projects
- All 17 projects properly populated with accurate content

---

## All 17 Projects

1. **Plotly Studio** - AI platform for data visualization
2. **Data Visualization for Businesses** - Dashboard redesign for iQmetrix
3. **iQmetrix - Front and Back of House Retail Platform** - POS system
4. **Navarik - Digital Transformation in Shipping** - Enterprise shipping software
5. **EA Games Intelligence Tool** - Gaming websites and intelligence tool
6. **Award Winning Peugeot 407, and 1007 Sites** - Automotive marketing (Cannes Lion winner)
7. **BODOG.COM & .NET** - Website redesigns
8. **Intel EMEA Websites and Content Management** - CMS architecture
9. **Ebookers - Major European Holiday Booking Company** - E-commerce booking system
10. **Best Buy - UX Strategy that Transformed bestbuy.ca** - E-commerce transformation
11. **Best Buy - Connecting Teams with a United Vision** - User journey blueprint
12. **H&R Block - Assessing and Improving the Service Design Model** - Service design
13. **Fishtank - High Profile Websites** - Marketing websites with data viz
14. **PAYLOAD - End-to-End Logistic Management Design** - Logistics software
15. **Queue Management System** - Retail queue management
16. **Nike Marketing Sites / Apparel Catalogs** - Marketing websites
17. **Ignite Works Digital Services - Co-Founder** - Consulting company

---

## Styling Decisions & Rationale

### Why OROYA-Inspired Design?
- Clean, modern aesthetic
- Strong typography hierarchy
- Alternating section backgrounds for visual rhythm
- Large, bold headings create impact

### Why Morphing Waves Instead of Static?
- Creates dynamic, engaging interaction
- Feels more "alive" and modern
- Differentiates the portfolio from static sites
- Maintains visual interest without being distracting

### Why Uniform Card Heights?
- Professional, polished appearance
- Easier to scan and compare projects
- Creates visual rhythm in the grid
- Industry standard for portfolio layouts

### Why Frosted Glass Nav?
- Modern, iOS-inspired aesthetic
- Maintains readability while allowing content to show through
- Creates depth and layering
- Smooth transition from integrated to separated state

---

## Technical Implementation Details

### Scroll Tracking
- Uses React `useState` and `useEffect` for scroll position
- `requestAnimationFrame` optimization for smooth updates
- Passive event listeners for better performance

### Image Optimization
- Next.js serves static images from `public/` folder
- Images not using Next.js Image component (regular `<img>` tags)
- All images properly sized and optimized before upload

### Client vs Server Components
- **Client Components** (`'use client'`):
  - `Navigation.tsx` - Needs scroll state
  - `Hero.tsx` - Needs scroll state for wave morphing
  - `About.tsx` - Needs scroll state for wave morphing
  - `Projects.tsx` - Needs error handling for images
  - `ProjectImage.tsx` - Needs error handling
  
- **Server Components** (default):
  - `ProjectHeader.tsx`
  - `ProjectGallery.tsx`
  - `ProjectDetails.tsx`
  - `Contact.tsx`

### CSS Organization
- Global styles in `app/globals.css`
- CSS variables for theming
- No inline styles except for dynamic values (scroll-based morphing)
- Media queries for responsive design and dark mode

---

## Issues Fixed & Lessons Learned

### Issue 1: Broken Images
**Problem:** Multiple projects had missing or incorrectly mapped images.

**Solution:**
- Created systematic image verification scripts
- Restored images from extraction folders
- Renamed all images to project-specific names
- Updated all references in `data/projects.ts`

**Key Learning:** Always verify file paths exist before referencing them in data files.

---

### Issue 2: Generic Image Names Causing Conflicts
**Problem:** Images named `image-2.png`, `image-3.png` etc. existed in multiple project folders, causing confusion and potential conflicts.

**Solution:**
- Renamed all images to project-specific format
- Used consistent naming: `[slug]-[number].[ext]`
- Updated all data references

**Key Learning:** Unique, descriptive filenames prevent conflicts and make debugging easier.

---

### Issue 3: Vercel Deployment Errors
**Problem:** "Event handlers cannot be passed to Client Component props"

**Solution:**
- Removed all `onError` handlers from `<img>` tags
- Converted components needing interactivity to Client Components
- Used CSS hover effects instead of JavaScript event handlers where possible

**Key Learning:** Next.js 14 App Router is strict about Server vs Client Components. Event handlers can only be in Client Components.

---

### Issue 4: Hash-Based Routing in Squarespace
**Problem:** Squarespace uses `#/project-name/` routing, which Playwright doesn't handle well by default.

**Solution:**
- Created improved extraction scripts with better wait times
- Manual content verification from user-provided direct URLs
- User provided correct content when automated extraction failed

**Key Learning:** Some sites require manual verification when automated tools have limitations.

---

### Issue 5: Navigation Background Lost
**Problem:** Navigation bar lost its background styling during refactoring.

**Solution:**
- Added explicit `.nav-default` class
- Used `!important` flags to ensure styles aren't overridden
- Maintained separate states for scrolled vs not-scrolled

**Key Learning:** Explicit classes and CSS specificity important when multiple rules might apply.

---

### Issue 6: Project Cards Not Uniform Height
**Problem:** Cards had varying heights due to different title/description lengths.

**Solution:**
- Changed grid to `align-items: stretch`
- Set cards to `height: 100%`
- Reserved space for 2-line titles
- Increased description area to 5 lines

**Key Learning:** CSS Grid with `align-items: stretch` is the best way to create uniform card heights.

---

## Development Workflow

### Running Locally
```bash
npm install
npm run dev
```
Visit `http://localhost:3000`

### Building for Production
```bash
npm run build
npm start
```

### Deployment
1. Push changes to GitHub (via GitHub Desktop)
2. Vercel automatically deploys from GitHub
3. Check Vercel dashboard for deployment status

---

## File Naming & Organization

### Image Naming Convention
- **Thumbnails**: `[project-slug]-thumbnail.[ext]`
- **Gallery Images**: `[project-slug]-1.[ext]`, `[project-slug]-2.[ext]`, etc.
- **Extracted Images**: Stored in `portfolio-extraction/project-images/[project-slug]/`

### Project Slugs vs Folder Names
Mapping between project IDs and folder names:
- `plotly-studio` → `plotlystudio/`
- `data-viz-dashboards` → `dashboards/`
- `iqmetrix-retail` → `retail/`
- `best-buy-strategy` → `bestbuy-strategy/`
- `best-buy-vision` → `best-buy-vision/`

See `data/projects.ts` for complete mapping.

---

## Customization Guide

### Changing Colors
Edit `app/globals.css` CSS variables:
- `--accent-warm`: Color for wave backgrounds (currently `#f5ebe6`)
- `--primary`, `--background`, `--text`: Base theme colors

### Adjusting Wave Morphing
Edit `components/Hero.tsx` and `components/About.tsx`:
- Change multipliers (`* 50`, `* 40`, `* 25`) to make morphing more/less dramatic
- Change frequencies (`* 0.02`, `* 0.025`, `* 0.015`) to make it faster/slower

### Modifying Project Cards
- `min-height: 180px` in `.project-thumbnail-content` controls card content height
- `-webkit-line-clamp: 5` in `.project-thumbnail-description` controls description lines
- `min-height: 2.6em` in `.project-thumbnail-title` reserves 2-line space

---

## Known Considerations

### Image Loading
- Images use regular `<img>` tags (not Next.js Image component)
- Broken images show as empty space (no broken icon)
- All images should exist in `public/images/projects/[folder]/` before deployment

### Scroll Performance
- Wave morphing uses `requestAnimationFrame` for optimization
- Scroll listeners are passive for better performance
- Morphing calculations are lightweight (simple math functions)

### Browser Support
- `backdrop-filter` requires modern browsers
- Wave morphing requires JavaScript enabled
- CSS Grid requires modern browser support

### Dark Mode
- Automatically adapts based on system preference
- Warm accent color adjusts for dark mode (`#2a241f` in dark mode)
- All colors use CSS variables for easy theming

---

## Maintenance Notes

### Adding New Projects
1. Add project data to `data/projects.ts`
2. Create folder: `public/images/projects/[project-slug]/`
3. Add images with naming: `[slug]-thumbnail.[ext]`, `[slug]-1.[ext]`, etc.
4. Update references in project data object

### Updating Content
- Edit `data/projects.ts` for project information
- Edit component files for section content
- Styles are centralized in `app/globals.css`

### Debugging Image Issues
1. Check file exists: `ls public/images/projects/[folder]/`
2. Verify path in `data/projects.ts` matches actual filename
3. Check browser console for 404 errors
4. Ensure images are committed to Git

---

## Future Enhancement Ideas

1. **Next.js Image Component**: Consider migrating to `next/image` for automatic optimization
2. **Animation Library**: Could use Framer Motion for smoother animations
3. **CMS Integration**: Could connect to a headless CMS for easier content updates
4. **Project Filtering**: Add filtering by category or tag
5. **Search Functionality**: Add search across projects

---

## Contact & Support

For questions about this codebase:
- Check this documentation first
- Review code comments
- Review component structure in `components/` folder
- Check `data/projects.ts` for data structure reference

---

**Last Updated:** Based on work completed up to implementing morphing wave backgrounds, uniform project cards, and fixing all broken images.

**Key Principles:**
- Always maintain uniform card heights in grid layouts
- Use CSS variables for theming
- Keep Client Components minimal (only when interactivity needed)
- Test images exist before referencing in data
- Use descriptive, project-specific image names

