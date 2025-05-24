
import argparse
import json
from bs4 import BeautifulSoup
from collections import defaultdict
import requests
import os

def load_html_source(input_file=None, input_url=None):
    if input_file:
        with open(input_file, "r", encoding="utf-8") as f:
            return f.read()
    elif input_url:
        response = requests.get(input_url)
        response.raise_for_status()
        return response.text
    else:
        raise ValueError("Either input_file or input_url must be provided.")

def extract_links(soup):
    links = []
    for a in soup.find_all("a"):
        parent = a.find_parent(["dl", "body"])
        subcategory = None
        category = None

        while parent:
            prev_sibling = parent.find_previous_sibling("h3")
            if prev_sibling:
                if not subcategory:
                    subcategory = prev_sibling.text
                elif not category:
                    category = prev_sibling.text
                    break
            parent = parent.find_parent("dl")

        icon = a.get("icon")
        if icon and icon.startswith("data:image"):
            icon = None

        link = {
            "name": a.text,
            "url": a.get("href"),
            "description": "",
            "category": category or "Uncategorized",
            "subcategory": subcategory or "General",
        }
        if icon:
            link["icon"] = icon
        links.append(link)
    return links

def generate_links_js(links, output_path):
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(f"const links = {json.dumps(links, indent=2)};")

def generate_categories_js(links, output_path):
    category_map = defaultdict(set)
    for link in links:
        category = link.get("category", "Uncategorized")
        subcategory = link.get("subcategory", "General")
        category_map[category].add(subcategory)

    category_list = []
    for category, subcats in sorted(category_map.items()):
        category_entry = {
            "name": category,
            "icon": "bi-folder",
            "subcategories": [{"name": sub, "icon": "bi-file-earmark"} for sub in sorted(subcats)]
        }
        category_list.append(category_entry)

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(f"var categories = {json.dumps(category_list, indent=2)};")

def main():
    parser = argparse.ArgumentParser(
        description="Convert bookmark HTML to JavaScript files for links and categories."
    )
    parser.add_argument("--input-file", help="Path to the HTML bookmarks file")
    parser.add_argument("--input-url", help="URL of an HTML bookmarks page")
    parser.add_argument("--links-out", help="Output path for links JS file", default="links.js")
    parser.add_argument("--categories-out", help="Output path for categories JS file", default="categories.js")
    parser.add_argument("--generate-links", action="store_true", help="Generate links.js output")
    parser.add_argument("--generate-categories", action="store_true", help="Generate categories.js output")
    args = parser.parse_args()

    if not args.generate_links and not args.generate_categories:
        parser.error("You must specify at least one of --generate-links or --generate-categories")

    html = load_html_source(args.input_file, args.input_url)
    soup = BeautifulSoup(html, "html.parser")
    links = extract_links(soup)

    if args.generate_links:
        generate_links_js(links, args.links_out)
        print(f"Links written to {args.links_out}")

    if args.generate_categories:
        generate_categories_js(links, args.categories_out)
        print(f"Categories written to {args.categories_out}")

if __name__ == "__main__":
    main()
