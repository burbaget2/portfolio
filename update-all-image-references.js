const fs = require('fs');
const path = require('path');

let projectsContent = fs.readFileSync(path.join(__dirname, 'data', 'projects.ts'), 'utf8');

// Map old image references to new ones
const replacements = [
  // Navarik
  ['/images/projects/navarik/image-12.png', '/images/projects/navarik/navarik-1.png'],
  
  // EA Games
  ['/images/projects/ea-games/image-14.png', '/images/projects/ea-games/ea-games-1.png'],
  ['/images/projects/ea-games/image-35.jpg', '/images/projects/ea-games/ea-games-2.jpg'],
  
  // Peugeot
  ['/images/projects/peugeot/image-16.png', '/images/projects/peugeot/peugeot-1.png'],
  ['/images/projects/peugeot/image-17.png', '/images/projects/peugeot/peugeot-2.png'],
  ['/images/projects/peugeot/image-18.png', '/images/projects/peugeot/peugeot-3.png'],
  ['/images/projects/peugeot/image-37.png', '/images/projects/peugeot/peugeot-4.png'],
  
  // Bodog
  ['/images/projects/bodog/image-20.jpg', '/images/projects/bodog/bodog-1.jpg'],
  ['/images/projects/bodog/image-38.jpg', '/images/projects/bodog/bodog-2.jpg'],
  
  // Intel
  ['/images/projects/intel/image-39.png', '/images/projects/intel/intel-1.png'],
  
  // Ebookers
  ['/images/projects/ebookers/image-23.png', '/images/projects/ebookers/ebookers-1.png'],
  ['/images/projects/ebookers/image-40.jpg', '/images/projects/ebookers/ebookers-2.jpg'],
  
  // Best Buy Strategy
  ['/images/projects/bestbuy-strategy/image-5.png', '/images/projects/bestbuy-strategy/bestbuy-strategy-1.png'],
  ['/images/projects/bestbuy-strategy/image-7.png', '/images/projects/bestbuy-strategy/bestbuy-strategy-2.png'],
  ['/images/projects/bestbuy-strategy/image-8.png', '/images/projects/bestbuy-strategy/bestbuy-strategy-3.png'],
  ['/images/projects/bestbuy-strategy/image-31.png', '/images/projects/bestbuy-strategy/bestbuy-strategy-4.png'],
  
  // HR Block
  ['/images/projects/hr-block/image-7.png', '/images/projects/hr-block/hr-block-1.png'],
  ['/images/projects/hr-block/image-8.png', '/images/projects/hr-block/hr-block-2.png'],
  ['/images/projects/hr-block/image-9.png', '/images/projects/hr-block/hr-block-3.png'],
  ['/images/projects/hr-block/image-10.png', '/images/projects/hr-block/hr-block-4.png'],
  
  // Fishtank
  ['/images/projects/fishtank/image-10.png', '/images/projects/fishtank/fishtank-1.png'],
  ['/images/projects/fishtank/image-11.png', '/images/projects/fishtank/fishtank-2.png'],
  ['/images/projects/fishtank/image-12.png', '/images/projects/fishtank/fishtank-3.png'],
  
  // Payload
  ['/images/projects/payload/image-13.png', '/images/projects/payload/payload-1.png'],
  
  // Queue
  ['/images/projects/queue/image-14.png', '/images/projects/queue/queue-1.png'],
  
  // Nike
  ['/images/projects/nike/image-15.jpg', '/images/projects/nike/nike-1.jpg'],
  ['/images/projects/nike/image-17.jpg', '/images/projects/nike/nike-2.jpg'],
  ['/images/projects/nike/image-18.jpg', '/images/projects/nike/nike-3.jpg'],
];

console.log('🔄 Updating all image references in projects.ts...\n');

for (const [oldRef, newRef] of replacements) {
  const escapedOldRef = oldRef.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const count = (projectsContent.match(new RegExp(escapedOldRef, 'g')) || []).length;
  if (count > 0) {
    projectsContent = projectsContent.replace(new RegExp(escapedOldRef, 'g'), newRef);
    console.log(`   ${oldRef.split('/').pop()} → ${newRef.split('/').pop()} (${count} references)`);
  }
}

fs.writeFileSync(path.join(__dirname, 'data', 'projects.ts'), projectsContent);

console.log('\n✅ All image references updated!');

