const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, 'public', 'images', 'projects');
const projectsData = require('./data/projects.ts');

// Get all projects
const projects = require('./data/projects.ts').projects;

console.log('🧹 Cleaning up project images...\n');

projects.forEach(project => {
  const projectFolder = path.join(projectsDir, project.id.replace(/-/g, '') || project.slug.replace(/-/g, ''));
  
  // Try different folder name variations
  let actualFolder = null;
  const possibleNames = [
    project.id,
    project.slug,
    project.id.replace(/-/g, ''),
    project.slug.replace(/-/g, ''),
    project.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
  ];
  
  for (const name of possibleNames) {
    const testPath = path.join(projectsDir, name);
    if (fs.existsSync(testPath) && fs.statSync(testPath).isDirectory()) {
      actualFolder = testPath;
      break;
    }
  }
  
  if (!actualFolder) {
    console.log(`⚠️  Folder not found for: ${project.title}`);
    return;
  }
  
  // Get all images used in this project
  const usedImages = new Set();
  
  // Add thumbnail
  if (project.thumbnail) {
    const thumbPath = project.thumbnail.replace('/images/projects/', '');
    const thumbFile = path.basename(thumbPath);
    usedImages.add(thumbFile);
  }
  
  // Add all gallery images
  if (project.images && Array.isArray(project.images)) {
    project.images.forEach(img => {
      if (img.src) {
        const imgPath = img.src.replace('/images/projects/', '');
        const imgFile = path.basename(imgPath);
        usedImages.add(imgFile);
      }
    });
  }
  
  // Get all files in the folder
  const allFiles = fs.readdirSync(actualFolder).filter(file => {
    return fs.statSync(path.join(actualFolder, file)).isFile();
  });
  
  // Find files to delete (not in usedImages set)
  const filesToDelete = allFiles.filter(file => !usedImages.has(file));
  
  if (filesToDelete.length > 0) {
    console.log(`📁 ${project.title}:`);
    console.log(`   Used: ${usedImages.size} images`);
    console.log(`   Found: ${allFiles.length} files`);
    console.log(`   Deleting: ${filesToDelete.length} unused files`);
    
    filesToDelete.forEach(file => {
      const filePath = path.join(actualFolder, file);
      fs.unlinkSync(filePath);
      console.log(`   ✓ Deleted: ${file}`);
    });
    console.log('');
  } else {
    console.log(`✓ ${project.title}: All ${allFiles.length} images are in use\n`);
  }
});

console.log('✅ Cleanup complete!');

