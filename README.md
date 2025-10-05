# Nepali Startup Showcase 🇳🇵

A responsive web application showcasing innovative startups from Nepal. Browse, search, and discover Nepali startups across various industries.

## Features

- 🔍 **Search Functionality** - Search startups by name, description, or category
- 🏷️ **Category Filter** - Filter startups by industry (Fintech, E-commerce, Transportation, etc.)
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- ⚡ **Fast & Lightweight** - Static site with no build process required
- 🎨 **Clean UI** - Modern design using Tailwind CSS

## Project Structure

```
├── index.html          # Main HTML file
├── src/
│   ├── app.js         # JavaScript for search and filter
│   └── styles.css     # Custom CSS styles
├── data/
│   └── startups.json  # Startup data
└── assets/
    └── logos/         # Startup logos
```

## Live Demo

Visit the live site: [Nepali Startup Showcase](https://gurkha-technology-open-source.github.io/Nepali-Startup-Showcase/)

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/Gurkha-Technology-Open-Source/Nepali-Startup-Showcase.git
cd Nepali-Startup-Showcase
```

2. Start a local server:
```bash
# Using Python
python3 -m http.server 8000

# Or using Node.js
npx serve
```

3. Open your browser and navigate to `http://localhost:8000`

## Adding a Startup

To add your startup to the showcase:

1. Fork this repository
2. Add your startup details to `data/startups.json`:
```json
{
  "id": 13,
  "name": "Your Startup Name",
  "logo": "assets/logos/your-logo.svg",
  "description": "Brief description of your startup",
  "category": "Your Category",
  "website": "https://yourwebsite.com",
  "socials": {
    "facebook": "https://facebook.com/yourpage",
    "twitter": "https://twitter.com/yourhandle",
    "linkedin": "https://linkedin.com/company/yourcompany"
  }
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

We welcome contributions! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
