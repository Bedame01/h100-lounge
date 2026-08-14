"""
Regenerate 006_seed_from_price_lists.sql with drink + food categories.
Run: python scripts/generate_categorized_seed.py
"""

import pdfplumber
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

DRINK_CATEGORIES = [
    ("Energy Drinks", "energy-drinks", "High-energy beverages to boost your day", 1),
    ("Soft Drinks", "soft-drinks", "Non-alcoholic refreshing beverages", 2),
    ("Beer", "beer", "Selection of premium and popular beers", 3),
    ("Red Wine", "red-wine", "Rich and bold red wines", 4),
    ("White Wine", "white-wine", "Crisp and refreshing white wines", 5),
    ("Sparkling Wine", "sparkling-wine", "Celebratory sparkling wines and champagne", 6),
    ("Whisky", "whisky", "Fine whiskies from around the world", 7),
    ("Vodka", "vodka", "Premium vodka selections", 8),
    ("Tequila", "tequila", "Quality tequilas for perfect cocktails", 9),
    ("Cognac", "cognac", "Sophisticated cognacs and brandies", 10),
    ("Cream", "cream", "Smooth cream liqueurs", 11),
    ("Liquor", "liquor", "Specialty liquors and bitters", 12),
    ("Others", "others", "Other premium spirits and beverages", 13),
]

# Map PDF item names to category slug (from 003_seed_beverages grouping)
DRINK_CATEGORY_BY_NAME = {
    "Water": "soft-drinks",
    "Power Horse": "energy-drinks",
    "Red Bull": "energy-drinks",
    "Sprite": "soft-drinks",
    "Coke": "soft-drinks",
    "Black Bullet": "soft-drinks",
    "Fayrouz": "soft-drinks",
    "Maltina": "soft-drinks",
    "Schweppes": "soft-drinks",
    "Hollandia Yoghurt": "soft-drinks",
    "Chivita": "soft-drinks",
    "5Alive": "soft-drinks",
    "5 Alive": "soft-drinks",
    "Desperado": "beer",
    "Flying Fish": "beer",
    "Trophy": "beer",
    "Goldberg": "beer",
    "Goldberg Black": "beer",
    "Origin pet": "beer",
    "Legend": "beer",
    "Star Radler": "beer",
    "33 Export": "beer",
    "Heineken": "beer",
    "Budwesser": "beer",
    "Smirnoff Ice": "beer",
    "Origin Beer": "beer",
    "Gulder": "beer",
    "Guinness Stout": "beer",
    "Agor": "red-wine",
    "4th Street Red": "red-wine",
    "Sweet kiss Red": "red-wine",
    "Four cousins": "red-wine",
    "Carlo Rossi": "red-wine",
    "Nederburg": "red-wine",
    "All Seasons": "red-wine",
    "Veuve du Vernay": "sparkling-wine",
    "Andre Rose": "sparkling-wine",
    "Bellaire Rose": "sparkling-wine",
    "Ballatines": "whisky",
    "Jameson Original": "whisky",
    "Jameson Black Barrel": "whisky",
    "Jameson Black": "whisky",
    "Jack Daniels": "whisky",
    "Glenfiddish 12 YRS": "whisky",
    "Glenfiddish 15 YRS": "whisky",
    "William Lawson": "whisky",
    "Absolute Vodka": "vodka",
    "Smirnoff Large": "vodka",
    "Sierra Tequila": "tequila",
    "Olmeca Blanca": "tequila",
    "Don Julio": "tequila",
    "Casamigos Reposado": "tequila",
    "Azul": "tequila",
    "Barcadi Shots": "tequila",
    "Tequila Shots": "tequila",
    "Martell VS": "cognac",
    "Martell Blue Swift": "cognac",
    "Hennessy VS": "cognac",
    "Hennessy VSOP": "cognac",
    "Dusse": "cognac",
    "Baileys": "cream",
    "Best Cream": "cream",
    "Jagermeister": "liquor",
    "Campari": "liquor",
    "Barcadi": "others",
    "Shisha": "others",
}

FOOD_CATEGORIES = [
    ("Pepper Soup", "pepper-soup", "Traditional pepper soups", 1),
    ("Small Chops", "small-chops", "Peppered bites and grilled favourites", 2),
    ("Rice", "rice", "Jollof and fried rice dishes", 3),
    ("Main Dishes", "main-dishes", "Hearty plates and combos", 4),
    ("Platters", "platters", "Sharing platters", 5),
    ("Sides", "sides", "Sides and extras", 6),
]

FOOD_ITEMS = [
    # Soups
    ("Goat Meat Pepper Soup", 10000, "pepper-soup"),
    ("Turkey Pepper Soup", 10000, "pepper-soup"),
    ("Assorted Pepper Soup", 9000, "pepper-soup"),
    ("Catfish Pepper Soup", 15000, "pepper-soup"),
    ("Croaker Fish Pepper Soup", 16500, "pepper-soup"),
    ("Owere Pepper Soup", 13000, "pepper-soup"),

    # Quick Bites
    ("Chicken", 8000, "small-chops"),
    ("Peppered Turkey", 9000, "small-chops"),
    ("Peppered Beef", 8000, "small-chops"),
    ("Gizzard", 8000, "small-chops"),
    ("Spicy Wings", 7000, "small-chops"),
    ("Peppered Snail", 10000, "small-chops"),
    ("Buffalo Wing (BBQ Sauce)", 8000, "small-chops"),
    ("Spicy Fish", 10000, "small-chops"),
    ("Giz-Dodo", 10000, "small-chops"),
    ("Chicken And Chips", 11000, "small-chops"),
    ("Turkey And Chips", 12000, "small-chops"),
    ("Double Sausage Chicken Shawarma", 7000, "small-chops"),
    ("Double Sausage Beef Shawarma", 7000, "small-chops"),

    # Rice
    ("Jollof Rice And Chicken/Beef", 11000, "rice"),
    ("Jollof Rice And Turkey/Fish/Goat Meat", 12000, "rice"),
    ("Fried Rice And Chicken/beef", 11000, "rice"),
    ("Fried Rice And Turkey/fish/goat Meat", 12000, "rice"),

    # Pasta
    ("Chicken Stir Fry Pasta", 12000, "main-dishes"),
    ("Beef Stir Fry Pasta", 12000, "main-dishes"),
    ("H100 Special Stir Fry Noodles", 10000, "main-dishes"),

    # Sides
    ("White Rice", 2500, "sides"),
    ("Special Fried Rice", 4000, "sides"),
    ("Chips", 3000, "sides"),
    ("Plantain", 2000, "sides"),
    ("Yam Chips", 3000, "sides"),
    ("Extra Jollof Rice", 3000, "sides"),
    ("Coleslaw", 2500, "sides"),
    ("Fried / Boil Egg", 1000, "sides"),
    ("Yamarita", 6000, "sides"),

    # Platters
    ("Native Rice With Any Protein Of Choices", 15000, "platters"),
    ("H100 Special Platter {Gizzard, BBQ Wings, Chickens, Chips, Sausage, Coleslaw}", 35000, "platters"),
]


def parse_drinks(path: str):
    skip = ["DRINKS", "RELAX", "Price-list", "H100 LOUNGE", "Drink", "MENU", "P R I C E"]
    items = []
    with pdfplumber.open(ROOT / path) as pdf:
        lines = []
        for page in pdf.pages:
            lines.extend((page.extract_text() or "").split("\n"))
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        if not line or any(p in line for p in skip) or line in ("1", "00"):
            i += 1
            continue
        if "#" in line:
            for m in re.finditer(r"([^#]+?)\s*#([\d,]+)", line):
                name = m.group(1).strip().replace("\x00", "")
                if "Martell Blue Swi" in name:
                    name = "Martell Blue Swift"
                price = int(m.group(2).replace(",", ""))
                if name and len(name) > 1 and not name.isdigit():
                    items.append((name, price))
            i += 1
        elif i + 1 < len(lines) and lines[i + 1].strip().startswith("#"):
            name = line.replace("\x00", "")
            if "Martell Blue Swi" in name:
                name = "Martell Blue Swift"
            price = int(lines[i + 1].strip().lstrip("#").replace(",", ""))
            items.append((name, price))
            i += 2
        else:
            i += 1
    return items


def esc(s: str) -> str:
    return s.replace("'", "''")


def category_order_counters():
    return {slug: 0 for _, slug, _, _ in DRINK_CATEGORIES}


def assign_drinks(items):
    counters = category_order_counters()
    rows = []
    for name, price in items:
        slug = DRINK_CATEGORY_BY_NAME.get(name)
        if not slug:
            raise ValueError(f"No category mapping for drink: {name!r}")
        counters[slug] += 1
        rows.append((name, price, slug, counters[slug]))
    return rows


def main():
    downstairs = parse_drinks("H100 PRICE LIST DOWNSTAIRS.pdf")
    vip = parse_drinks("H100 PRICE LIST VIP.pdf")
    down_rows = assign_drinks(downstairs)
    vip_rows = assign_drinks(vip)

    out = []
    out.append("-- H100 price lists from PDFs with original drink categories + food sections")
    out.append("-- Run scripts/005_create_menu_vip_and_food.sql first")
    out.append("")
    out.append("DELETE FROM menu_items_food;")
    out.append("DELETE FROM menu_items_vip;")
    out.append("DELETE FROM menu_items;")
    out.append("DELETE FROM food_categories;")
    out.append("DELETE FROM categories;")
    out.append("")

    out.append("INSERT INTO categories (name, slug, description, display_order) VALUES")
    cat_vals = ",\n".join(
        f"('{esc(n)}', '{slug}', '{esc(d)}', {o})" for n, slug, d, o in DRINK_CATEGORIES
    )
    out.append(cat_vals + ";")
    out.append("")

    out.append("INSERT INTO food_categories (name, slug, description, display_order) VALUES")
    food_vals = ",\n".join(
        f"('{esc(n)}', '{slug}', '{esc(d)}', {o})" for n, slug, d, o in FOOD_CATEGORIES
    )
    out.append(food_vals + ";")
    out.append("")

    def drink_inserts(table: str, rows):
        lines = [f"-- {table} ({len(rows)} items)"]
        for name, price, slug, order in rows:
            lines.append(
                f"INSERT INTO {table} (category_id, name, price, is_available, display_order) "
                f"SELECT (SELECT id FROM categories WHERE slug = '{slug}'), '{esc(name)}', {price}, true, {order};"
            )
        lines.append("")
        return lines

    out.extend(drink_inserts("menu_items", down_rows))
    out.extend(drink_inserts("menu_items_vip", vip_rows))

    food_counters = {slug: 0 for _, slug, _, _ in FOOD_CATEGORIES}
    out.append("-- menu_items_food")
    for name, price, slug in FOOD_ITEMS:
        food_counters[slug] += 1
        out.append(
            f"INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) "
            f"SELECT (SELECT id FROM food_categories WHERE slug = '{slug}'), '{esc(name)}', {price}, true, {food_counters[slug]};"
        )

    out_path = ROOT / "scripts" / "006_seed_from_price_lists.sql"
    out_path.write_text("\n".join(out) + "\n", encoding="utf-8")
    print(f"Wrote {out_path}")
    print(f"Downstairs: {len(down_rows)}, VIP: {len(vip_rows)}, Food: {len(FOOD_ITEMS)}")


if __name__ == "__main__":
    main()
