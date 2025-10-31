const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Get the URL from command line argument
const url = process.argv[2];

if (!url) {
  console.log('Usage: node analyze-website.js <URL>');
  console.log('Example: node analyze-website.js https://example.com/portfolio');
  process.exit(1);
}

async function analyzeWebsite(url) {
  console.log(`\n🔍 Analyzing website: ${url}\n`);
  
  const browser = await chromium.launch({ headless: false }); // Show browser for visual inspection
  const page = await browser.newPage();
  
  try {
    // Navigate to the website
    console.log('📡 Loading website...');
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000); // Wait a bit for any dynamic content
    
    // Create output directory
    const outputDir = path.join(__dirname, 'website-analysis');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // 1. Take full page screenshot
    console.log('📸 Taking screenshot...');
    await page.screenshot({ 
      path: path.join(outputDir, 'full-page-screenshot.png'),
      fullPage: true 
    });
    
    // 2. Get page title and metadata
    console.log('📄 Extracting page information...');
    const pageInfo = {
      url: url,
      title: await page.title(),
      metaDescription: await page.$eval('meta[name="description"]', el => el.content).catch(() => 'Not found'),
      viewport: page.viewportSize(),
      timestamp: new Date().toISOString()
    };
    
    // 3. Extract HTML structure
    console.log('🏗️ Analyzing structure...');
    const structure = await page.evaluate(() => {
      const sections = [];
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const navItems = document.querySelectorAll('nav a, header a');
      
      headings.forEach((h, i) => {
        if (i < 10) { // Limit to first 10 headings
          sections.push({
            tag: h.tagName,
            text: h.textContent.trim().substring(0, 100),
            id: h.id || null
          });
        }
      });
      
      return {
        headingCount: headings.length,
        headings: Array.from(headings).slice(0, 10).map(h => ({
          tag: h.tagName,
          text: h.textContent.trim().substring(0, 100),
          id: h.id || null
        })),
        navigation: Array.from(navItems).slice(0, 15).map(a => ({
          text: a.textContent.trim(),
          href: a.href
        })),
        sections: sections
      };
    });
    
    // 4. Extract color scheme
    console.log('🎨 Analyzing colors...');
    const colors = await page.evaluate(() => {
      const computedStyles = window.getComputedStyle(document.body);
      return {
        backgroundColor: computedStyles.backgroundColor,
        color: computedStyles.color,
        primaryColors: [] // You can enhance this later
      };
    });
    
    // 5. Get all text content (for content analysis)
    console.log('📝 Extracting content...');
    const content = await page.evaluate(() => {
      const body = document.body;
      return {
        textLength: body.textContent.length,
        linkCount: document.querySelectorAll('a').length,
        imageCount: document.querySelectorAll('img').length,
        buttonCount: document.querySelectorAll('button').length
      };
    });
    
    // 6. Check responsive design
    console.log('📱 Checking responsive design...');
    const mobileViewport = { width: 375, height: 667 };
    await page.setViewportSize(mobileViewport);
    await page.waitForTimeout(1000);
    await page.screenshot({ 
      path: path.join(outputDir, 'mobile-view.png'),
      fullPage: true 
    });
    
    // 7. Check desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(1000);
    
    // Compile all information
    const analysis = {
      pageInfo,
      structure,
      colors,
      content,
      notes: 'Add your observations here'
    };
    
    // Save analysis to JSON file
    fs.writeFileSync(
      path.join(outputDir, 'analysis.json'),
      JSON.stringify(analysis, null, 2)
    );
    
    // Create a readable report
    const report = `
╔══════════════════════════════════════════════════════════════╗
║           WEBSITE ANALYSIS REPORT                            ║
╚══════════════════════════════════════════════════════════════╝

📍 URL: ${pageInfo.url}
📅 Analyzed: ${new Date(pageInfo.timestamp).toLocaleString()}

📄 PAGE INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Title: ${pageInfo.title}
Meta Description: ${pageInfo.metaDescription}
Viewport: ${pageInfo.viewport.width} × ${pageInfo.viewport.height}px

🏗️ STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Headings: ${structure.headingCount}

Main Sections:
${structure.headings.map(h => `  ${h.tag}: ${h.text}`).join('\n')}

Navigation Items:
${structure.navigation.map(nav => `  • ${nav.text} → ${nav.href}`).join('\n')}

📝 CONTENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Text Length: ${content.textLength.toLocaleString()} characters
Links: ${content.linkCount}
Images: ${content.imageCount}
Buttons: ${content.buttonCount}

🎨 COLORS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Background: ${colors.backgroundColor}
Text Color: ${colors.color}

📁 FILES SAVED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Screenshots saved to: website-analysis/
✓ Full analysis data: website-analysis/analysis.json
✓ Mobile view: website-analysis/mobile-view.png
✓ Desktop view: website-analysis/full-page-screenshot.png

💡 TIPS FOR UX DESIGNERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Review the screenshots to see the visual hierarchy
• Check the structure to understand information architecture
• Note the color scheme for your own portfolio
• Observe the navigation patterns
• Study the mobile responsiveness

`;
    
    console.log(report);
    
    // Save report to file
    fs.writeFileSync(path.join(outputDir, 'report.txt'), report);
    
    console.log(`\n✅ Analysis complete! Check the 'website-analysis' folder for all files.\n`);
    
  } catch (error) {
    console.error('❌ Error analyzing website:', error.message);
  } finally {
    await browser.close();
  }
}

// Run the analysis
analyzeWebsite(url);

