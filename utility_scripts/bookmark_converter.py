#!/usr/bin/env python3
import os
import json
from bs4 import BeautifulSoup
from datetime import datetime
import re

def clean_filename(filename):
    """Clean a string to be a valid filename."""
    return re.sub(r'[^\w\-_.]', '_', filename)

def parse_bookmarks(bookmarks_file):
    """Parse the bookmarks.html file and extract categories and links."""
    with open(bookmarks_file, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    # Initialize data structures
    categories = []
    links = []
    
    # Process each bookmark folder
    for folder in soup.find_all('h3'):
        category_name = folder.text.strip()
        if not category_name:
            continue
            
        # Create category object
        category = {
            "name": category_name,
            "icon": "bi-folder",  # Default category icon
            "subcategories": []
        }
        
        # Find all links in this folder
        folder_links = []
        current_folder = folder.find_parent('dl')
        
        # Process subfolders and links
        for item in current_folder.find_all(['h3', 'a'], recursive=False):
            if item.name == 'h3':
                # This is a subfolder
                subcategory_name = item.text.strip()
                if subcategory_name:
                    category['subcategories'].append({
                        "name": subcategory_name,
                        "icon": "bi-folder2"  # Default subcategory icon
                    })
                    
                    # Process links in subfolder
                    subfolder = item.find_parent('dl')
                    for link in subfolder.find_all('a'):
                        url = link.get('href', '')
                        link_data = {
                            "name": link.text.strip(),
                            "url": url,
                            "description": link.get('description', ''),
                            "category": category_name,
                            "subcategory": subcategory_name,
                            "icon": f"{url.rstrip('/')}/favicon.ico"
                        }
                        folder_links.append(link_data)
            elif item.name == 'a':
                # This is a direct link in the main category
                url = item.get('href', '')
                link_data = {
                    "name": item.text.strip(),
                    "url": url,
                    "description": item.get('description', ''),
                    "category": category_name,
                    "subcategory": None,
                    "icon": f"{url.rstrip('/')}/favicon.ico"
                }
                folder_links.append(link_data)
        
        # Only add category if it has content
        if category['subcategories'] or folder_links:
            categories.append(category)
            links.extend(folder_links)
    
    return categories, links

def generate_js_files(categories, links, output_dir='.'):
    """Generate categories.js and links.js files."""
    # Generate categories.js
    categories_js = f"""// Generated on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
var categories = {json.dumps(categories, indent=2)};
"""
    
    # Generate links.js
    links_js = f"""// Generated on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
var links = {json.dumps(links, indent=2)};
"""
    
    # Write files
    with open(os.path.join(output_dir, 'categories.js'), 'w', encoding='utf-8') as f:
        f.write(categories_js)
    
    with open(os.path.join(output_dir, 'links.js'), 'w', encoding='utf-8') as f:
        f.write(links_js)

def main():
    import argparse
    
    parser = argparse.ArgumentParser(description='Convert bookmarks.html to categories.js and links.js')
    parser.add_argument('bookmarks_file', help='Path to the bookmarks.html file')
    parser.add_argument('--output-dir', default='.', help='Directory to output the generated files')
    
    args = parser.parse_args()
    
    # Create output directory if it doesn't exist
    os.makedirs(args.output_dir, exist_ok=True)
    
    # Parse bookmarks and generate files
    categories, links = parse_bookmarks(args.bookmarks_file)
    generate_js_files(categories, links, args.output_dir)
    
    print(f"Generated categories.js and links.js in {args.output_dir}")
    print(f"Found {len(categories)} categories and {len(links)} links")

if __name__ == '__main__':
    main() 