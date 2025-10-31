const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, 'public', 'images', 'projects');
const projectsContent = fs.readFileSync(path.join(__dirname, 'data', 'projects.ts'), 'utf8');

console.log('🔍 Diagnosing image issues...\n');

// Extract all projects
const projectBlocks = Array.from(projectsContent.matchAll(/\{\s*id:\s*['"]([^'"]+)['"][\s\S]*?\},(?=\s*(?:\{|\]))/g));

const issues = [];

for (const match of projectBlocks) {
  const projectBlock = match[0];
  const idMatch = projectBlock.match(/id:\s*['"]([^'"]+)['"]/);
  const titleMatch = projectBlock.match(/title:\s*['"]([^'"]+)['"]/);
  const slugMatch = projectBlock.match(/slug:\s*['"]([^'"]+)['"]/);
  
  if (!idMatch || !titleMatch || !slugMatch) continue;
  
  const id = idMatch[1];
  const title = titleMatch[1];
  const slug = slugMatch[1];
  
  // Get all image paths
  const imagePaths = [];
  const thumbMatch = projectBlock.match(/thumbnail:\s*['"]([^'"]+)['"]/);
  if (thumbMatch) imagePaths.push(thumbMatch[1]);
  
  const imagesMatch = projectBlock.match(/images:\s*\[([\s\S]*?)\]/);
  if (imagesMatch) {
    const srcMatches = Array.from(imagesMatch[1].matchAll(/src:\s*['"]([^'"]+)['"]/g));
    srcMatches.forEach(m => imagePaths.push(m[1]));
  }
  
  const missing = [];
  const existing = [];
  
  imagePaths.forEach(imgPath => {
    const fullPath = path.join(__dirname, 'public', imgPath);
    if (fs.existsSync(fullPath)) {
      const stats = fs.statSync(fullPath);
      existing.push({
        path: imgPath,
        size: stats.size,
        exists: true
      });
    } else {
      missing.push({
        path: imgPath,
        exists: false
      });
    }
  });
  
  if (missing.length > 0) {
    issues.push({ id, title, slug, missing, existing });
  }
}

if (issues.length === 0) {
  console.log('✅ All images exist on disk!\n');
  console.log('If images still appear broken, try:');
  console.log('1. Restart the Next.js dev server (stop with Ctrl+C, then run npm run dev again)');
  console.log('2. Clear browser cache (hard refresh with Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)');
  console.log('3. Check browser console for 404 errors on specific image paths');
} else {
  console.log(`❌ Found ${issues.length} projects with missing images:\n`);
  issues.forEach(issue => {
    console.log(`${issue.title} (${issue.slug}):`);
    issue.missing.forEach(img => {
      console.log(`  MISSING: ${img.path}`);
    });
    console.log('');
  });
}

// Also list all projects and their image counts
console.log('\n📊 All Projects Summary:\n');
const allProjects = Array.from(projectsContent.matchAll(/\{\s*id:\s*['"]([^'"]+)['"][\s\S]*?\},(?=\s*(?:\{|\]))/g));
allProjects.forEach(match => {
  const block = match[0];
  const titleMatch = block.match(/title:\s*['"]([^'"]+)['"]/);
  const slugMatch = block.match(/slug:\s*['"]([^'"]+)['"]/);
  if (!titleMatch || !slugMatch) return;
  
  const title = titleMatch[1];
  const slug = slugMatch[1];
  
  const imagesMatch = block.match(/images:\s*\[([\s\S]*?)\]/);
  const imageCount = imagesMatch ? (imagesMatch[1].match(/src:/g) || []).length : 0;
  
  console.log(`  ${title.padEnd(50)} ${imageCount} images`);
});

