# Changelog - Portfolio Website Development

This changelog documents major changes, decisions, and milestones during the development of this portfolio website.

## Initial Setup

### Project Creation
- Created Next.js 14 project with App Router
- Set up TypeScript configuration
- Configured for Vercel deployment
- Initial structure with Hero, About, Projects, Contact sections

## Design System Implementation

### OROYA-Inspired Design
- Analyzed oroya.fr for design patterns
- Implemented two-line header pattern (small uppercase + large brand name)
- Applied alternating section backgrounds
- Large, responsive typography (`clamp(2.5rem, 5vw, 4rem)`)

### Color System
- Implemented CSS custom properties for theming
- Light/dark mode support based on system preference
- Warm accent color (`--accent-warm`) for wave backgrounds

## Navigation Bar Evolution

### Version 1: Basic Fixed Nav
- Simple fixed navigation bar

### Version 2: Frosted Glass Effect
- Added `backdrop-filter: blur()` for frosted glass
- Semi-transparent background
- Drop shadow on scroll

### Version 3: Refined Frosted Glass
- **Default state**: Semi-transparent, subtle blur, NO shadow (blends with page)
- **Scrolled state**: Enhanced blur, drop shadow appears (creates separation)
- Smooth transitions between states
- Added user mugshot (`tonyheadshot.png`) left of "Tony's Portfolio"

**Key Decision:** Navigation should feel integrated at top of page, then visually "lift" when scrolling to show separation.

## Hero Section Enhancements

### Initial State
- Simple centered content
- Gradient background

### Wave Background Addition
- Added SVG wave at bottom of Hero section
- Warm pinkish-beige color (`#f5ebe6`)
- Positioned absolutely behind content

### Morphing Wave Animation
- Wave shape now **morphs** based on scroll position
- Uses `Math.sin()` and `Math.cos()` for organic shape changes
- Three morph factors for complex deformation
- Optimized with `requestAnimationFrame`

**Key Decision:** Static waves felt too flat. Morphing creates dynamic, engaging interaction that feels "alive."

## About Section

### Content Updates
- Updated to user-provided text about UX Design & Design Lead role
- Changed "over 20 years" to "decades of experience"
- Added mention of AI tools (Claude Code, Cursor)

### Expertise Blocks
1. **User Research** - Understanding user needs and behaviors
2. **End-to-end UX Strategy** - Crafting an end-to-end vision and validating *(Added)*
3. **Prototyping** - Using AI tools to create working prototypes *(Replaced "UI Design")*

### Wave Integration
- Added inverted wave at top of About section
- Warm color flows from Hero, transitions back to white before Projects
- Same morphing animation as Hero wave

## Projects Section Evolution

### Initial Grid
- Basic card grid
- Tags/pills displayed on cards
- Varying card heights

### Removed Tags/Pills
- User requested removal of tags from cards
- Cleaner, more minimalist appearance

### Reduced Card Height
- Reduced padding (`0.875rem 1rem`)
- Smaller font sizes (title: `0.875rem`, description: `0.8125rem`)
- Tighter spacing

### Uniform Card Heights
- **Problem**: Cards had varying heights
- **Solution**: CSS Grid with `align-items: stretch`
- Cards now use `height: 100%` to fill grid cells
- Reserved space for 2-line titles (`min-height: 2.6em`)
- Increased description to 5 lines (`line-clamp: 5`)

### Stagger Effect Removal
- Initially used height-based staggering via `grid-row-end`
- User requested different method
- **New approach**: Subtle `transform: translateY()` for odd cards
- Visual stagger without affecting layout

**Key Decision:** Uniform heights create professional, polished appearance. Stagger is visual only (transform), not layout-based.

### Image Organization
- Each project has dedicated folder: `public/images/projects/[project-folder]/`
- All images renamed to project-specific format: `[slug]-thumbnail.png`, `[slug]-1.png`, etc.
- Removed duplicate images across folders
- All references updated in `data/projects.ts`

## Content Extraction

### Initial Extraction
- Used Playwright to extract content from Squarespace portfolio
- Base URL: `https://cheetah-accordion-l9n5.squarespace.com/`

### Challenges
- Squarespace uses hash-based routing (`#/project-name/`)
- Playwright had difficulty with dynamic content loading
- Some projects required manual content extraction

### Final Approach
- User provided direct URLs for each project
- Manual content verification and mapping
- Images organized and verified manually

## All 17 Projects

Projects added and organized:

1. Plotly Studio
2. Data Visualization for Businesses
3. iQmetrix - Front and Back of House Retail Platform
4. Navarik - Digital Transformation in Shipping
5. EA Games Intelligence Tool
6. Award Winning Peugeot 407, and 1007 Sites
7. BODOG.COM & .NET
8. Intel EMEA Websites and Content Management
9. Ebookers - Major European Holiday Booking Company
10. Best Buy - UX Strategy that Transformed bestbuy.ca
11. Best Buy - Connecting Teams with a United Vision
12. H&R Block - Assessing and Improving the Service Design Model
13. Fishtank - High Profile Websites
14. PAYLOAD - End-to-End Logistic Management Design
15. Queue Management System
16. Nike Marketing Sites / Apparel Catalogs
17. Ignite Works Digital Services - Co-Founder

## Dynamic Project Pages

### Implementation
- Created `app/projects/[slug]/page.tsx` for dynamic routing
- Reusable components:
  - `ProjectHeader.tsx` - Title, role, year, description
  - `ProjectGallery.tsx` - Image gallery with descriptions
  - `ProjectDetails.tsx` - Achievements, tags, external links
  - `ProjectImage.tsx` - Individual image with caption

### Features
- Static generation for all projects at build time
- 404 handling for invalid slugs
- "Back to Projects" navigation
- Clean, consistent layout

## Major Issues Fixed

### Issue 1: Broken Images (Multiple Iterations)
**Problem**: Images missing or incorrectly mapped across multiple projects.

**Fixes Applied**:
- Created verification scripts to check file existence
- Restored images from extraction folders
- Renamed all images to project-specific names
- Updated all references in `data/projects.ts`
- Systematically verified each project folder

**Key Learning**: Always verify file paths exist before referencing in data files. Use descriptive, unique filenames.

---

### Issue 2: Vercel Deployment Errors
**Problem**: "Event handlers cannot be passed to Client Component props"

**Solution**:
- Removed `onError` handlers from `<img>` tags where not needed
- Converted components needing interactivity to Client Components with `'use client'`
- Used CSS hover effects instead of JavaScript where possible

**Key Learning**: Next.js 14 App Router is strict about Server vs Client Components. Event handlers can only be in Client Components.

---

### Issue 3: Navigation Background Lost
**Problem**: Navigation bar lost its background styling during refactoring.

**Solution**:
- Added explicit `.nav-default` class
- Used `!important` flags to ensure styles aren't overridden
- Maintained separate states for scrolled vs not-scrolled

---

### Issue 4: Project Cards Description Text Cut Off
**Problem**: Descriptions being truncated too aggressively.

**Solution**:
- Increased `line-clamp` from 3 to 5
- Increased content area `min-height` from 140px to 180px
- Adjusted `line-height` to 1.5 for better readability

---

### Issue 5: Duplicate Images Across Folders
**Problem**: Same generic images (`image-2.png`, etc.) in multiple project folders.

**Solution**:
- Renamed all images to project-specific format
- Created cleanup scripts to remove duplicates
- Manually verified each project folder

---

### Issue 6: Incorrect Project Content
**Problem**: Some projects had wrong content or missing content.

**Solution**:
- User provided correct content for each affected project
- Manual verification and updates to `data/projects.ts`
- Re-extraction of specific projects where needed

---

### Issue 7: Wave Background Pushing Content Up
**Problem**: Wave SVG was in document flow, pushing content up.

**Solution**:
- Changed wave to `position: absolute`
- Set `z-index: 0` for wave, `z-index: 1` for content
- Added `pointer-events: none` to wave

---

### Issue 8: Wave Not Morphing
**Problem**: Wave was static, no parallax or morphing effect.

**Solution**:
- Added scroll tracking with `useState` and `useEffect`
- Implemented morphing calculations using `Math.sin()` and `Math.cos()`
- Updated SVG path `d` attribute dynamically
- Optimized with `requestAnimationFrame`

---

### Issue 9: Navigation Drop Shadow Always Visible
**Problem**: Drop shadow appeared even at top of page.

**Solution**:
- Removed `box-shadow` from default `nav` styles
- Only apply shadow with `.nav-scrolled` class
- Maintained semi-transparent background in both states

**Key Decision**: Navigation should feel like part of the page at top, then visually separate when scrolling.

---

## Text Content Refinements

### Removed Elements
- All French text and quotes (OROYA-inspired placeholders)
- Small duplicate section titles (e.g., "ABOUT" above "ABOUT ME")

### Updated Content
- About section text with user-provided copy
- Changed "over 20 years" to "decades of experience"
- Added expertise block for "End-to-end UX Strategy"
- Replaced "UI Design" with "Prototyping" expertise

## Styling Refinements

### Typography
- Applied OROYA-inspired two-line header pattern
- Consistent letter-spacing and text transforms
- Removed gradients from headings (solid colors)

### Layout
- Consistent section padding (`6rem` vertical)
- Max-width containers (`1200px`)
- Alternating section backgrounds

### Responsive Design
- Mobile-friendly grid layouts
- Responsive typography (`clamp()` functions)
- Flexible image handling

## Performance Optimizations

### Scroll Handling
- `requestAnimationFrame` for smooth scroll updates
- Passive event listeners
- Lightweight morphing calculations (simple math functions)

### Image Loading
- Static images served from `public/` folder
- Broken images handled gracefully (show as empty space)
- Proper file organization for cache efficiency

## Final State

### Current Features
- ✅ 17 projects fully populated with content and images
- ✅ Uniform project card grid with consistent heights
- ✅ Morphing wave backgrounds with scroll interaction
- ✅ Frosted glass navigation with scroll-based effects
- ✅ Dynamic project detail pages
- ✅ Light/dark mode support
- ✅ Fully responsive design
- ✅ Clean, modern aesthetic

### Image Organization
- All images use project-specific names
- Each project has dedicated folder
- No duplicate images across folders
- All references verified and working

### Code Quality
- TypeScript throughout
- Reusable components
- CSS variables for theming
- Clean separation of concerns

---

## Development Timeline Notes

1. **Initial Setup** - Next.js project, basic structure
2. **Design System** - OROYA-inspired patterns
3. **Content Extraction** - Playwright scripts, manual verification
4. **Image Organization** - Renaming, folder structure, cleanup
5. **Styling Refinements** - Cards, navigation, waves
6. **Bug Fixes** - Images, deployment, content accuracy
7. **Final Polish** - Uniform heights, morphing waves, content updates

---

**Note**: This changelog focuses on major changes. For detailed technical information, see [PROJECT-DOCUMENTATION.md](./PROJECT-DOCUMENTATION.md).


