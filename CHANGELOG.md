# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Fuse.js Integration** - Added intelligent fuzzy search using Fuse.js v7.0.0 (open source search library)
  - Fuzzy matching with typo tolerance
  - Multi-field search across name, description, category, location, founders, and investors
  - Weighted search results for better relevance
  - Fast client-side search with no backend required
  - Configurable threshold and scoring
- **AOS Documentation** - Documented the AOS (Animate On Scroll) library integration
  - Scroll-triggered animations
  - Performance-optimized CSS animations
  - Accessibility support with reduced motion preferences
- **Chart.js Integration** - Added data visualization using Chart.js v4.4.1 (open source charting library)
  - Bar chart showing startups by category
  - Doughnut chart showing startups by country (top 10)
  - Pie chart showing startups by region
  - Line chart showing founding year trends
  - Collapsible statistics dashboard with show/hide toggle
  - Dark mode support for all charts
  - Responsive design for all chart types
  - Accessibility features with ARIA labels
- `CONTRIBUTING.md` file to guide new contributors.
- `CODE_OF_CONDUCT.md` file to ensure a welcoming community.
- `docs` folder with `documentation.md` file.
- `CHANGELOG.md` file to track changes in the project.

### Changed

- Updated search functionality to use Fuse.js for intelligent fuzzy matching instead of simple string matching
- Enhanced `README.md` with comprehensive documentation for all open source libraries:
  - Fuse.js fuzzy search integration
  - Chart.js data visualization features
  - AOS scroll animation features
- Updated `README.md` with a link to the contributing guide, a contributors section, a Hacktoberfest banner, and a link to the documentation.
- Updated feature list in `README.md` to highlight enhanced search capabilities
- Enhanced `index.html` with Fuse.js CDN link
- Enhanced `src/app.js` with Fuse.js initialization and fuzzy search implementation
