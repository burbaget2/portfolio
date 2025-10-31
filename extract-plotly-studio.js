const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const url = 'https://cheetah-accordion-l9n5.squarespace.com/#/plotlystudio/';

async function extractPlotlyStudio() {
  console.log(`\n🔍 Extracting Plotly Studio from: ${url}\n`);
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(8000); // Wait longer for hash navigation
    
    // Try to wait for specific Plotly Studio content
    await page.waitForSelector('h2, .project-content, .sqs-block-content', { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(3000);
    
    // Extract all text content
    const content = await page.evaluate(() => {
      const mainContent = document.querySelector('main, .sqs-block-content, .project-content');
      return mainContent ? mainContent.innerText.trim() : document.body.innerText.trim();
    });
    
    // Extract HTML to get structured content
    const htmlContent = await page.evaluate(() => {
      const mainContent = document.querySelector('main, .sqs-block-content');
      return mainContent ? mainContent.innerHTML : '';
    });
    
    // Try to extract project-specific headings
    const headings = await page.evaluate(() => {
      const h2Elements = Array.from(document.querySelectorAll('h2'));
      return h2Elements.map(h2 => h2.innerText.trim()).filter(text => text !== "Hello, I'm Tony!");
    });
    
    console.log(`\n📄 Headings found: ${JSON.stringify(headings)}`);
    console.log(`📝 Content length: ${content.length} characters`);
    console.log(`\n📋 Content preview:\n${content.substring(0, 1000)}...\n`);
    
    // Save extracted data
    const output = {
      url,
      headings,
      content,
      htmlContent: htmlContent.substring(0, 5000),
      extractedAt: new Date().toISOString(),
    };
    
    const outputFile = path.join(__dirname, 'portfolio-extraction', 'plotly-studio-extracted.json');
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));
    
    console.log(`\n✅ Extraction complete!`);
    console.log(`📄 Data saved to: ${outputFile}`);
    
    return output;
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await browser.close();
  }
}

extractPlotlyStudio().catch(console.error);

