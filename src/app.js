// Global Startup Showcase - Main JavaScript

let allStartups = [];
let filteredStartups = [];
let currentPage = 1;
const startupsPerPage = 12;

// Performance optimization: Use requestAnimationFrame for smooth rendering

// DOM Elements
const startupsGrid = document.getElementById('startupsGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const countryFilter = document.getElementById('countryFilter');
const regionFilter = document.getElementById('regionFilter');
const sortFilter = document.getElementById('sortFilter');
const resultsCount = document.getElementById('resultsCount');
const noResults = document.getElementById('noResults');
const resetFiltersBtn = document.getElementById('resetFilters');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const loadMoreContainer = document.getElementById('loadMoreContainer');
const loadedCount = document.getElementById('loadedCount');

const darkModeToggle = document.getElementById('darkModeToggle');

// Check for saved dark mode preference or system preference
const savedTheme = localStorage.getItem('darkMode');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'enabled' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.classList.add('dark');
    updateDarkModeButton();
}

// Toggle dark mode on button click
darkModeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    updateDarkModeButton();

    // Save preference to localStorage
    if (document.documentElement.classList.contains('dark')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }

    announceToScreenReader(`Dark mode ${document.documentElement.classList.contains('dark') ? 'enabled' : 'disabled'}`);
});

// Update dark mode button appearance
function updateDarkModeButton() {
    const isDark = document.documentElement.classList.contains('dark');
    const icon = darkModeToggle.querySelector('i');

    if (isDark) {
        darkModeToggle.setAttribute('aria-pressed', 'true');
        if (icon) {
            icon.className = 'fas fa-sun mr-2';
        }
    } else {
        darkModeToggle.setAttribute('aria-pressed', 'false');
        if (icon) {
            icon.className = 'fas fa-moon mr-2';
        }
    }
}


// Initialize the application
async function init() {
    try {
        showPreloader();
        await loadStartups();
        populateFilters();
        displayStartups(allStartups);
        setupEventListeners();
        hidePreloader();
        announceToScreenReader('Startup showcase loaded successfully');
    } catch (error) {
        console.error('Error initializing app:', error);
        hidePreloader();
        showError('Failed to load startups. Please check your internet connection and try refreshing the page.');
        announceToScreenReader('Error loading startups. Please try refreshing the page.');
    }
}

// Show preloader
function showPreloader() {
    const preloader = document.getElementById('preloader');
    preloader.classList.remove('hidden');
    preloader.setAttribute('aria-hidden', 'false');
}

// Hide preloader
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('hidden');
    preloader.setAttribute('aria-hidden', 'true');
}

// Show error message
function showError(message) {
    resultsCount.textContent = message;
    resultsCount.classList.add('text-red-600', 'font-semibold');
    resultsCount.setAttribute('role', 'alert');
}

// Announce to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove after announcement
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
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
    currentPage = 1;

    if (startups.length === 0) {
        noResults.classList.remove('hidden');
        startupsGrid.classList.add('hidden');
        loadMoreContainer.classList.add('hidden');
        resultsCount.textContent = 'No startups found matching your criteria.';
        resultsCount.classList.remove('text-red-600', 'font-semibold');
        resultsCount.removeAttribute('role');
        announceToScreenReader('No startups found matching your search criteria');
        return;
    }

    noResults.classList.add('hidden');
    startupsGrid.classList.remove('hidden');
    resultsCount.classList.remove('text-red-600', 'font-semibold');
    resultsCount.removeAttribute('role');

    loadMoreStartups(startups);
}

// Add consolidated structured data to page head
function addConsolidatedStructuredData(startups) {
    // Remove any existing structured data script
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
        existingScript.remove();
    }
    
    // Create consolidated structured data with ItemList
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        'itemListElement': startups.map((startup, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'item': {
                '@type': 'Organization',
                'name': startup.name,
                'description': startup.description,
                'url': startup.website,
                'logo': startup.logo
            }
        }))
    };
    
    // Add script to document head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
}

// Create a startup card element
function createStartupCard(startup) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out dark:bg-gray-800';
    card.setAttribute('role', 'article');
    card.setAttribute('aria-labelledby', `startup-name-${startup.id}`);
    card.setAttribute('tabindex', '0');
    card.dataset.category = startup.category;
    card.dataset.country = startup.country;
    card.dataset.region = startup.region;

    // Create logo section
    const logoDiv = document.createElement('div');
    logoDiv.className = 'startup-logo dark:bg-gray-700';
    const logoImg = document.createElement('img');
    logoImg.src = startup.logo;
    logoImg.alt = `${startup.name} company logo`;
    logoImg.loading = 'lazy';
    logoImg.decoding = 'async';
    logoImg.referrerPolicy = 'no-referrer';
    logoImg.sizes = '(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw';
    logoImg.onerror = function() {
        this.src = 'assets/logos/placeholder.svg';
        this.alt = 'Company logo placeholder';
    };
    logoDiv.appendChild(logoImg);

    // Create content section
    const contentDiv = document.createElement('div');
    contentDiv.className = 'startup-content';

    // Name
    const nameH3 = document.createElement('h3');
    nameH3.className = 'startup-name dark:text-white';
    nameH3.id = `startup-name-${startup.id}`;
    nameH3.textContent = startup.name;

    // Location
    const locationDiv = document.createElement('div');
    locationDiv.className = 'startup-location dark:text-gray-400';
    locationDiv.textContent = `${startup.country} - ${startup.region}`;

    // Category badge
    const categorySpan = document.createElement('span');
    categorySpan.className = 'startup-category dark:bg-blue-900 dark:text-blue-200';
    categorySpan.textContent = startup.category;
    categorySpan.setAttribute('aria-label', `Category: ${startup.category}`);

    // Description
    const descP = document.createElement('p');
    const descriptionId = `startup-description-${startup.id}`;
    descP.className = 'startup-description dark:text-gray-300';
    descP.id = descriptionId;
    descP.textContent = startup.description;

    contentDiv.appendChild(nameH3);
    contentDiv.appendChild(locationDiv);
    contentDiv.appendChild(categorySpan);
    contentDiv.appendChild(descP);
    card.setAttribute('aria-describedby', descriptionId);

    // Founded
    if (startup.founded) {
        const foundedDiv = document.createElement('div');
        foundedDiv.className = 'startup-info dark:text-gray-400';
        foundedDiv.innerHTML = `<strong>Founded:</strong> ${startup.founded}`;
        contentDiv.appendChild(foundedDiv);
    }

    // Founders
    if (startup.founders && startup.founders.length > 0) {
        const foundersDiv = document.createElement('div');
        foundersDiv.className = 'startup-info dark:text-gray-400';
        foundersDiv.innerHTML = `<strong>Founders:</strong> ${startup.founders.join(', ')}`;
        contentDiv.appendChild(foundersDiv);
    }

    // Funding
    if (startup.funding) {
        const fundingDiv = document.createElement('div');
        fundingDiv.className = 'startup-info dark:text-gray-400';
        fundingDiv.innerHTML = `<strong>Funding:</strong> ${startup.funding}`;
        contentDiv.appendChild(fundingDiv);
    }

    // Investors
    if (startup.investors && startup.investors.length > 0) {
        const investorsDiv = document.createElement('div');
        investorsDiv.className = 'startup-info dark:text-gray-400';
        investorsDiv.innerHTML = `<strong>Investors:</strong> ${startup.investors.join(', ')}`;
        contentDiv.appendChild(investorsDiv);
    }
    
    // Links section
    const linksDiv = document.createElement('div');
    linksDiv.className = 'startup-links dark:border-gray-700';
    linksDiv.setAttribute('role', 'list');
    linksDiv.setAttribute('aria-label', `${startup.name} online presence`);

    // Website link
    if (startup.website) {
        const websiteLink = document.createElement('a');
        websiteLink.href = startup.website;
        websiteLink.className = 'social-link dark:border-gray-600 dark:hover:bg-gray-700';
        websiteLink.target = '_blank';
        websiteLink.rel = 'noopener noreferrer';
        websiteLink.setAttribute('aria-label', `Visit ${startup.name} website (opens in new tab)`);
        websiteLink.setAttribute('role', 'listitem');

        const websiteIcon = document.createElement('img');
        websiteIcon.src = 'assets/socials/website.svg';
        websiteIcon.alt = '';
        websiteIcon.className = 'social-icon';
        websiteIcon.loading = 'lazy';
        websiteIcon.decoding = 'async';
        websiteIcon.setAttribute('aria-hidden', 'true');
        websiteLink.appendChild(websiteIcon);

        linksDiv.appendChild(websiteLink);
    }

    // Social links
    if (startup.socials) {
        Object.entries(startup.socials).forEach(([platform, url]) => {
            const socialLink = document.createElement('a');
            socialLink.href = url;
            socialLink.className = 'social-link dark:border-gray-600 dark:hover:bg-gray-700';
            socialLink.target = '_blank';
            socialLink.rel = 'noopener noreferrer';
            socialLink.setAttribute('aria-label', `Visit ${startup.name} on ${platform} (opens in new tab)`);
            socialLink.setAttribute('role', 'listitem');

            const socialIcon = document.createElement('img');
            socialIcon.src = `assets/socials/${platform}.svg`;
            socialIcon.alt = '';
            socialIcon.className = 'social-icon';
            socialIcon.loading = 'lazy';
            socialIcon.decoding = 'async';
            socialIcon.setAttribute('aria-hidden', 'true');
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
    const selectedSort = sortFilter.value;

    const normalizedCategory = selectedCategory.toLowerCase();
    const normalizedCountry = selectedCountry.toLowerCase();
    const normalizedRegion = selectedRegion.toLowerCase();
    
    filteredStartups = allStartups.filter(startup => {
        // Check search term
        const founders = Array.isArray(startup.founders) ? startup.founders.join(' ').toLowerCase() : '';
        const investors = Array.isArray(startup.investors) ? startup.investors.join(' ').toLowerCase() : '';
        const matchesSearch = searchTerm === '' ||
            startup.name.toLowerCase().includes(searchTerm) ||
            startup.description.toLowerCase().includes(searchTerm) ||
            startup.category.toLowerCase().includes(searchTerm) ||
            startup.country.toLowerCase().includes(searchTerm) ||
            startup.region.toLowerCase().includes(searchTerm) ||
            founders.includes(searchTerm) ||
            investors.includes(searchTerm);
        
        // Check category
        const matchesCategory = selectedCategory === 'all' || 
            startup.category.toLowerCase() === normalizedCategory;

        // Check country
        const matchesCountry = selectedCountry === 'all' ||
            startup.country.toLowerCase() === normalizedCountry;

        // Check region
        const matchesRegion = selectedRegion === 'all' ||
            startup.region.toLowerCase() === normalizedRegion;
        
        return matchesSearch && matchesCategory && matchesCountry && matchesRegion;
    });

    // Sort the filtered startups
    switch (selectedSort) {
    case 'name-asc':
        filteredStartups.sort((a, b) => a.name.localeCompare(b.name));
        break;
    case 'name-desc':
        filteredStartups.sort((a, b) => b.name.localeCompare(a.name));
        break;
    case 'founded-asc':
        filteredStartups.sort((a, b) => a.founded - b.founded);
        break;
    case 'founded-desc':
        filteredStartups.sort((a, b) => b.founded - a.founded);
        break;
    default:
        // If sort value is unexpected, do not sort and log a warning
        console.warn(`Unexpected sort value: "${selectedSort}". No sorting applied.`);
        break;
    }

    displayStartups(filteredStartups);
    updateResultsCount(filteredStartups.length);
}

// Load more startups
function loadMoreStartups(startups) {
    const startIndex = (currentPage - 1) * startupsPerPage;
    const endIndex = startIndex + startupsPerPage;
    const startupsToShow = startups.slice(startIndex, endIndex);

    startupsToShow.forEach(startup => {
        const card = createStartupCard(startup);
        startupsGrid.appendChild(card);
    });

    currentPage++;

    if (endIndex >= startups.length) {
        loadMoreContainer.classList.add('hidden');
    } else {
        loadMoreContainer.classList.remove('hidden');
    }

    updateLoadedCount();
}

function resetFilters() {
    searchInput.value = '';
    categoryFilter.value = 'all';
    countryFilter.value = 'all';
    regionFilter.value = 'all';
    sortFilter.value = 'name-asc';

    filterStartups();
    searchInput.focus({ preventScroll: true });
    announceToScreenReader('All filters cleared. Showing every startup.');
}

// Update loaded count
function updateLoadedCount() {
    const loaded = startupsGrid.children.length;
    const total = filteredStartups.length;
    loadedCount.textContent = `Showing ${loaded} of ${total} startups`;
}

// Update results count
function updateResultsCount(count) {
    const total = allStartups.length;
    const searchTerm = searchInput.value.trim();
    const activeFilters = [];

    if (searchTerm) {
        activeFilters.push(`Search: "${searchTerm}"`);
    }
    if (categoryFilter.value !== 'all') {
        activeFilters.push(`Category: ${categoryFilter.value}`);
    }
    if (countryFilter.value !== 'all') {
        activeFilters.push(`Country: ${countryFilter.value}`);
    }
    if (regionFilter.value !== 'all') {
        activeFilters.push(`Region: ${regionFilter.value}`);
    }

    const baseText = count === total
        ? `Showing all ${total} startup${total !== 1 ? 's' : ''}`
        : `Showing ${count} of ${total} startup${total !== 1 ? 's' : ''}`;

    const filtersText = activeFilters.length > 0
        ? ` (Filters active: ${activeFilters.join(', ')})`
        : '';

    resultsCount.textContent = `${baseText}${filtersText}`;
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
    sortFilter.addEventListener('change', filterStartups);

    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', resetFilters);
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => loadMoreStartups(filteredStartups));
    }

    // Keyboard navigation for cards
    startupsGrid.addEventListener('keydown', handleCardKeydown);

    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.remove('hidden');
        } else {
            scrollToTopBtn.classList.add('hidden');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        scrollToTopBtn.blur(); // Remove focus after click
    });
}

// Handle keyboard navigation for cards
function handleCardKeydown(event) {
    const cards = Array.from(startupsGrid.querySelectorAll('.startup-card'));
    const currentIndex = cards.indexOf(event.target.closest('.startup-card'));

    if (currentIndex === -1) return;

    switch (event.key) {
    case 'ArrowRight':
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % cards.length;
        cards[nextIndex].focus();
        break;
    case 'ArrowLeft':
        event.preventDefault();
        const prevIndex = currentIndex === 0 ? cards.length - 1 : currentIndex - 1;
        cards[prevIndex].focus();
        break;
    case 'Home':
        event.preventDefault();
        cards[0].focus();
        break;
    case 'End':
        event.preventDefault();
        cards[cards.length - 1].focus();
        break;
    }
}

// Initialize the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}