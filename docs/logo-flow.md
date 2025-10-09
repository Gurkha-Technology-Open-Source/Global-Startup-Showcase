# Logo Flow: From URL to Display

This document explains how logos flow from external URLs to being displayed on startup cards.

## Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    CONTRIBUTOR ADDS STARTUP                      │
│                                                                   │
│  data/startups.json:                                             │
│  {                                                                │
│    "name": "Stripe",                                             │
│    "logo": "assets/logos/placeholder.svg",  ← Placeholder       │
│    "logoUrl": "https://stripe.com/logo.png" ← External URL      │
│  }                                                                │
└─────────────────────────┬─────────────────────────────────────────┘
                          │
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│              GITHUB ACTIONS WORKFLOW TRIGGERS                     │
│                                                                   │
│  • Scheduled: Every Sunday 2 AM UTC                              │
│  • Manual: Actions tab "Run workflow"                            │
│  • File: .github/workflows/main.yml                              │
└─────────────────────────┬─────────────────────────────────────────┘
                          │
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│              DOWNLOAD SCRIPT EXECUTES                            │
│                                                                   │
│  1. Reads data/startups.json                                     │
│  2. Finds entries with "logoUrl" field                           │
│  3. Downloads logo from URL                                      │
│     • https://stripe.com/logo.png                                │
│  4. Sanitizes filename                                           │
│     • "Stripe" → "stripe.png"                                   │
│  5. Saves to assets/logos/stripe.png                             │
│                                                                   │
│  File: download-logos.js                                         │
└─────────────────────────┬─────────────────────────────────────────┘
                          │
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│              JSON FILE UPDATED                                   │
│                                                                   │
│  data/startups.json:                                             │
│  {                                                                │
│    "name": "Stripe",                                             │
│    "logo": "assets/logos/stripe.png", ← Updated to local path   │
│    "logoUrl": "https://stripe.com/logo.png"                      │
│  }                                                                │
│                                                                   │
│  Script: startup.logo = relativePath;                            │
└─────────────────────────┬─────────────────────────────────────────┘
                          │
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│              CHANGES COMMITTED TO GIT                            │
│                                                                   │
│  Files modified:                                                  │
│  • data/startups.json (updated logo paths)                       │
│  • assets/logos/stripe.png (new logo file)                       │
│                                                                   │
│  Commit: "chore: download startup logos from URLs"               │
│  Author: github-actions[bot]                                     │
└─────────────────────────┬─────────────────────────────────────────┘
                          │
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│              SITE DEPLOYED                                       │
│                                                                   │
│  GitHub Pages deployment workflow runs                           │
│  • Builds CSS and JS                                             │
│  • Deploys to production                                         │
│  • Site live in ~2-5 minutes                                     │
└─────────────────────────┬─────────────────────────────────────────┘
                          │
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│              USER VISITS SITE                                    │
│                                                                   │
│  Browser loads:                                                   │
│  • index.html                                                     │
│  • dist/app.js (JavaScript)                                      │
│  • data/startups.json (Data)                                     │
└─────────────────────────┬─────────────────────────────────────────┘
                          │
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│              JAVASCRIPT EXECUTES                                 │
│                                                                   │
│  init() function:                                                 │
│  1. Fetches data/startups.json                                   │
│  2. Parses JSON into allStartups array                           │
│  3. Calls displayStartups()                                       │
│                                                                   │
│  File: src/app.js                                                │
└─────────────────────────┬─────────────────────────────────────────┘
                          │
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│              CARDS RENDERED                                      │
│                                                                   │
│  createStartupCard() for each startup:                           │
│                                                                   │
│  const logoImg = document.createElement('img');                  │
│  logoImg.src = startup.logo;  ← Uses local path from JSON       │
│                 "assets/logos/stripe.png"                        │
│                                                                   │
│  logoImg.onerror = function() {                                  │
│    this.src = 'assets/logos/placeholder.svg'; ← Fallback        │
│  };                                                               │
└─────────────────────────┬─────────────────────────────────────────┘
                          │
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│              LOGO DISPLAYED ON CARD                              │
│                                                                   │
│  ┌──────────────────────────────────┐                            │
│  │  ┌────────────────────────────┐  │                            │
│  │  │                            │  │                            │
│  │  │    [Stripe Logo Image]     │  │                            │
│  │  │                            │  │                            │
│  │  └────────────────────────────┘  │                            │
│  │                                  │                            │
│  │  Stripe                          │                            │
│  │  USA - North America             │                            │
│  │  Fintech                         │                            │
│  │                                  │                            │
│  │  Payment processing platform...  │                            │
│  └──────────────────────────────────┘                            │
│                                                                   │
│  src: assets/logos/stripe.png ✅                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Key Code Connections

### 1. Download Script Updates JSON

**File:** `download-logos.js`

```javascript
// Line 153
startup.logo = relativePath;  // e.g., "assets/logos/stripe.png"
```

Updates the `logo` field in the startup object, then writes the entire array back to `data/startups.json`.

### 2. JavaScript Reads JSON

**File:** `src/app.js`

```javascript
// Line ~130 - loadStartups()
const response = await fetch('data/startups.json');
allStartups = await response.json();
```

Fetches the JSON file with updated logo paths.

### 3. JavaScript Creates Card

**File:** `src/app.js`

```javascript
// Line ~231 - createStartupCard()
const logoImg = document.createElement('img');
logoImg.src = startup.logo;  // ← Uses the logo field from JSON
logoImg.alt = `${startup.name} company logo`;
logoImg.loading = 'lazy';
logoImg.onerror = function() {
    this.src = 'assets/logos/placeholder.svg';  // Fallback
};
```

Reads the `logo` field directly and creates an `<img>` element.

### 4. Browser Loads Image

**HTML Output:**
```html
<img 
  src="assets/logos/stripe.png"
  alt="Stripe company logo"
  loading="lazy"
  decoding="async"
>
```

Browser fetches the image from the local path and displays it.

## Data Flow Summary

| Step | File/System | Field | Value |
|------|------------|-------|-------|
| 1. Initial | startups.json | `logo` | `"assets/logos/placeholder.svg"` |
| 1. Initial | startups.json | `logoUrl` | `"https://stripe.com/logo.png"` |
| 2. Download | File System | - | `assets/logos/stripe.png` created |
| 3. Update | startups.json | `logo` | `"assets/logos/stripe.png"` ✅ |
| 4. Fetch | JavaScript | `allStartups[0].logo` | `"assets/logos/stripe.png"` |
| 5. Render | DOM | `img.src` | `"assets/logos/stripe.png"` |
| 6. Display | Browser | Visible | Stripe logo appears |

## Verification Steps

### After Logo Download

1. **Check JSON was updated:**
   ```bash
   # Look for updated logo path
   grep -A 2 '"name": "Stripe"' data/startups.json
   ```
   Should show: `"logo": "assets/logos/stripe.png"`

2. **Check file was downloaded:**
   ```bash
   ls -lh assets/logos/stripe.png
   ```
   File should exist and have reasonable size

3. **Check on website:**
   - Visit the deployed site
   - Find the Stripe card
   - Verify logo displays correctly
   - Check browser DevTools Network tab for 200 response

### Troubleshooting

**Logo doesn't display:**
1. Check JSON has correct path: `"logo": "assets/logos/stripe.png"`
2. Check file exists: `assets/logos/stripe.png`
3. Check browser console for 404 errors
4. Verify filename matches exactly (case-sensitive)

**Placeholder shows instead:**
1. Image failed to load (check URL in DevTools)
2. File might be corrupted
3. File extension might be wrong
4. Re-run download script

## Manual Override

If automatic download fails, you can manually link a logo:

1. **Add logo file:**
   ```bash
   cp my-logo.png assets/logos/stripe.png
   ```

2. **Update JSON:**
   ```json
   {
     "name": "Stripe",
     "logo": "assets/logos/stripe.png",
     "logoUrl": "https://stripe.com/logo.png"
   }
   ```

3. **Commit and push:**
   ```bash
   git add assets/logos/stripe.png data/startups.json
   git commit -m "feat: add Stripe logo"
   git push
   ```

Logo will display on next deployment.

## Fallback Behavior

The system has multiple fallback layers:

```javascript
// Primary: Use logo from JSON
logoImg.src = startup.logo;  // "assets/logos/stripe.png"

// Fallback 1: If image fails to load (404, corrupt, etc.)
logoImg.onerror = function() {
    this.src = 'assets/logos/placeholder.svg';
};

// Fallback 2: If download script fails
if (!startup.logo || startup.logo === startup.logoUrl) {
    startup.logo = PLACEHOLDER;  // "assets/logos/placeholder.svg"
}
```

This ensures every card always shows *something*, even if the ideal logo isn't available.

## Performance Notes

### Lazy Loading

Images use `loading="lazy"` attribute:
- Only downloads when scrolling near the image
- Saves bandwidth on initial page load
- Improves Time to Interactive (TTI)

### Local vs External

**External URLs (before):**
- ❌ Depends on external server availability
- ❌ Slower (extra DNS lookup, SSL handshake)
- ❌ Potential CORS issues
- ❌ Not cached with site assets

**Local Files (after):**
- ✅ Served from same domain (GitHub Pages)
- ✅ Faster loading
- ✅ Cached with other site assets
- ✅ Works offline with service worker (future)
- ✅ No external dependencies

---

**Documentation Version:** 1.0  
**Last Updated:** 2025-01-09  
**Related Files:**
- `download-logos.js` - Download logic
- `src/app.js` - Display logic
- `.github/workflows/main.yml` - Automation
