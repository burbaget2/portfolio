const fs = require('fs');
const path = require('path');

// Read extracted JSON to identify which images actually belong to each project
const projectJsonPath = path.join(__dirname, 'portfolio-extraction', 'projects');
const publicImagesPath = path.join(__dirname, 'public', 'images', 'projects');

// Known images that appear on all pages (from home page)
const homePageImageUrls = new Set([
  '1533419558010-1852B1Q5YE8M5PRX3CH0/4_Dashboard_IIB.png', // Dashboard
  '1655240148581-WI0IWVRE4SK2JTXGXYW2/Screen+Shot+2022-06-14+at+2.55.02+PM.png', // Dashboard List
  '1533418745349-SQOLF38ZUT80E2Z0JT9X/3_new_card.png', // Adding Metrics Card
  '1533419896600-8D2D6ACKGD2JH1I69MXA/Screen+Shot+2018-08-04+at+2.57.53+PM.png', // Dashboard Management
  '1655241433420-1FQ8T31PGHV8C3GXOT49/Browse_Catalog_Bulk_V2.graffle.png', // Inventory Management
  '1533421442039-HBA0CGMGX3LNL377X6HJ/Screen+Shot+2018-08-04+at+3.23.42+PM.png', // POS
  '1533421235727-6W2B58UU6WFZML0ZDTPL/Screen+Shot+2018-08-04+at+3.15.16+PM.png', // Customer Suggestions
  '1533421548990-8NL3RC76D6MD7ARB0UXG/Screen+Shot+2018-08-04+at+3.25.31+PM.png', // Loyalty
  '1533421597921-OISGQN4VSZOZG5U6LX39/Screen+Shot+2018-08-04+at+3.26.19+PM.png', // Invoice
  '1d6ce9c0-1652-4ebc-8b72-50900a5df617/tonyHeader2.png', // Header logo
]);

function getProjectSpecificImages(projectSlug) {
  const jsonFile = path.join(projectJsonPath, `${projectSlug}.json`);
  if (!fs.existsSync(jsonFile)) {
    return [];
  }

  const data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
  const specificImages = [];

  if (data.images) {
    data.images.forEach((img, index) => {
      // Skip header/logo (image-1)
      if (index === 0) return;

      // Check if this image URL is in the home page set
      const urlPart = img.src.split('/').pop().split('?')[0];
      const isHomePageImage = Array.from(homePageImageUrls).some(homeUrl => 
        img.src.includes(homeUrl.split('/')[0])
      );

      // Keep if:
      // 1. Has project-specific context (not empty)
      // 2. OR is not a known home page image
      // 3. OR image number is high enough (likely project-specific)
      if (img.context && img.context.trim() && !img.context.includes('Dashboard') && !img.context.includes('Inventory')) {
        specificImages.push(img.localPath?.split('/').pop());
      } else if (!isHomePageImage && index > 10) {
        // Images after index 10 are likely project-specific
        specificImages.push(img.localPath?.split('/').pop());
      }
    });
  }

  return specificImages.filter(Boolean);
}

function cleanProjectFolder(projectSlug) {
  const folderPath = path.join(publicImagesPath, projectSlug);
  if (!fs.existsSync(folderPath)) {
    console.log(`❌ Folder not found: ${projectSlug}`);
    return;
  }

  const specificImages = getProjectSpecificImages(projectSlug);
  const allFiles = fs.readdirSync(folderPath);
  const imageFiles = allFiles.filter(f => f.match(/^image-\d+\.(png|jpg|jpeg)$/i));
  
  console.log(`\n📁 ${projectSlug}:`);
  console.log(`   Project-specific images identified: ${specificImages.length}`);
  console.log(`   Total images in folder: ${imageFiles.length}`);

  let removed = 0;
  let kept = 0;

  // For projects we know about, use specific image list
  const knownProjects = ['fishtank', 'payload', 'queue', 'nike', 'dashboards', 'retail', 'hr-block'];
  
  if (knownProjects.includes(projectSlug) && specificImages.length > 0) {
    // Remove all images not in the specific list
    imageFiles.forEach(file => {
      if (specificImages.includes(file)) {
        kept++;
      } else {
        const filePath = path.join(folderPath, file);
        fs.unlinkSync(filePath);
        removed++;
      }
    });
  } else {
    // For other projects, remove known home page duplicates (image-1 through image-10)
    imageFiles.forEach(file => {
      const match = file.match(/^image-(\d+)\./);
      if (match) {
        const num = parseInt(match[1]);
        if (num <= 10 && projectSlug !== 'dashboards' && projectSlug !== 'retail' && projectSlug !== 'hr-block') {
          const filePath = path.join(folderPath, file);
          fs.unlinkSync(filePath);
          removed++;
        } else {
          kept++;
        }
      } else {
        kept++;
      }
    });
  }

  console.log(`   Kept: ${kept}, Removed: ${removed}`);
  
  const remaining = fs.readdirSync(folderPath).filter(f => f.match(/^image-\d+\.(png|jpg|jpeg)$/i));
  console.log(`   Remaining: ${remaining.length}`);
}

// Projects to clean
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

console.log('🧹 Precise cleanup based on extracted JSON...\n');

projects.forEach(cleanProjectFolder);

console.log('\n✅ Cleanup complete!');

