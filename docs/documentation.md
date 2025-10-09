# Documentation

This document provides a detailed overview of the Global Startup Showcase project.

## Project Overview

The Global Startup Showcase is a responsive web application that showcases innovative startups from around the world. Users can browse, search, and discover startups across various industries.

## Features

*   **Search Functionality**: Users can search for startups by name, description, founders, investors, category, country, or region. The search is case-insensitive and will match any part of the search term.
*   **Category Filter**: Users can filter startups by industry, such as Fintech, E-commerce, and Transportation. The category filter is a dropdown that is populated dynamically from the `startups.json` file.
*   **Sort by**: Users can sort startups by name (A-Z or Z-A) or by founded date (oldest or newest).
*   **Load More**: Startups are loaded in batches of 12. Users can load more startups by clicking the "Load More" button.
*   **Dark Mode**: Users can switch between light and dark mode. The user's preference is saved in local storage.
*   **Responsive Design**: The application is designed to work seamlessly on desktop, tablet, and mobile devices.
*   **Fast & Lightweight**: The project is a static site with minified CSS and JavaScript files for faster loading times.
*   **Clean UI**: The user interface is modern and clean, built with Tailwind CSS.
*   **Accessible Experience**: The application includes features to improve accessibility, such as skip links, focus outlines, ARIA attributes, and reduced motion support.

## Project Structure

The project is structured as follows:

*   `index.html`: The main HTML file. This file contains the basic structure of the page and includes the CSS and JavaScript files.
*   `src/app.js`: This file contains the JavaScript code for the application. It is responsible for loading the startup data, filtering and sorting the startups, and rendering them on the page.
*   `src/styles.css`: This file contains the custom CSS styles for the application. It is built using Tailwind CSS.
*   `dist/app.js`: The minified version of `src/app.js`.
*   `dist/styles.css`: The minified version of `src/styles.css`.
*   `data/startups.json`: A JSON file that contains the startup data. Each startup is an object with the following properties:
    *   `id`: A unique identifier for the startup.
    *   `name`: The name of the startup.
    *   `logo`: The path to the startup's logo.
    *   `description`: A brief description of the startup.
    *   `category`: The industry that the startup belongs to.
    *   `website`: The startup's website URL.
    *   `socials`: An object that contains the startup's social media links.
    *   `country`: The country where the startup is located.
    *   `region`: The region where the startup is located.
    *   `founded`: The year the startup was founded.
    *   `founders`: An array of the startup's founders.
    *   `funding`: The total funding that the startup has received.
    *   `investors`: An array of the startup's investors.
    *   `ceo`: The name of the startup's CEO.
*   `assets/logos/`: A directory that contains the startup logos.
*   `eslint.config.js`: The configuration file for ESLint, a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
*   `package.json`: This file contains the project's dependencies and scripts.
*   `tailwind.config.js`: The configuration file for Tailwind CSS.

## Getting Started

To get started with the project, follow these steps:

1.  Clone the repository:
    ```bash
    git clone https://github.com/Gurkha-Technology-Open-Source/Global-Startup-Showcase.git
    cd Global-Startup-Showcase
    ```

2.  Install the dependencies:
    ```bash
    npm install
    ```

3.  Build the minified CSS and JavaScript files:
    ```bash
    npm run build
    ```

4.  Start a local server:
    ```bash
    # Using Python
    python3 -m http.server 8000

    # Or using Node.js
    npx serve
    ```

5.  Open your browser and navigate to `http://localhost:8000`

## JavaScript

The `src/app.js` file contains the main JavaScript code for the application. Here is a brief overview of the code:

*   **`init()`**: This function is called when the DOM is ready. It loads the startup data, populates the filters, displays the startups, and sets up the event listeners.
*   **`loadStartups()`**: This function loads the startup data from the `startups.json` file.
*   **`populateFilters()`**: This function populates the category, country, and region filters with the available options.
*   **`displayStartups()`**: This function displays the startups in the grid. It also handles the pagination logic.
*   **`createStartupCard()`**: This function creates a startup card element.
*   **`filterStartups()`**: This function filters and sorts the startups based on the user's input.
*   **`resetFilters()`**: This function resets all the filters.
*   **`updateResultsCount()`**: This function updates the number of results displayed.
*   **`updateLoadedCount()`**: This function updates the number of startups loaded.
*   **`setupEventListeners()`**: This function sets up the event listeners for the search input, filters, and buttons.
*   **`handleCardKeydown()`**: This function handles the keyboard navigation for the startup cards.
*   **`updateDarkModeButton()`**: This function updates the dark mode toggle button.

## Contributing

We welcome contributions to the Global Startup Showcase project. Please see the [Contributing Guide](CONTRIBUTING.md) for more information.

## License

This project is open source and available under the MIT License.
