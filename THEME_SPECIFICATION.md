# Theme CSS Specification

## Overview

This document outlines the elements that need to be styled in the Link Manager application. Each theme can implement these elements with complete creative freedom while maintaining the required functionality.

## Core Elements

### 1. Body Container

The main container for the entire application.

- **Required Property**: `overflow-x: hidden`
- **Optional Properties**:
  - Font family
  - Background color/image
  - Base text color
  - Base spacing

### 2. Sidebar (`#sidebar`)

The main navigation panel that can be collapsed or expanded.

#### States

- **Expanded (default)**
  - Shows full text and icons
  - Full width navigation
  - Visible category structure

- **Collapsed**
  - Shows only icons
  - Tooltips on hover
  - Compact width

#### Core Components

- Category navigation
- Theme selector
- Subcategory structure

### 3. Icon System

The application uses multiple types of icons that need to be styled:

#### Category/Subcategory Icons

- **Required Properties**:
  - Font size: `0.9rem` (collapsed), `1rem` (expanded)
  - Margin: `0.5rem` right margin
  - Color: Should match sidebar text color
  - Bootstrap Icons class support

#### Link Icons

- **Required Properties**:
  - Size: `32px` width and height
  - Object-fit: `contain`
  - Border radius: Theme-specific
  - Background: Theme-specific
  - Padding: `2px`
  - Fallback image support

#### Icon States

- **Normal**: Default appearance
- **Hover**: Optional hover effect
- **Error**: Fallback icon appearance
- **Loading**: Optional loading state

### 4. Tooltip System

Provides context when the sidebar is collapsed.

#### Elements

- `.tooltip-text`
  - Hidden by default
  - Visible on hover in collapsed state
  - Appears for navigation items and category links

### 5. Navigation Links

Category and subcategory navigation structure.

#### Elements

- `.sidebar-link`: Main navigation items
- `.link-text`: Text portion of navigation
- Icons (Bootstrap Icons)

### 6. Card Components

Display individual links with their information and actions.

#### Structure

- Icon/logo area
- Title
- Description
- Launch button

#### Responsive Considerations

- Cards should adapt to container width
- Text should be readable at all sizes
- Launch button should remain accessible
- Icons should scale appropriately

### 7. Button Types

Various interactive buttons throughout the application.

#### Types

- `.btn-outline-primary`: Launch button
- `.btn-outline-light`: Sidebar action buttons

### 8. Form Controls

User input elements for data entry.

#### Elements

- `.form-control`: Text inputs
- `.form-select`: Dropdown selects

### 9. Page Title

Shows current category/selection context.

#### Element

- `#pageTitle`

### 10. Search Box

Real-time link filtering.

#### Element

- `.form-control` in header

## Theme-Specific Considerations

### Compact Theme

Special requirements for space-efficient layout:

- Full-width responsive rows
- Dynamic text scaling
- Space-efficient layout
- Optimized for smaller screens
- Single-line descriptions on mobile
- Launch button in top right
- Minimum card height: 60px (50px on mobile)
- Icon sizes: 28px (24px on mobile)

### High Contrast Theme

Accessibility-focused requirements:

- Maximum contrast ratios
- Clear focus indicators
- Distinct interactive states
- Icon alternatives for color-dependent information

### Retro Theme

Nostalgic styling options:

- Monospace fonts
- Pixel-perfect borders
- Retro-style animations
- Pixel art icon alternatives

## Implementation Guidelines

### Required Functionality

1. Sidebar collapse/expand must work
2. Tooltips must appear in collapsed state
3. All interactive elements must have hover states
4. Forms must be usable
5. Cards must be responsive
6. Icons must be properly sized and aligned
7. Fallback icons must be provided

### Optional Enhancements

Themes can include:

- Custom animations
- Unique hover effects
- Special transitions
- Theme-specific icons
- Custom scrollbars
- Background patterns or gradients
- Icon loading animations
- Custom icon sets

### Creative Freedom

Themes can freely implement:

- Color schemes
- Font choices
- Border radiuses
- Spacing
- Animations
- Shadow styles
- Layout variations (within functional constraints)
- Icon styles and treatments

## Notes

- Each theme should be self-contained
- Themes can be wildly different in appearance
- Functionality must be maintained
- Accessibility should be considered
- Performance should be optimized
- Responsive design is required
- Icon fallbacks must be provided
- Icon loading states should be considered
