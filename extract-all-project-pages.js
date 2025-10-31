const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const projectUrls = [
  { slug: 'plotlystudio', url: 'https://cheetah-accordion-l9n5.squarespace.com/#/plotlystudio/' },
  { slug: 'fishtank', url: 'https://cheetah-accordion-l9n5.squarespace.com/#/fishtank/' },
  { slug: 'new-page', url: 'https://cheetah-accordion-l9n5.squarespace.com/#/new-page/' },
  { slug: 'hr-block', url: 'https://cheetah-accordion-l9n5.squarespace.com/#/hr-block-senior-ux-designer/' },
  { slug: 'best-buy-vision', url: 'https://cheetah-accordion-l9n5.squarespace.com/#/high-level-user-journey-conceptual-blueprint-ux-artifact/' },
  { slug: 'retail', url: 'https://cheetah-accordion-l9n5.squarespace.com/#/retail/' },
  { slug: 'payload', url: 'https://cheetah-accordion-l9n5.squarespace.com/#/payload/' },
  { slug: 'queue', url: 'https://cheetah-accordion-l9n5.squarespace.com/#/queue/' },
  { slug: 'navarik', url: 'https://cheetah-accordion-l9n5.squarespace.com/#/navarik/' },
  { slug: 'ea-games', url: 'https://cheetah-accordion-l9n5.squarespace.com/#/ea-games-marketing-sites/' },
  { slug: 'nike', url: 'https://cheetah-accordion-l9n5.squarespace.com/#/nike/' },
  { slug: 'peugeot', url: 'https://cheetah-accordion-l9n5.squarespace.com/#/peugeot/' },
  { slug: 'bodog', url: 'https://cheetah-accordion-l9n5.squarespace.com/#/bodog-com-net/' },
  { slug: 'intel', url: 'https://cheetah-accordion-l9n5.squarespace.com/#/intel-emea-websites-and-content-management/' },
  { slug: 'ebookers', url: 'https://cheetah-accordion-l9n5.squarespace.com/#/ebookers-major-holiday-booking-company/' },
];

// Also get main dashboard page
const mainProjects = [
  { slug: 'dashboards', url: 'https://cheetah-accordion-l9n5.squarespace.com/#/dashboards/' },
];

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
    }).on('error', (err) => {
      fs.unlinkSync(outputPath);
      reject(err);
    });
  });
}

async function extractProjectPage(browser, project) {
  console.log(`\n📄 Extracting: ${project.slug}`);
  const page = await browser.newPage();
  
  try {
    await page.goto(project.url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(3000); // Wait for dynamic content
    
    // Extract title
    const title = await page.evaluate(() => {
      const h2 = document.querySelector('h2.project-title, h2');
      return h2 ? h2.innerText.trim() : null;
    });
    
    // Extract all text content
    const content = await page.evaluate(() => {
      const mainContent = document.querySelector('.project-description, .sqs-block-content, main, article');
      return mainContent ? mainContent.innerText.trim() : document.body.innerText.trim();
    });
    
    // Extract HTML content
    const htmlContent = await page.evaluate(() => {
      const mainContent = document.querySelector('.project-description, .sqs-block-content, main, article');
      return mainContent ? mainContent.innerHTML : document.body.innerHTML;
    });
    
    // Extract all images with their context
    const images = await page.evaluate(() => {
      const imageElements = document.querySelectorAll('img');
      const imageData = [];
      
      imageElements.forEach((img, index) => {
        let src = img.src || img.getAttribute('data-src') || img.getAttribute('data-lazy-src');
        const alt = img.alt || '';
        
        if (src && !src.startsWith('data:')) {
          if (src.startsWith('//')) {
            src = 'https:' + src;
          } else if (src.startsWith('/')) {
            src = new URL(src, window.location.origin).href;
          }
          
          // Get nearby text context
          let context = '';
          let parent = img.parentElement;
          for (let i = 0; i < 3 && parent; i++) {
            const text = parent.innerText;
            if (text && text.length < 200) {
              context = text;
              break;
            }
            parent = parent.parentElement;
          }
          
          imageData.push({
            index,
            src,
            alt: alt || '',
            width: img.naturalWidth || img.width || null,
            height: img.naturalHeight || img.height || null,
            context: context.trim().substring(0, 200),
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
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const filename = `image-${i + 1}.${img.src.split('.').pop().split('?')[0] || 'png'}`;
      const localPath = path.join(projectImageDir, filename);
      
      try {
        await downloadImage(img.src, localPath);
        downloadedImages.push({
          ...img,
          localPath: `project-images/${project.slug}/${filename}`,
          downloaded: true,
        });
        console.log(`  ✓ Downloaded: ${filename}`);
      } catch (err) {
        console.log(`  ✗ Failed to download: ${filename}`);
        downloadedImages.push({
          ...img,
          localPath: null,
          downloaded: false,
        });
      }
    }
    
    return {
      slug: project.slug,
      url: project.url,
      title,
      content,
      htmlContent,
      images: downloadedImages,
      extractedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error(`  ✗ Error extracting ${project.slug}:`, error.message);
    return {
      slug: project.slug,
      url: project.url,
      error: error.message,
    };
  } finally {
    await page.close();
  }
}

async function extractAllProjects() {
  console.log('\n🚀 Starting comprehensive project extraction...\n');
  
  const browser = await chromium.launch({ headless: false });
  const outputDir = path.join(__dirname, 'portfolio-extraction', 'projects');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  try {
    const allProjects = [...projectUrls, ...mainProjects];
    const results = [];
    
    for (const project of allProjects) {
      const data = await extractProjectPage(browser, project);
      results.push(data);
      
      // Save individual project file
      const projectFile = path.join(outputDir, `${project.slug}.json`);
      fs.writeFileSync(projectFile, JSON.stringify(data, null, 2));
      console.log(`  ✓ Saved: ${projectFile}\n`);
    }
    
    // Save combined results
    const combinedFile = path.join(outputDir, 'all-projects.json');
    fs.writeFileSync(combinedFile, JSON.stringify(results, null, 2));
    
    // Create summary markdown
    const summary = results.map(p => {
      return `## ${p.title || p.slug}
**URL:** ${p.url}
**Images:** ${p.images ? p.images.length : 0}
**Content Length:** ${p.content ? p.content.length : 0} characters

${p.content ? p.content.substring(0, 500) + '...' : 'No content extracted'}

${p.images && p.images.length > 0 ? `**Images:**\n${p.images.slice(0, 5).map(img => `- ${img.alt || 'No alt text'}`).join('\n')}` : ''}
`;
    }).join('\n\n');
    
    fs.writeFileSync(
      path.join(outputDir, 'SUMMARY.md'),
      `# Project Extraction Summary\n\nExtracted: ${new Date().toISOString()}\n\n${summary}`
    );
    
    console.log(`\n✅ Extraction complete!`);
    console.log(`📁 Files saved to: ${outputDir}`);
    console.log(`📊 Total projects extracted: ${results.length}`);
    
  } catch (error) {
    console.error('❌ Error during extraction:', error);
  } finally {
    await browser.close();
  }
}

extractAllProjects().catch(console.error);

