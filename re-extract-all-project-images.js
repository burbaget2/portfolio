const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const http = require('http');

const baseUrl = 'https://cheetah-accordion-l9n5.squarespace.com';
const projectsDir = path.join(__dirname, 'public', 'images', 'projects');

// Map of project slugs to their Squarespace hash URLs
const projectUrls = {
  'plotly-studio': '#/plotlystudio/',
  'data-visualization-for-businesses': '#/data-viz-dashboards/',
  'iqmetrix-retail-platform': '#/retail/',
  'navarik-shipping': '#/navarik/',
  'ea-games-intelligence': '#/ea-games-marketing-sites/',
  'peugeot-award-winning': '#/peugeot/',
  'bodog-com-net': '#/bodog-com-net/',
  'intel-emea-cms': '#/intel-emea-websites-and-content-management/',
  'ebookers-holiday-booking': '#/ebookers-major-holiday-booking-company/',
  'best-buy-ux-strategy': '#/bbystrategy/',
  'best-buy-united-vision': '#/high-level-user-journey-conceptual-blueprint-ux-artifact/',
  'hr-block-service-design': '#/hr-block-senior-ux-designer/',
  'fishtank-high-profile-websites': '#/fishtank/',
  'payload-logistic-management': '#/payload/',
  'queue-management': '#/queue/',
  'nike-marketing-sites': '#/nike/',
  'ignite-works-digital-services': '#/new-page/',
};

// Map slug to folder name
const slugToFolder = {
  'plotly-studio': 'plotlystudio',
  'data-visualization-for-businesses': 'dashboards',
  'iqmetrix-retail-platform': 'retail',
  'navarik-shipping': 'navarik',
  'ea-games-intelligence': 'ea-games',
  'peugeot-award-winning': 'peugeot',
  'bodog-com-net': 'bodog',
  'intel-emea-cms': 'intel',
  'ebookers-holiday-booking': 'ebookers',
  'best-buy-ux-strategy': 'bestbuy-strategy',
  'best-buy-united-vision': 'best-buy-vision',
  'hr-block-service-design': 'hr-block',
  'fishtank-high-profile-websites': 'fishtank',
  'payload-logistic-management': 'payload',
  'queue-management': 'queue',
  'nike-marketing-sites': 'nike',
  'ignite-works-digital-services': 'ignite-works',
};

async function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    http.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadImage(response.headers.location, destPath).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlinkSync(destPath);
      reject(err);
    });
  });
}

async function extractProjectImages(slug, url) {
  console.log(`\n📸 Extracting images for: ${slug}`);
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto(baseUrl + url, { waitUntil: 'networkidle', timeout: 30000 });
    
    // Wait a bit for dynamic content
    await page.waitForTimeout(2000);
    
    // Extract all images
    const images = await page.evaluate(() => {
      const imageElements = Array.from(document.querySelectorAll('img'));
      const imageData = [];
      
      imageElements.forEach((img) => {
        let src = img.src || img.getAttribute('data-src') || img.getAttribute('data-lazy-src');
        const alt = img.alt || '';
        
        // Skip logo/header images
        if (!src || src.includes('tonyHeader') || src.includes('logo') || src.includes('squarespace-cdn.com/static/')) {
          return;
        }
        
        if (src && !src.startsWith('data:')) {
          if (src.startsWith('//')) {
            src = 'https:' + src;
          } else if (src.startsWith('/')) {
            src = new URL(src, window.location.origin).href;
          }
          
          imageData.push({
            src,
            alt: alt || '',
            width: img.naturalWidth || img.width || null,
            height: img.naturalHeight || img.height || null,
          });
        }
      });
      
      return imageData;
    });
    
    console.log(`   Found ${images.length} images`);
    
    // Download images
    const folderName = slugToFolder[slug];
    if (!folderName) {
      console.log(`   ⚠️  No folder mapping for ${slug}`);
      return;
    }
    
    const projectFolder = path.join(projectsDir, folderName);
    if (!fs.existsSync(projectFolder)) {
      fs.mkdirSync(projectFolder, { recursive: true });
    }
    
    // Download images
    for (let i = 0; i < images.length && i < 10; i++) {
      const img = images[i];
      const ext = path.extname(img.src).split('?')[0] || '.png';
      const fileName = `${folderName}-${i + 1}${ext}`;
      const destPath = path.join(projectFolder, fileName);
      
      try {
        await downloadImage(img.src, destPath);
        console.log(`   ✓ Downloaded: ${fileName}`);
      } catch (err) {
        console.log(`   ✗ Failed to download ${fileName}: ${err.message}`);
      }
    }
    
  } catch (error) {
    console.log(`   ✗ Error extracting ${slug}: ${error.message}`);
  } finally {
    await browser.close();
  }
}

async function main() {
  console.log('🔄 Re-extracting project images from Squarespace...\n');
  console.log('This will download fresh images for all projects.\n');
  
  for (const [slug, url] of Object.entries(projectUrls)) {
    await extractProjectImages(slug, url);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Small delay between requests
  }
  
  console.log('\n✅ Image extraction complete!');
}

main().catch(console.error);

