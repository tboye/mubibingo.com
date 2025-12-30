/*
 * MUBI Bingo
 * Copyright (c) 2025 hello@mubibingo.com
 * All rights reserved.
 */

(function() {
  'use strict';

  // Countries (50) - matching extension
  const COUNTRIES = [
    { code: 'AL', name: 'Albania' },
    { code: 'AR', name: 'Argentina' },
    { code: 'AT', name: 'Austria' },
    { code: 'AU', name: 'Australia' },
    { code: 'BE', name: 'Belgium' },
    { code: 'BR', name: 'Brazil' },
    { code: 'BG', name: 'Bulgaria' },
    { code: 'CA', name: 'Canada' },
    { code: 'CL', name: 'Chile' },
    { code: 'CO', name: 'Colombia' },
    { code: 'HR', name: 'Croatia' },
    { code: 'CY', name: 'Cyprus' },
    { code: 'CZ', name: 'Czechia' },
    { code: 'DK', name: 'Denmark' },
    { code: 'EE', name: 'Estonia' },
    { code: 'FI', name: 'Finland' },
    { code: 'FR', name: 'France' },
    { code: 'DE', name: 'Germany' },
    { code: 'GR', name: 'Greece' },
    { code: 'HK', name: 'Hong Kong' },
    { code: 'HU', name: 'Hungary' },
    { code: 'ID', name: 'Indonesia' },
    { code: 'IE', name: 'Ireland' },
    { code: 'IL', name: 'Israel' },
    { code: 'IT', name: 'Italy' },
    { code: 'JP', name: 'Japan' },
    { code: 'MY', name: 'Malaysia' },
    { code: 'MX', name: 'Mexico' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'NZ', name: 'New Zealand' },
    { code: 'NG', name: 'Nigeria' },
    { code: 'NO', name: 'Norway' },
    { code: 'PE', name: 'Peru' },
    { code: 'PH', name: 'Philippines' },
    { code: 'PL', name: 'Poland' },
    { code: 'PT', name: 'Portugal' },
    { code: 'RO', name: 'Romania' },
    { code: 'RS', name: 'Serbia' },
    { code: 'SG', name: 'Singapore' },
    { code: 'SK', name: 'Slovakia' },
    { code: 'SI', name: 'Slovenia' },
    { code: 'ZA', name: 'South Africa' },
    { code: 'ES', name: 'Spain' },
    { code: 'SE', name: 'Sweden' },
    { code: 'CH', name: 'Switzerland' },
    { code: 'TH', name: 'Thailand' },
    { code: 'TR', name: 'Turkey' },
    { code: 'UA', name: 'Ukraine' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'US', name: 'United States' },
  ];

  // Demo films with different availability patterns
  const FILMS = [
    {
      title: 'Eagle vs Shark, 2007',
      pattern: 'few-green'
    },
    {
      title: 'Aftersun, 2022',
      pattern: 'many-green'
    },
    {
      title: 'Rotting in the Sun, 2023',
      pattern: 'mixed-green-yellow'
    },
    {
      title: 'All of Us Strangers, 2023',
      pattern: 'mixed-green-yellow'
    },
    {
      title: 'Stalker, 1979',
      pattern: 'few-green'
    },
    {
      title: 'Smoking Causes Coughing, 2022',
      pattern: 'few-green'
    },
    {
      title: 'Teorema, 1968',
      pattern: 'few-green'
    },
    {
      title: 'Persona, 1966',
      pattern: 'many-green'
    },
    {
      title: 'Bugonia, 2025',
      pattern: 'mostly-yellow'
    },
    {
      title: 'Sieranevada, 2016',
      pattern: 'few-green'
    },
    {
      title: 'Fight Club, 1999',
      pattern: 'many-green'
    },
    {
      title: 'Happy Together, 1997',
      pattern: 'many-green'
    },
    {
      title: 'The Match Factory Girl, 1990',
      pattern: 'few-green'
    },
    {
      title: 'Magic Farm, 2025',
      pattern: 'mostly-yellow'
    },
    {
      title: 'My First Film, 2024',
      pattern: 'mixed-green-yellow'
    }
  ];

  // Generate availability based on pattern
  function generateAvailability(pattern) {
    const shuffled = shuffleArray([...COUNTRIES]);
    const availability = {};

    switch (pattern) {
      case 'many-green': {
        const liveCount = 30 + Math.floor(Math.random() * 10);
        shuffled.forEach((country, i) => {
          availability[country.code] = i < liveCount ? 'live' : 'unavailable';
        });
        break;
      }
      case 'mixed-green-yellow': {
        const liveCount = 15 + Math.floor(Math.random() * 10);
        const upcomingCount = 10 + Math.floor(Math.random() * 10);
        shuffled.forEach((country, i) => {
          if (i < liveCount) {
            availability[country.code] = 'live';
          } else if (i < liveCount + upcomingCount) {
            availability[country.code] = 'upcoming';
          } else {
            availability[country.code] = 'unavailable';
          }
        });
        break;
      }
      case 'few-green': {
        const liveCount = 5 + Math.floor(Math.random() * 8);
        shuffled.forEach((country, i) => {
          availability[country.code] = i < liveCount ? 'live' : 'unavailable';
        });
        break;
      }
      case 'mostly-yellow': {
        const upcomingCount = 20 + Math.floor(Math.random() * 20);
        shuffled.forEach((country, i) => {
          availability[country.code] = i < upcomingCount ? 'upcoming' : 'unavailable';
        });
        break;
      }
    }

    return availability;
  }

  // Get tooltip text based on status
  function getTooltipText(countryName, status) {
    if (status === 'live') return `${countryName}: Available now`;
    if (status === 'upcoming') return `${countryName}: Coming soon`;
    return `${countryName}: Not available`;
  }

  // Shuffle array (Fisher-Yates)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // DOM elements
  const filmTitle = document.getElementById('film-title');
  const bingoGrid = document.getElementById('bingo-grid');
  const loadingIndicator = document.getElementById('loading-indicator');
  const tooltip = document.getElementById('tooltip');
  const cellMap = new Map();

  // Initialize empty grid
  function initEmptyGrid() {
    bingoGrid.innerHTML = '';
    cellMap.clear();
    COUNTRIES.forEach(country => {
      const cell = document.createElement('div');
      cell.className = 'bingo-cell';
      cell.dataset.code = country.code;
      cell.dataset.name = country.name;
      cellMap.set(country.code, cell);
      bingoGrid.appendChild(cell);
    });
  }

  // Update a single cell
  function updateCell(country, status) {
    const cell = cellMap.get(country.code);
    if (cell) {
      cell.className = `bingo-cell ${status} reveal-anim`;
      cell.textContent = country.code;
      cell.dataset.tooltip = getTooltipText(country.name, status);
    }
  }

  // Reset all cells
  function resetGrid() {
    COUNTRIES.forEach(country => {
      const cell = cellMap.get(country.code);
      if (cell) {
        cell.className = 'bingo-cell';
        cell.textContent = '';
        delete cell.dataset.tooltip;
      }
    });
  }

  // Tooltip handlers
  function showTooltip(e) {
    const cell = e.target;
    if (!cell.dataset.tooltip) return;

    tooltip.textContent = cell.dataset.tooltip;
    tooltip.classList.add('visible');

    const cellRect = cell.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const containerRect = bingoGrid.parentElement.getBoundingClientRect();

    // Center horizontally, clamp to container
    const centerX = cellRect.left + cellRect.width / 2 - tooltipRect.width / 2;
    const left = Math.max(containerRect.left, Math.min(centerX, containerRect.right - tooltipRect.width));

    // Position above cell, or below if no room
    const gap = 6;
    const top = cellRect.top > tooltipRect.height + gap
      ? cellRect.top - tooltipRect.height - gap
      : cellRect.bottom + gap;

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  }

  function hideTooltip() {
    tooltip.classList.remove('visible');
  }

  bingoGrid.addEventListener('mouseover', showTooltip);
  bingoGrid.addEventListener('mouseout', hideTooltip);

  // Reveal cells with staggered animation
  function revealCellsStaggered(availability) {
    return new Promise(resolve => {
      const shuffled = shuffleArray([...COUNTRIES]);
      const delay = 30;
      let index = 0;

      function tick() {
        if (index < shuffled.length) {
          const country = shuffled[index];
          updateCell(country, availability[country.code]);
          index++;
          setTimeout(tick, delay);
        } else {
          resolve();
        }
      }

      tick();
    });
  }

  // Show a film
  async function showFilm(film) {
    // Reset grid
    resetGrid();

    // Update title
    filmTitle.textContent = film.title;
    loadingIndicator.classList.remove('hidden');

    // Small delay before starting reveal
    await new Promise(r => setTimeout(r, 300));

    // Generate and reveal availability
    const availability = generateAvailability(film.pattern);
    await revealCellsStaggered(availability);

    // Hide loading indicator
    loadingIndicator.classList.add('hidden');

    // Wait before next film
    await new Promise(r => setTimeout(r, 3000));
  }

  // Main loop
  async function runDemo() {
    initEmptyGrid();
    shuffleArray(FILMS);
    let filmIndex = 0;

    while (true) {
      await showFilm(FILMS[filmIndex]);
      filmIndex = (filmIndex + 1) % FILMS.length;
    }
  }

  // Start demo
  runDemo();
})();