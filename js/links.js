var links = [
  {
    name: 'Google',
    description: 'World\'s most popular search engine',
    url: 'https://www.google.com',
    icon: 'https://www.google.com/favicon.ico',
    category: 'Search Engines',
    subcategory: 'General Search'
  },
  {
    name: 'Bing',
    description: 'Microsoft\'s search engine',
    url: 'https://www.bing.com',
    icon: 'https://www.bing.com/favicon.ico',
    category: 'Search Engines',
    subcategory: 'General Search'
  },
  {
    name: 'DuckDuckGo',
    description: 'Privacy-focused search engine',
    url: 'https://duckduckgo.com',
    icon: 'https://duckduckgo.com/favicon.ico',
    category: 'Search Engines',
    subcategory: 'General Search'
  },
  {
    name: 'GitHub',
    description: 'Code and repository search',
    url: 'https://github.com/search',
    icon: 'https://github.com/favicon.ico',
    category: 'Search Engines',
    subcategory: 'Specialized Search'
  },
  {
    name: 'Stack Overflow',
    description: 'Programming Q&A search',
    url: 'https://stackoverflow.com/search',
    icon: 'https://stackoverflow.com/favicon.ico',
    category: 'Search Engines',
    subcategory: 'Specialized Search'
  },
  {
    name: 'Wolfram Alpha',
    description: 'Computational knowledge engine',
    url: 'https://www.wolframalpha.com',
    icon: 'https://www.wolframalpha.com/_next/static/images/favicon_1zbE9hjk.ico',
    category: 'Search Engines',
    subcategory: 'Specialized Search'
  },
  {
    name: 'Amazon',
    description: 'World\'s largest online retailer',
    url: 'https://www.amazon.com',
    icon: 'https://www.amazon.com/favicon.ico',
    category: 'E-Commerce',
    subcategory: 'General Retail'
  },
  {
    name: 'eBay',
    description: 'Online auction and shopping',
    url: 'https://www.ebay.com',
    icon: 'https://www.ebay.com/favicon.ico',
    category: 'E-Commerce',
    subcategory: 'General Retail'
  },
  {
    name: 'Walmart',
    description: 'Retail giant with online shopping',
    url: 'https://www.walmart.com',
    icon: 'https://www.walmart.com/favicon.ico',
    category: 'E-Commerce',
    subcategory: 'General Retail'
  },
  {
    name: 'Etsy',
    description: 'Handmade and vintage items',
    url: 'https://www.etsy.com',
    icon: 'https://www.etsy.com/favicon.ico',
    category: 'E-Commerce',
    subcategory: 'Specialty Stores'
  },
  {
    name: 'Newegg',
    description: 'Electronics and computer parts',
    url: 'https://www.newegg.com',
    icon: 'https://www.newegg.com/favicon.ico',
    category: 'E-Commerce',
    subcategory: 'Specialty Stores'
  },
  {
    name: 'Zappos',
    description: 'Shoes and clothing',
    url: 'https://www.zappos.com',
    icon: 'https://www.zappos.com/favicon.ico',
    category: 'E-Commerce',
    subcategory: 'Specialty Stores'
  },
  // Test category for icon fallback
  {
    name: 'Test Site 1',
    description: 'Testing icon fallback with no icon specified',
    url: 'https://example.com',
    category: 'Icon Tests',
    subcategory: 'No Icon Specified'
  },
  {
    name: 'Test Site 2',
    description: 'Testing icon fallback with invalid URL',
    url: 'not-a-valid-url',
    category: 'Icon Tests',
    subcategory: 'Invalid URL'
  },
  {
    name: 'Test Site 3',
    description: 'Testing icon fallback with non-existent domain',
    url: 'https://this-domain-does-not-exist-123456789.com',
    category: 'Icon Tests',
    subcategory: 'Non-existent Domain'
  },
  {
    name: 'Test Site 4',
    description: 'Testing with malformed icon URL',
    url: 'https://www.google.com',
    icon: 'not-a-valid-icon-url',
    category: 'Icon Tests',
    subcategory: 'Invalid Icon URL'
  },
  {
    name: 'Test Site 5',
    description: 'Testing with empty icon URL',
    url: 'https://www.google.com',
    icon: '',
    category: 'Icon Tests',
    subcategory: 'Empty Icon URL'
  },
  {
    name: 'Test Site 6',
    description: 'Testing with non-image icon URL',
    url: 'https://www.google.com',
    icon: 'https://www.google.com/robots.txt',
    category: 'Icon Tests',
    subcategory: 'Non-Image Icon'
  },
  {
    name: 'Test Site 7',
    description: 'Testing with relative icon URL',
    url: 'https://www.google.com',
    icon: '/favicon.ico',
    category: 'Icon Tests',
    subcategory: 'Relative Icon URL'
  },
  {
    name: 'Test Site 8',
    description: 'Testing default icon fallback',
    url: 'https://www.google.com',
    icon: 'https://non-existent-icon-url.com/icon.png',
    category: 'Icon Tests',
    subcategory: 'Default Icon'
  }
]; 
