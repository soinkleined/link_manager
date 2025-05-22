# Utility Scripts

This directory contains utility scripts for the Link Manager application.

## Bookmark Converter

The `bookmark_converter.py` script converts browser bookmarks (in HTML format) into the required JavaScript files for the Link Manager application.

### Requirements

```bash
pip install beautifulsoup4
```

### Usage

```bash
python bookmark_converter.py path/to/bookmarks.html --output-dir path/to/output
```

### Features

- Converts browser bookmarks to categories.js and links.js
- Preserves category and subcategory structure
- Automatically generates favicon URLs
- Handles nested bookmark folders
- Supports UTF-8 encoding
- Creates output directory if it doesn't exist

### Output Files

1. `categories.js`: Contains category and subcategory structure
2. `links.js`: Contains all bookmarks with metadata

### Example

```bash
# Convert bookmarks and output to the current directory
python bookmark_converter.py ~/Downloads/bookmarks.html

# Convert bookmarks and output to a specific directory
python bookmark_converter.py ~/Downloads/bookmarks.html --output-dir ./data
```
