# Link Manager

A simple, elegant link management application that helps you organize and access your favorite links quickly.

## Features

- **Category Organization**: Organize links into categories and subcategories
- **Quick Search**: Instantly find links with the search functionality
- **Responsive Design**: Works on all screen sizes
- **Theme Support**: Multiple themes available, including a space-efficient compact theme
- **Collapsible Sidebar**: Save space by collapsing the navigation panel
- **Icon Support**: Custom icons for categories, subcategories, and links
- **Bookmark Import**: Import your browser bookmarks with automatic favicon detection

## Usage

1. Open `index.html` in your web browser
2. Navigate through categories using the sidebar
3. Use the search box to find specific links
4. Click the launch button to open links
5. Toggle the sidebar using the collapse button
6. Change themes using the theme selector

## Themes

The application comes with multiple themes:

- **Default Theme**: Clean, modern design with spacious layout
- **Compact Theme**: Space-efficient design with responsive rows that scale to screen width
- **Dark Theme**: Dark mode for reduced eye strain
- **High Contrast**: Enhanced accessibility
- **And more...**

### Compact Theme Features

- Full-width responsive rows
- Dynamic text scaling
- Space-efficient layout
- Optimized for smaller screens
- Single-line descriptions on mobile

## Customization

### Adding Links

Edit the `js/links.js` file to add or modify links:

```javascript
const links = [
  {
    name: "Link Title",
    url: "https://example.com",
    description: "Link description",
    category: "Category Name",
    subcategory: "Subcategory Name",
    icon: "https://example.com/icon.png" // Optional custom icon
  }
];
```

### Modifying Categories

Edit the `js/categories.js` file to modify categories:

```javascript
const categories = [
  {
    name: "Category Name",
    icon: "bi-folder", // Bootstrap icon class
    subcategories: [
      {
        name: "Subcategory 1",
        icon: "bi-folder2" // Bootstrap icon class
      }
    ]
  }
];
```

### Icon Support

The application supports multiple types of icons:

1. **Category/Subcategory Icons**:
   - Use Bootstrap Icons (e.g., `bi-folder`, `bi-search`)
   - Default icons are provided if none specified
   - Custom icons can be added via CSS

2. **Link Icons**:
   - Custom icon URLs
   - Automatic favicon detection
   - Fallback to default icon
   - Support for various icon sizes

### Adding Themes

1. Create a new CSS file in the `themes` directory
2. Follow the theme specification in `THEME_SPECIFICATION.md`
3. Add the theme to the theme selector in `index.html`

## Importing Bookmarks

Use the bookmark converter to import your browser bookmarks:

```bash
python utility_scripts/bookmark_converter.py path/to/bookmarks.html --output-dir path/to/output
```

The converter will:
- Preserve your category structure
- Automatically detect favicons
- Generate appropriate icon URLs
- Create the required JavaScript files

## Browser Support

- Modern browsers with ES6 JavaScript support
- CSS Grid and Flexbox support
- Local Storage API support

## License

MIT License - Feel free to use and modify for your needs.
