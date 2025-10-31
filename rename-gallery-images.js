const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, 'public', 'images', 'projects');
const projectsContent = fs.readFileSync(path.join(__dirname, 'data', 'projects.ts'), 'utf8');

// Map project IDs to folder names and create slug for file naming
const folderMapping = {
  'plotly-studio': { folder: 'plotlystudio', slug: 'plotly' },
  'data-viz-dashboards': { folder: 'dashboards', slug: 'dashboards' },
  'iqmetrix-retail': { folder: 'retail', slug: 'retail' },
  'navarik': { folder: 'navarik', slug: 'navarik' },
  'ea-games': { folder: 'ea-games', slug: 'ea-games' },
  'peugeot': { folder: 'peugeot', slug: 'peugeot' },
  'bodog': { folder: 'bodog', slug: 'bodog' },
  'intel': { folder: 'intel', slug: 'intel' },
  'ebookers': { folder: 'ebookers', slug: 'ebookers' },
  'best-buy-strategy': { folder: 'bestbuy-strategy', slug: 'bestbuy-strategy' },
  'best-buy-vision': { folder: 'best-buy-vision', slug: 'bestbuy-vision' },
  'hr-block': { folder: 'hr-block', slug: 'hr-block' },
  'fishtank': { folder: 'fishtank', slug: 'fishtank' },
  'payload': { folder: 'payload', slug: 'payload' },
  'queue': { folder: 'queue', slug: 'queue' },
  'nike': { folder: 'nike', slug: 'nike' },
  'ignite-works': { folder: 'ignite-works', slug: 'ignite-works' },
};

console.log('🔄 Renaming remaining gallery images...\n');

// Find all project blocks
const projectBlocks = Array.from(projectsContent.matchAll(/\{\s*id:\s*['"]([^'"]+)['"][\s\S]*?\},(?=\s*(?:\{|\]))/g));

let updatedProjectsContent = projectsContent;

for (const match of projectBlocks) {
  const projectBlock = match[0];
  const projectIdMatch = projectBlock.match(/id:\s*['"]([^'"]+)['"]/);
  if (!projectIdMatch) continue;
  
  const projectId = projectIdMatch[1];
  const projectInfo = folderMapping[projectId];
  if (!projectInfo) continue;
  
  const { folder: folderName, slug } = projectInfo;
  const projectFolder = path.join(projectsDir, folderName);
  
  if (!fs.existsSync(projectFolder)) continue;
  
  // Extract all src: in images array (gallery images only, not thumbnails)
  const imagesMatch = projectBlock.match(/images:\s*\[([\s\S]*?)\]/);
  if (!imagesMatch) continue;
  
  const imagesContent = imagesMatch[1];
  const srcMatches = Array.from(imagesContent.matchAll(/src:\s*['"]([^'"]+)['"]/g));
  
  const imageMappings = [];
  let galleryIndex = 1;
  
  for (const match of srcMatches) {
    const imgPath = match[1];
    const imgFile = imgPath.split('/').pop();
    const imgPathFull = path.join(projectFolder, imgFile);
    
    // Only rename if file exists and is not already renamed
    if (fs.existsSync(imgPathFull) && imgFile.match(/^image-\d+\./)) {
      const ext = path.extname(imgFile);
      const newName = `${slug}-${galleryIndex}${ext}`;
      
      // Ensure uniqueness
      let finalName = newName;
      let counter = 1;
      while (imageMappings.some(m => m.new === finalName) || fs.existsSync(path.join(projectFolder, finalName))) {
        const ext2 = path.extname(newName);
        const base2 = newName.replace(ext2, '');
        finalName = `${base2}-${counter}${ext2}`;
        counter++;
      }
      
      imageMappings.push({ old: imgFile, new: finalName });
      galleryIndex++;
    }
  }
  
  if (imageMappings.length > 0) {
    console.log(`📁 ${projectId} (${folderName}):`);
    
    // Rename files
    for (const mapping of imageMappings) {
      const oldPath = path.join(projectFolder, mapping.old);
      const newPath = path.join(projectFolder, mapping.new);
      
      if (fs.existsSync(oldPath) && !fs.existsSync(newPath)) {
        fs.renameSync(oldPath, newPath);
        console.log(`   ${mapping.old} → ${mapping.new}`);
        
        // Update reference in projects.ts
        const oldRef = `/images/projects/${folderName}/${mapping.old}`;
        const newRef = `/images/projects/${folderName}/${mapping.new}`;
        
        // Use regex with proper escaping
        const escapedOldRef = oldRef.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        updatedProjectsContent = updatedProjectsContent.replace(
          new RegExp(escapedOldRef, 'g'),
          newRef
        );
      }
    }
    
    console.log('');
  }
}

// Write updated projects.ts
fs.writeFileSync(path.join(__dirname, 'data', 'projects.ts'), updatedProjectsContent);

console.log('✅ All gallery images renamed and project data updated!');

