# Theme Styling Guide

This guide explains how to create and customize themes for the Link Manager application.

## Theme Structure

Each theme is a CSS file that should be placed in the `themes` directory. The theme file should follow this basic structure:

```css
/* Theme Name */
body {
  /* Base styles */
}

/* Sidebar styles */
#sidebar {
  /* Sidebar container styles */
}

/* Card styles */
.card {
  /* Card container styles */
}
```

## Layout Mechanisms

The application supports different layout mechanisms for organizing cards. Choose the one that best fits your theme's design:

### 1. Bootstrap Grid (Default)

```css
.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.col-md-4 {
  flex: 0 0 33.333333%;
  max-width: 33.333333%;
  padding: 0 15px;
}
```

### 2. CSS Grid

```css
.row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.col-md-4 {
  width: 100%;
  padding: 0;
}
```

### 3. Flexbox

```css
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.col-md-4 {
  flex: 0 0 200px;
  max-width: 200px;
}
```

## Key Components

### 1. Card Container

The card container is the main wrapper for each link card:

```html
<div class="col-md-4 mb-4">
  <div class="card h-100">
    <!-- Card content -->
  </div>
</div>
```

### 2. Category Headers

Category and subcategory headers are rendered as:

```html
<div class="section-container">
  <div class="col-12 mb-3">
    <h4 class="category-header">Category Name</h4>
  </div>
  <div class="row">
    <!-- Cards -->
  </div>
</div>
```

### 3. Launch Button

The launch button is rendered as:

```html
<a href="[url]" target="_blank" class="btn btn-outline-primary launch-button">
  Launch <i class="bi bi-box-arrow-up-right ms-1"></i>
</a>
```

## Theme Customization

### 1. Colors

Define your theme's color palette:

```css
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --background-color: #f5f7fa;
  --text-color: #1a2b3c;
}
```

### 2. Typography

Set your theme's typography:

```css
body {
  font-family: 'Your Font', sans-serif;
  font-size: 14px;
  line-height: 1.5;
}
```

### 3. Spacing

Define consistent spacing:

```css
:root {
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
}
```

## Best Practices

1. **Responsive Design**
   - Use relative units (rem, em) for font sizes
   - Implement media queries for different screen sizes
   - Test your theme on various devices

2. **Performance**
   - Minimize the use of heavy effects
   - Use hardware-accelerated properties (transform, opacity)
   - Optimize images and icons

3. **Accessibility**
   - Maintain sufficient color contrast
   - Use appropriate font sizes
   - Ensure interactive elements are easily clickable

4. **Consistency**
   - Use a consistent color palette
   - Maintain uniform spacing
   - Follow a clear visual hierarchy

## Theme Examples

### Default Theme
Uses Bootstrap's grid system with a clean, professional look.

### Chrome Theme
Google Chrome-inspired design with Material Design elements and Google Sans font.

### Brutal Theme
Bold brutalism design with sharp edges, raw elements, and high contrast.

### Star Wars Themes
- **Star Wars**: Classic Star Wars theme with gold accents
- **Star Wars Light**: Light Side theme with Jedi-inspired green accents
- **Star Wars Dark**: Dark Side theme with Sith-inspired red accents

### Star Trek Theme
Futuristic design inspired by Star Trek with blue accents and Orbitron font.

### Compact Themes
- **Compact Ultra**: Ultra-compact layout with fixed sidebar and Space Grotesk font
- **Compact Modern**: Clean and efficient layout with Inter font
- **Compact Warm**: Cozy and efficient layout with Plus Jakarta Sans font
- **Compact Cool**: Fresh and efficient layout with Outfit font
- **Compact Dark**: Sleek and efficient dark layout with DM Sans font
- **Compact Horizontal**: Space-efficient layout optimized for smaller screens

## Adding Your Theme

1. Create a new CSS file in the `themes` directory
2. Add your theme to the `js/themes.js` file:

```javascript
{
  name: "Your Theme Name",
  file: "themes/your-theme.css",
  description: "Description of your theme"
}
```

## Testing Your Theme

1. Test with different screen sizes
2. Verify all interactive elements work
3. Check accessibility standards
4. Ensure consistent appearance across browsers

## Common Issues

1. **Card Alignment**
   - If cards aren't aligning properly, check your row and column styles
   - Ensure proper use of flex/grid properties
   - Verify margin and padding values

2. **Responsive Behavior**
   - Test breakpoints for different screen sizes
   - Verify card wrapping behavior
   - Check header and text scaling

3. **Performance**
   - Monitor for layout shifts
   - Check for smooth animations
   - Verify efficient rendering

## Resources

- [Bootstrap Documentation](https://getbootstrap.com/docs)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
