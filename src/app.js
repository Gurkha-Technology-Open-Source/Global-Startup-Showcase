// Global Startup Showcase - Main JavaScript

let allStartups = [];
let filteredStartups = [];

// DOM Elements
const startupsGrid = document.getElementById('startupsGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const countryFilter = document.getElementById('countryFilter');
const regionFilter = document.getElementById('regionFilter');
const resultsCount = document.getElementById('resultsCount');
const noResults = document.getElementById('noResults');

// Initialize the application
async function init() {
    try {
        await loadStartups();
        populateFilters();
        displayStartups(allStartups);
        setupEventListeners();
    } catch (error) {
        console.error('Error initializing app:', error);
        resultsCount.textContent = 'Error loading startups. Please refresh the page.';
        resultsCount.classList.add('text-red-600');
    }
}

// Load startups from JSON file
async function loadStartups() {
    try {
        const response = await fetch('data/startups.json');
        if (!response.ok) {
            throw new Error('Failed to fetch startups data');
        }
        allStartups = await response.json();
        filteredStartups = [...allStartups];
    } catch (error) {
        console.error('Error loading startups:', error);
        throw error;
    }
}

// Populate filter dropdowns
function populateFilters() {
    const categories = [...new Set(allStartups.map(startup => startup.category))].sort();
    const countries = [...new Set(allStartups.map(startup => startup.country))].sort();
    const regions = [...new Set(allStartups.map(startup => startup.region))].sort();

    populateDropdown(categoryFilter, categories);
    populateDropdown(countryFilter, countries);
    populateDropdown(regionFilter, regions);
}

function populateDropdown(selectElement, items) {
    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        selectElement.appendChild(option);
    });
}

// Display startups in the grid
function displayStartups(startups) {
    startupsGrid.innerHTML = '';
    
    if (startups.length === 0) {
        noResults.classList.remove('hidden');
        startupsGrid.classList.add('hidden');
        resultsCount.textContent = 'No results found';
        return;
    }
    
    noResults.classList.add('hidden');
    startupsGrid.classList.remove('hidden');
    
    startups.forEach(startup => {
        const card = createStartupCard(startup);
        startupsGrid.appendChild(card);
    });
    
    updateResultsCount(startups.length);
}

// Create a startup card element
function createStartupCard(startup) {
    const card = document.createElement('div');
    card.className = 'startup-card';
    card.id = `startup-${startup.id}`;
    
    // Create logo section
    const logoDiv = document.createElement('div');
    logoDiv.className = 'startup-logo';
    const logoImg = document.createElement('img');
    logoImg.src = startup.logo;
    logoImg.alt = `${startup.name} - ${startup.description}`;
    logoImg.onerror = function() {
        this.src = 'assets/logos/placeholder.svg';
        this.alt = 'Placeholder logo';
    };
    logoDiv.appendChild(logoImg);
    
    // Create content section
    const contentDiv = document.createElement('div');
    contentDiv.className = 'startup-content';
    
    // Name
    const nameH3 = document.createElement('h3');
    nameH3.className = 'startup-name';
    nameH3.textContent = startup.name;

    // Location
    const locationDiv = document.createElement('div');
    locationDiv.className = 'startup-location';
    locationDiv.textContent = `${startup.country} - ${startup.region}`;
    
    // Category badge
    const categorySpan = document.createElement('span');
    categorySpan.className = 'startup-category';
    categorySpan.textContent = startup.category;
    
    // Description
    const descP = document.createElement('p');
    descP.className = 'startup-description';
    descP.textContent = startup.description;

    // Founded
    if (startup.founded) {
        const foundedDiv = document.createElement('div');
        foundedDiv.className = 'startup-info';
        foundedDiv.innerHTML = `<strong>Founded:</strong> ${startup.founded}`;
        contentDiv.appendChild(foundedDiv);
    }

    // Founders
    if (startup.founders && startup.founders.length > 0) {
        const foundersDiv = document.createElement('div');
        foundersDiv.className = 'startup-info';
        foundersDiv.innerHTML = `<strong>Founders:</strong> ${startup.founders.join(', ')}`;
        contentDiv.appendChild(foundersDiv);
    }

    // Funding
    if (startup.funding) {
        const fundingDiv = document.createElement('div');
        fundingDiv.className = 'startup-info';
        fundingDiv.innerHTML = `<strong>Funding:</strong> ${startup.funding}`;
        contentDiv.appendChild(fundingDiv);
    }

    // Investors
    if (startup.investors && startup.investors.length > 0) {
        const investorsDiv = document.createElement('div');
        investorsDiv.className = 'startup-info';
        investorsDiv.innerHTML = `<strong>Investors:</strong> ${startup.investors.join(', ')}`;
        contentDiv.appendChild(investorsDiv);
    }
    
    // Links section
    const linksDiv = document.createElement('div');
    linksDiv.className = 'startup-links';

    // Website link
    if (startup.website) {
        const websiteLink = document.createElement('a');
        websiteLink.href = startup.website;
        websiteLink.className = 'social-link';
        websiteLink.target = '_blank';
        websiteLink.rel = 'noopener noreferrer';
        websiteLink.title = 'Website';

        const websiteIcon = document.createElement('img');
        websiteIcon.src = 'assets/socials/website.svg';
        websiteIcon.alt = 'Website';
        websiteIcon.className = 'social-icon';
        websiteLink.appendChild(websiteIcon);

        linksDiv.appendChild(websiteLink);
    }

    // Social links
    if (startup.socials) {
        Object.entries(startup.socials).forEach(([platform, url]) => {
            const socialLink = document.createElement('a');
            socialLink.href = url;
            socialLink.className = 'social-link';
            socialLink.target = '_blank';
            socialLink.rel = 'noopener noreferrer';
            socialLink.title = platform;

            const socialIcon = document.createElement('img');
            socialIcon.src = `assets/socials/${platform}.svg`;
            socialIcon.alt = platform;
            socialIcon.className = 'social-icon';
            socialLink.appendChild(socialIcon);

            linksDiv.appendChild(socialLink);
        });
    }
    
    // Assemble the card
    contentDiv.appendChild(linksDiv);
    
    card.appendChild(logoDiv);
    card.appendChild(contentDiv);
    
    return card;
}

// Filter startups based on search and category
function filterStartups() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;
    const selectedCountry = countryFilter.value;
    const selectedRegion = regionFilter.value;
    
    filteredStartups = allStartups.filter(startup => {
        // Check search term
        const matchesSearch = searchTerm === '' || 
            startup.name.toLowerCase().includes(searchTerm) ||
            startup.description.toLowerCase().includes(searchTerm) ||
            startup.category.toLowerCase().includes(searchTerm);
        
        // Check category
        const matchesCategory = selectedCategory === 'all' || 
            startup.category === selectedCategory;

        // Check country
        const matchesCountry = selectedCountry === 'all' ||
            startup.country === selectedCountry;

        // Check region
        const matchesRegion = selectedRegion === 'all' ||
            startup.region === selectedRegion;
        
        return matchesSearch && matchesCategory && matchesCountry && matchesRegion;
    });
    
    displayStartups(filteredStartups);
}

// Update results count
function updateResultsCount(count) {
    const total = allStartups.length;
    if (count === total) {
        resultsCount.textContent = `Showing all ${total} startup${total !== 1 ? 's' : ''}`;
    } else {
        resultsCount.textContent = `Showing ${count} of ${total} startup${total !== 1 ? 's' : ''}`;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Search input with debounce
    let searchTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(filterStartups, 300);
    });
    
    // Filters
    categoryFilter.addEventListener('change', filterStartups);
    countryFilter.addEventListener('change', filterStartups);
    regionFilter.addEventListener('change', filterStartups);
}

// Initialize the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}