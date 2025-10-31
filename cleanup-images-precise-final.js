const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, 'public', 'images', 'projects');

// Map project IDs to folder names
const folderMapping = {
  'plotly-studio': 'plotlystudio',
  'data-viz-dashboards': 'dashboards',
  'iqmetrix-retail': 'retail',
  'navarik': 'navarik',
  'ea-games': 'ea-games',
  'peugeot': 'peugeot',
  'bodog': 'bodog',
  'intel': 'intel',
  'ebookers': 'ebookers',
  'best-buy-strategy': 'bestbuy-strategy',
  'best-buy-vision': 'best-buy-vision',
  'hr-block': 'hr-block',
  'fishtank': 'fishtank',
  'payload': 'payload',
  'queue': 'queue',
  'nike': 'nike',
  'ignite-works': 'ignite-works',
};

const projectsContent = fs.readFileSync(path.join(__dirname, 'data', 'projects.ts'), 'utf8');

console.log('🧹 Cleaning up project images...\n');

let totalDeleted = 0;

// Split projects by their closing brace followed by comma
const projectSections = projectsContent.split(/\},\s*(?=\{|\n\s*\]|\n\s*$)/);

for (const section of projectSections) {
  // Extract project ID
  const idMatch = section.match(/id:\s*['"]([^'"]+)['"]/);
  if (!idMatch) continue;
  const projectId = idMatch[1];
  
  const folderName = folderMapping[projectId] || projectId.replace(/-/g, '');
  const projectFolder = path.join(projectsDir, folderName);
  
  if (!fs.existsSync(projectFolder)) continue;
  
  // Extract ALL image paths from this project section
  const usedImages = new Set();
  
  // Find thumbnail
  const thumbMatch = section.match(/thumbnail:\s*['"]([^'"]+)['"]/);
  if (thumbMatch) {
    const thumbPath = thumbMatch[1];
    const thumbFile = thumbPath.split('/').pop();
    usedImages.add(thumbFile);
  }
  
  // Find all src: in images array - match across multiple lines
  const imagesMatch = section.match(/images:\s*\[([\s\S]*?)\]/);
  if (imagesMatch) {
    const imagesContent = imagesMatch[1];
    const srcMatches = imagesContent.matchAll(/src:\s*['"]([^'"]+)['"]/g);
    for (const match of srcMatches) {
      const imgPath = match[1];
      const imgFile = imgPath.split('/').pop();
      usedImages.add(imgFile);
    }
  }
  
  // Get all files in folder
  const allFiles = fs.readdirSync(projectFolder).filter(file => {
    return fs.statSync(path.join(projectFolder, file)).isFile();
  });
  
  // Find unused files
  const filesToDelete = allFiles.filter(file => !usedImages.has(file));
  
  if (filesToDelete.length > 0) {
    console.log(`📁 ${projectId} (${folderName}):`);
    console.log(`   Used: ${usedImages.size} images`);
    console.log(`   Found: ${allFiles.length} files`);
    console.log(`   Deleting: ${filesToDelete.length} unused files`);
    
    filesToDelete.slice(0, 10).forEach(file => {
      console.log(`   - ${file}`);
    });
    if (filesToDelete.length > 10) {
      console.log(`   ... and ${filesToDelete.length - 10} more`);
    }
    
    filesToDelete.forEach(file => {
      const filePath = path.join(projectFolder, file);
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.log(`   ✗ Error deleting ${file}: ${err.message}`);
      }
    });
    totalDeleted += filesToDelete.length;
    console.log('');
  } else if (allFiles.length > 0) {
    console.log(`✓ ${projectId} (${folderName}): All ${allFiles.length} images are in use\n`);
  }
}

console.log(`✅ Cleanup complete! Deleted ${totalDeleted} unused image files.`);

