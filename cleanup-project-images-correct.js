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

// Read and parse projects.ts
const projectsContent = fs.readFileSync(path.join(__dirname, 'data', 'projects.ts'), 'utf8');

console.log('🧹 Cleaning up project images...\n');

let totalDeleted = 0;

// Split by project blocks (each project starts with { id:)
const projectBlocks = projectsContent.split(/\{\s*id:/);

for (let i = 1; i < projectBlocks.length; i++) {
  const block = projectBlocks[i];
  
  // Extract project ID
  const idMatch = block.match(/['"]([^'"]+)['"]/);
  if (!idMatch) continue;
  const projectId = idMatch[1];
  
  // Extract thumbnail
  const thumbMatch = block.match(/thumbnail:\s*['"]([^'"]+)['"]/);
  const thumbnail = thumbMatch ? thumbMatch[1] : null;
  
  // Extract all image src paths from the images array
  const imagesArrayMatch = block.match(/images:\s*\[(.*?)\]/s);
  const imagesArrayContent = imagesArrayMatch ? imagesArrayMatch[1] : '';
  
  // Find all src: paths
  const imageSrcMatches = imagesArrayContent.matchAll(/src:\s*['"]([^'"]+)['"]/g);
  
  const usedImages = new Set();
  
  // Add thumbnail
  if (thumbnail) {
    const thumbPath = thumbnail.replace(/^\/images\/projects\/[^/]+\//, '');
    usedImages.add(thumbPath);
  }
  
  // Add all images from the array
  for (const match of imageSrcMatches) {
    const imgPath = match[1];
    const imgFileName = imgPath.replace(/^\/images\/projects\/[^/]+\//, '');
    usedImages.add(imgFileName);
  }
  
  // Find the folder
  const folderName = folderMapping[projectId] || projectId.replace(/-/g, '');
  const projectFolder = path.join(projectsDir, folderName);
  
  if (!fs.existsSync(projectFolder)) {
    console.log(`⚠️  Folder not found: ${folderName} (project: ${projectId})`);
    continue;
  }
  
  // Get all files in folder
  const allFiles = fs.readdirSync(projectFolder).filter(file => {
    const filePath = path.join(projectFolder, file);
    return fs.statSync(filePath).isFile();
  });
  
  // Find unused files (files not in usedImages set)
  const filesToDelete = allFiles.filter(file => !usedImages.has(file));
  
  if (filesToDelete.length > 0) {
    console.log(`📁 ${projectId} (${folderName}):`);
    console.log(`   Used: ${usedImages.size} images (${Array.from(usedImages).join(', ')})`);
    console.log(`   Found: ${allFiles.length} files`);
    console.log(`   Deleting: ${filesToDelete.length} unused files`);
    
    filesToDelete.forEach(file => {
      const filePath = path.join(projectFolder, file);
      try {
        fs.unlinkSync(filePath);
        console.log(`   ✓ Deleted: ${file}`);
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

