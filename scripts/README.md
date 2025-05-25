# Link Manager Scripts

This directory contains utility scripts for the Link Manager application.

## Link Search Script (`link_search.py`)

A command-line tool that provides a fuzzy-search interface for your links using `fzf`. This script allows you to quickly search and open links from your Link Manager database.

### Features

- Fuzzy search through all your links
- Preview link details before opening
- Category and subcategory organization
- Clean exit with ESC or Ctrl+C
- Debug mode for troubleshooting

### Requirements

- Python 3.x
- `iterfzf` package (install with `pip install iterfzf`)

### Usage

Basic usage:
```bash
python3 link_search.py
```

With debug output:
```bash
python3 link_search.py --debug
```

### Controls

- **Search**: Type to filter results
- **Navigation**: Use arrow keys or vim keys (j/k)
- **Select**: Press Enter to open the selected link
- **Exit**: Press ESC or Ctrl+C to quit without selecting

### Debug Mode

The `--debug` flag provides detailed information about:
- Number of categories and subcategories found
- Total number of links parsed
- Invalid links (if any)
- Number of valid links

### File Format Requirements

The script expects the following file structure:

1. `js/categories.js`:
```javascript
var categories = [
  {
    name: "Category Name",
    subcategories: [
      { name: "Subcategory Name" }
    ]
  }
];
```

2. `js/links.js`:
```javascript
var links = [
  {
    name: "Link Name",
    url: "https://example.com",
    category: "Category Name",
    subcategory: "Subcategory Name",
    description: "Link description"
  }
];
```

### Notes

- The script validates links against the categories and subcategories defined in `categories.js`
- Invalid links (those with undefined categories or subcategories) are filtered out
- The script maintains the same organization structure as the web interface 