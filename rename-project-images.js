const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, 'public', 'images', 'projects');
const projectsContent = fs.readFileSync(path.join(__dirname, 'data', 'projects.ts'), 'utf8');

// Map project IDs to folder names and create slug for file naming
const folderMapping = {
  'plotly-studio': { folder: 'plotlystudio', slug: 'plotly-studio' },
  'data-viz-dashboards': { folder: 'dashboards', slug: 'data-viz' },
  'iqmetrix-retail': { folder: 'retail', slug: 'iqmetrix-retail' },
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

console.log('🔄 Renaming images to be project-specific...\n');

// Find all project blocks
const projectBlocks = projectsContent.matchAll(/\{\s*id:\s*['"]([^'"]+)['"][\s\S]*?\},(?=\s*(?:\{|\]))/g);

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
  
  // Extract thumbnail
  const thumbMatch = projectBlock.match(/thumbnail:\s*['"]([^'"]+)['"]/);
  const thumbnail = thumbMatch ? thumbMatch[1] : null;
  
  // Extract all images with their descriptions
  const imagesMatch = projectBlock.match(/images:\s*\[([\s\S]*?)\]/);
  const imagesContent = imagesMatch ? imagesMatch[1] : '';
  
  // Parse each image object to get src and description
  const imageObjects = imagesContent.matchAll(/\{\s*[\s\S]*?src:\s*['"]([^'"]+)['"][\s\S]*?(?:description:\s*['"]([^'"]*)['"])?[\s\S]*?\}/g);
  
  const imageMappings = [];
  let imageIndex = 1;
  
  // Add thumbnail first if exists
  if (thumbnail) {
    const thumbFile = thumbnail.split('/').pop();
    const thumbPath = path.join(projectFolder, thumbFile);
    if (fs.existsSync(thumbPath)) {
      const ext = path.extname(thumbFile);
      const newName = `${slug}-thumbnail${ext}`;
      imageMappings.push({ old: thumbFile, new: newName });
    }
  }
  
  // Process gallery images
  for (const imgMatch of imageObjects) {
    const imgPath = imgMatch[1];
    const description = imgMatch[2] || '';
    const imgFile = imgPath.split('/').pop();
    const imgPathFull = path.join(projectFolder, imgFile);
    
    if (fs.existsSync(imgPathFull)) {
      const ext = path.extname(imgFile);
      // Create descriptive name from description or use index
      let newName;
      if (description) {
        const cleanDesc = description
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
          .substring(0, 40);
        newName = `${slug}-${cleanDesc}${ext}`;
      } else {
        newName = `${slug}-${imageIndex}${ext}`;
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
      imageIndex++;
    }
  }
  
  if (imageMappings.length > 0) {
    renameMap.push({ projectId, folderName, mappings: imageMappings });
  }
}

// Now rename the files and update the project data
let updatedProjectsContent = projectsContent;

for (const project of renameMap) {
  const { projectId, folderName, mappings } = project;
  const projectFolder = path.join(projectsDir, folderName);
  
  console.log(`📁 ${projectId} (${folderName}):`);
  
  // Rename files
  for (const mapping of mappings) {
    const oldPath = path.join(projectFolder, mapping.old);
    const newPath = path.join(projectFolder, mapping.new);
    
    if (fs.existsSync(oldPath) && !fs.existsSync(newPath)) {
      fs.renameSync(oldPath, newPath);
      console.log(`   ${mapping.old} → ${mapping.new}`);
    }
  }
  
  // Update references in projects.ts
  const projectInfo = folderMapping[projectId];
  const slug = projectInfo.slug;
  
  for (const mapping of mappings) {
    const oldRef = `/images/projects/${folderName}/${mapping.old}`;
    const newRef = `/images/projects/${folderName}/${mapping.new}`;
    
    // Replace in content
    updatedProjectsContent = updatedProjectsContent.replace(
      new RegExp(oldRef.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
      newRef
    );
  }
  
  console.log('');
}

// Write updated projects.ts
fs.writeFileSync(path.join(__dirname, 'data', 'projects.ts'), updatedProjectsContent);

console.log('✅ All images renamed and project data updated!');

