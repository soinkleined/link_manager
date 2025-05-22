// Global variables
var currentTheme = localStorage.getItem('linkDashboardTheme') || 'default-theme.css';
var selectedCategory = null;
var selectedSubcategory = null;

// Icon handling constants and utilities
const ICON_CONFIG = {
  defaultIcon: 'https://raw.githubusercontent.com/google/material-design-icons/master/png/action/language/materialicons/48dp/2x/baseline_language_black_48dp.png',
  warningIcon: 'https://raw.githubusercontent.com/google/material-design-icons/master/png/alert/warning/materialicons/48dp/2x/baseline_warning_black_48dp.png',
  faviconService: 'https://www.google.com/s2/favicons?domain=',
  faviconSize: 128,
  defaultCategoryIcon: 'bi-folder',
  defaultSubcategoryIcon: 'bi-folder2'
};

function populateThemeSelector() {
  var selector = document.getElementById('themeSelector');
  if (!selector) {
    console.error('Theme selector element not found');
    return;
  }
  selector.innerHTML = '';
  themes.forEach(function(theme) {
    var option = document.createElement('option');
    option.value = theme.file;
    option.textContent = theme.name;
    option.selected = (theme.file === currentTheme);
    selector.appendChild(option);
  });
  console.log('Theme selector populated with', themes.length, 'themes');
}

function changeTheme(themeFile) {
  console.log('Changing theme to:', themeFile);
  var stylesheet = document.getElementById('themeStylesheet');
  if (!stylesheet) {
    console.error('Theme stylesheet element not found');
    return;
  }
  
  // Check if theme file exists in themes array
  var themeExists = themes.some(theme => theme.file === themeFile);
  if (!themeExists) {
    console.error('Theme file not found in themes array:', themeFile);
    return;
  }
  
  try {
    stylesheet.href = 'themes/' + themeFile;
    currentTheme = themeFile;
    localStorage.setItem('linkDashboardTheme', themeFile);
    console.log('Theme changed successfully to:', themeFile);
  } catch (error) {
    console.error('Error changing theme:', error);
  }
}

function loadTheme() {
  var savedTheme = localStorage.getItem('linkDashboardTheme');
  if (savedTheme) {
    console.log('Loading saved theme:', savedTheme);
    changeTheme(savedTheme);
  } else {
    console.log('No saved theme found, using default');
    changeTheme('default-theme.css');
  }
}

// Initialize the application
function initializeApp() {
  renderSidebar();
  renderLinks();
  populateThemeSelector();
  loadTheme();
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('collapsed-sidebar');
}

function renderSidebar() {
  var nav = document.getElementById('categoryNav');
  nav.innerHTML = '';
  
  // Add "All Links" option
  var allLi = document.createElement('li');
  allLi.className = 'nav-item mb-2';
  allLi.innerHTML = `<a href="#" class="sidebar-link d-flex align-items-center" onclick="selectAllLinks()">
                      <i class="bi bi-collection me-2"></i> <span class="link-text">All Links</span>
                      <span class="tooltip-text">All Links</span></a>`;
  nav.appendChild(allLi);

  // Render categories and their subcategories
  categories.forEach(function(cat) {
    // Add category
    var li = document.createElement('li');
    li.className = 'nav-item mb-2';
    li.innerHTML = `<a href="#" class="sidebar-link d-flex align-items-center" onclick="selectCategory('${cat.name}')">
                      <i class="bi ${cat.icon || ICON_CONFIG.defaultCategoryIcon} me-2"></i> <span class="link-text">${cat.name}</span>
                      <span class="tooltip-text">${cat.name}</span></a>`;
    nav.appendChild(li);

    // Add subcategories if they exist
    if (cat.subcategories && cat.subcategories.length > 0) {
      var subList = document.createElement('ul');
      subList.className = 'nav flex-column ms-4';
      cat.subcategories.forEach(function(subcat) {
        var subLi = document.createElement('li');
        subLi.className = 'nav-item mb-1';
        subLi.innerHTML = `<a href="#" class="sidebar-link d-flex align-items-center" onclick="selectSubcategory('${cat.name}', '${subcat.name}')">
                            <i class="bi ${subcat.icon || ICON_CONFIG.defaultSubcategoryIcon} me-2"></i> <span class="link-text">${subcat.name}</span>
                            <span class="tooltip-text">${subcat.name}</span></a>`;
        subList.appendChild(subLi);
      });
      nav.appendChild(subList);
    }
  });
}

function getIconUrl(link) {
  let debugInfo = [];
  let iconUrl;
  
  // If link has a custom icon, use it
  if (link.icon) {
    debugInfo.push('Custom icon provided');
    try {
      new URL(link.icon); // Validate URL
      iconUrl = link.icon;
    } catch (e) {
      debugInfo.push('Invalid icon URL - falling back to favicon');
      iconUrl = null;
    }
  } else {
    debugInfo.push('No custom icon - using favicon service');
    iconUrl = null;
  }
  
  // If no valid custom icon, try to get favicon from URL
  if (!iconUrl) {
    try {
      const urlObj = new URL(link.url);
      iconUrl = `${ICON_CONFIG.faviconService}${urlObj.hostname}&sz=${ICON_CONFIG.faviconSize}`;
      debugInfo.push(`Using favicon from: ${urlObj.hostname}`);
    } catch (e) {
      debugInfo.push('Invalid URL - using warning icon');
      iconUrl = ICON_CONFIG.warningIcon;
    }
  }
  
  return { iconUrl, debugInfo };
}

// Helper function to create link card HTML
function createLinkCard(link) {
  const { iconUrl, debugInfo } = getIconUrl(link);
  const isTestLink = link.category === 'Icon Tests';
  
  // Get debug information for test links
  let description = link.description;
  if (isTestLink) {
    description = `${link.description}\n\nDebug Info:\n${debugInfo.join('\n')}`;
  }
  
  return `
    <div class="col-md-4 mb-4">
      <div class="card h-100 p-3 d-flex flex-column justify-content-between">
        <div class="d-flex justify-content-between align-items-start">
          <img src="${iconUrl}" alt="Icon" class="card-icon" onerror="this.src='${ICON_CONFIG.defaultIcon}'">
          <a href="${link.url}" target="_blank" class="btn btn-outline-primary launch-button">
            Launch <i class="bi bi-box-arrow-up-right ms-1"></i>
          </a>
        </div>
        <div class="flex-grow-1 my-2">
          <h5 class="card-title">${link.name}</h5>
          <p class="card-text" style="white-space: pre-line;">${description}</p>
        </div>
      </div>
    </div>`;
}

// Helper function to filter links based on search term
function filterLinksBySearch(links, search) {
  return links.filter(link => 
    link.name.toLowerCase().includes(search.toLowerCase()) || 
    link.description.toLowerCase().includes(search.toLowerCase())
  );
}

// Consolidated selection function
function selectNavigation(category = null, subcategory = null) {
  selectedCategory = category;
  selectedSubcategory = subcategory;
  
  let title = 'All Links';
  if (category) {
    title = subcategory ? `${category} > ${subcategory}` : category;
  }
  
  document.getElementById('pageTitle').textContent = title;
  renderLinks();
}

function selectAllLinks() {
  selectNavigation();
}

function selectCategory(category) {
  selectNavigation(category);
}

function selectSubcategory(category, subcategory) {
  selectNavigation(category, subcategory);
}

function renderLinks(search = '') {
  var container = document.getElementById('linkContainer');
  container.innerHTML = '';
  
  // Group links by category and subcategory
  var groupedLinks = {};
  links.forEach(function(link) {
    if (!groupedLinks[link.category]) {
      groupedLinks[link.category] = {
        direct: [],
        subcategories: {}
      };
    }
    
    if (link.subcategory) {
      if (!groupedLinks[link.category].subcategories[link.subcategory]) {
        groupedLinks[link.category].subcategories[link.subcategory] = [];
      }
      groupedLinks[link.category].subcategories[link.subcategory].push(link);
    } else {
      groupedLinks[link.category].direct.push(link);
    }
  });

  // Render links by category and subcategory
  Object.keys(groupedLinks).forEach(function(category) {
    if (!selectedCategory || category === selectedCategory) {
      if (selectedSubcategory) {
        var subcategoryLinks = groupedLinks[category].subcategories[selectedSubcategory] || [];
        subcategoryLinks = filterLinksBySearch(subcategoryLinks, search);

        if (subcategoryLinks.length > 0) {
          container.innerHTML += `
            <div class="col-12 mb-2">
              <h5 class="subcategory-header">${selectedSubcategory}</h5>
            </div>`;

          subcategoryLinks.forEach(link => {
            container.innerHTML += createLinkCard(link);
          });
        }
      } else {
        container.innerHTML += `
          <div class="col-12 mb-3">
            <h4 class="category-header">${category}</h4>
          </div>`;

        // Render direct links
        var directLinks = filterLinksBySearch(groupedLinks[category].direct, search);
        if (directLinks.length > 0) {
          directLinks.forEach(link => {
            container.innerHTML += createLinkCard(link);
          });
        }

        // Render subcategories and their links
        Object.keys(groupedLinks[category].subcategories).forEach(function(subcategory) {
          var subcategoryLinks = filterLinksBySearch(
            groupedLinks[category].subcategories[subcategory],
            search
          );

          if (subcategoryLinks.length > 0) {
            container.innerHTML += `
              <div class="col-12 mb-2">
                <h5 class="subcategory-header">${subcategory}</h5>
              </div>`;

            subcategoryLinks.forEach(link => {
              container.innerHTML += createLinkCard(link);
            });
          }
        });
      }
    }
  });
}

function filterLinks(term) {
  renderLinks(term);
} 