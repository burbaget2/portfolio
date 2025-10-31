const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, 'public', 'images', 'projects');
let projectsContent = fs.readFileSync(path.join(__dirname, 'data', 'projects.ts'), 'utf8');

// Map project folder names to slugs for file naming
const folderToSlug = {
  'plotlystudio': 'plotly',
  'dashboards': 'dashboards',
  'retail': 'retail',
  'navarik': 'navarik',
  'ea-games': 'ea-games',
  'peugeot': 'peugeot',
  'bodog': 'bodog',
  'intel': 'intel',
  'ebookers': 'ebookers',
  'bestbuy-strategy': 'bestbuy-strategy',
  'best-buy-vision': 'bestbuy-vision',
  'hr-block': 'hr-block',
  'fishtank': 'fishtank',
  'payload': 'payload',
  'queue': 'queue',
  'nike': 'nike',
  'ignite-works': 'ignite-works',
};

console.log('🔄 Completing image rename for all projects...\n');

// Process each project folder
for (const [folderName, slug] of Object.entries(folderToSlug)) {
  const projectFolder = path.join(projectsDir, folderName);
  
  if (!fs.existsSync(projectFolder)) continue;
  
  // Find all generic image files (image-*.png, image-*.jpg)
  const allFiles = fs.readdirSync(projectFolder).filter(file => {
    const fullPath = path.join(projectFolder, file);
    return fs.statSync(fullPath).isFile() && file.match(/^image-\d+\.(png|jpg|jpeg)$/i);
  });
  
  if (allFiles.length === 0) continue;
  
  // Sort files to ensure consistent ordering
  allFiles.sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)?.[0] || '0');
    const numB = parseInt(b.match(/\d+/)?.[0] || '0');
    return numA - numB;
  });
  
  console.log(`📁 ${folderName}:`);
  
  // Rename each file
  allFiles.forEach((oldFile, index) => {
    const ext = path.extname(oldFile);
    const newFile = `${slug}-${index + 1}${ext}`;
    const oldPath = path.join(projectFolder, oldFile);
    const newPath = path.join(projectFolder, newFile);
    
    if (!fs.existsSync(newPath)) {
      fs.renameSync(oldPath, newPath);
      console.log(`   ${oldFile} → ${newFile}`);
      
      // Update all references in projects.ts
      const oldRef = `/images/projects/${folderName}/${oldFile}`;
      const newRef = `/images/projects/${folderName}/${newFile}`;
      
      const escapedOldRef = oldRef.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      projectsContent = projectsContent.replace(
        new RegExp(escapedOldRef, 'g'),
        newRef
      );
    }
  });
  
  console.log('');
}

// Write updated projects.ts
fs.writeFileSync(path.join(__dirname, 'data', 'projects.ts'), projectsContent);

console.log('✅ All images renamed and project data updated!');

