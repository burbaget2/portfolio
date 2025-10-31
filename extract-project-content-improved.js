const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const projectUrls = [
  { slug: 'plotlystudio', url: 'https://cheetah-accordion-l9n5.squarespace.com/#/plotlystudio/', title: 'Plotly Studio' },
  { slug: 'dashboards', url: 'https://cheetah-accordion-l9n5.squarespace.com/#/dashboards/', title: 'Data Visualization for Businesses' },
  { slug: 'fishtank', url: 'https://cheetah-accordion-l9n5.squarespace.com/#/fishtank/', title: 'Fishtank - High Profile Websites' },
  { slug: 'hr-block', url: 'https://cheetah-accordion-l9n5.squarespace.com/#/hr-block-senior-ux-designer/', title: 'H&R Block - Assessing and Improving the Service Design Model' },
  { slug: 'best-buy-vision', url: 'https://cheetah-accordion-l9n5.squarespace.com/#/high-level-user-journey-conceptual-blueprint-ux-artifact/', title: 'Best Buy - Connecting Teams with a United Vision' },
  { slug: 'retail', url: 'https://cheetah-accordion-l9n5.squarespace.com/#/retail/', title: 'iQmetrix - Front and Back of House Retail Platform' },
  { slug: 'payload', url: 'https://cheetah-accordion-l9n5.squarespace.com/#/payload/', title: 'PAYLOAD - End-to-End Logistic Management Design' },
  { slug: 'queue', url: 'https://cheetah-accordion-l9n5.squarespace.com/#/queue/', title: 'Queue Management' },
  { slug: 'navarik', url: 'https://cheetah-accordion-l9n5.squarespace.com/#/navarik/', title: 'Navarik - Digital Transformation in the Shipping Industry' },
  { slug: 'ea-games', url: 'https://cheetah-accordion-l9n5.squarespace.com/#/ea-games-marketing-sites/', title: 'EA Games Intelligence Tool' },
  { slug: 'nike', url: 'https://cheetah-accordion-l9n5.squarespace.com/#/nike/', title: 'Nike Marketing Sites / Apparel Catalogs' },
  { slug: 'peugeot', url: 'https://cheetah-accordion-l9n5.squarespace.com/#/peugeot/', title: 'Award Winning Peugeot 407, and 1007 Sites' },
  { slug: 'bodog', url: 'https://cheetah-accordion-l9n5.squarespace.com/#/bodog-com-net/', title: 'BODOG.COM & .NET' },
  { slug: 'intel', url: 'https://cheetah-accordion-l9n5.squarespace.com/#/intel-emea-websites-and-content-management/', title: 'Intel EMEA Websites and Content Management' },
  { slug: 'ebookers', url: 'https://cheetah-accordion-l9n5.squarespace.com/#/ebookers-major-holiday-booking-company/', title: 'Ebookers - Major European Holiday Booking Company' },
];

async function extractProjectContent(browser, project) {
  console.log(`\n📄 Extracting: ${project.title || project.slug}`);
  const page = await browser.newPage();
  
  try {
    await page.goto(project.url, { waitUntil: 'networkidle', timeout: 60000 });
    
    // Wait for hash navigation and content to load
    await page.waitForTimeout(5000);
    
    // Wait for project-specific content to appear
    await page.waitForSelector('h2.project-title, .project-description, .sqs-block-content', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(2000);
    
    // Try to find the actual project title
    const title = await page.evaluate((expectedTitle) => {
      // Try multiple selectors
      const selectors = [
        'h2.project-title',
        'h2',
        '.project-meta h2',
        '[class*="project"] h2',
      ];
      
      for (const selector of selectors) {
        const element = document.querySelector(selector);
        if (element && element.innerText && element.innerText !== 'Hello, I'm Tony!' && element.innerText.length > 5) {
          return element.innerText.trim();
        }
      }
      return expectedTitle || null;
    }, project.title);
    
    // Extract main content (exclude "Hello I'm Tony" section)
    const content = await page.evaluate(() => {
      // Find the project content area
      const projectContent = document.querySelector('.project-description, .sqs-block-content, .project-meta');
      if (projectContent) {
        // Get all text but exclude the intro
        const allText = projectContent.innerText;
        const introIndex = allText.indexOf('Hello, I'm Tony!');
        if (introIndex > -1) {
          // Get content after intro
          return allText.substring(introIndex + 'Hello, I'm Tony!'.length).trim();
        }
        return allText.trim();
      }
      
      // Fallback: get all H2 headings and paragraphs
      const headings = Array.from(document.querySelectorAll('h2')).map(h => h.innerText.trim());
      const paragraphs = Array.from(document.querySelectorAll('p')).map(p => p.innerText.trim()).filter(p => p.length > 20);
      return [...headings, ...paragraphs].join('\n\n');
    });
    
    // Extract images specific to this project (skip logo/header images)
    const images = await page.evaluate(() => {
      const imageElements = Array.from(document.querySelectorAll('img'));
      const imageData = [];
      
      imageElements.forEach((img, index) => {
        let src = img.src || img.getAttribute('data-src') || img.getAttribute('data-lazy-src');
        const alt = img.alt || '';
        
        // Skip logo/header images
        if (src.includes('tonyHeader') || src.includes('logo')) {
          return;
        }
        
        if (src && !src.startsWith('data:')) {
          if (src.startsWith('//')) {
            src = 'https:' + src;
          } else if (src.startsWith('/')) {
            src = new URL(src, window.location.origin).href;
          }
          
          // Get context from nearby elements
          let context = '';
          let parent = img.closest('.sqs-block, .project-description, p, div');
          if (parent) {
            const text = parent.innerText || parent.textContent;
            if (text && text.length < 300 && text.length > 10) {
              context = text.trim().substring(0, 200);
            }
          }
          
          imageData.push({
            index: imageData.length,
            src,
            alt: alt || '',
            width: img.naturalWidth || img.width || null,
            height: img.naturalHeight || img.height || null,
            context: context,
          });
        }
      });
      
      return imageData;
    });
    
    // Download images to project-specific folder
    const projectImageDir = path.join(__dirname, 'portfolio-extraction', 'project-images', project.slug);
    if (!fs.existsSync(projectImageDir)) {
      fs.mkdirSync(projectImageDir, { recursive: true });
    }
    
    const downloadedImages = [];
    for (let i = 0; i < Math.min(images.length, 20); i++) {
      const img = images[i];
      try {
        const ext = img.src.split('.').pop().split('?')[0] || 'png';
        const filename = `image-${i + 1}.${ext}`;
        const localPath = path.join(projectImageDir, filename);
        
        await downloadImage(img.src, localPath);
        downloadedImages.push({
          ...img,
          localPath: `project-images/${project.slug}/${filename}`,
          downloaded: true,
        });
        console.log(`  ✓ Downloaded: ${filename}`);
      } catch (err) {
        console.log(`  ✗ Failed: ${err.message}`);
      }
    }
    
    return {
      slug: project.slug,
      url: project.url,
      title: title || project.title,
      content: content.substring(0, 5000), // Limit content length
      images: downloadedImages,
      extractedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error(`  ✗ Error:`, error.message);
    return {
      slug: project.slug,
      url: project.url,
      error: error.message,
    };
  } finally {
    await page.close();
  }
}

async function downloadImage(imageUrl, outputPath) {
  return new Promise((resolve, reject) => {
    const protocol = imageUrl.startsWith('https') ? https : http;
    const file = fs.createWriteStream(outputPath);
    
    protocol.get(imageUrl, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadImage(response.headers.location, outputPath).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function extractAllProjects() {
  console.log('\n🚀 Starting improved project extraction...\n');
  
  const browser = await chromium.launch({ headless: false });
  const outputDir = path.join(__dirname, 'portfolio-extraction', 'projects-improved');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  try {
    const results = [];
    
    for (const project of projectUrls) {
      const data = await extractProjectContent(browser, project);
      results.push(data);
      
      const projectFile = path.join(outputDir, `${project.slug}.json`);
      fs.writeFileSync(projectFile, JSON.stringify(data, null, 2));
      console.log(`  ✓ Saved: ${projectFile}\n`);
    }
    
    fs.writeFileSync(path.join(outputDir, 'all-projects.json'), JSON.stringify(results, null, 2));
    console.log(`\n✅ Extraction complete! ${results.length} projects extracted.`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await browser.close();
  }
}

extractAllProjects().catch(console.error);

