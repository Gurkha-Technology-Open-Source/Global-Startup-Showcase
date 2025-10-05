// Nepali Startup Showcase - Main JavaScript

let allStartups = [];
let filteredStartups = [];

// DOM Elements
const startupsGrid = document.getElementById('startupsGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const resultsCount = document.getElementById('resultsCount');
const noResults = document.getElementById('noResults');

// Initialize the application
async function init() {
    try {
        await loadStartups();
        populateCategoryFilter();
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

// Populate category filter dropdown
function populateCategoryFilter() {
    const categories = [...new Set(allStartups.map(startup => startup.category))].sort();
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
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
    
    // Create logo section
    const logoDiv = document.createElement('div');
    logoDiv.className = 'startup-logo';
    const logoImg = document.createElement('img');
    logoImg.src = startup.logo;
    logoImg.alt = `${startup.name} logo`;
    logoImg.onerror = function() {
        this.src = 'assets/logos/placeholder.svg';
    };
    logoDiv.appendChild(logoImg);
    
    // Create content section
    const contentDiv = document.createElement('div');
    contentDiv.className = 'startup-content';
    
    // Name
    const nameH3 = document.createElement('h3');
    nameH3.className = 'startup-name';
    nameH3.textContent = startup.name;
    
    // Category badge
    const categorySpan = document.createElement('span');
    categorySpan.className = 'startup-category';
    categorySpan.textContent = startup.category;
    
    // Description
    const descP = document.createElement('p');
    descP.className = 'startup-description';
    descP.textContent = startup.description;
    
    // Links section
    const linksDiv = document.createElement('div');
    linksDiv.className = 'startup-links';
    
    // Website link
    if (startup.website) {
        const websiteLink = document.createElement('a');
        websiteLink.href = startup.website;
        websiteLink.className = 'startup-website';
        websiteLink.target = '_blank';
        websiteLink.rel = 'noopener noreferrer';
        websiteLink.textContent = 'Visit Website';
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
            
            // Add platform icon (using first letter as placeholder)
            socialLink.textContent = platform.charAt(0).toUpperCase();
            
            linksDiv.appendChild(socialLink);
        });
    }
    
    // Assemble the card
    contentDiv.appendChild(nameH3);
    contentDiv.appendChild(categorySpan);
    contentDiv.appendChild(descP);
    contentDiv.appendChild(linksDiv);
    
    card.appendChild(logoDiv);
    card.appendChild(contentDiv);
    
    return card;
}

// Filter startups based on search and category
function filterStartups() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;
    
    filteredStartups = allStartups.filter(startup => {
        // Check search term
        const matchesSearch = searchTerm === '' || 
            startup.name.toLowerCase().includes(searchTerm) ||
            startup.description.toLowerCase().includes(searchTerm) ||
            startup.category.toLowerCase().includes(searchTerm);
        
        // Check category
        const matchesCategory = selectedCategory === 'all' || 
            startup.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
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
    
    // Category filter
    categoryFilter.addEventListener('change', filterStartups);
}

// Initialize the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
