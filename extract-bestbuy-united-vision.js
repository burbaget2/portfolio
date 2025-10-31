const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const url = 'https://cheetah-accordion-l9n5.squarespace.com/#/high-level-user-journey-conceptual-blueprint-ux-artifact/';

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

async function extractBestBuyUnitedVision() {
  console.log(`\n🔍 Extracting Best Buy United Vision from: ${url}\n`);
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(5000); // Wait for hash navigation
    
    // Wait for project content
    await page.waitForSelector('h2, .project-description, .sqs-block-content', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(2000);
    
    // Extract all text content
    const content = await page.evaluate(() => {
      const mainContent = document.querySelector('main, .sqs-block-content, .project-content');
      return mainContent ? mainContent.innerText.trim() : document.body.innerText.trim();
    });
    
    // Extract title
    const title = await page.evaluate(() => {
      const h2 = document.querySelector('h2.project-title, h2');
      return h2 ? h2.innerText.trim() : null;
    });
    
    // Extract all images
    const images = await page.evaluate(() => {
      const imageElements = document.querySelectorAll('img');
      const imageData = [];
      
      imageElements.forEach((img, index) => {
        let src = img.src || img.getAttribute('data-src') || img.getAttribute('data-lazy-src');
        const alt = img.alt || '';
        
        // Skip logo/header images
        if (src.includes('tonyHeader') || src.includes('logo') || src.includes('squarespace-cdn.com/static/')) {
          return;
        }
        
        if (src && !src.startsWith('data:')) {
          if (src.startsWith('//')) {
            src = 'https:' + src;
          } else if (src.startsWith('/')) {
            src = new URL(src, window.location.origin).href;
          }
          
          // Get context
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
    
    console.log(`\n📄 Title: ${title || 'Not found'}`);
    console.log(`📝 Content length: ${content.length} characters`);
    console.log(`🖼️  Images found: ${images.length}`);
    
    // Show content preview
    console.log(`\n📋 Content preview:\n${content.substring(0, 500)}...\n`);
    
    // Download images
    const projectImageDir = path.join(__dirname, 'public', 'images', 'projects', 'best-buy-vision');
    if (!fs.existsSync(projectImageDir)) {
      fs.mkdirSync(projectImageDir, { recursive: true });
    }
    
    const downloadedImages = [];
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      try {
        // Clean up URL - remove size parameters
        let cleanUrl = img.src.split('?')[0];
        const ext = cleanUrl.split('.').pop() || 'png';
        const filename = `image-${i + 1}.${ext}`;
        const localPath = path.join(projectImageDir, filename);
        
        // Download full size image
        const fullSizeUrl = img.src.replace(/\?format=\d+w/, '');
        await downloadImage(fullSizeUrl, localPath);
        downloadedImages.push({
          ...img,
          localPath: `best-buy-vision/${filename}`,
          downloaded: true,
        });
        console.log(`  ✓ Downloaded: ${filename}`);
      } catch (err) {
        console.log(`  ✗ Failed: ${err.message}`);
      }
    }
    
    // Save extracted data
    const output = {
      url,
      title,
      content: content.substring(0, 10000),
      images: downloadedImages,
      extractedAt: new Date().toISOString(),
    };
    
    const outputFile = path.join(__dirname, 'portfolio-extraction', 'best-buy-united-vision.json');
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));
    
    console.log(`\n✅ Extraction complete!`);
    console.log(`📁 Images saved to: ${projectImageDir}`);
    console.log(`📄 Data saved to: ${outputFile}`);
    
    return output;
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await browser.close();
  }
}

extractBestBuyUnitedVision().catch(console.error);

