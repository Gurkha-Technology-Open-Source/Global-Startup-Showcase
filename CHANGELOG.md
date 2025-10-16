# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

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

- Updated `README.md` with a link to the contributing guide, a contributors section, a Hacktoberfest banner, and a link to the documentation.
- Updated `README.md` with Chart.js integration documentation and updated features list
- Enhanced `index.html` with Chart.js CDN link and statistics dashboard section
- Enhanced `src/app.js` with chart initialization and theme update functions
