const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, 'public', 'images', 'projects');

// Map project IDs/slugs to folder names
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

// Read projects from the data file
const projectsContent = fs.readFileSync(path.join(__dirname, 'data', 'projects.ts'), 'utf8');

// Extract project data using regex (simple approach)
const projectMatches = projectsContent.matchAll(/id:\s*['"]([^'"]+)['"].*?thumbnail:\s*['"]([^'"]+)['"].*?images:\s*\[(.*?)\]/gs);

console.log('🧹 Cleaning up project images...\n');

let cleanedCount = 0;

// Parse each project
for (const projectMatch of projectsContent.matchAll(/id:\s*['"]([^'"]+)['"]/g)) {
  const projectId = projectMatch[1];
  
  // Find the full project block
  const projectStart = projectMatch.index;
  const projectEnd = projectsContent.indexOf('},', projectStart);
  if (projectEnd === -1) continue;
  
  const projectBlock = projectsContent.substring(projectStart, projectEnd);
  
  // Extract thumbnail
  const thumbMatch = projectBlock.match(/thumbnail:\s*['"]([^'"]+)['"]/);
  const thumbnail = thumbMatch ? thumbMatch[1] : null;
  
  // Extract images array
  const imagesMatch = projectBlock.match(/images:\s*\[(.*?)\]/s);
  const imagesContent = imagesMatch ? imagesMatch[1] : '';
  
  // Find all image paths
  const imageMatches = imagesContent.matchAll(/src:\s*['"]([^'"]+)['"]/g);
  const usedImages = new Set();
  
  if (thumbnail) {
    const thumbFile = path.basename(thumbnail);
    usedImages.add(thumbFile);
  }
  
  for (const imgMatch of imageMatches) {
    const imgPath = imgMatch[1];
    const imgFile = path.basename(imgPath);
    usedImages.add(imgFile);
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
  
  // Find unused files
  const filesToDelete = allFiles.filter(file => !usedImages.has(file));
  
  if (filesToDelete.length > 0) {
    console.log(`📁 ${projectId}:`);
    console.log(`   Folder: ${folderName}`);
    console.log(`   Used: ${usedImages.size} images`);
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
    cleanedCount += filesToDelete.length;
    console.log('');
  } else if (allFiles.length > 0) {
    console.log(`✓ ${projectId} (${folderName}): All ${allFiles.length} images are in use\n`);
  }
}

console.log(`✅ Cleanup complete! Deleted ${cleanedCount} unused image files.`);

