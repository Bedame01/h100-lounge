-- H100 price lists from PDFs with original drink categories + food sections
-- Run scripts/005_create_menu_vip_and_food.sql first

DELETE FROM menu_items_food;
DELETE FROM menu_items_vip;
DELETE FROM menu_items;
DELETE FROM food_categories;
DELETE FROM categories;

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
('Others', 'others', 'Other premium spirits and beverages', 13);

INSERT INTO food_categories (name, slug, description, display_order) VALUES
('Pepper Soup', 'pepper-soup', 'Traditional pepper soups', 1),
('Small Chops', 'small-chops', 'Peppered bites and grilled favourites', 2),
('Rice', 'rice', 'Jollof and fried rice dishes', 3),
('Main Dishes', 'main-dishes', 'Hearty plates and combos', 4),
('Platters', 'platters', 'Sharing platters', 5),
('Sides', 'sides', 'Sides and extras', 6);

-- menu_items (60 items)
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'soft-drinks'), 'Water', 1000, true, 1;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'energy-drinks'), 'Power Horse', 2500, true, 1;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'soft-drinks'), 'Sprite', 1500, true, 2;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'energy-drinks'), 'Red Bull', 3000, true, 2;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'soft-drinks'), 'Coke', 1500, true, 3;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'soft-drinks'), 'Black Bullet', 3500, true, 4;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'soft-drinks'), 'Fayrouz', 1500, true, 5;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'soft-drinks'), 'Maltina', 1500, true, 6;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'soft-drinks'), 'Schweppes', 1500, true, 7;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'soft-drinks'), 'Hollandia Yoghurt', 3500, true, 8;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'red-wine'), 'Agor', 20000, true, 1;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'soft-drinks'), 'Chivita', 3500, true, 9;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'red-wine'), '4th Street Red', 20000, true, 2;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'soft-drinks'), '5Alive', 3500, true, 10;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'red-wine'), 'Sweet kiss Red', 20000, true, 3;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'red-wine'), 'Four cousins', 25000, true, 4;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'red-wine'), 'Carlo Rossi', 25000, true, 5;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'red-wine'), 'Nederburg', 30000, true, 6;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Desperado', 2000, true, 1;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Flying Fish', 2000, true, 2;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Trophy', 2500, true, 3;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Goldberg', 2500, true, 4;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Goldberg Black', 2500, true, 5;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Origin pet', 3000, true, 6;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Legend', 2500, true, 7;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'liquor'), 'Jagermeister', 40000, true, 1;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Star Radler', 2500, true, 8;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'liquor'), 'Campari', 40000, true, 2;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), '33 Export', 2500, true, 9;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Heineken', 3000, true, 10;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Budwesser', 3000, true, 11;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Smirnoff Ice', 3000, true, 12;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Origin Beer', 3000, true, 13;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'vodka'), 'Smirnoff Large', 20000, true, 1;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Gulder', 3000, true, 14;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'vodka'), 'Absolute Vodka', 30000, true, 2;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Guinness Stout', 3500, true, 15;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'others'), 'Barcadi', 30000, true, 1;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'cognac'), 'Martell VS', 95000, true, 1;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'red-wine'), 'All Seasons', 20000, true, 7;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'cognac'), 'Hennessy VS', 95000, true, 2;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'whisky'), 'William Lawson', 25000, true, 1;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'cognac'), 'Dusse', 130000, true, 3;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'whisky'), 'Ballatines', 35000, true, 2;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'cognac'), 'Martell Blue Swift', 145000, true, 4;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'whisky'), 'Jameson Original', 45000, true, 3;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'cognac'), 'Hennessy VSOP', 145000, true, 5;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'whisky'), 'Jack Daniels', 55000, true, 4;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'whisky'), 'Jameson Black Barrel', 60000, true, 5;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'sparkling-wine'), 'Veuve du Vernay', 25000, true, 1;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'sparkling-wine'), 'Andre Rose', 30000, true, 2;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'sparkling-wine'), 'Bellaire Rose', 110000, true, 3;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'cream'), 'Best Cream', 5000, true, 1;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'cream'), 'Baileys', 40000, true, 2;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'tequila'), 'Sierra Tequila', 43000, true, 1;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'tequila'), 'Olmeca Blanca', 55000, true, 2;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'others'), 'Shisha', 8000, true, 2;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'tequila'), 'Casamigos Reposado', 240000, true, 3;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'tequila'), 'Barcadi Shots', 2500, true, 4;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'tequila'), 'Tequila Shots', 2500, true, 5;

-- menu_items_vip (53 items)
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'soft-drinks'), 'Water', 1500, true, 1;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'soft-drinks'), 'Coke', 2000, true, 2;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'liquor'), 'Jagermeister', 50000, true, 1;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'soft-drinks'), '5 Alive', 4500, true, 3;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'liquor'), 'Campari', 50000, true, 2;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'soft-drinks'), 'Chivita', 4500, true, 4;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'vodka'), 'Absolute Vodka', 40000, true, 1;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'energy-drinks'), 'Power Horse', 3500, true, 1;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'others'), 'Barcadi', 40000, true, 1;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'energy-drinks'), 'Red Bull', 4000, true, 2;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'cognac'), 'Hennessy VS', 105000, true, 1;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'red-wine'), 'Agor', 30000, true, 1;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'cognac'), 'Martell VS', 105000, true, 2;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'red-wine'), '4th Street Red', 30000, true, 2;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'cognac'), 'Dusse', 150000, true, 3;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'red-wine'), 'Sweet kiss Red', 30000, true, 3;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'cognac'), 'Hennessy VSOP', 155000, true, 4;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'red-wine'), 'Four cousins', 35000, true, 4;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'cognac'), 'Martell Blue Swift', 155000, true, 5;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'red-wine'), 'Carlo Rossi', 35000, true, 5;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'red-wine'), 'Nederburg', 40000, true, 6;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'sparkling-wine'), 'Veuve du Vernay', 40000, true, 1;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'cream'), 'Baileys', 50000, true, 1;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'sparkling-wine'), 'Andre Rose', 40000, true, 2;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'sparkling-wine'), 'Bellaire Rose', 120000, true, 3;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'others'), 'Shisha', 10000, true, 2;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'tequila'), 'Sierra Tequila', 50000, true, 1;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'tequila'), 'Olmeca Blanca', 60000, true, 2;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'tequila'), 'Don Julio', 210000, true, 3;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'tequila'), 'Barcadi Shots', 3500, true, 4;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'tequila'), 'Casamigos Reposado', 260000, true, 5;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'tequila'), 'Tequila Shots', 4000, true, 6;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'tequila'), 'Azul', 350000, true, 7;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'whisky'), 'Ballatines', 45000, true, 1;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'whisky'), 'Jameson Original', 50000, true, 2;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'whisky'), 'Jack Daniels', 65000, true, 3;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'whisky'), 'Jameson Black', 75000, true, 4;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'whisky'), 'Glenfiddish 12 YRS', 130000, true, 5;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'whisky'), 'Glenfiddish 15 YRS', 160000, true, 6;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Trophy', 3000, true, 1;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Goldberg', 3000, true, 2;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Goldberg Black', 3000, true, 3;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Desperado', 3000, true, 4;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Flying Fish', 3000, true, 5;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Legend', 3000, true, 6;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Star Radler', 3000, true, 7;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), '33 Export', 3000, true, 8;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Guinness Stout', 4000, true, 9;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Heineken', 4000, true, 10;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Budwesser', 4000, true, 11;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Smirnoff Ice', 4000, true, 12;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Origin Beer', 4000, true, 13;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Gulder', 4000, true, 14;

-- menu_items_food
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'pepper-soup'), 'Goat Meat Pepper Soup', 7500, true, 1;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'pepper-soup'), 'Turkey Pepper Soup', 7000, true, 2;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'pepper-soup'), 'Assorted Pepper Soup', 7000, true, 3;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'pepper-soup'), 'Catfish Pepper Soup', 10000, true, 4;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'pepper-soup'), 'Croaker Fish Pepper Soup', 10000, true, 5;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'pepper-soup'), 'Owere Pepper Soup', 12000, true, 6;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'small-chops'), 'Chicken', 6000, true, 1;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'small-chops'), 'Peppered Turkey', 7000, true, 2;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'small-chops'), 'Peppered Beef', 6000, true, 3;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'small-chops'), 'Gizzard', 6000, true, 4;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'small-chops'), 'Spicy Wings', 6000, true, 5;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'small-chops'), 'Peppered Snail', 7000, true, 6;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'small-chops'), 'Bbq Wings', 6000, true, 7;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'small-chops'), 'Spicy Fish', 7000, true, 8;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'small-chops'), 'Giz-Dodo', 7000, true, 9;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'rice'), 'Jollof Rice And Chicken/beef', 8500, true, 1;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'rice'), 'Jollof Rice And Turkey/fish/goat Meat', 9000, true, 2;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'rice'), 'Fried Rice And Chicken/beef', 8500, true, 3;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'rice'), 'Fried Rice And Turkey/fish/goat Meat', 9000, true, 4;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'main-dishes'), 'Chicken And Chips', 8500, true, 1;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'main-dishes'), 'Turkey And Chips', 9000, true, 2;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'main-dishes'), 'Chicken Shawarma', 6000, true, 3;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'main-dishes'), 'Chicken Stir Fry Pasta', 12000, true, 4;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'main-dishes'), 'Beef Stir Fry Pasta', 12000, true, 5;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'main-dishes'), 'Special Noodles', 10000, true, 6;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'main-dishes'), 'Native Rice With Any Protein Of Choices', 12000, true, 7;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'platters'), 'Mini Platter {Gizzard, Wings, Chicken, Yam Chips, Spring Rolls, Sausage, Coleslaw}', 30000, true, 1;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'sides'), 'White Rice', 2500, true, 1;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'sides'), 'Special Fried Rice', 3000, true, 2;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'sides'), 'Chips', 2500, true, 3;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'sides'), 'Plantain', 2500, true, 4;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'sides'), 'Yam Chips', 3000, true, 5;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'sides'), 'Extra Jollof Rice', 2500, true, 6;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'sides'), 'Coleslaw', 2500, true, 7;
