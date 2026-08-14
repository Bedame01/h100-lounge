-- H100 price lists from PDFs with original drink categories + food sections
-- Run scripts/005_create_menu_vip_and_food.sql first

DELETE FROM menu_items_food;
DELETE FROM menu_items_vip;
DELETE FROM menu_items_cocktails;
DELETE FROM menu_items_mocktails;
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
('Others', 'others', 'Other premium spirits and beverages', 13),
('Cocktails', 'cocktails', 'Alcoholic mixed drink selections', 14),
('Mocktails', 'mocktails', 'Non-alcoholic mixed drink selections', 15);

INSERT INTO food_categories (name, slug, description, display_order) VALUES
('Pepper Soup', 'pepper-soup', 'Traditional pepper soups', 1),
('Small Chops', 'small-chops', 'Peppered bites and grilled favourites', 2),
('Rice', 'rice', 'Jollof and fried rice dishes', 3),
('Main Dishes', 'main-dishes', 'Hearty plates and combos', 4),
('Platters', 'platters', 'Sharing platters', 5),
('Sides', 'sides', 'Sides and extras', 6);

-- menu_items (120 items)
-- menu_items
-- SOFT DRINK
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'soft-drinks'), 'Water 75CL', 1000, true, 1;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'soft-drinks'), 'Sprite', 1500, true, 2;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'soft-drinks'), 'Coke', 1500, true, 3;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'soft-drinks'), 'Fayrouz', 1500, true, 4;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'soft-drinks'), 'Maltina', 1500, true, 5;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'soft-drinks'), 'Schweppes', 1500, true, 6;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'soft-drinks'), 'Hollandia Yoghurt', 3000, true, 7;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'soft-drinks'), 'Chivita', 3000, true, 8;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'soft-drinks'), '5Alive', 3000, true, 9;

-- BEER
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Desperado', 2000, true, 1;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Flying Fish', 2000, true, 2;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Star Radler', 2000, true, 3;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Trophy', 2100, true, 4;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Goldberg', 2100, true, 5;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), '33 Export', 2100, true, 6;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Legend', 2500, true, 7;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Goldberg Black', 2500, true, 8;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Heineken', 2500, true, 9;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Budweiser', 2500, true, 10;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Smirnoff Ice', 2500, true, 11;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Smirnoff Ice Guarana', 2500, true, 12;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Origin Beer', 2500, true, 13;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Gulder', 2500, true, 14;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Guinness Stout', 2500, true, 15;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Guinness Smooth', 2500, true, 16;

-- COGNAC
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'cognac'), 'Martell VS', 90000, true, 1;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'cognac'), 'Hennessy VS', 90000, true, 2;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'cognac'), 'Dusse', 125000, true, 3;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'cognac'), 'Martell Blue Swift', 135000, true, 4;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'cognac'), 'Hennessy VSOP', 135000, true, 5;

-- CHAMPAGNE
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'sparkling-wine'), 'Veuve du Vernay', 30000, true, 1;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'sparkling-wine'), 'Andre Rose', 30000, true, 2;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'sparkling-wine'), 'Bellaire Rose', 100000, true, 3;

-- TEQUILA
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'tequila'), 'Sierra Tequila', 40000, true, 1;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'tequila'), 'Olmeca Blanca', 50000, true, 2;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'tequila'), 'Silver Patron Tequila', 90000, true, 3;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'tequila'), 'Casamigos Reposado', 200000, true, 4;

-- SHOTS
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'tequila'), 'Tequila Shots', 2000, true, 1;

-- ENERGY DRINK
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'energy-drinks'), 'Power Horse', 2500, true, 1;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'energy-drinks'), 'Red Bull', 3000, true, 2;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'energy-drinks'), 'Black Bullet', 3000, true, 3;

-- WINES
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'red-wine'), '4th Street Wine', 20000, true, 1;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'sparkling-wine'), 'Chamdor Sparkling Wine', 20000, true, 1;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'red-wine'), 'Sweet kiss Red', 25000, true, 2;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'red-wine'), 'Four cousins', 25000, true, 3;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'red-wine'), 'Carlo Rossi', 25000, true, 4;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'red-wine'), 'Agor', 25000, true, 5;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'red-wine'), 'Nederburg', 30000, true, 6;

-- HERBAL DRINKS
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'beer'), 'Origin pet', 2500, true, 1;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'liquor'), 'Jagermeister', 40000, true, 1;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'liquor'), 'Campari', 35000, true, 2;

-- VODKA
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'vodka'), 'Smirnoff Large', 22000, true, 1;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'vodka'), 'Absolute Vodka', 30000, true, 2;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'others'), 'Barcadi', 30000, true, 1;

-- WHISKY
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'whisky'), 'All Seasons', 25000, true, 1;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'whisky'), 'William Lawson', 30000, true, 2;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'whisky'), 'Ballatines', 30000, true, 3;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'whisky'), 'Jameson Original', 45000, true, 4;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'whisky'), 'Jack Daniels', 45000, true, 5;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'whisky'), 'Jameson Black Barrel', 60000, true, 6;

-- CREAM
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'cream'), 'Best Cream Small', 3500, true, 1;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'cream'), 'Baileys', 40000, true, 2;

-- ORDERS
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'others'), 'Shisha', 7000, true, 1;
INSERT INTO menu_items (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'others'), 'Premium Shisha', 10000, true, 2;

-- menu_items_vip (97 items)
-- menu_items_vip
-- SOFT DRINK
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'soft-drinks'), 'Water 75CL', 1500, true, 1;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'soft-drinks'), 'Coke', 2000, true, 2;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'soft-drinks'), 'Schweppes', 2000, true, 3;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'soft-drinks'), 'Hollandia Yoghurt', 4000, true, 4;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'soft-drinks'), 'Chivita', 4000, true, 5;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'soft-drinks'), '5Alive', 4500, true, 6;

-- COGNAC
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'cognac'), 'Martell VS', 100000, true, 1;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'cognac'), 'Hennessy VS', 100000, true, 2;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'cognac'), 'Dusse', 130000, true, 3;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'cognac'), 'Martell Blue Swift', 135000, true, 4;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'cognac'), 'Hennessy VSOP', 135000, true, 5;

-- CHAMPAGNE
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'sparkling-wine'), 'Veuve du Vernay', 40000, true, 1;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'sparkling-wine'), 'Andre Rose', 40000, true, 2;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'sparkling-wine'), 'Bellaire Rose', 120000, true, 3;

-- TEQUILA
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'tequila'), 'Sierra Tequila', 50000, true, 1;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'tequila'), 'Olmeca Blanca', 60000, true, 2;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'tequila'), 'Silver Patron Tequila', 90000, true, 3;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'tequila'), 'Don Julio', 200000, true, 4;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'tequila'), 'Casamigos Reposado', 220000, true, 5;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'tequila'), 'Azul', 350000, true, 6;

-- SHOTS
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'tequila'), 'Tequila Shots', 2500, true, 1;

-- ORDERS
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'others'), 'Shisha', 10000, true, 1;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'others'), 'Premium Shisha', 12000, true, 2;

-- MIXER
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'energy-drinks'), 'Power Horse', 3000, true, 1;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'energy-drinks'), 'Red Bull', 3500, true, 2;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'energy-drinks'), 'Black Bullet', 3500, true, 3;

-- WINES
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'red-wine'), '4th Street Wine', 30000, true, 1;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'sparkling-wine'), 'Chamdor Sparkling Wine', 30000, true, 1;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'red-wine'), 'Sweet kiss Red', 30000, true, 2;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'red-wine'), 'Four cousins', 35000, true, 3;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'red-wine'), 'Carlo Rossi', 35000, true, 4;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'red-wine'), 'Agor', 35000, true, 5;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'red-wine'), 'Nederburg', 40000, true, 6;

-- HERBAL DRINKS
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'liquor'), 'Jagermeister', 50000, true, 1;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'liquor'), 'Campari', 50000, true, 2;

-- VODKA
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'vodka'), 'Absolute Vodka', 50000, true, 1;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'others'), 'Barcadi', 50000, true, 1;

-- WHISKY
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'whisky'), 'Ballatines', 45000, true, 1;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'whisky'), 'Jameson Original', 50000, true, 2;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'whisky'), 'Jack Daniels', 55000, true, 3;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'whisky'), 'Jameson Black Barrel', 65000, true, 4;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'whisky'), 'Glenfiddish 12 YRS', 120000, true, 5;
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'whisky'), 'Glenfiddish 15 YRS', 150000, true, 6;

-- CREAM
INSERT INTO menu_items_vip (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM categories WHERE slug = 'cream'), 'Baileys', 50000, true, 1;

-- menu_items_cocktails (0 items)

-- menu_items_mocktails
INSERT INTO menu_items_mocktails (category_id, name, description, price, is_available, display_order)
SELECT (SELECT id FROM categories WHERE slug = 'mocktails'), 'CHAPMAN', 'Orange Juice || Fanta || Sprite || Grenadine || Bitters', 5000, true, 1;
INSERT INTO menu_items_mocktails (category_id, name, description, price, is_available, display_order)
SELECT (SELECT id FROM categories WHERE slug = 'mocktails'), 'VIRGIN ORANGE MOJITO', 'Mint Sugar || Lemon wedger || Soda', 6000, true, 2;
INSERT INTO menu_items_mocktails (category_id, name, description, price, is_available, display_order)
SELECT (SELECT id FROM categories WHERE slug = 'mocktails'), 'SUMMER SKY', '3 dashes of Agustura bitter || sprite Orange || Blue Curacao', 6000, true, 3;
INSERT INTO menu_items_mocktails (category_id, name, description, price, is_available, display_order)
SELECT (SELECT id FROM categories WHERE slug = 'mocktails'), 'BANANA SMOOTHIE', 'Banana || Yoghurt || Milk || banana syrup', 6000, true, 4;
INSERT INTO menu_items_mocktails (category_id, name, description, price, is_available, display_order)
SELECT (SELECT id FROM categories WHERE slug = 'mocktails'), 'PINEAPPLE SMOOTHIE', 'Pineapple || Yoghurt Milk || banana syrup', 6000, true, 5;
INSERT INTO menu_items_mocktails (category_id, name, description, price, is_available, display_order)
SELECT (SELECT id FROM categories WHERE slug = 'mocktails'), 'STRAWBERRY MILKSHAKE', NULL, 7000, true, 6;
INSERT INTO menu_items_mocktails (category_id, name, description, price, is_available, display_order)
SELECT (SELECT id FROM categories WHERE slug = 'mocktails'), 'STRAWBERRY SMOOTHIE', 'Frozen Strawberry || Yoghurt || Strawberry syrup || Milk', 7000, true, 7;
INSERT INTO menu_items_mocktails (category_id, name, description, price, is_available, display_order)
SELECT (SELECT id FROM categories WHERE slug = 'mocktails'), 'VANILLA MILK SHAKE', 'Strawberry ice cream || Strawberry syrup || Milk', 7000, true, 8;
INSERT INTO menu_items_mocktails (category_id, name, description, price, is_available, display_order)
SELECT (SELECT id FROM categories WHERE slug = 'mocktails'), 'VACCINES COVID-19', 'Cloves || Yoghurt || Orange kiwi || Papaya || Lemon', 7000, true, 9;
INSERT INTO menu_items_mocktails (category_id, name, description, price, is_available, display_order)
SELECT (SELECT id FROM categories WHERE slug = 'mocktails'), 'CHOCOLATE MILK SHAKE', 'Chocolate ice cream || Chocolate syrup || Milk', 7000, true, 10;

-- menu_items_cocktails
INSERT INTO menu_items_cocktails (category_id, name, description, price, is_available, display_order)
SELECT (SELECT id FROM categories WHERE slug = 'cocktails'), 'ZOMBIE', 'white Rum || Orange Curacao || Lemon Juice || dark Rum || Kiip drip || Orgeat Syrup || Tequila || Pineapple juice || Lemon zest', 8000, true, 1;
INSERT INTO menu_items_cocktails (category_id, name, description, price, is_available, display_order)
SELECT (SELECT id FROM categories WHERE slug = 'cocktails'), 'PINA COLADA', 'Malibu Rum || Bacardi Rum || Whipping cream', 8000, true, 2;
INSERT INTO menu_items_cocktails (category_id, name, description, price, is_available, display_order)
SELECT (SELECT id FROM categories WHERE slug = 'cocktails'), 'LONG ISLAN', 'Cointreau || Tequila || Bacardi || Vodka Gin || Coke || Lime', 8000, true, 3;
INSERT INTO menu_items_cocktails (category_id, name, description, price, is_available, display_order)
SELECT (SELECT id FROM categories WHERE slug = 'cocktails'), 'SCREWDRIVER', 'Vodka || Orange Juice || Orange slice', 8000, true, 4;
INSERT INTO menu_items_cocktails (category_id, name, description, price, is_available, display_order)
SELECT (SELECT id FROM categories WHERE slug = 'cocktails'), 'MARGARITA', 'Cointreau || Tequila || Lime juice || Lime wedge', 8000, true, 5;
INSERT INTO menu_items_cocktails (category_id, name, description, price, is_available, display_order)
SELECT (SELECT id FROM categories WHERE slug = 'cocktails'), 'WHISKY SOUR', NULL, 8000, true, 6;
INSERT INTO menu_items_cocktails (category_id, name, description, price, is_available, display_order)
SELECT (SELECT id FROM categories WHERE slug = 'cocktails'), 'SEX ON THE BEACH', NULL, 8000, true, 7;
INSERT INTO menu_items_cocktails (category_id, name, description, price, is_available, display_order)
SELECT (SELECT id FROM categories WHERE slug = 'cocktails'), 'STRAWBERRY DAIQUIRI', NULL, 8000, true, 8;
INSERT INTO menu_items_cocktails (category_id, name, description, price, is_available, display_order)
SELECT (SELECT id FROM categories WHERE slug = 'cocktails'), 'ORANGE MOJITO', 'Orange Juice || Mint Leaves || Sugar', 8000, true, 9;

-- menu_items_food
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'pepper-soup'), 'Goat Meat Pepper Soup', 10000, true, 1;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'pepper-soup'), 'Turkey Pepper Soup', 10000, true, 2;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'pepper-soup'), 'Assorted Pepper Soup', 9000, true, 3;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'pepper-soup'), 'Catfish Pepper Soup', 15000, true, 4;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'pepper-soup'), 'Croaker Fish Pepper Soup', 16500, true, 5;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'pepper-soup'), 'Owere Pepper Soup', 13000, true, 6;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'pepper-soup'), 'Catfish Pepper Soup (Jombo)', 18500, true, 7;

-- Quick Bites
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'small-chops'), 'Chicken', 8000, true, 1;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'small-chops'), 'Peppered Turkey', 9000, true, 2;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'small-chops'), 'Peppered Beef', 8000, true, 3;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'small-chops'), 'Gizzard', 8000, true, 4;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'small-chops'), 'Spicy Wings', 7000, true, 5;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'small-chops'), 'Peppered Snail', 10000, true, 6;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'small-chops'), 'Buffalo Wing (BBQ Sauce)', 8000, true, 7;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'small-chops'), 'Spicy Fish', 10000, true, 8;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'small-chops'), 'Giz-Dodo', 10000, true, 9;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'small-chops'), 'Chicken And Chips', 11000, true, 10;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'small-chops'), 'Turkey And Chips', 12000, true, 11;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'small-chops'), 'Double Sausage Chicken Shawarma', 7000, true, 12;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'small-chops'), 'Double Sausage Beef Shawarma', 7000, true, 13;

-- Rice
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'rice'), 'Jollof Rice And Chicken/Beef', 11000, true, 1;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'rice'), 'Jollof Rice And Turkey/Fish/Goat Meat', 12000, true, 2;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'rice'), 'Fried Rice And Chicken/beef', 11000, true, 3;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'rice'), 'Fried Rice And Turkey/fish/goat Meat', 12000, true, 4;

-- Pasta
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'main-dishes'), 'Chicken Stir Fry Pasta', 12000, true, 1;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'main-dishes'), 'Beef Stir Fry Pasta', 12000, true, 2;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'main-dishes'), 'H100 Special Stir Fry Noodles', 10000, true, 3;

-- Sides
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'sides'), 'White Rice', 2500, true, 1;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'sides'), 'Special Fried Rice', 4000, true, 2;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'sides'), 'Chips', 3000, true, 3;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'sides'), 'Plantain', 2000, true, 4;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'sides'), 'Yam Chips', 3000, true, 5;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'sides'), 'Extra Jollof Rice', 3000, true, 6;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'sides'), 'Coleslaw', 2500, true, 7;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'sides'), 'Fried / Boil Egg', 1000, true, 8;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'sides'), 'Yamarita', 6000, true, 9;

-- Platters
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'platters'), 'Native Rice With Any Protein Of Choices', 15000, true, 1;
INSERT INTO menu_items_food (category_id, name, price, is_available, display_order) SELECT (SELECT id FROM food_categories WHERE slug = 'platters'), 'H100 Special Platter {Gizzard, BBQ Wings, Chickens, Chips, Sausage, Coleslaw}', 35000, true, 2;
