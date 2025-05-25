import os
import re
import sys
import webbrowser
import argparse
import urllib.parse
import ast
from pathlib import Path

try:
    from iterfzf import iterfzf
except ImportError:
    print("Please install iterfzf: pip install iterfzf", file=sys.stderr)
    sys.exit(1)

# Paths
PROJECT_ROOT = Path(__file__).resolve().parent.parent
LINKS_FILE = PROJECT_ROOT / 'js' / 'links.js'
CATEGORIES_FILE = PROJECT_ROOT / 'js' / 'categories.js'

# Helper to parse JS array of objects
JS_OBJECT_RE = re.compile(r'{[^}]*}', re.DOTALL)
FIELD_RE = re.compile(r'(\w+):\s*[\'"]([^\'"]*)[\'"]', re.MULTILINE)

def parse_js_string(value):
    """Parse a JavaScript string literal into a Python string."""
    value = value.strip()
    if not value:
        return ""
    # Remove the outer quotes
    if value.startswith(("'", '"')):
        value = value[1:-1]
    # Handle escape sequences
    value = value.encode('utf-8').decode('unicode_escape')
    return value

def parse_js_objects(js_path):
    with open(js_path, encoding='utf-8') as f:
        content = f.read()
    objects = []
    for match in JS_OBJECT_RE.finditer(content):
        obj_text = match.group(0)
        fields = {}
        # Find all field matches
        for field_match in re.finditer(r'(\w+):\s*([^,}]+)', obj_text):
            key = field_match.group(1)
            value = field_match.group(2)
            fields[key] = parse_js_string(value)
        if fields:
            objects.append(fields)
    return objects


def get_categories_and_subcategories(categories_path):
    with open(categories_path, encoding='utf-8') as f:
        content = f.read()
    # Find the array of categories
    array_match = re.search(r'var categories\s*=\s*\[(.*)\];', content, re.DOTALL)
    if not array_match:
        return {}
    array_content = array_match.group(1)
    # Match only top-level objects (not those inside subcategories)
    top_level_objs = re.findall(r'{[^{}]*subcategories\s*:\s*\[[^\]]*\][^{}]*}', array_content, re.DOTALL)
    categories = {}
    for obj in top_level_objs:
        name_match = re.search(r"name:\s*['\"]([^'\"]+)['\"]", obj)
        if not name_match:
            continue
        cat_name = name_match.group(1)
        subcat_block = re.search(r"subcategories\s*:\s*\[([^\]]*)\]", obj, re.DOTALL)
        subcat_names = []
        if subcat_block:
            subcat_names = re.findall(r"name:\s*['\"]([^'\"]+)['\"]", subcat_block.group(1))
        categories[cat_name] = set(subcat_names)
    return categories


def main():
    # Parse command line arguments
    parser = argparse.ArgumentParser(description='Search and open links using fzf')
    parser.add_argument('--debug', action='store_true', help='Show debug information')
    args = parser.parse_args()

    # Parse categories
    categories = get_categories_and_subcategories(CATEGORIES_FILE)
    if args.debug:
        print(f"Found {len(categories)} categories:", file=sys.stderr)
        for cat, subcats in categories.items():
            print(f"  {cat}: {len(subcats)} subcategories", file=sys.stderr)
    
    # Parse links
    links = parse_js_objects(LINKS_FILE)
    if args.debug:
        print(f"\nFound {len(links)} total links", file=sys.stderr)
    
    # Validate and filter links
    valid_links = []
    for link in links:
        cat = link.get('category')
        subcat = link.get('subcategory')
        if cat in categories and subcat in categories[cat]:
            # Ensure URL is properly encoded
            if 'url' in link:
                link['url'] = urllib.parse.quote(link['url'], safe=':/?=&')
            valid_links.append(link)
        elif args.debug:
            print(f"Invalid link: {link.get('name', 'Unknown')} - Category: {cat}, Subcategory: {subcat}", file=sys.stderr)
    
    if args.debug:
        print(f"\nFound {len(valid_links)} valid links", file=sys.stderr)
    if not valid_links:
        print("No valid links found.", file=sys.stderr)
        sys.exit(1)
    # Prepare fzf options
    options = []
    for l in valid_links:
        # Clean up the description for display
        description = l.get('description', '').encode('utf-8').decode('unicode_escape')
        options.append(f"{l['category']} | {l['subcategory']} | {l['name']}\t{l.get('url','')}\t{description}")
    
    # FZF header and preview
    header = "Category | Subcategory | Name"
    # Run fzf with a minimal preview that won't cause shell issues
    selected = iterfzf(
        options,
        header=header,
        preview="echo URL: {2}; echo Description: {3}",
        __extra__=["--delimiter=\t", "--with-nth=1", "--preview-window=up:2"]
    )
    if selected:
        # Extract URL from selected line and ensure it's properly encoded
        url = selected.split('\t')[1]
        if url:
            try:
                webbrowser.open(url)
            except Exception as e:
                print(f"Error opening URL: {e}", file=sys.stderr)
                sys.exit(1)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        # Suppress Ctrl+C output and exit cleanly
        pass 