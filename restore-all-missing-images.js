const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, 'public', 'images', 'projects');
const extractionDir = path.join(__dirname, 'portfolio-extraction', 'project-images');

// Map of project slugs to folder names and image mappings
const projectMappings = {
  'peugeot': { 
    folder: 'peugeot', 
    images: [
      { old: 'image-16.png', new: 'peugeot-1.png' },
      { old: 'image-17.png', new: 'peugeot-2.png' },
      { old: 'image-18.png', new: 'peugeot-3.png' },
      { old: 'image-37.png', new: 'peugeot-4.png' }
    ]
  },
  'bodog': { 
    folder: 'bodog', 
    images: [
      { old: 'image-20.jpg', new: 'bodog-1.jpg' },
      { old: 'image-38.jpg', new: 'bodog-2.jpg' }
    ]
  },
  'intel': { 
    folder: 'intel', 
    images: [
      { old: 'image-39.png', new: 'intel-1.png' }
    ]
  },
  'ebookers': { 
    folder: 'ebookers', 
    images: [
      { old: 'image-23.png', new: 'ebookers-1.png' },
      { old: 'image-40.jpg', new: 'ebookers-2.jpg' }
    ]
  },
  'bestbuy-strategy': { 
    folder: 'bestbuy-strategy', 
    images: [
      { old: 'image-5.png', new: 'bestbuy-strategy-1.png' },
      { old: 'image-7.png', new: 'bestbuy-strategy-2.png' },
      { old: 'image-8.png', new: 'bestbuy-strategy-3.png' },
      { old: 'image-31.png', new: 'bestbuy-strategy-4.png' }
    ]
  },
  'fishtank': { 
    folder: 'fishtank', 
    images: [
      { old: 'image-10.png', new: 'fishtank-1.png' },
      { old: 'image-11.png', new: 'fishtank-2.png' },
      { old: 'image-12.png', new: 'fishtank-3.png' }
    ]
  },
  'payload': { 
    folder: 'payload', 
    images: [
      { old: 'image-13.png', new: 'payload-1.png' }
    ]
  },
  'queue': { 
    folder: 'queue', 
    images: [
      { old: 'image-14.png', new: 'queue-1.png' }
    ]
  },
  'nike': { 
    folder: 'nike', 
    images: [
      { old: 'image-15.jpg', new: 'nike-1.jpg' },
      { old: 'image-17.jpg', new: 'nike-2.jpg' },
      { old: 'image-18.jpg', new: 'nike-3.jpg' }
    ]
  },
};

console.log('🔄 Restoring all missing project images...\n');

for (const [projectSlug, projectInfo] of Object.entries(projectMappings)) {
  const { folder, images } = projectInfo;
  const projectFolder = path.join(projectsDir, folder);
  const extractionProjectFolder = path.join(extractionDir, projectSlug);
  
  if (!fs.existsSync(projectFolder)) {
    fs.mkdirSync(projectFolder, { recursive: true });
  }
  
  console.log(`📁 ${projectSlug} (${folder}):`);
  
  for (const imgMapping of images) {
    const { old: oldName, new: newName } = imgMapping;
    const oldPath = path.join(projectFolder, oldName);
    const newPath = path.join(projectFolder, newName);
    const extractionPath = path.join(extractionProjectFolder, oldName);
    
    // Check if already renamed
    if (fs.existsSync(newPath)) {
      console.log(`   ✓ ${newName} already exists`);
      continue;
    }
    
    // Try to rename existing old file
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
      console.log(`   ${oldName} → ${newPath.split('/').pop()}`);
      continue;
    }
    
    // Try to copy from extraction folder
    if (fs.existsSync(extractionPath)) {
      fs.copyFileSync(extractionPath, newPath);
      console.log(`   Copied ${newName} from extraction`);
      continue;
    }
    
    // Try iqmetrix folder (has many shared images)
    const iqmetrixPath = path.join(projectsDir, 'iqmetrix', oldName);
    if (fs.existsSync(iqmetrixPath)) {
      fs.copyFileSync(iqmetrixPath, newPath);
      console.log(`   Copied ${newName} from iqmetrix`);
      continue;
    }
    
    console.log(`   ✗ Could not find ${oldName} or ${newName}`);
  }
  
  console.log('');
}

console.log('✅ Image restoration complete!');

