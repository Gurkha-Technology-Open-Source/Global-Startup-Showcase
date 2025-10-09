# Documentation

This document provides a comprehensive technical overview of the Global Startup Showcase project.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [JavaScript Architecture](#javascript-architecture)
- [Styling and Theming](#styling-and-theming)
- [Build Process](#build-process)
- [Deployment](#deployment)
- [Accessibility](#accessibility)
- [Performance Optimizations](#performance-optimizations)
- [Contributing](#contributing)

## Project Overview

The Global Startup Showcase is a responsive, static web application that showcases innovative startups from around the world. Built with vanilla JavaScript and Tailwind CSS, it provides a fast, accessible, and user-friendly platform for discovering startups across various industries, countries, and regions.

## Features

### Core Features

*   **Advanced Search**: Real-time search with 300ms debouncing across multiple fields:
    - Startup name
    - Description
    - Founders
    - Investors
    - Category
    - Country
    - Region
    
*   **Multi-Filter System**: 
    - Category filter (dynamically populated from data)
    - Country filter (dynamically populated)
    - Region filter (dynamically populated)
    - Sort options (name A-Z/Z-A, founded date oldest/newest)
    - Active filter indicators with counts
    
*   **Pagination**: 
    - Load 12 startups at a time
    - "Load More" button for progressive loading
    - Shows loaded count vs total
    
*   **Dark Mode**: 
    - Toggle between light and dark themes
    - Respects system preferences
    - Persists choice in localStorage
    - Smooth transitions with Tailwind CSS
    
*   **Responsive Design**: 
    - Mobile-first approach
    - Grid adapts: 1 column (mobile) → 2 (tablet) → 3 (desktop) → 4 (large screens)
    
*   **Accessibility**: 
    - Skip navigation links
    - ARIA labels and live regions
    - Keyboard navigation support
    - Focus management
    - Screen reader announcements
    - Reduced motion support for users with vestibular disorders
    
*   **Progressive Web App**:
    - Web App Manifest for installability
    - Theme colors for mobile browsers
    - Optimized for offline-first architectures (future enhancement)

### User Experience

*   **Loading States**: Preloader animation during data fetch
*   **Error Handling**: Graceful error messages with user guidance
*   **No Results State**: Clear messaging when filters return no results
*   **Scroll to Top**: Floating button appears after scrolling 300px
*   **AOS Animations**: Smooth scroll-based animations for visual appeal

## Architecture

The application follows a simple, performant architecture:

```
┌─────────────────────────────────────────────────┐
│              index.html (Entry Point)            │
│  • Semantic HTML5                                │
│  • Meta tags for SEO & social sharing            │
│  • Preload hints for critical resources         │
└───────────────┬─────────────────────────────────┘
                │
        ┌───────┴────────┐
        ▼                ▼
┌──────────────┐  ┌──────────────┐
│  dist/       │  │  data/       │
│  styles.css  │  │  startups.   │
│  (compiled)  │  │  json        │
└──────────────┘  └──────┬───────┘
        ▼                ▼
┌──────────────┐  ┌──────────────┐
│  dist/       │  │  JavaScript  │
│  app.js      │  │  Runtime     │
│  (minified)  │  │              │
└──────────────┘  └──────────────┘
        │                │
        └────────┬───────┘
                 ▼
        ┌────────────────┐
        │  DOM Updates   │
        │  • Rendering   │
        │  • Events      │
        │  • Animations  │
        └────────────────┘
```

### Data Flow

1. **Initial Load**: 
   - `init()` function called on DOMContentLoaded
   - Fetches `startups.json`
   - Populates filter dropdowns
   - Renders first page of startups

2. **User Interaction**:
   - Event listeners capture user input
   - Debounced search (300ms)
   - Filter/sort operations on in-memory array
   - Re-render only affected DOM elements

3. **State Management**:
   - `allStartups`: Original dataset (immutable after load)
   - `filteredStartups`: Current filtered/sorted view
   - `currentPage`: Pagination state
   - localStorage: Dark mode preference

## Project Structure

```
Global-Startup-Showcase/
│
├── .github/
│   └── workflows/
│       ├── pages.yml              # Deploy workflow (builds & deploys)
│       └── main.yml               # Logo download automation
│
├── src/                           # Source files (editable)
│   ├── app.js                     # Main JavaScript logic
│   ├── styles.css                 # Custom styles + Tailwind imports
│   └── theme.css                  # Tailwind v4 theme config
│
├── dist/                          # Built files (auto-generated)
│   ├── app.js                     # Minified JavaScript
│   └── styles.css                 # Compiled Tailwind + custom CSS
│
├── data/
│   └── startups.json              # Startup data (structured)
│
├── assets/
│   ├── logos/                     # Startup logos (SVG/PNG)
│   └── socials/                   # Social media icons
│
├── docs/
│   └── documentation.md           # This file
│
├── index.html                     # Main entry point
├── 404.html                       # Custom error page
├── manifest.json                  # PWA manifest
├── robots.txt                     # SEO: crawler instructions
├── sitemap.xml                    # SEO: site structure
│
├── package.json                   # Dependencies & scripts
├── eslint.config.js               # Code quality rules
├── tailwind.config.js             # Tailwind configuration (legacy)
│
├── README.md                      # Project overview
├── CONTRIBUTING.md                # Contribution guide
├── CODE_OF_CONDUCT.md             # Community guidelines
└── CHANGELOG.md                   # Version history
```

### Key Files Explained

**Source Files (`src/`)**
- `app.js`: Contains all application logic (see [JavaScript Architecture](#javascript-architecture))
- `styles.css`: Custom CSS with Tailwind directives and component styles
- `theme.css`: Tailwind v4 theme configuration

**Data (`data/`)**
- `startups.json`: Array of startup objects with properties like name, category, funding, etc.

**Build Output (`dist/`)**
- Generated by `npm run build` or GitHub Actions
- Not committed to version control
- Optimized for production

## Technologies

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| HTML5 | - | Semantic markup structure |
| CSS3 | - | Styling foundation |
| JavaScript | ES6+ | Application logic |
| Tailwind CSS | v4.1.14 | Utility-first styling framework |
| Terser | v5.44.0 | JavaScript minification |
| ESLint | Latest | Code quality & linting |

### Build & Deployment

| Tool | Purpose |
|------|---------|
| npm | Package management |
| Tailwind CLI | CSS compilation |
| GitHub Actions | CI/CD pipeline |
| GitHub Pages | Static site hosting |

### External Libraries

| Library | Purpose |
|---------|---------|
| Font Awesome | Social media icons |
| AOS (Animate On Scroll) | Scroll animations |
| Google Fonts (Inter) | Typography |

## Getting Started

### Prerequisites

- **Node.js**: v20 or higher ([Download](https://nodejs.org/))
- **npm**: v10 or higher (comes with Node.js)
- **Git**: For version control
- **Web Server**: Python 3, Node.js serve, or similar

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Gurkha-Technology-Open-Source/Global-Startup-Showcase.git
   cd Global-Startup-Showcase
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   This installs:
   - Tailwind CSS v4
   - Terser for JS minification
   - ESLint for code quality

3. **Build the project:**
   ```bash
   npm run build
   ```
   Or build individually:
   ```bash
   npm run build:css    # Compile Tailwind CSS
   npm run build:js     # Minify JavaScript
   npm run lint         # Check code quality
   ```

4. **Start development server:**
   ```bash
   # Python 3
   python3 -m http.server 8000
   
   # Node.js
   npx serve
   
   # PHP
   php -S localhost:8000
   ```

5. **Open in browser:**
   Navigate to `http://localhost:8000`

### Development Workflow

**For Local Development:**
1. Edit source files in `src/` or modify `index.html`
2. Run `npm run build` to regenerate `dist/` files
3. Refresh browser to see changes
4. Commit only source files (not `dist/`)

**For Production (GitHub Pages):**
1. Push changes to `main` branch
2. GitHub Actions automatically:
   - Runs `npm install`
   - Executes `npm run build`
   - Deploys to GitHub Pages
3. Changes live in ~2-5 minutes

## JavaScript Architecture

The application is built with vanilla JavaScript using modern ES6+ features. No frameworks or heavy libraries are used, keeping the bundle size minimal.

### Main Functions

#### Initialization

```javascript
async function init()
```
**Purpose**: Application entry point
**Flow**:
1. Shows preloader
2. Fetches startup data from JSON
3. Populates filter dropdowns
4. Renders initial page of startups
5. Sets up event listeners
6. Hides preloader

**Error Handling**: Catches fetch errors and displays user-friendly message

#### Data Loading

```javascript
async function loadStartups()
```
**Purpose**: Fetches startup data from `data/startups.json`
**Returns**: Populates `allStartups` and `filteredStartups` arrays
**Error Handling**: Throws error if fetch fails

#### Filter Population

```javascript
function populateFilters()
```
**Purpose**: Dynamically generates filter options
**Process**:
1. Extracts unique categories, countries, regions from data
2. Sorts alphabetically
3. Creates `<option>` elements for each dropdown

#### Display & Rendering

```javascript
function displayStartups(startups)
```
**Purpose**: Renders startup cards in grid
**Behavior**:
- Clears existing grid
- Resets pagination to page 1
- Handles empty results state
- Calls `loadMoreStartups()` for initial batch

```javascript
function createStartupCard(startup)
```
**Purpose**: Creates DOM element for a single startup
**Structure**:
- Card wrapper with ARIA attributes
- Logo section with lazy loading
- Content section (name, location, category, description)
- Metadata (founded, founders, funding, investors)
- Social links with proper ARIA labels

**Optimization**:
- Lazy loading images (`loading="lazy"`)
- Async decoding (`decoding="async"`)
- Fallback to placeholder on error

#### Filtering & Sorting

```javascript
function filterStartups()
```
**Purpose**: Main filter/search/sort logic
**Process**:
1. Gets user input from all filters
2. Filters `allStartups` array based on:
   - Search term (checks name, description, founders, investors, etc.)
   - Selected category
   - Selected country
   - Selected region
3. Sorts filtered results by selected criteria
4. Re-renders startup grid

**Search**: Case-insensitive partial matching across multiple fields
**Debouncing**: Search input uses 300ms debounce to reduce re-renders

```javascript
function loadMoreStartups(startups)
```
**Purpose**: Pagination logic
**Behavior**:
- Calculates start/end indices based on `currentPage`
- Renders next batch of 12 startups
- Increments page counter
- Shows/hides "Load More" button based on remaining items

#### Dark Mode

```javascript
function updateDarkModeButton()
```
**Purpose**: Updates dark mode toggle UI
**Features**:
- Checks system preference on initial load
- Reads/writes to localStorage
- Toggles `.dark` class on `<html>` element
- Updates button icon (moon ↔ sun)
- Announces state to screen readers

#### Accessibility

```javascript
function announceToScreenReader(message)
```
**Purpose**: Programmatically announce changes to screen reader users
**How**: Creates temporary live region, removes after 1 second

```javascript
function handleCardKeydown(event)
```
**Purpose**: Keyboard navigation between startup cards
**Keys**:
- Arrow Left/Right: Navigate between cards
- Home: Jump to first card
- End: Jump to last card

#### Event Listeners

```javascript
function setupEventListeners()
```
**Purpose**: Attaches all interactive behaviors
**Events**:
- Search input: 300ms debounced filter
- Filter dropdowns: Immediate filter on change
- Reset button: Clears all filters
- Load More button: Pagination
- Scroll: Shows/hides "Scroll to Top" button
- Dark mode toggle: Theme switching

### State Management

**Global State Variables:**
```javascript
let allStartups = [];          // Original dataset
let filteredStartups = [];     // Current filtered view
let currentPage = 1;           // Pagination state
const startupsPerPage = 12;    // Items per page
```

**LocalStorage:**
- `darkMode`: 'enabled' | 'disabled'

### Performance Optimizations

1. **Debouncing**: Search input debounced to 300ms
2. **Lazy Loading**: Images load only when visible
3. **Batch Rendering**: Load 12 items at a time
4. **Event Delegation**: Could be improved (current uses individual listeners)
5. **In-Memory Filtering**: No DOM queries during filter operations

## Styling and Theming

### Tailwind CSS v4

The project uses Tailwind CSS v4 with custom configuration:

**Import Structure (`src/styles.css`):**
```css
@import "tailwindcss";

@variant dark (.dark &);

@layer base {
  /* Custom base styles */
}

/* Custom component styles */
.startup-card { ... }
.social-link { ... }
```

**Dark Mode Implementation:**
- Uses class-based dark mode (`.dark` class on `<html>`)
- Custom `@variant dark (.dark &);` directive
- All utility classes automatically get dark: variants

**Custom Components:**
- `.startup-card`: Card styling with hover effects
- `.startup-logo`: Logo container
- `.social-link`: Social media icon buttons
- `.skeleton`: Loading skeleton animation (ready for use)

### Responsive Design

**Breakpoints:**
```
sm:  640px  (tablet portrait)
md:  768px  (tablet landscape)
lg:  1024px (desktop)
xl:  1280px (large desktop)
```

**Grid Layout:**
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
```
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns
- Large: 4 columns

### Animations

**AOS (Animate On Scroll):**
- Fade-up animations on sections
- Delays for staggered effects

**CSS Transitions:**
- Dark mode: Color transitions
- Cards: Transform and shadow on hover
- Buttons: Background color changes

**Reduced Motion:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Build Process

### Local Build

**Scripts in `package.json`:**
```json
{
  "scripts": {
    "build": "npm run build:css && npm run build:js",
    "build:css": "npx tailwindcss -i ./src/styles.css -o ./dist/styles.css --minify",
    "build:js": "npx terser src/app.js -o dist/app.js -c -m",
    "lint": "npx eslint src/app.js --fix"
  }
}
```

**Build Process:**
1. **CSS Compilation**:
   - Reads `src/styles.css`
   - Processes Tailwind directives
   - Scans HTML for used classes
   - Generates optimized CSS
   - Minifies output to `dist/styles.css`

2. **JS Minification**:
   - Reads `src/app.js`
   - Removes whitespace and comments
   - Mangles variable names (shorter names)
   - Compresses code
   - Outputs to `dist/app.js`

### GitHub Actions

**Workflow: `.github/workflows/pages.yml`**
```yaml
on:
  push:
    branches: [ main ]

jobs:
  build:
    - Checkout code
    - Setup Node.js v20
    - npm install
    - npm run build
    - Upload artifact to GitHub Pages
  
  deploy:
    - Deploy artifact to Pages
```

**Process:**
1. Triggered on push to `main` branch
2. Installs dependencies
3. Runs build commands
4. Uploads entire project (including built files)
5. Deploys to GitHub Pages
6. ~2-5 minute total deploy time

## Deployment

### GitHub Pages Configuration

**Settings → Pages:**
- Source: GitHub Actions
- Branch: Not used (Actions deploys)
- Custom domain: Optional

**URL Format:**
```
https://[username].github.io/[repository-name]/
```

**Deployment Process:**
1. Push to `main` branch
2. Actions workflow triggers automatically
3. Builds project in CI environment
4. Deploys to `gh-pages` branch (or direct)
5. Site updates within minutes

### Environment Variables

None required. All configuration is in source files.

### Custom Domain (Optional)

1. Add CNAME file to repository root
2. Configure DNS records with your provider
3. Enable HTTPS in Pages settings

## Accessibility

### WCAG 2.1 Compliance

The application follows WCAG 2.1 Level AA guidelines:

**Perceivable:**
- Alt text for all images
- Color contrast ratios meet AA standards
- Text can be resized up to 200%

**Operable:**
- All functionality available via keyboard
- Skip navigation links
- No keyboard traps
- Enough time to read content

**Understandable:**
- Clear labels for all controls
- Consistent navigation
- Error messages are clear
- Help text where needed

**Robust:**
- Valid HTML5 markup
- ARIA attributes where appropriate
- Works with assistive technologies

### Specific Features

**Skip Links:**
```html
<a href="#main-content" class="skip-link">Skip to main content</a>
<a href="#search-filters" class="skip-link">Skip to filters</a>
```

**ARIA Attributes:**
- `role="article"` on cards
- `aria-labelledby` for card names
- `aria-describedby` for descriptions
- `aria-live="polite"` for dynamic updates
- `aria-pressed` for toggle buttons

**Keyboard Navigation:**
- Tab through all interactive elements
- Arrow keys to navigate between cards
- Home/End to jump to first/last card
- Enter to activate buttons

**Screen Reader Support:**
- Semantic HTML (`<main>`, `<section>`, `<article>`)
- Descriptive labels
- Live region announcements
- Hidden text for context (`.sr-only`)

## Performance Optimizations

### Current Optimizations

1. **Resource Loading:**
   - Preload critical CSS/JS/data
   - Lazy load images
   - Async image decoding
   - Font preconnect

2. **Code Splitting:**
   - Separate CSS and JS builds
   - Minified production bundles
   - Tree-shaking via Tailwind purge

3. **Rendering:**
   - Batch DOM updates
   - Pagination (12 items at a time)
   - Debounced search (300ms)

4. **Caching:**
   - Browser caches static assets
   - LocalStorage for preferences

### Metrics

**Bundle Sizes (approximate):**
- HTML: ~10KB (uncompressed)
- CSS: ~15KB (minified, includes Tailwind utilities)
- JS: ~8KB (minified)
- Total initial load: ~33KB (excluding images)

**Lighthouse Scores (target):**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

## Contributing

We welcome contributions to the Global Startup Showcase project. Please see the [Contributing Guide](CONTRIBUTING.md) for more information.

## License

This project is open source and available under the MIT License.
