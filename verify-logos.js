#!/usr/bin/env node

/**
 * Logo Link Verification Script
 * Verifies that logos in startups.json are properly linked and exist
 */

const fs = require('fs');
const path = require('path');

const STARTUPS_JSON = './data/startups.json';
const LOGOS_DIR = './assets/logos';

console.log('🔍 Verifying logo links...\n');

// Read startups.json
let startups;
try {
  const data = fs.readFileSync(STARTUPS_JSON, 'utf-8');
  startups = JSON.parse(data);
  console.log(`✅ Loaded ${startups.length} startups from JSON\n`);
} catch (err) {
  console.error('❌ Error reading startups.json:', err.message);
  process.exit(1);
}

let missingCount = 0;
let placeholderCount = 0;
let validCount = 0;
let totalSize = 0;

console.log('Checking each startup logo...\n');

startups.forEach((startup, index) => {
  const num = `${index + 1}`.padStart(3, '0');
  const name = startup.name.padEnd(30);
  const logoPath = startup.logo;

  // Check if using placeholder
  if (logoPath === 'assets/logos/placeholder.svg') {
    console.log(`${num}. ${name} ⚠️  Using placeholder`);
    placeholderCount++;
    return;
  }

  // Check if file exists
  try {
    const stats = fs.statSync(logoPath);
    const sizeKB = (stats.size / 1024).toFixed(1);
    totalSize += stats.size;
    console.log(`${num}. ${name} ✅ ${sizeKB} KB`);
    validCount++;
  } catch (err) {
    console.log(`${num}. ${name} ❌ File not found: ${logoPath}`);
    missingCount++;
  }
});

// Summary
console.log('\n' + '='.repeat(60));
console.log('📊 Summary:');
console.log('='.repeat(60));
console.log(`   Valid logos:       ${validCount}`);
console.log(`   Using placeholder: ${placeholderCount}`);
console.log(`   Missing files:     ${missingCount}`);
console.log(`   Total startups:    ${startups.length}`);

if (validCount > 0) {
  const avgSize = (totalSize / validCount / 1024).toFixed(1);
  const totalMB = (totalSize / 1024 / 1024).toFixed(2);
  console.log(`\n   Average logo size: ${avgSize} KB`);
  console.log(`   Total logos size:  ${totalMB} MB`);
}

// Check for orphaned logo files
console.log('\n' + '='.repeat(60));
console.log('🔍 Checking for orphaned logo files...');
console.log('='.repeat(60));

const usedLogos = new Set(startups.map(s => path.basename(s.logo)));
const logoFiles = fs.readdirSync(LOGOS_DIR);
const orphaned = logoFiles.filter(file => 
  file !== 'placeholder.svg' && 
  file !== '.gitkeep' &&
  !usedLogos.has(file)
);

if (orphaned.length > 0) {
  console.log(`\n⚠️  Found ${orphaned.length} orphaned logo file(s):`);
  orphaned.forEach(file => {
    const stats = fs.statSync(path.join(LOGOS_DIR, file));
    const sizeKB = (stats.size / 1024).toFixed(1);
    console.log(`   • ${file} (${sizeKB} KB)`);
  });
  console.log('\nThese files are not referenced in startups.json');
} else {
  console.log('\n✅ No orphaned logo files found');
}

// Recommendations
console.log('\n' + '='.repeat(60));
console.log('💡 Recommendations:');
console.log('='.repeat(60));

if (missingCount > 0) {
  console.log(`\n⚠️  ${missingCount} startup(s) have missing logo files!`);
  console.log('   Run: npm run download-logos');
  console.log('   Or manually add logo files to assets/logos/');
}

if (placeholderCount > 0) {
  console.log(`\n📝 ${placeholderCount} startup(s) using placeholder`);
  console.log('   Consider adding logoUrl field to enable auto-download');
}

if (validCount === startups.length) {
  console.log('\n✨ Perfect! All startups have valid logos');
}

console.log('\n' + '='.repeat(60));

// Exit code
if (missingCount > 0) {
  console.log('\n❌ Verification failed: Missing logo files');
  process.exit(1);
} else {
  console.log('\n✅ Verification passed');
  process.exit(0);
}
