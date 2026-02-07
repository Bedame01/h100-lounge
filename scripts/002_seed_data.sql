-- Insert sample categories
INSERT INTO categories (name, slug, description, display_order) VALUES
  ('Signature Cocktails', 'signature-cocktails', 'Our expertly crafted signature cocktails', 1),
  ('Classic Cocktails', 'classic-cocktails', 'Timeless favorites done right', 2),
  ('Small Chops', 'small-chops', 'Delicious bites to complement your drinks', 3),
  ('Non-Alcoholic', 'non-alcoholic', 'Refreshing mocktails and beverages', 4)
ON CONFLICT (slug) DO NOTHING;

-- Get category IDs
DO $$
DECLARE
  sig_cocktails_id UUID;
  classic_cocktails_id UUID;
  small_chops_id UUID;
  non_alcoholic_id UUID;
BEGIN
  SELECT id INTO sig_cocktails_id FROM categories WHERE slug = 'signature-cocktails';
  SELECT id INTO classic_cocktails_id FROM categories WHERE slug = 'classic-cocktails';
  SELECT id INTO small_chops_id FROM categories WHERE slug = 'small-chops';
  SELECT id INTO non_alcoholic_id FROM categories WHERE slug = 'non-alcoholic';

  -- Insert sample menu items for Signature Cocktails
  INSERT INTO menu_items (category_id, name, description, price, display_order) VALUES
    (sig_cocktails_id, 'Midnight Eclipse', 'Activated charcoal vodka, elderflower, fresh lime, topped with prosecco', 1800.00, 1),
    (sig_cocktails_id, 'Golden Hour', 'Premium gin, saffron-infused honey, grapefruit, thyme', 1600.00, 2),
    (sig_cocktails_id, 'Velvet Noir', 'Dark rum, blackberry liqueur, vanilla, fresh berries', 1700.00, 3)
  ON CONFLICT DO NOTHING;

  -- Insert sample menu items for Classic Cocktails
  INSERT INTO menu_items (category_id, name, description, price, display_order) VALUES
    (classic_cocktails_id, 'Old Fashioned', 'Bourbon, bitters, sugar, orange twist', 1500.00, 1),
    (classic_cocktails_id, 'Negroni', 'Gin, Campari, sweet vermouth', 1400.00, 2),
    (classic_cocktails_id, 'Mojito', 'White rum, mint, lime, soda', 1300.00, 3)
  ON CONFLICT DO NOTHING;

  -- Insert sample menu items for Small Chops
  INSERT INTO menu_items (category_id, name, description, price, display_order) VALUES
    (small_chops_id, 'Truffle Fries', 'Hand-cut fries with truffle oil and parmesan', 800.00, 1),
    (small_chops_id, 'Spicy Wings', 'Crispy chicken wings with house hot sauce', 1200.00, 2),
    (small_chops_id, 'Charcuterie Board', 'Selection of premium meats, cheeses, and accompaniments', 2500.00, 3)
  ON CONFLICT DO NOTHING;

  -- Insert sample menu items for Non-Alcoholic
  INSERT INTO menu_items (category_id, name, description, price, display_order) VALUES
    (non_alcoholic_id, 'Berry Bliss', 'Mixed berries, mint, lime, sparkling water', 800.00, 1),
    (non_alcoholic_id, 'Cucumber Cooler', 'Cucumber, lime, ginger, tonic', 700.00, 2)
  ON CONFLICT DO NOTHING;
END $$;
