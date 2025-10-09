# Global Startup Showcase 🌍

[![Hacktoberfest 2025](https://img.shields.io/badge/Hacktoberfest-2025-blue.svg)](https://hacktoberfest.digitalocean.com/)

A responsive web application showcasing innovative startups from around the world. Browse, search, and discover startups across various industries.

## Features

- 🔍 **Search Functionality** - Search startups by name, description, founders, investors, category, country, or region
- 🏷️ **Category Filter** - Filter startups by industry (Fintech, E-commerce, Transportation, etc.)
-  сорти **Sort by** - Sort startups by name or founded date
- ➕ **Load More** - Load more startups with the click of a button
- 🌙 **Dark Mode** - Switch between light and dark mode
- 🔁 **Quick Filter Reset** - See active filters at a glance and reset them with one click
- ♿ **Accessible Experience** - Skip links, focus outlines, ARIA live regions, reduced motion support, and keyboard navigation
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- ⚡ **Fast & Lightweight** - Minified CSS and JavaScript files for faster loading times
- 🎨 **Clean UI** - Modern design using Tailwind CSS

## Project Structure

```
├── index.html              # Main HTML file
├── src/
│   ├── app.js             # JavaScript for search and filter
│   └── styles.css         # Custom CSS styles
├── dist/
│   ├── app.js             # Minified JavaScript
│   └── styles.css         # Minified CSS
├── data/
│   └── startups.json      # Startup data
├── assets/
│   └── logos/             # Startup logos
├── eslint.config.js        # ESLint configuration
├── jest.config.cjs         # Jest configuration
├── package.json            # Project dependencies and scripts
└── tailwind.config.js      # Tailwind CSS configuration
```

## Live Demo

Visit the live site: [Global Startup Showcase](https://gurkha-technology-open-source.github.io/Global-Startup-Showcase/)

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/Gurkha-Technology-Open-Source/Global-Startup-Showcase.git
cd Global-Startup-Showcase
```

2. Install the dependencies:
```bash
npm install
```

3. Build the minified CSS and JavaScript files:
```bash
npm run build
```

4. Start a local server:
```bash
# Using Python
python3 -m http.server 8000

# Or using Node.js
npx serve
```

5. Open your browser and navigate to `http://localhost:8000`

**Note:** When deploying to GitHub Pages, the build process runs automatically via GitHub Actions. You don't need to commit the `dist/` folder - it's built on every push.

## Adding a Startup

To add your startup to the showcase:

1. Fork this repository
2. Add your startup details to `data/startups.json`:
```json
{
  "id": 101,
  "name": "Your Startup Name",
  "logo": "assets/logos/your-logo.svg",
  "description": "Brief description of your startup",
  "category": "Your Category",
  "website": "https://yourwebsite.com",
  "socials": {
    "facebook": "https://facebook.com/yourpage",
    "twitter": "https://twitter.com/yourhandle",
    "linkedin": "https://linkedin.com/company/yourcompany"
  },
  "country": "Your Country",
  "region": "Your Region",
  "founded": 2024,
  "founders": [
    "Founder 1",
    "Founder 2"
  ],
  "funding": "$1M",
  "investors": [
    "Investor 1",
    "Investor 2"
  ],
  "ceo": "CEO Name"
}
```
3. Add your logo (SVG or PNG) to `assets/logos/`
4. Create a pull request

## Categories

- Fintech
- E-commerce
- Transportation
- Food & Beverage
- Technology

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for more information.

## Documentation

For more detailed information about the project, please see our [documentation](docs/documentation.md).

## Changelog

For a list of all the recent changes, please see our [changelog](CHANGELOG.md).

## Our Contributors

This project exists thanks to all the people who contribute. 

<a href="https://github.com/Gurkha-Technology-Open-Source/Global-Startup-Showcase/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Gurkha-Technology-Open-Source/Global-Startup-Showcase" />
</a>

Made with [contrib.rocks](https://contrib.rocks).

## License

This project is open source and available under the MIT License.
