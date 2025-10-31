# Portfolio Website

A modern, responsive portfolio website built with Next.js, ready to deploy on Vercel.

## 📚 **Important: Full Documentation**

For complete details about this project, including all design decisions, implementation details, and technical notes, see **[PROJECT-DOCUMENTATION.md](./PROJECT-DOCUMENTATION.md)**.

This comprehensive documentation covers:
- Complete project structure
- All 17 projects and their organization
- Design system and styling rationale
- Technical implementation details
- Issues fixed and lessons learned
- Image organization and naming conventions
- Customization guides
- Maintenance notes

**If you're coming back to this project after time away, or another developer/LLM is taking over, start with PROJECT-DOCUMENTATION.md for full context.**

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed on your computer
- GitHub account (you already have this!)
- Vercel account (free tier works great)

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Customization Guide

Since you're a UX designer, here's how to easily customize your portfolio:

### 1. Update Your Personal Information

**Hero Section** (`components/Hero.tsx`):
- Change "Hi, I'm a UX Designer" to your name or title
- Update the subtitle text
- Modify the button text if desired

**About Section** (`components/About.tsx`):
- Replace the paragraph text with your own story
- Update the skills/expertise areas

**Contact Section** (`components/Contact.tsx`):
- Replace `your.email@example.com` with your actual email
- Update the social media links (LinkedIn, Twitter, Dribbble)

### 2. Add Your Projects

Edit `components/Projects.tsx`:
- Replace the example projects with your actual work
- Add project images (optional - you can add them later)
- Update descriptions and tags

### 3. Change Colors

Edit `app/globals.css`:
- The `:root` section at the top contains color variables
- Change `--primary` and `--secondary` for your brand colors
- Adjust other colors to match your preferences

### 4. Update Meta Information

Edit `app/layout.tsx`:
- Change the title and description for SEO

## 🌐 Deploy to Vercel

### Option 1: Deploy via GitHub (Recommended)

1. **Push your code to GitHub:**
   - Use GitHub Desktop to commit and push all changes
   - Make sure all files are committed

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with your GitHub account
   - Click "Add New Project"
   - Select your `portfolio` repository
   - Click "Deploy" (Vercel will auto-detect Next.js)

3. **Your site will be live in ~2 minutes!**
   - Vercel will give you a URL like `portfolio.vercel.app`
   - You can add a custom domain later

### Option 2: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel
```

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx      # Main layout and metadata
│   ├── page.tsx        # Home page (assembles all sections)
│   └── globals.css     # Global styles and colors
├── components/
│   ├── Navigation.tsx  # Top navigation bar
│   ├── Hero.tsx        # Hero section
│   ├── About.tsx       # About section
│   ├── Projects.tsx    # Projects showcase
│   └── Contact.tsx     # Contact section
├── package.json        # Dependencies
└── README.md          # This file
```

## 🎨 Design Tips

- The site uses a modern gradient hero section
- All sections are fully responsive (mobile-friendly)
- Dark mode support is built-in (respects system preference)
- Hover effects on buttons and project cards
- Smooth scrolling navigation

## 🛠️ Next Steps

1. Customize the content with your information
2. Add your project screenshots/images
3. Update social media links
4. Deploy to Vercel
5. Share your portfolio!

## 💡 Need Help?

- Next.js docs: [nextjs.org/docs](https://nextjs.org/docs)
- Vercel docs: [vercel.com/docs](https://vercel.com/docs)
- For styling questions, check `globals.css` comments

---

Built with ❤️ using Next.js and ready for Vercel deployment!

