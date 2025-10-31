const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, 'public', 'images', 'projects');
const extractionDir = path.join(__dirname, 'portfolio-extraction', 'project-images');

// Read projects.ts to get all image paths
const projectsContent = fs.readFileSync(path.join(__dirname, 'data', 'projects.ts'), 'utf8');

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

console.log('🔍 Checking all project images...\n');

// Find all project blocks
const projectBlocks = projectsContent.matchAll(/\{\s*id:\s*['"]([^'"]+)['"][\s\S]*?\},(?=\s*(?:\{|\]))/g);

const missingImages = [];
const allProjects = [];

for (const match of projectBlocks) {
  const projectBlock = match[0];
  const projectIdMatch = projectBlock.match(/id:\s*['"]([^'"]+)['"]/);
  if (!projectIdMatch) continue;
  
  const projectId = projectIdMatch[1];
  const folderName = folderMapping[projectId] || projectId;
  const projectFolder = path.join(projectsDir, folderName);
  
  // Extract thumbnail
  const thumbMatch = projectBlock.match(/thumbnail:\s*['"]([^'"]+)['"]/);
  const thumbnail = thumbMatch ? thumbMatch[1] : null;
  
  // Extract all images
  const imagesMatch = projectBlock.match(/images:\s*\[([\s\S]*?)\]/);
  const imagesContent = imagesMatch ? imagesMatch[1] : '';
  const imageSrcMatches = imagesContent.matchAll(/src:\s*['"]([^'"]+)['"]/g);
  
  const requiredImages = new Set();
  if (thumbnail) {
    const thumbFile = thumbnail.split('/').pop();
    requiredImages.add(thumbFile);
  }
  
  for (const imgMatch of imageSrcMatches) {
    const imgPath = imgMatch[1];
    const imgFile = imgPath.split('/').pop();
    requiredImages.add(imgFile);
  }
  
  if (!fs.existsSync(projectFolder)) {
    console.log(`⚠️  ${projectId}: Folder not found: ${folderName}`);
    missingImages.push({ projectId, folderName, requiredImages: Array.from(requiredImages) });
    continue;
  }
  
  const existingFiles = new Set(fs.readdirSync(projectFolder).filter(file => {
    return fs.statSync(path.join(projectFolder, file)).isFile();
  }));
  
  const missing = Array.from(requiredImages).filter(img => !existingFiles.has(img));
  
  if (missing.length > 0) {
    console.log(`❌ ${projectId} (${folderName}): Missing ${missing.length} images`);
    console.log(`   Required: ${Array.from(requiredImages).join(', ')}`);
    console.log(`   Missing: ${missing.join(', ')}`);
    missingImages.push({ projectId, folderName, requiredImages: Array.from(requiredImages), missing });
  } else {
    console.log(`✓ ${projectId} (${folderName}): All images present`);
  }
  
  allProjects.push({ projectId, folderName, requiredImages: Array.from(requiredImages) });
}

console.log(`\n📊 Summary: ${missingImages.length} projects with missing images\n`);

// Try to find and copy missing images
if (missingImages.length > 0) {
  console.log('🔧 Attempting to restore missing images...\n');
  
  for (const project of missingImages) {
    const projectFolder = path.join(projectsDir, project.folderName);
    
    for (const missingImg of project.missing) {
      let found = false;
      
      // Check iqmetrix folder (has many images)
      const iqmetrixFolder = path.join(projectsDir, 'iqmetrix');
      if (fs.existsSync(iqmetrixFolder)) {
        const iqmetrixImg = path.join(iqmetrixFolder, missingImg);
        if (fs.existsSync(iqmetrixImg)) {
          fs.copyFileSync(iqmetrixImg, path.join(projectFolder, missingImg));
          console.log(`  ✓ ${project.projectId}: Copied ${missingImg} from iqmetrix`);
          found = true;
        }
      }
      
      // Check extraction folders
      if (!found && fs.existsSync(extractionDir)) {
        const extractionProjectFolder = path.join(extractionDir, project.folderName);
        if (fs.existsSync(extractionProjectFolder)) {
          const extractedImg = path.join(extractionProjectFolder, missingImg);
          if (fs.existsSync(extractedImg)) {
            fs.copyFileSync(extractedImg, path.join(projectFolder, missingImg));
            console.log(`  ✓ ${project.projectId}: Copied ${missingImg} from extraction`);
            found = true;
          }
        }
      }
      
      // Check other possible locations (plotlystudio extraction folder)
      if (!found && project.projectId === 'plotly-studio') {
        const plotlyExtraction = path.join(extractionDir, 'plotlystudio');
        if (fs.existsSync(plotlyExtraction)) {
          const extractedImg = path.join(plotlyExtraction, missingImg);
          if (fs.existsSync(extractedImg)) {
            fs.copyFileSync(extractedImg, path.join(projectFolder, missingImg));
            console.log(`  ✓ ${project.projectId}: Copied ${missingImg} from plotlystudio extraction`);
            found = true;
          }
        }
      }
      
      // Check hr-block extraction
      if (!found && project.projectId === 'hr-block') {
        const hrExtraction = path.join(extractionDir, 'hr-block');
        if (fs.existsSync(hrExtraction)) {
          const extractedImg = path.join(hrExtraction, missingImg);
          if (fs.existsSync(extractedImg)) {
            fs.copyFileSync(extractedImg, path.join(projectFolder, missingImg));
            console.log(`  ✓ ${project.projectId}: Copied ${missingImg} from hr-block extraction`);
            found = true;
          }
        }
      }
      
      if (!found) {
        console.log(`  ✗ ${project.projectId}: Could not find ${missingImg}`);
      }
    }
  }
}

console.log('\n✅ Image check complete!');

