# Portfolio Migration Guide

**Source:** https://cheetah-accordion-l9n5.squarespace.com/  
**Extracted:** October 31, 2025  
**Total Images:** 40 downloaded  
**Target Framework:** OROYA-style Next.js Portfolio

---

## 📋 Content Overview

### Hero/Introduction Section

**Heading:** "Hello, I'm Tony!"

**Content:**
> I'm a seasoned UX Designer & Design Lead, passionate about crafting product and service experiences that simplify tasks, clarify information, and feel delightful to use. With over 20 years of experience, I've delivered seamless digital solutions for global brands and everyday users alike. I'm guided by user needs, and a user-centered approach. I bridge design and engineering by rapidly translating ideas into working code. Using tools like Claude Code, Cursor, and modern design systems, I "vibe code" end-to-end flows that can be tested, iterated, and shipped quickly, ensuring real user feedback drives constant improvement.
> 
> This site is intentionally minimal to make the work below the focus. Hope you have fun exploring.

---

## 🎯 Projects to Migrate

Based on the extracted content, here are the projects that need to be added:

### 1. Data Visualization for Businesses (Plotly Studio)
- **Category:** Information is Beautiful Candidate
- **Description:** Redesigned sales performance dashboards for dominant point-of-sale system in wireless industry
- **Details:** Modular, web-based, fully mobile-friendly, customizable dashboarding system
- **Features:** Configurable cards, multiple visualization options (charts, lists, maps)
- **Images:** Check portfolio-extraction/images/ for related screenshots

### 2. iQmetrix - Front and Back of House Retail Platform
- **Role:** Lead Designer
- **Description:** Tablet-based, touchscreen, fully mobile Retail Point of Sale System
- **Features:** Sales, orders, customer queues, inventory management
- **Status:** Deployed in hundreds of stores
- **Additional:** Back-of-house inventory management system and retail operations tool
- **Images:** Multiple images available

### 3. Navarik - Digital Transformation in the Shipping Industry
- **Role:** Sole UX designer
- **Clients:** BP, Petro Canada, Shell
- **Description:** Web applications for largest commodity companies globally
- **Focus:** Complex, extensive, precise flows for safely moving commodities
- **Includes:** Video demo
- **Images:** Available in extraction folder

### 4. EA Games Intelligence Tool
- **Projects:** Godfather, Need for Speed, Battlefield
- **Key Achievement:** Redesign and interaction architecture for EA Battlefield 2 website
- **Innovation:** Industry first online game viewer and intelligence tool
- **Feature:** Allowed players to log in after playing and plan strategies with their clan
- **External Link:** IGN review available

### 5. Award Winning Peugeot 407, and 1007 Sites
- **Agency:** HAVAS (London)
- **Models:** 107 and 1007
- **1007 Highlights:**
  - Targeted to urban lifestyles and users with mobility challenges
  - Accessibility champion role
  - First marketing website to be fully accessible (despite Flash being predominant)
  - Won Cannes Lion
- **107:** Navigation flow and HTML templates

### 6. BODOG.COM & .NET
- **Agency:** Riptown Media
- **Role:** Site Producer
- **Scope:** Redesigns of .com and .net websites
- **Process:** Wireframes, testing, stakeholder vetting with development teams
- **Deliverable:** Two websites and customer account experience

### 7. Intel EMEA Websites and Content Management
- **Agency:** HAVAS (London)
- **Challenge:** Intel needed content control, but design managed by agency
- **Solution:** Separated presentation layer from users, created data capture forms for marketing content
- **Result:** Enabled Intel to publish content to website via CMS

### 8. Ebookers - Major European Holiday Booking Company
- **Role:** Lead Web Designer
- **Era:** Early 2000s dotCOM boom in London
- **Focus:** Easy and intuitive booking process, reduced drop-offs and support calls
- **Scope:** Navigation, template pages for package holidays, hotels, cars, insurance, campaigns, banner ads

---

## 🖼️ Image Inventory

**Total Images Downloaded:** 40  
**Location:** `portfolio-extraction/images/`

**File Types:**
- PNG files: Most screenshots and UI images
- JPG files: Some photos and rendered images

**Organizing Images:**
- Group images by project when migrating
- Some images may be project thumbnails
- Some images are detailed project screenshots
- Reference the extracted-content.json for image metadata

---

## 📝 Migration Steps

### Step 1: Update Hero Section

**File:** `components/Hero.tsx`

Replace current content with:
```tsx
<h1 className="hero-title-oroya">
  Hello, I'm Tony!
</h1>
<p style={{ fontSize: '1.5rem', marginBottom: '3rem', color: 'var(--text-light)', fontWeight: 300 }}>
  UX Designer & Design Lead
</p>
```

### Step 2: Update About Section

**File:** `components/About.tsx`

Use this content:
```
I'm a seasoned UX Designer & Design Lead, passionate about crafting product and service experiences that simplify tasks, clarify information, and feel delightful to use. With over 20 years of experience, I've delivered seamless digital solutions for global brands and everyday users alike. I'm guided by user needs, and a user-centered approach. I bridge design and engineering by rapidly translating ideas into working code. Using tools like Claude Code, Cursor, and modern design systems, I "vibe code" end-to-end flows that can be tested, iterated, and shipped quickly, ensuring real user feedback drives constant improvement.

This site is intentionally minimal to make the work below the focus. Hope you have fun exploring.
```

### Step 3: Update Projects Section

**File:** `components/Projects.tsx`

Replace the projects array with all 8 projects. For each project, include:
- Title
- Description (main paragraph)
- Key points/features (as tags)
- Image references

**Project Structure Example:**
```tsx
{
  title: 'Data Visualization for Businesses',
  client: 'Plotly Studio',
  description: 'I was tasked with redesigning the sales performance dashboards used in the dominant point-of-sale system in the wireless industry...',
  tags: ['UX Research', 'Dashboard Design', 'Data Visualization', 'Mobile-First'],
  images: ['image-X.png', 'image-Y.png'],
  category: 'Information Visualization',
  award: 'Information is Beautiful Candidate'
}
```

### Step 4: Organize Images

1. Review all 40 images in `portfolio-extraction/images/`
2. Identify which images belong to which projects
3. Copy relevant images to a new `public/images/` folder in your Next.js project
4. Update image paths in project data

### Step 5: Update Contact Section

**File:** `components/Contact.tsx`

Keep existing structure but verify:
- Email address is correct
- Social links are updated
- Contact form information (if needed)

---

## 🎨 Design Notes

### Preserve These Elements:
- **Minimal aesthetic** - Keep it clean like the original
- **Project focus** - Let the work be the hero
- **20+ years experience** - This is a key differentiator
- **"Vibe code" approach** - Unique positioning to highlight

### Enhance with OROYA Style:
- Two-line section headers (SECTION NAME + YOUR NAME)
- Clean typography hierarchy
- Generous white space
- Subtle hover effects
- Professional but approachable tone

---

## 📁 File Structure After Migration

```
portfolio/
├── components/
│   ├── Hero.tsx (updated with Tony's intro)
│   ├── About.tsx (updated with bio)
│   ├── Projects.tsx (all 8 projects)
│   └── Contact.tsx (verify contact info)
├── public/
│   └── images/
│       ├── project-1-*.png
│       ├── project-2-*.png
│       └── ... (organized by project)
└── portfolio-extraction/
    ├── images/ (original downloads)
    └── CONTENT.md (reference)
```

---

## ✅ Migration Checklist

- [ ] Review all extracted content in `portfolio-extraction/CONTENT.md`
- [ ] Review all 40 images and organize by project
- [ ] Update Hero component with "Hello, I'm Tony!" intro
- [ ] Update About component with full bio text
- [ ] Create projects array with all 8 projects
- [ ] Add project descriptions and key details
- [ ] Copy relevant images to `public/images/`
- [ ] Update image paths in project data
- [ ] Add tags/categories for each project
- [ ] Test all links and external references
- [ ] Verify contact information
- [ ] Review responsive design on mobile
- [ ] Test dark mode compatibility
- [ ] Preview site locally before deploying

---

## 🔗 External Links to Preserve

- EA Games IGN Review link (if applicable)
- Any project demo videos
- External case study links (if any)

---

## 💡 Content Refinement Tips

1. **Condense Project Descriptions:** The original may have long descriptions. Consider creating:
   - Short intro paragraph
   - Key achievements/bullets
   - Technical details/process (optional)

2. **Image Selection:** Choose 2-3 best images per project to showcase

3. **Tag System:** Create consistent tags like:
   - UX Research
   - UI Design
   - Dashboard Design
   - Mobile Design
   - Accessibility
   - Data Visualization
   - Retail Systems
   - etc.

4. **Project Order:** Consider ordering by:
   - Relevance/recency
   - Impact/scale
   - Diversity of work
   - Or chronological (most recent first)

---

*All extracted content and images are saved in `portfolio-extraction/` folder for reference.*

