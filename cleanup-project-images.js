const fs = require('fs');
const path = require('path');

// Images that appear on all pages (should be removed from project folders)
const commonImages = [
  'image-1.png', // Portfolio header
  'image-2.png', // Dashboard images
  'image-3.png',
  'image-4.png',
  'image-5.png',
  'image-6.png', // Some dashboard/iqmetrix images
];

// Project-specific image mappings based on extracted JSON context
const projectSpecificImages = {
  'fishtank': [
    'image-7.png',   // Travel Sask - Design Component Summary
    'image-8.png',
    'image-9.png',
    'image-10.png',  // Travel Sask - Targeted Content
    'image-11.png',  // Travel Sask - Fishing Site
    'image-12.png',  // Bow Valley College
    'image-13.png',
    // Keep others that might be fishtank-specific (image-14 onwards, excluding dashboard duplicates)
  ],
  'payload': [
    'image-11.png',  // Design Pattern Library
    'image-12.png',
    'image-13.png',  // Field Ticket Reporting
    'image-14.png',
    'image-15.png',
    // Keep image-16 onwards if they have payload context
  ],
  'queue': [
    'image-11.png',
    'image-12.png',
    'image-13.png',  // Queue Screen
    'image-14.png',  // Customer Profiles
    'image-15.png',
    // Keep image-16 onwards if queue-specific
  ],
  'nike': [
    'image-15.jpg',  // Bmore_06.jpg (Baltimore)
    'image-16.png',  // jumpman23_8.png
    'image-17.jpg',  // jumpman23_9.jpg
    'image-18.jpg',  // NikeGo_Home_02_fc.jpg
    'image-19.png',
    'image-20.png',
    'image-21.png',
    'image-22.png',
    // Keep later images if Nike-specific
  ],
  'dashboards': [
    'image-2.png',   // Configured Custom Dashboard
    'image-3.png',   // Dashboard List
    'image-4.png',   // Adding Metrics Card
    'image-5.png',   // Dashboard Management
    // Remove later images that are from other projects
  ],
  'retail': [
    'image-6.png',   // Online Inventory Management
    'image-7.png',   // Point of Sale Employee Experience
    'image-8.png',   // Customer Targeted Suggestions
    'image-9.png',   // Loyalty
    'image-10.png', // Invoice Management
    // Remove dashboard images (image-2-5)
  ],
  'hr-block': [
    'image-6.png',   // hr issues.png
    'image-7.png',   // Desktop Collapsed
    'image-8.png',   // Taxscenario.png
    'image-9.png',   // user journey.png
    'image-10.png',  // filtering.png
    // Remove dashboard images (image-2-5)
  ],
  'best-buy-vision': [
    'image-6.png',   // Example.png
    'image-29.png',  // user journey.png (might be different)
    // Remove dashboard images
  ],
  'plotlystudio': [
    'image-2.png',   // AI visualization screenshot
    'image-3.png',   // Users upload data
    'image-4.png',   // Set context
    'image-5.png',   // Generate dashboard
    // Remove image-6 onwards if they're dashboard duplicates
  ],
};

// Function to clean a project folder
function cleanProjectFolder(projectName) {
  const folderPath = path.join(__dirname, 'public', 'images', 'projects', projectName);
  if (!fs.existsSync(folderPath)) {
    console.log(`Folder not found: ${projectName}`);
    return;
  }

  const keepImages = projectSpecificImages[projectName] || [];
  const allFiles = fs.readdirSync(folderPath);
  const imageFiles = allFiles.filter(f => f.match(/^image-\d+\.(png|jpg|jpeg)$/i));
  
  console.log(`\n📁 ${projectName}:`);
  console.log(`   Total images: ${imageFiles.length}`);
  
  let removed = 0;
  let kept = 0;

  imageFiles.forEach(file => {
    const filePath = path.join(folderPath, file);
    
    // Always remove common dashboard images (except for dashboards project)
    if (commonImages.includes(file) && projectName !== 'dashboards' && projectName !== 'plotlystudio') {
      fs.unlinkSync(filePath);
      removed++;
      return;
    }

    // Check if this image should be kept
    if (keepImages.includes(file)) {
      kept++;
      return;
    }

    // For images beyond the known ones, check if they might be project-specific
    // Extract image number
    const match = file.match(/image-(\d+)\./);
    if (match) {
      const num = parseInt(match[1]);
      
      // Keep images that are likely project-specific (later in sequence, after dashboard images)
      // Remove if it's likely a duplicate dashboard image
      if (num <= 10 && projectName !== 'dashboards' && projectName !== 'retail' && projectName !== 'hr-block') {
        // Likely a dashboard duplicate
        fs.unlinkSync(filePath);
        removed++;
      } else if (num <= 5 && !['dashboards', 'plotlystudio'].includes(projectName)) {
        // Definitely a dashboard duplicate
        fs.unlinkSync(filePath);
        removed++;
      } else {
        // Keep it - might be project-specific
        kept++;
      }
    }
  });

  console.log(`   Kept: ${kept}, Removed: ${removed}`);
  
  const remaining = fs.readdirSync(folderPath).filter(f => f.match(/^image-\d+\.(png|jpg|jpeg)$/i));
  console.log(`   Remaining images: ${remaining.length}`);
}

// Clean all project folders
console.log('🧹 Cleaning up project image folders...\n');

const projects = [
  'fishtank',
  'payload',
  'queue',
  'nike',
  'dashboards',
  'retail',
  'hr-block',
  'best-buy-vision',
  'plotlystudio',
  'navarik',
  'ea-games',
  'peugeot',
  'bodog',
  'intel',
  'ebookers',
];

projects.forEach(cleanProjectFolder);

console.log('\n✅ Cleanup complete!');

