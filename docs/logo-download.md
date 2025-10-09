# Logo Download Script

Automatically downloads startup logos from URLs and saves them locally.

## Overview

This script processes the `data/startups.json` file, downloads logos from `logoUrl` fields, saves them to `assets/logos/`, and updates the JSON with local paths.

## Usage

### Manual Execution

```bash
npm run download-logos
```

Or directly:

```bash
node download-logos.js
```

### Automatic Execution

The GitHub Actions workflow `.github/workflows/main.yml` runs automatically:
- **Schedule:** Every Sunday at 2 AM UTC
- **Manual:** Via Actions tab "Run workflow" button

## How It Works

### 1. Read Data
- Loads `data/startups.json`
- Iterates through each startup

### 2. Process Each Startup
- Checks for `logoUrl` field
- Skips if already has local logo
- Downloads from URL
- Sanitizes filename (e.g., "OpenAI" → "openai.png")
- Saves to `assets/logos/`

### 3. Update JSON
- Updates `logo` field with local path
- Preserves all other fields
- Writes formatted JSON (2-space indent)
- **Logo automatically displays on cards** via JavaScript `startup.logo` property

### 4. Commit Changes
- Git commits downloaded logos
- Git commits updated JSON
- Pushes to repository

## Features

### ✅ Smart Skipping
- Skips startups without `logoUrl`
- Skips startups already using local logos
- Avoids re-downloading existing files

### ✅ Error Handling
- Handles HTTP redirects (301, 302)
- Timeout after 30 seconds
- Falls back to placeholder on error
- Continues processing after individual failures

### ✅ Filename Sanitization
- Converts to lowercase
- Replaces special characters with hyphens
- Removes leading/trailing hyphens
- Examples:
  - "Stripe" → "stripe.png"
  - "Wise (TransferWise)" → "wise-transferwise.png"
  - "C3.ai" → "c3-ai.png"

### ✅ Format Support
- SVG
- PNG
- JPG/JPEG
- WebP
- GIF

### ✅ Progress Logging
```
🚀 Starting logo download process...

📊 Found 50 startups

📥 Stripe: Downloading from https://example.com/stripe-logo.png
✅ Stripe: Saved as stripe.png

⏭️  OpenAI: No logoUrl field, skipping

✅ Anthropic: Already has local logo

❌ Revolut: Failed - Request timeout

📊 Summary:
   Downloaded: 25
   Skipped: 20
   Errors: 5
   Total: 50

✨ Logo download complete!
```

## Data Format

### Before

```json
{
  "id": 1,
  "name": "Stripe",
  "logo": "assets/logos/placeholder.svg",
  "logoUrl": "https://example.com/stripe-logo.png",
  "description": "...",
  ...
}
```

### After

```json
{
  "id": 1,
  "name": "Stripe",
  "logo": "assets/logos/stripe.png",
  "logoUrl": "https://example.com/stripe-logo.png",
  "description": "...",
  ...
}
```

**Note:** The `logoUrl` field is preserved for reference and potential re-downloads.

**Logo Display:** The JavaScript automatically reads the `logo` field and displays the image in the startup card:

```javascript
// From src/app.js - createStartupCard()
logoImg.src = startup.logo;  // Uses the updated path
logoImg.alt = `${startup.name} company logo`;
logoImg.onerror = function() {
  this.src = 'assets/logos/placeholder.svg'; // Fallback
};
```

## Configuration

### Environment Variables

None required. All configuration is in the script.

### Constants (in script)

```javascript
const STARTUPS_JSON_PATH = './data/startups.json';
const LOGOS_DIR = './assets/logos';
const PLACEHOLDER = 'assets/logos/placeholder.svg';
```

## Workflow Integration

### GitHub Actions Workflow

**File:** `.github/workflows/main.yml`

**Triggers:**
- Scheduled: Sundays at 2 AM UTC
- Manual: Actions tab

**Steps:**
1. Checkout repository
2. Setup Node.js v20
3. Run download script
4. Check for changes
5. Commit & push if changes found

**Permissions:**
- `contents: write` - Required to commit changes

### Workflow Customization

**Change Schedule:**
```yaml
on:
  schedule:
    - cron: '0 2 * * 0' # Sundays at 2 AM
    # - cron: '0 2 * * *' # Daily at 2 AM
    # - cron: '0 2 1 * *' # 1st of month
```

**Disable Auto-Run:**
Remove the `schedule` section, keep only `workflow_dispatch`

## Adding New Startups

When adding a startup with a logo URL:

```json
{
  "id": 101,
  "name": "Your Startup",
  "logo": "assets/logos/placeholder.svg",
  "logoUrl": "https://yoursite.com/logo.png",
  ...
}
```

The script will automatically:
1. Download the logo on next run
2. Update `logo` field to local path
3. Keep `logoUrl` for reference

## Troubleshooting

### Problem: Script fails with "ENOENT"

**Solution:** Ensure you're running from project root:
```bash
cd /path/to/Global-Startup-Showcase
npm run download-logos
```

### Problem: Downloads fail with timeouts

**Solution:**
- Check internet connection
- URLs may be blocked or slow
- Script has 30-second timeout per file
- Failed downloads keep placeholder logo

### Problem: Wrong file extension

**Solution:** Script auto-detects from URL. If detection fails:
- Edit `getExtension()` function
- Or manually rename file after download

### Problem: Duplicate filenames

**Solution:** Script sanitizes names. If collision occurs:
- Original file is overwritten
- Consider adding ID to filename in script

## Best Practices

### For Contributors

1. **Add logoUrl:** When adding startups, include `logoUrl` field
2. **Use CDN URLs:** Direct image URLs work best
3. **Check licenses:** Ensure logo usage rights
4. **Test locally:** Run script before pushing

### For Maintainers

1. **Review downloads:** Check logos after automated runs
2. **Monitor workflow:** Check Actions tab for failures
3. **Update placeholder:** Ensure placeholder.svg exists
4. **Optimize images:** Consider image optimization script

## Future Enhancements

### Potential Improvements

- [ ] Image optimization (compress, resize)
- [ ] Convert all to WebP for consistency
- [ ] Generate multiple sizes (thumbnail, full)
- [ ] Validate image dimensions
- [ ] Logo quality check
- [ ] Parallel downloads (with rate limiting)
- [ ] Retry failed downloads with exponential backoff
- [ ] Generate visual report of downloaded logos

## Security Considerations

### Safe Practices

✅ **Good:**
- Downloads only from `logoUrl` in JSON
- Validates file extensions
- Timeout prevents hanging
- Error handling prevents crashes

⚠️ **Cautions:**
- URLs should be HTTPS when possible
- Verify logo sources are legitimate
- Script runs with repository write access

### Permissions

GitHub Actions workflow needs:
- `contents: write` - To commit downloaded files

## Performance

### Metrics

- **Average time per logo:** 1-3 seconds
- **Total time for 50 logos:** ~5 minutes
- **Network usage:** Depends on logo sizes
- **Storage:** Varies by image format and size

### Optimization

Current:
- Sequential downloads with 500ms delay
- 30-second timeout per file

Potential:
- Parallel downloads (5 at a time)
- Connection pooling
- Resume incomplete downloads

## License

Same as project license (MIT).

---

**Created:** 2025-01-09  
**Last Updated:** 2025-01-09  
**Maintainer:** Project Team
