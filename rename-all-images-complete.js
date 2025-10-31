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

console.log('🔄 Renaming ALL images to be project-specific...\n');

// Find all project blocks
const projectBlocks = Array.from(projectsContent.matchAll(/\{\s*id:\s*['"]([^'"]+)['"][\s\S]*?\},(?=\s*(?:\{|\]))/g));

const renameMap = [];

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
  
  // Get all image paths referenced in this project
  const imagePaths = [];
  
  // Extract thumbnail
  const thumbMatch = projectBlock.match(/thumbnail:\s*['"]([^'"]+)['"]/);
  if (thumbMatch) {
    imagePaths.push({ path: thumbMatch[1], type: 'thumbnail' });
  }
  
  // Extract all src: in images array
  const imagesMatch = projectBlock.match(/images:\s*\[([\s\S]*?)\]/);
  if (imagesMatch) {
    const imagesContent = imagesMatch[1];
    const srcMatches = Array.from(imagesContent.matchAll(/src:\s*['"]([^'"]+)['"]/g));
    srcMatches.forEach(match => {
      imagePaths.push({ path: match[1], type: 'gallery' });
    });
  }
  
  const imageMappings = [];
  let galleryIndex = 1;
  
  for (const imgInfo of imagePaths) {
    const imgPath = imgInfo.path;
    const imgFile = imgPath.split('/').pop();
    const imgPathFull = path.join(projectFolder, imgFile);
    
    if (fs.existsSync(imgPathFull)) {
      const ext = path.extname(imgFile);
      let newName;
      
      if (imgInfo.type === 'thumbnail') {
        newName = `${slug}-thumbnail${ext}`;
      } else {
        newName = `${slug}-${galleryIndex}${ext}`;
        galleryIndex++;
      }
      
      // Ensure uniqueness
      let finalName = newName;
      let counter = 1;
      while (imageMappings.some(m => m.new === finalName)) {
        const ext2 = path.extname(newName);
        const base2 = newName.replace(ext2, '');
        finalName = `${base2}-${counter}${ext2}`;
        counter++;
      }
      
      imageMappings.push({ old: imgFile, new: finalName });
    }
  }
  
  if (imageMappings.length > 0) {
    renameMap.push({ projectId, folderName, slug, mappings: imageMappings });
  }
}

let updatedProjectsContent = projectsContent;

// Rename files and update references
for (const project of renameMap) {
  const { projectId, folderName, slug, mappings } = project;
  const projectFolder = path.join(projectsDir, folderName);
  
  console.log(`📁 ${projectId} (${folderName}):`);
  
  // Rename files
  for (const mapping of mappings) {
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
    } else if (fs.existsSync(newPath)) {
      // Already renamed, just update reference
      const oldRef = `/images/projects/${folderName}/${mapping.old}`;
      const newRef = `/images/projects/${folderName}/${mapping.new}`;
      const escapedOldRef = oldRef.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      updatedProjectsContent = updatedProjectsContent.replace(
        new RegExp(escapedOldRef, 'g'),
        newRef
      );
    }
  }
  
  console.log('');
}

// Write updated projects.ts
fs.writeFileSync(path.join(__dirname, 'data', 'projects.ts'), updatedProjectsContent);

console.log('✅ All images renamed and project data updated!');

