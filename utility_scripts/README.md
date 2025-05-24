
# Bookmark Converter Script

This Python script converts a Netscape-format HTML bookmarks file into two JavaScript files:

- `links.js`: An array of link objects with metadata.
- `categories.js`: A hierarchical structure of categories and subcategories.

## Features

- Accepts input from a local HTML file or a URL.
- Extracts link names, URLs, categories, subcategories, and optional icons.
- Assigns default icons using Bootstrap icon class names.
- Outputs in easy-to-use JS format for web integration.

## Usage

```
python bookmark_converter.py --input-file bookmarks.html --generate-links --generate-categories
```

Or using a URL:

```
python bookmark_converter.py --input-url https://example.com/bookmarks.html --generate-links
```

## Arguments

- `--input-file`: Path to the local bookmarks HTML file.
- `--input-url`: URL of the bookmarks HTML file.
- `--links-out`: Output file path for `links.js`. (Default: `links.js`)
- `--categories-out`: Output file path for `categories.js`. (Default: `categories.js`)
- `--generate-links`: Generate the `links.js` output.
- `--generate-categories`: Generate the `categories.js` output.

## Requirements

- Python 3.x
- `beautifulsoup4`
- `requests`

Install dependencies with:

```
pip install beautifulsoup4 requests
```
