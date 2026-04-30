-- H100 Lounge & Bar - Beverages Menu Seed Script
-- This script populates the menu_items and categories tables with all beverages from the physical menu
-- Run this in Supabase SQL Editor after tables are created

-- First, delete existing menu items and categories to start fresh (optional - comment out if you want to keep existing data)
-- DELETE FROM menu_items;
-- DELETE FROM categories;

-- Insert Categories in display order
INSERT INTO categories (name, slug, description, display_order) VALUES
('Energy Drinks', 'energy-drinks', 'High-energy beverages to boost your day', 1),
('Soft Drinks', 'soft-drinks', 'Non-alcoholic refreshing beverages', 2),
('Beer', 'beer', 'Selection of premium and popular beers', 3),
('Red Wine', 'red-wine', 'Rich and bold red wines', 4),
('White Wine', 'white-wine', 'Crisp and refreshing white wines', 5),
('Sparkling Wine', 'sparkling-wine', 'Celebratory sparkling wines and champagne', 6),
('Whisky', 'whisky', 'Fine whiskies from around the world', 7),
('Vodka', 'vodka', 'Premium vodka selections', 8),
('Tequila', 'tequila', 'Quality tequilas for perfect cocktails', 9),
('Cognac', 'cognac', 'Sophisticated cognacs and brandies', 10),
('Cream', 'cream', 'Smooth cream liqueurs', 11),
('Liquor', 'liquor', 'Specialty liquors and bitters', 12),
('Others', 'others', 'Other premium spirits and beverages', 13)
ON CONFLICT (slug) DO NOTHING;

-- Get category IDs for reference
WITH category_ids AS (
  SELECT id, slug FROM categories
)

-- Insert Energy Drinks
INSERT INTO menu_items (category_id, name, description, price, is_available, display_order)
SELECT 
  (SELECT id FROM categories WHERE slug = 'energy-drinks'),
  item_name,
  'Energy drink',
  0,
  true,
  ROW_NUMBER() OVER (ORDER BY item_name)
FROM (VALUES
  ('Power Horse'),
  ('Red Bull'),
  ('Fearless'),
  ('Super Commando')
) AS items(item_name)
ON CONFLICT DO NOTHING;

-- Insert Soft Drinks
INSERT INTO menu_items (category_id, name, description, price, is_available, display_order)
SELECT 
  (SELECT id FROM categories WHERE slug = 'soft-drinks'),
  item_name,
  'Non-alcoholic beverage',
  0,
  true,
  ROW_NUMBER() OVER (ORDER BY item_name)
FROM (VALUES
  ('Coke'),
  ('Sprite'),
  ('Eva Water (Small)'),
  ('Fayrouz'),
  ('Malta Guinness'),
  ('Maltina'),
  ('Hollandia Yoghurt'),
  ('Chivita'),
  ('5Alive'),
  ('Cranberry')
) AS items(item_name)
ON CONFLICT DO NOTHING;

-- Insert Beer
INSERT INTO menu_items (category_id, name, description, price, is_available, display_order)
SELECT 
  (SELECT id FROM categories WHERE slug = 'beer'),
  item_name,
  'Premium beer selection',
  0,
  true,
  ROW_NUMBER() OVER (ORDER BY item_name)
FROM (VALUES
  ('Heineken'),
  ('Gulder'),
  ('Star Radler'),
  ('33 Export'),
  ('Goldberg'),
  ('Goldberg Black'),
  ('Legend (Large)'),
  ('Smirnoff Ice (Small)'),
  ('Smirnoff Ice (Large)'),
  ('Guinness Stout (Large)'),
  ('Guinness Stout (Medium)'),
  ('Trophy'),
  ('Budweiser'),
  ('Origin Beer'),
  ('Flying Fish'),
  ('Desperado')
) AS items(item_name)
ON CONFLICT DO NOTHING;

-- Insert Red Wine
INSERT INTO menu_items (category_id, name, description, price, is_available, display_order)
SELECT 
  (SELECT id FROM categories WHERE slug = 'red-wine'),
  item_name,
  'Red wine',
  0,
  true,
  ROW_NUMBER() OVER (ORDER BY item_name)
FROM (VALUES
  ('Carlo Rossi (Red)'),
  ('Four Cousins (Red)'),
  ('Agor'),
  ('4th Street'),
  ('Blue Nun Pink Ice'),
  ('Nederburg (Red)')
) AS items(item_name)
ON CONFLICT DO NOTHING;

-- Insert White Wine
INSERT INTO menu_items (category_id, name, description, price, is_available, display_order)
SELECT 
  (SELECT id FROM categories WHERE slug = 'white-wine'),
  item_name,
  'White wine',
  0,
  true,
  ROW_NUMBER() OVER (ORDER BY item_name)
FROM (VALUES
  ('Four Cousins (White)'),
  ('Nederburg (White)')
) AS items(item_name)
ON CONFLICT DO NOTHING;

-- Insert Sparkling Wine
INSERT INTO menu_items (category_id, name, description, price, is_available, display_order)
SELECT 
  (SELECT id FROM categories WHERE slug = 'sparkling-wine'),
  item_name,
  'Sparkling wine',
  0,
  true,
  ROW_NUMBER() OVER (ORDER BY item_name)
FROM (VALUES
  ('Moet Rosé'),
  ('Andre Rosé'),
  ('Veuve du Vernay'),
  ('Martini Rosé'),
  ('Belaire Rosé'),
  ('Blue Nun 24K Gold')
) AS items(item_name)
ON CONFLICT DO NOTHING;

-- Insert Whisky
INSERT INTO menu_items (category_id, name, description, price, is_available, display_order)
SELECT 
  (SELECT id FROM categories WHERE slug = 'whisky'),
  item_name,
  'Fine whisky',
  0,
  true,
  ROW_NUMBER() OVER (ORDER BY item_name)
FROM (VALUES
  ('Ballantine'),
  ('Jameson Original'),
  ('Jameson Black Barrel'),
  ('Glenfiddich 12 YRS'),
  ('Glenfiddich 15 YRS'),
  ('Glenfiddich 18 YRS'),
  ('Jack Daniels'),
  ('Singleton 12 YRS'),
  ('Macallan 12 YRS'),
  ('Macallan 15 YRS'),
  ('Monkey Shoulder'),
  ('Black Label')
) AS items(item_name)
ON CONFLICT DO NOTHING;

-- Insert Vodka
INSERT INTO menu_items (category_id, name, description, price, is_available, display_order)
SELECT 
  (SELECT id FROM categories WHERE slug = 'vodka'),
  item_name,
  'Premium vodka',
  0,
  true,
  ROW_NUMBER() OVER (ORDER BY item_name)
FROM (VALUES
  ('Absolute Vodka'),
  ('Smirnoff Medium'),
  ('Smirnoff Large')
) AS items(item_name)
ON CONFLICT DO NOTHING;

-- Insert Tequila
INSERT INTO menu_items (category_id, name, description, price, is_available, display_order)
SELECT 
  (SELECT id FROM categories WHERE slug = 'tequila'),
  item_name,
  'Quality tequila',
  0,
  true,
  ROW_NUMBER() OVER (ORDER BY item_name)
FROM (VALUES
  ('Azul Classic'),
  ('Don Julio'),
  ('Casamigos Reposado'),
  ('Casamigos Blanco'),
  ('Olmeca Tequila'),
  ('Sierra Tequila'),
  ('Pedro Ogogoro')
) AS items(item_name)
ON CONFLICT DO NOTHING;

-- Insert Cognac
INSERT INTO menu_items (category_id, name, description, price, is_available, display_order)
SELECT 
  (SELECT id FROM categories WHERE slug = 'cognac'),
  item_name,
  'Premium cognac',
  0,
  true,
  ROW_NUMBER() OVER (ORDER BY item_name)
FROM (VALUES
  ('Martell VS'),
  ('Martell VSOP'),
  ('Martell Blue Swift'),
  ('Hennessy VS'),
  ('Hennessy VSOP'),
  ('Hennessy XO'),
  ('Remy Martin VSOP')
) AS items(item_name)
ON CONFLICT DO NOTHING;

-- Insert Cream Liqueurs
INSERT INTO menu_items (category_id, name, description, price, is_available, display_order)
SELECT 
  (SELECT id FROM categories WHERE slug = 'cream'),
  item_name,
  'Smooth cream liqueur',
  0,
  true,
  ROW_NUMBER() OVER (ORDER BY item_name)
FROM (VALUES
  ('Baileys'),
  ('Best Cream')
) AS items(item_name)
ON CONFLICT DO NOTHING;

-- Insert Liquor (Specialty)
INSERT INTO menu_items (category_id, name, description, price, is_available, display_order)
SELECT 
  (SELECT id FROM categories WHERE slug = 'liquor'),
  item_name,
  'Specialty liquor',
  0,
  true,
  ROW_NUMBER() OVER (ORDER BY item_name)
FROM (VALUES
  ('Jägermeister'),
  ('Origin Bitters')
) AS items(item_name)
ON CONFLICT DO NOTHING;

-- Insert Others
INSERT INTO menu_items (category_id, name, description, price, is_available, display_order)
SELECT 
  (SELECT id FROM categories WHERE slug = 'others'),
  item_name,
  'Premium spirit',
  0,
  true,
  ROW_NUMBER() OVER (ORDER BY item_name)
FROM (VALUES
  ('Williams Lawson'),
  ('Bombay'),
  ('Barcadi')
) AS items(item_name)
ON CONFLICT DO NOTHING;

-- Verify the data was inserted
SELECT 'Categories created:' AS status, COUNT(*) as count FROM categories;
SELECT 'Menu items created:' AS status, COUNT(*) as count FROM menu_items;
SELECT c.name as category, COUNT(m.id) as item_count
FROM categories c
LEFT JOIN menu_items m ON c.id = m.category_id
GROUP BY c.id, c.name
ORDER BY c.display_order;
