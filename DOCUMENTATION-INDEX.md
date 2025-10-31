# Documentation Index

This is your quick reference guide to all documentation in this portfolio project.

## 🎯 Start Here

**If you're new to this project or returning after time away:**

1. **Read [PROJECT-DOCUMENTATION.md](./PROJECT-DOCUMENTATION.md)** - Complete technical documentation
2. **Check [CHANGELOG.md](./CHANGELOG.md)** - What changed and why
3. **Review [README.md](./README.md)** - Quick start guide

---

## 📚 Documentation Files

### [PROJECT-DOCUMENTATION.md](./PROJECT-DOCUMENTATION.md) - **PRIMARY REFERENCE**
**Purpose**: Complete technical documentation for understanding the entire project

**Contains**:
- Complete project structure and file organization
- All 17 projects listed with details
- Design system explanation (colors, typography, layout)
- Technical implementation details (scroll tracking, wave morphing, etc.)
- Image organization and naming conventions
- Issues fixed and lessons learned
- Customization guides
- Maintenance notes
- Development workflow

**When to use**: 
- Understanding how anything works in this project
- Adding new features
- Debugging issues
- Taking over the project

---

### [CHANGELOG.md](./CHANGELOG.md)
**Purpose**: Historical record of changes, decisions, and evolution

**Contains**:
- Chronological list of major changes
- Design decisions and rationale
- Evolution of features (e.g., navigation bar, wave backgrounds)
- All issues fixed with solutions
- Key learnings from each problem

**When to use**:
- Understanding why something was done a certain way
- Learning from past mistakes
- Seeing the project evolution

---

### [README.md](./README.md)
**Purpose**: Quick start guide and getting started

**Contains**:
- Quick start instructions
- Basic customization guide
- Deployment instructions
- Link to full documentation

**When to use**:
- First time setting up
- Quick reminder of commands
- Basic customization needs

---

## 📖 Additional Reference Documents

### [oroya-design-system.md](./oroya-design-system.md)
**Purpose**: Analysis of the inspiration website (oroya.fr)

**Contains**:
- Design patterns from OROYA.fr
- Typography styles
- Layout patterns
- Color schemes

**When to use**: Understanding design inspiration and patterns

---

### [oroya-implementation-guide.md](./oroya-implementation-guide.md)
**Purpose**: Guide for implementing OROYA-inspired styles

**Contains**:
- CSS classes for OROYA patterns
- Implementation examples
- Component structure

**When to use**: Implementing new OROYA-inspired features

---

### [MIGRATION-GUIDE.md](./MIGRATION-GUIDE.md)
**Purpose**: Guide for migrating content from old Squarespace site

**Contains**:
- Content extraction process
- Image organization strategy
- Content mapping

**When to use**: Understanding how content was migrated (historical reference)

---

### [PROJECTS-SUMMARY.md](./PROJECTS-SUMMARY.md)
**Purpose**: Summary of all extracted projects

**Contains**:
- List of all projects
- Project descriptions
- Image organization details

**When to use**: Quick reference for project information

---

## 🔍 Quick Reference by Topic

### Want to understand...

**The design system?**
→ [PROJECT-DOCUMENTATION.md](./PROJECT-DOCUMENTATION.md) - "Design System & Styling" section

**Why the navigation works this way?**
→ [CHANGELOG.md](./CHANGELOG.md) - "Navigation Bar Evolution" section

**How the morphing waves work?**
→ [PROJECT-DOCUMENTATION.md](./PROJECT-DOCUMENTATION.md) - "Morphing Wave Backgrounds" section

**Image organization?**
→ [PROJECT-DOCUMENTATION.md](./PROJECT-DOCUMENTATION.md) - "Image Organization & Naming" section

**What projects are included?**
→ [PROJECT-DOCUMENTATION.md](./PROJECT-DOCUMENTATION.md) - "All 17 Projects" section

**How to add a new project?**
→ [PROJECT-DOCUMENTATION.md](./PROJECT-DOCUMENTATION.md) - "Maintenance Notes" section

**What issues were fixed?**
→ [CHANGELOG.md](./CHANGELOG.md) - "Major Issues Fixed" section

**How to customize colors?**
→ [PROJECT-DOCUMENTATION.md](./PROJECT-DOCUMENTATION.md) - "Customization Guide" section

**Project structure?**
→ [PROJECT-DOCUMENTATION.md](./PROJECT-DOCUMENTATION.md) - "Project Structure" section

---

## 🛠️ Common Tasks Quick Links

### Adding a New Project
1. Read: [PROJECT-DOCUMENTATION.md](./PROJECT-DOCUMENTATION.md) - "Maintenance Notes" → "Adding New Projects"
2. Edit: `data/projects.ts`
3. Add folder: `public/images/projects/[project-slug]/`
4. Add images with naming: `[slug]-thumbnail.[ext]`, `[slug]-1.[ext]`, etc.

### Changing Colors
1. Read: [PROJECT-DOCUMENTATION.md](./PROJECT-DOCUMENTATION.md) - "Customization Guide" → "Changing Colors"
2. Edit: `app/globals.css` - CSS variables section

### Fixing Broken Images
1. Read: [PROJECT-DOCUMENTATION.md](./PROJECT-DOCUMENTATION.md) - "Maintenance Notes" → "Debugging Image Issues"
2. Check file exists: `ls public/images/projects/[folder]/`
3. Verify path in `data/projects.ts`

### Adjusting Wave Morphing
1. Read: [PROJECT-DOCUMENTATION.md](./PROJECT-DOCUMENTATION.md) - "Customization Guide" → "Adjusting Wave Morphing"
2. Edit: `components/Hero.tsx` and `components/About.tsx`

### Modifying Project Cards
1. Read: [PROJECT-DOCUMENTATION.md](./PROJECT-DOCUMENTATION.md) - "Customization Guide" → "Modifying Project Cards"
2. Edit: `app/globals.css` - `.project-thumbnail-*` classes

---

## 📝 For LLMs / AI Assistants

If you're an LLM or AI assistant taking over this project:

1. **Start with**: [PROJECT-DOCUMENTATION.md](./PROJECT-DOCUMENTATION.md)
   - This has the complete technical context
   - All design decisions and rationale
   - File structure and organization

2. **Review**: [CHANGELOG.md](./CHANGELOG.md)
   - Understand what changed and why
   - Learn from past issues and fixes

3. **Check**: Component files for current implementation
   - `components/` folder for React components
   - `app/globals.css` for all styles
   - `data/projects.ts` for project data structure

4. **Key Principles to Remember**:
   - Always maintain uniform card heights in grid layouts
   - Use CSS variables for theming
   - Keep Client Components minimal (only when interactivity needed)
   - Test images exist before referencing in data
   - Use descriptive, project-specific image names
   - Navigation should blend at top, separate when scrolled
   - Waves morph on scroll (not just parallax)
   - All cards same height, 2-line title space, 5-line description

---

## 🎨 Design Philosophy Summary

- **Clean & Modern**: Inspired by oroya.fr
- **Dynamic Interaction**: Morphing waves respond to scroll
- **Professional Polish**: Uniform card heights, consistent spacing
- **Accessible**: Dark mode support, responsive design
- **Maintainable**: CSS variables, reusable components, clear structure

---

## 🔗 External Resources

- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **React Docs**: [react.dev](https://react.dev)

---

**Last Updated**: Based on project state after implementing morphing waves, uniform cards, and fixing all broken images.

**Key Takeaway**: When in doubt, check [PROJECT-DOCUMENTATION.md](./PROJECT-DOCUMENTATION.md) first. It's the single source of truth for this project.

