const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Get the URL from command line argument
const url = process.argv[2];

if (!url) {
  console.log('Usage: node extract-portfolio-content.js <URL>');
  console.log('Example: node extract-portfolio-content.js https://example.com');
  process.exit(1);
}

// Function to download images
async function downloadImage(imageUrl, outputPath) {
  return new Promise((resolve, reject) => {
    const protocol = imageUrl.startsWith('https') ? https : http;
    const file = fs.createWriteStream(outputPath);
    
    protocol.get(imageUrl, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirects
        return downloadImage(response.headers.location, outputPath).then(resolve).catch(reject);
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlinkSync(outputPath);
      reject(err);
    });
  });
}

async function extractPortfolioContent(url) {
  console.log(`\n🔍 Analyzing and extracting content from: ${url}\n`);
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Navigate to the website
    console.log('📡 Loading website...');
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(3000); // Wait for dynamic content
    
    // Create output directory
    const outputDir = path.join(__dirname, 'portfolio-extraction');
    const imagesDir = path.join(outputDir, 'images');
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }
    
    // 1. Extract all text content by sections
    console.log('📝 Extracting all text content...');
    const allContent = await page.evaluate(() => {
      const sections = [];
      const sectionElements = document.querySelectorAll('section, [class*="section"], [id*="section"], main > div, .content, [class*="block"]');
      
      sectionElements.forEach((section, index) => {
        const heading = section.querySelector('h1, h2, h3, h4, h5, h6');
        const text = section.innerText.trim();
        const id = section.id || null;
        const className = section.className || null;
        
        if (text.length > 20) { // Only include sections with substantial content
          sections.push({
            index,
            id,
            className,
            heading: heading ? heading.innerText.trim() : null,
            headingTag: heading ? heading.tagName : null,
            content: text,
            html: section.innerHTML.substring(0, 500), // First 500 chars of HTML
          });
        }
      });
      
      return sections;
    });
    
    // 2. Extract all headings hierarchy
    console.log('📄 Extracting headings structure...');
    const headings = await page.evaluate(() => {
      const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      return Array.from(headingElements).map((h, index) => ({
        index,
        tag: h.tagName,
        text: h.innerText.trim(),
        id: h.id || null,
        className: h.className || null,
      }));
    });
    
    // 3. Extract all images
    console.log('🖼️  Extracting images...');
    const images = await page.evaluate(() => {
      const imageElements = document.querySelectorAll('img, [style*="background-image"]');
      const imageData = [];
      
      imageElements.forEach((img, index) => {
        let src = null;
        let alt = null;
        
        if (img.tagName === 'IMG') {
          src = img.src || img.getAttribute('data-src') || img.getAttribute('data-lazy-src');
          alt = img.alt || '';
        } else {
          // Handle background images
          const bgImage = window.getComputedStyle(img).backgroundImage;
          if (bgImage && bgImage !== 'none') {
            const match = bgImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (match) src = match[1];
          }
        }
        
        if (src && !src.startsWith('data:')) {
          // Convert relative URLs to absolute
          if (src.startsWith('//')) {
            src = 'https:' + src;
          } else if (src.startsWith('/')) {
            src = new URL(src, window.location.origin).href;
          }
          
          imageData.push({
            index,
            src,
            alt: alt || '',
            width: img.width || null,
            height: img.height || null,
            className: img.className || null,
          });
        }
      });
      
      return imageData;
    });
    
    // Download images
    console.log(`\n📥 Downloading ${images.length} images...`);
    const downloadedImages = [];
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      try {
        const ext = path.extname(new URL(img.src).pathname) || '.jpg';
        const filename = `image-${i + 1}${ext}`;
        const filePath = path.join(imagesDir, filename);
        
        await downloadImage(img.src, filePath);
        downloadedImages.push({
          ...img,
          localPath: `images/${filename}`,
          downloaded: true,
        });
        console.log(`  ✓ Downloaded: ${filename}`);
      } catch (error) {
        console.log(`  ✗ Failed to download image ${i + 1}: ${error.message}`);
        downloadedImages.push({
          ...img,
          localPath: null,
          downloaded: false,
          error: error.message,
        });
      }
    }
    
    // 4. Extract all links
    console.log('\n🔗 Extracting links...');
    const links = await page.evaluate(() => {
      const linkElements = document.querySelectorAll('a[href]');
      return Array.from(linkElements).map((a) => ({
        text: a.innerText.trim(),
        href: a.href,
        target: a.target || null,
      }));
    });
    
    // 5. Extract navigation structure
    console.log('🧭 Extracting navigation...');
    const navigation = await page.evaluate(() => {
      const navElements = document.querySelectorAll('nav a, header a, [class*="nav"] a, [class*="menu"] a');
      return Array.from(navElements).map((a) => ({
        text: a.innerText.trim(),
        href: a.href,
      }));
    });
    
    // 6. Extract button text and CTAs
    console.log('🔘 Extracting buttons and CTAs...');
    const buttons = await page.evaluate(() => {
      const buttonElements = document.querySelectorAll('button, [class*="button"], [class*="btn"], [role="button"]');
      return Array.from(buttonElements).map((btn) => ({
        text: btn.innerText.trim(),
        type: btn.type || null,
        className: btn.className || null,
      }));
    });
    
    // 7. Take full page screenshot
    console.log('\n📸 Taking screenshots...');
    await page.screenshot({ 
      path: path.join(outputDir, 'full-page-screenshot.png'),
      fullPage: true 
    });
    
    // Mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    await page.screenshot({ 
      path: path.join(outputDir, 'mobile-view.png'),
      fullPage: true 
    });
    
    // Desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(1000);
    
    // Compile all extracted data
    const extraction = {
      url,
      extractedAt: new Date().toISOString(),
      pageInfo: {
        title: await page.title(),
        url: url,
      },
      structure: {
        headings,
        sections: allContent,
      },
      content: {
        sections: allContent,
        headings,
        navigation,
        links: links.slice(0, 50), // Limit to first 50 links
        buttons,
      },
      media: {
        images: downloadedImages,
        totalImages: images.length,
        downloadedCount: downloadedImages.filter(img => img.downloaded).length,
      },
    };
    
    // Save extraction data
    fs.writeFileSync(
      path.join(outputDir, 'extracted-content.json'),
      JSON.stringify(extraction, null, 2)
    );
    
    // Create human-readable content document
    const contentDoc = `
# Portfolio Content Extraction

**Source:** ${url}
**Extracted:** ${new Date(extraction.extractedAt).toLocaleString()}
**Page Title:** ${extraction.pageInfo.title}

---

## 📄 Page Structure

### Headings Hierarchy

${headings.map(h => `${'  '.repeat(parseInt(h.tag.substring(1)) - 1)}- **${h.tag}**: ${h.text}`).join('\n')}

---

## 📝 Content Sections

${allContent.map((section, index) => `
### Section ${index + 1}${section.heading ? `: ${section.heading}` : ''}

${section.heading ? `**${section.headingTag}:** ${section.heading}\n` : ''}
**Content:**
${section.content.split('\n').filter(line => line.trim()).map(line => `> ${line.trim()}`).join('\n')}

${section.id ? `- **ID:** ${section.id}` : ''}
${section.className ? `- **Class:** ${section.className}` : ''}
`).join('\n---\n')}

---

## 🖼️ Images

**Total Images Found:** ${images.length}
**Successfully Downloaded:** ${downloadedImages.filter(img => img.downloaded).length}

${downloadedImages.map((img, index) => `
### Image ${index + 1}

- **Source URL:** ${img.src}
- **Alt Text:** ${img.alt || 'No alt text'}
- **Downloaded:** ${img.downloaded ? '✅ Yes' : '❌ No'}
${img.localPath ? `- **Local Path:** ${img.localPath}` : ''}
${img.error ? `- **Error:** ${img.error}` : ''}
`).join('\n')}

---

## 🧭 Navigation

${navigation.map((nav, index) => `${index + 1}. **${nav.text}** → ${nav.href}`).join('\n')}

---

## 🔗 Links

${links.slice(0, 30).map((link, index) => `${index + 1}. [${link.text || link.href}](${link.href})`).join('\n')}

${links.length > 30 ? `\n*... and ${links.length - 30} more links*` : ''}

---

## 🔘 Buttons & CTAs

${buttons.map((btn, index) => `${index + 1}. **${btn.text}**${btn.type ? ` (${btn.type})` : ''}`).join('\n')}

---

## 📋 Migration Notes

Use this content to populate your new portfolio framework. Replace placeholder content in:

- \`components/Hero.tsx\` - Hero section content
- \`components/About.tsx\` - About section content
- \`components/Projects.tsx\` - Project data
- \`components/Contact.tsx\` - Contact information

Images are saved in the \`images/\` folder. Reference them when updating your components.

`;

    fs.writeFileSync(path.join(outputDir, 'CONTENT.md'), contentDoc);
    
    // Create a simple text version for quick reference
    const textContent = allContent.map(section => {
      return `\n${'='.repeat(60)}\n${section.heading || `Section ${section.index}`}\n${'='.repeat(60)}\n\n${section.content}`;
    }).join('\n');
    
    fs.writeFileSync(path.join(outputDir, 'content-text-only.txt'), textContent);
    
    console.log(`\n✅ Extraction complete!\n`);
    console.log(`📁 Files saved to: ${outputDir}/`);
    console.log(`   - extracted-content.json (full data)`);
    console.log(`   - CONTENT.md (human-readable documentation)`);
    console.log(`   - content-text-only.txt (plain text)`);
    console.log(`   - full-page-screenshot.png`);
    console.log(`   - mobile-view.png`);
    console.log(`   - images/ (${downloadedImages.filter(img => img.downloaded).length} images downloaded)\n`);
    
  } catch (error) {
    console.error('❌ Error extracting content:', error.message);
    console.error(error.stack);
  } finally {
    await browser.close();
  }
}

// Run the extraction
extractPortfolioContent(url);

