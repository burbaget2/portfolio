const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, 'public', 'images', 'projects');
let projectsContent = fs.readFileSync(path.join(__dirname, 'data', 'projects.ts'), 'utf8');

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

console.log('🔄 Final rename of ALL remaining generic images...\n');

// Find all project blocks and process them
const projectBlocks = Array.from(projectsContent.matchAll(/\{\s*id:\s*['"]([^'"]+)['"][\s\S]*?\},(?=\s*(?:\{|\]))/g));

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
  
  // Extract all image references (thumbnail + gallery images in order)
  const allImageRefs = [];
  
  // Extract thumbnail
  const thumbMatch = projectBlock.match(/thumbnail:\s*['"]([^'"]+)['"]/);
  if (thumbMatch) {
    allImageRefs.push({ ref: thumbMatch[1], isThumbnail: true });
  }
  
  // Extract all src: in images array (maintain order)
  const imagesMatch = projectBlock.match(/images:\s*\[([\s\S]*?)\]/);
  if (imagesMatch) {
    const imagesContent = imagesMatch[1];
    const srcMatches = Array.from(imagesContent.matchAll(/src:\s*['"]([^'"]+)['"]/g));
    srcMatches.forEach(match => {
      allImageRefs.push({ ref: match[1], isThumbnail: false });
    });
  }
  
  // Process each image reference
  const imageMappings = [];
  let galleryIndex = 1;
  
  for (const imgInfo of allImageRefs) {
    const imgPath = imgInfo.ref;
    const imgFile = imgPath.split('/').pop();
    const imgPathFull = path.join(projectFolder, imgFile);
    
    // Determine new name
    const ext = path.extname(imgFile);
    let newName;
    
    if (imgInfo.isThumbnail) {
      newName = `${slug}-thumbnail${ext}`;
    } else {
      newName = `${slug}-${galleryIndex}${ext}`;
      galleryIndex++;
    }
    
    // Check if file exists and needs renaming
    if (fs.existsSync(imgPathFull) && imgFile !== newName) {
      const newPathFull = path.join(projectFolder, newName);
      
      // Ensure uniqueness
      let finalName = newName;
      let counter = 1;
      while (fs.existsSync(path.join(projectFolder, finalName))) {
        const ext2 = path.extname(newName);
        const base2 = newName.replace(ext2, '');
        finalName = `${base2}-${counter}${ext2}`;
        counter++;
      }
      
      imageMappings.push({
        oldFile: imgFile,
        newFile: finalName,
        oldRef: imgPath,
        newRef: `/images/projects/${folderName}/${finalName}`,
        isThumbnail: imgInfo.isThumbnail
      });
    }
  }
  
  if (imageMappings.length > 0) {
    console.log(`📁 ${projectId} (${folderName}):`);
    
    // Rename files
    for (const mapping of imageMappings) {
      const oldPath = path.join(projectFolder, mapping.oldFile);
      const newPath = path.join(projectFolder, mapping.newFile);
      
      if (fs.existsSync(oldPath) && !fs.existsSync(newPath)) {
        fs.renameSync(oldPath, newPath);
        console.log(`   ${mapping.oldFile} → ${mapping.newFile}`);
        
        // Update reference in projects.ts
        const escapedOldRef = mapping.oldRef.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        projectsContent = projectsContent.replace(
          new RegExp(escapedOldRef, 'g'),
          mapping.newRef
        );
      }
    }
    console.log('');
  }
}

// Write updated projects.ts
fs.writeFileSync(path.join(__dirname, 'data', 'projects.ts'), projectsContent);

console.log('✅ All images renamed and project data updated!');

