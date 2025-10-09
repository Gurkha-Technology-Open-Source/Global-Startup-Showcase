#!/usr/bin/env node

/**
 * Logo Download Script
 * Downloads logos from URLs specified in startups.json
 * Updates the JSON file with local paths
 */

const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');
const { URL } = require('url');

const STARTUPS_JSON_PATH = './data/startups.json';
const LOGOS_DIR = './assets/logos';
const PLACEHOLDER = 'assets/logos/placeholder.svg';

// Ensure logos directory exists
if (!fs.existsSync(LOGOS_DIR)) {
  fs.mkdirSync(LOGOS_DIR, { recursive: true });
}

/**
 * Sanitize filename to be filesystem-safe
 */
function sanitizeFilename(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Download a file from URL
 */
function downloadFile(url, filePath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const request = protocol.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadFile(response.headers.location, filePath)
          .then(resolve)
          .catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filePath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve(filePath);
      });

      fileStream.on('error', (err) => {
        fs.unlink(filePath, () => {}); // Delete partial file
        reject(err);
      });
    });

    request.on('error', (err) => {
      reject(err);
    });

    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

/**
 * Get file extension from URL or content-type
 */
function getExtension(url) {
  try {
    const urlPath = new URL(url).pathname;
    const ext = path.extname(urlPath).toLowerCase();
    
    // Validate extension
    const validExtensions = ['.svg', '.png', '.jpg', '.jpeg', '.webp', '.gif'];
    if (validExtensions.includes(ext)) {
      return ext;
    }
  } catch (e) {
    // Invalid URL
  }
  
  // Default to .png if can't determine
  return '.png';
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting logo download process...\n');

  // Read startups.json
  let startups;
  try {
    const data = fs.readFileSync(STARTUPS_JSON_PATH, 'utf-8');
    startups = JSON.parse(data);
  } catch (err) {
    console.error('❌ Error reading startups.json:', err.message);
    process.exit(1);
  }

  console.log(`📊 Found ${startups.length} startups\n`);

  let downloadCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  // Process each startup
  for (const startup of startups) {
    const startupName = startup.name;

    // Skip if no logoUrl field
    if (!startup.logoUrl) {
      console.log(`⏭️  ${startupName}: No logoUrl field, skipping`);
      skipCount++;
      continue;
    }

    // Skip if already using local logo
    if (startup.logo && startup.logo.startsWith('assets/logos/') && startup.logo !== PLACEHOLDER) {
      console.log(`✅ ${startupName}: Already has local logo`);
      skipCount++;
      continue;
    }

    try {
      const sanitizedName = sanitizeFilename(startupName);
      const extension = getExtension(startup.logoUrl);
      const fileName = `${sanitizedName}${extension}`;
      const filePath = path.join(LOGOS_DIR, fileName);
      const relativePath = `assets/logos/${fileName}`;

      console.log(`📥 ${startupName}: Downloading from ${startup.logoUrl}`);

      await downloadFile(startup.logoUrl, filePath);

      // Update startup data
      startup.logo = relativePath;
      downloadCount++;

      console.log(`✅ ${startupName}: Saved as ${fileName}`);
      console.log(`   → Logo field updated: ${relativePath}\n`);
    } catch (err) {
      console.error(`❌ ${startupName}: Failed - ${err.message}`);
      errorCount++;
      
      // Keep placeholder if download fails
      if (!startup.logo || startup.logo === startup.logoUrl) {
        startup.logo = PLACEHOLDER;
      }
      console.log('');
    }

    // Small delay to avoid overwhelming servers
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Write updated JSON
  try {
    fs.writeFileSync(
      STARTUPS_JSON_PATH,
      JSON.stringify(startups, null, 2) + '\n'
    );
    console.log('✅ Updated startups.json\n');
  } catch (err) {
    console.error('❌ Error writing startups.json:', err.message);
    process.exit(1);
  }

  // Summary
  console.log('📊 Summary:');
  console.log(`   Downloaded: ${downloadCount}`);
  console.log(`   Skipped: ${skipCount}`);
  console.log(`   Errors: ${errorCount}`);
  console.log(`   Total: ${startups.length}`);

  if (downloadCount > 0) {
    console.log('\n✨ Logo download complete!');
    process.exit(0);
  } else {
    console.log('\n⚠️  No new logos downloaded');
    process.exit(0);
  }
}

// Run the script
main().catch((err) => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
