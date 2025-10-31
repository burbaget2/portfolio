const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const url = 'https://cheetah-accordion-l9n5.squarespace.com/#/bbystrategy/';

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

async function extractBestBuyStrategy() {
  console.log(`\n🔍 Extracting Best Buy Strategy from: ${url}\n`);
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(5000); // Wait for hash navigation
    
    // Wait for project content
    await page.waitForSelector('h2, .project-description, .sqs-block-content', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(2000);
    
    // Extract title
    const title = await page.evaluate(() => {
      const h2 = document.querySelector('h2.project-title, h2');
      return h2 ? h2.innerText.trim() : null;
    });
    
    // Extract content
    const content = await page.evaluate(() => {
      const projectContent = document.querySelector('.project-description, .sqs-block-content, main');
      return projectContent ? projectContent.innerText.trim() : document.body.innerText.trim();
    });
    
    // Extract all images
    const images = await page.evaluate(() => {
      const imageElements = document.querySelectorAll('img');
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
    
    console.log(`\n📄 Title: ${title}`);
    console.log(`📝 Content length: ${content.length} characters`);
    console.log(`🖼️  Images found: ${images.length}`);
    
    // Download images
    const projectImageDir = path.join(__dirname, 'public', 'images', 'projects', 'bestbuy-strategy');
    if (!fs.existsSync(projectImageDir)) {
      fs.mkdirSync(projectImageDir, { recursive: true });
    }
    
    const downloadedImages = [];
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      try {
        const ext = img.src.split('.').pop().split('?')[0] || 'png';
        const filename = `image-${i + 1}.${ext}`;
        const localPath = path.join(projectImageDir, filename);
        
        await downloadImage(img.src, localPath);
        downloadedImages.push({
          ...img,
          localPath: `bestbuy-strategy/${filename}`,
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
    
    const outputFile = path.join(__dirname, 'portfolio-extraction', 'bestbuy-strategy.json');
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

extractBestBuyStrategy().catch(console.error);

