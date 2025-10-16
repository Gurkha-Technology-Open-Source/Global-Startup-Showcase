# Chart.js Integration Documentation

## Overview

The Global Startup Showcase uses [Chart.js](https://www.chartjs.org/) v4.4.1, a popular open-source JavaScript charting library, to provide interactive data visualizations of the startup ecosystem. This document explains the implementation details and how to work with the charts.

## Why Chart.js?

Chart.js was chosen as the open-source visualization library for several key reasons:

### Open Source Benefits
- **MIT License** - Completely free and open source
- **Active Community** - Over 60,000+ GitHub stars and active maintenance
- **No Vendor Lock-in** - Can be used, modified, and distributed freely
- **Transparent Development** - Open roadmap and contribution process

### Technical Advantages
- **Lightweight** - Small bundle size (~200KB) with excellent performance
- **Responsive** - Charts automatically adapt to container size
- **Accessible** - Built-in ARIA support and screen reader compatibility
- **Well-Documented** - Comprehensive documentation and examples
- **Framework Agnostic** - Works with vanilla JavaScript (our stack)
- **Customizable** - Extensive configuration options
- **Modern** - Regular updates with latest web standards

## Implementation

### 1. Library Integration

Chart.js is loaded via CDN in `index.html`:

```html
<!-- Chart.js for data visualization -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
```

**Why CDN?**
- No npm dependency needed
- Automatically cached by browsers
- Works seamlessly with our GitHub Pages deployment
- No build step required for the library itself

### 2. HTML Structure

The statistics dashboard is located in `index.html` between the search/filter section and the startups grid:

```html
<section class="container mx-auto px-4 py-8" aria-labelledby="statistics-heading">
  <div class="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
    <!-- Header with toggle button -->
    <div class="flex items-center justify-between mb-6">
      <h2 id="statistics-heading">Startup Statistics</h2>
      <button id="toggleCharts">Hide Charts</button>
    </div>
    
    <!-- Charts container -->
    <div id="chartsContainer" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <canvas id="categoryChart"></canvas>
      <canvas id="countryChart"></canvas>
      <canvas id="regionChart"></canvas>
      <canvas id="yearChart"></canvas>
    </div>
  </div>
</section>
```

### 3. JavaScript Implementation

#### Chart Initialization

Charts are initialized in the `initializeCharts()` function, called after startup data is loaded:

```javascript
function initializeCharts() {
  if (typeof Chart === 'undefined') {
    console.warn('Chart.js not loaded. Charts will not be displayed.');
    return;
  }

  const isDark = document.documentElement.classList.contains('dark');
  const textColor = isDark ? '#e5e7eb' : '#374151';
  const gridColor = isDark ? '#4b5563' : '#e5e7eb';

  createCategoryChart(textColor, gridColor);
  createCountryChart(textColor, gridColor);
  createRegionChart(textColor, gridColor);
  createYearChart(textColor, gridColor);
  
  setupToggleCharts();
}
```

#### Data Processing

Each chart processes the startup data differently:

**Category Chart (Bar)**
```javascript
const categoryData = {};
allStartups.forEach(startup => {
  categoryData[startup.category] = (categoryData[startup.category] || 0) + 1;
});
```

**Country Chart (Doughnut - Top 10)**
```javascript
const countryData = {};
allStartups.forEach(startup => {
  countryData[startup.country] = (countryData[startup.country] || 0) + 1;
});
const labels = Object.keys(countryData)
  .sort((a, b) => countryData[b] - countryData[a])
  .slice(0, 10);
```

**Region Chart (Pie)**
```javascript
const regionData = {};
allStartups.forEach(startup => {
  regionData[startup.region] = (regionData[startup.region] || 0) + 1;
});
```

**Year Chart (Line)**
```javascript
const yearData = {};
allStartups.forEach(startup => {
  if (startup.founded) {
    yearData[startup.founded] = (yearData[startup.founded] || 0) + 1;
  }
});
```

## Chart Types

### 1. Category Distribution (Bar Chart)

**Purpose**: Show the number of startups in each industry category

**Configuration**:
- Type: `bar`
- Y-axis: Number of startups (starts at 0)
- X-axis: Category names
- Color: Blue theme (`rgba(59, 130, 246, 0.7)`)

### 2. Country Distribution (Doughnut Chart)

**Purpose**: Display the top 10 countries with the most startups

**Configuration**:
- Type: `doughnut`
- Data: Top 10 countries by startup count
- Colors: 10 distinct colors from blue to red spectrum
- Legend: Right-aligned with percentages in tooltips

### 3. Region Distribution (Pie Chart)

**Purpose**: Show geographic distribution across continents

**Configuration**:
- Type: `pie`
- Data: All regions (typically 5-6 continents)
- Colors: 6 distinct colors
- Legend: Right-aligned with percentages in tooltips

### 4. Founding Year Trends (Line Chart)

**Purpose**: Visualize startup founding trends over time

**Configuration**:
- Type: `line`
- Y-axis: Number of startups founded
- X-axis: Years (sorted chronologically)
- Fill: Area under line filled with light blue
- Line: Smooth curve with tension 0.4

## Features

### Dark Mode Support

Charts automatically update when the user toggles dark mode:

```javascript
function updateChartsTheme() {
  const isDark = document.documentElement.classList.contains('dark');
  const textColor = isDark ? '#e5e7eb' : '#374151';
  const gridColor = isDark ? '#4b5563' : '#e5e7eb';

  Object.values(charts).forEach(chart => {
    if (chart) {
      // Update scales and legend colors
      chart.options.scales.y.ticks.color = textColor;
      chart.options.scales.y.grid.color = gridColor;
      // ... update other properties
      chart.update();
    }
  });
}
```

### Toggle Visibility

Users can show/hide the entire charts section:

```javascript
function setupToggleCharts() {
  const toggleBtn = document.getElementById('toggleCharts');
  const chartsContainer = document.getElementById('chartsContainer');
  
  toggleBtn.addEventListener('click', () => {
    const isHidden = chartsContainer.classList.toggle('hidden');
    toggleBtn.setAttribute('aria-expanded', !isHidden);
    // Update button text and icon
  });
}
```

### Responsive Design

- Charts use `responsive: true` and `maintainAspectRatio: true`
- Grid layout: 1 column on mobile, 2 columns on medium+ screens
- Charts automatically resize with viewport changes

### Accessibility

- All canvas elements have `role="img"` and descriptive `aria-label`
- Section has proper heading hierarchy (h2 for section, h3 for each chart)
- Toggle button has `aria-expanded` state
- Keyboard navigable and screen reader friendly

## Customization Guide

### Adding a New Chart

1. Add a canvas element in `index.html`:
```html
<canvas id="myNewChart" aria-label="Description of chart"></canvas>
```

2. Create initialization function in `src/app.js`:
```javascript
function createMyNewChart(textColor, gridColor) {
  const ctx = document.getElementById('myNewChart');
  if (!ctx) return;

  // Process data
  const data = processMyData();

  // Store chart reference
  if (charts.myNew) {
    charts.myNew.destroy();
  }

  // Create chart
  charts.myNew = new Chart(ctx, {
    type: 'bar', // or 'line', 'pie', etc.
    data: {
      labels: data.labels,
      datasets: [{
        label: 'My Data',
        data: data.values,
        // ... styling
      }]
    },
    options: {
      // ... configuration
    }
  });
}
```

3. Call it in `initializeCharts()`:
```javascript
function initializeCharts() {
  // ... existing charts
  createMyNewChart(textColor, gridColor);
}
```

### Changing Chart Colors

Colors are defined in each chart creation function. To change:

```javascript
// For bar/line charts
backgroundColor: 'rgba(59, 130, 246, 0.7)', // Change RGB values
borderColor: 'rgba(59, 130, 246, 1)',

// For pie/doughnut charts (array of colors)
const colors = [
  'rgba(59, 130, 246, 0.8)',   // Blue
  'rgba(16, 185, 129, 0.8)',   // Green
  'rgba(251, 146, 60, 0.8)',   // Orange
  // Add or modify colors here
];
```

### Updating Chart Configuration

All Chart.js options are available. See [Chart.js documentation](https://www.chartjs.org/docs/latest/) for full API.

Common customizations:
- `options.plugins.legend.position` - Legend placement
- `options.scales.y.beginAtZero` - Start Y-axis at zero
- `options.scales.y.ticks.stepSize` - Grid line spacing
- `options.plugins.tooltip.callbacks` - Custom tooltip content

## Performance Considerations

1. **Chart Destruction**: Always destroy existing charts before creating new ones:
   ```javascript
   if (charts.category) {
     charts.category.destroy();
   }
   ```

2. **Conditional Loading**: Charts only initialize if Chart.js loaded successfully:
   ```javascript
   if (typeof Chart === 'undefined') {
     console.warn('Chart.js not loaded.');
     return;
   }
   ```

3. **Update vs Recreate**: For theme changes, use `chart.update()` instead of destroying and recreating

## Testing

### Manual Testing Checklist

- [ ] Charts display correctly on page load
- [ ] Data accurately reflects startup data
- [ ] Charts resize properly on window resize
- [ ] Dark mode updates chart colors correctly
- [ ] Toggle button shows/hides charts
- [ ] Tooltips show correct information on hover
- [ ] Charts are accessible with screen readers
- [ ] Charts work on mobile devices
- [ ] All chart types render without errors

### Browser Compatibility

Chart.js v4 supports:
- Chrome 76+
- Firefox 68+
- Safari 13+
- Edge 79+

## Resources

- **Chart.js Documentation**: https://www.chartjs.org/docs/latest/
- **Chart.js GitHub**: https://github.com/chartjs/Chart.js
- **Chart.js Samples**: https://www.chartjs.org/docs/latest/samples/
- **Chart.js Community**: https://github.com/chartjs/Chart.js/discussions

## License

Chart.js is licensed under the [MIT License](https://github.com/chartjs/Chart.js/blob/master/LICENSE.md), which allows:
- Commercial use
- Modification
- Distribution
- Private use

The same MIT license applies to this project.

## Future Enhancements

Potential improvements for the data visualization:

1. **Export Charts** - Allow users to download charts as images
2. **More Chart Types** - Add scatter plots, radar charts for additional insights
3. **Filtering Integration** - Update charts based on current filters/search
4. **Animation Controls** - Options to enable/disable animations
5. **Data Table View** - Toggle between chart and tabular data
6. **Comparison Mode** - Compare data across different time periods
7. **Custom Date Ranges** - Filter founding year trends by date range

## Troubleshooting

### Charts Not Displaying

1. Check browser console for errors
2. Verify Chart.js CDN is accessible
3. Ensure startup data is loaded before chart initialization
4. Check if canvas elements exist in DOM

### Theme Not Updating

1. Verify `updateChartsTheme()` is called in dark mode toggle
2. Check color values are properly set
3. Ensure `chart.update()` is called after color changes

### Performance Issues

1. Reduce number of data points for large datasets
2. Use `decimation` plugin for line charts with many points
3. Disable animations: `options.animation = false`
4. Use `responsive: true` with appropriate `aspectRatio`
