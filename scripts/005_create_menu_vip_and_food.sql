-- VIP drinks and food menu tables (run in Supabase SQL Editor)

-- VIP menu items (downstairs / regular prices live in menu_items)
CREATE TABLE IF NOT EXISTS menu_items_vip (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  is_available BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  size_options JSONB,
  badges TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_menu_items_vip_category_id ON menu_items_vip(category_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_vip_display_order ON menu_items_vip(display_order);

ALTER TABLE menu_items_vip ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view VIP menu items" ON menu_items_vip
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert VIP menu items" ON menu_items_vip
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
      AND (raw_user_meta_data->>'is_admin')::boolean = true
    )
  );

CREATE POLICY "Only admins can update VIP menu items" ON menu_items_vip
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
      AND (raw_user_meta_data->>'is_admin')::boolean = true
    )
  );

CREATE POLICY "Only admins can delete VIP menu items" ON menu_items_vip
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
      AND (raw_user_meta_data->>'is_admin')::boolean = true
    )
  );

-- Food menu categories (separate from drink categories)
CREATE TABLE IF NOT EXISTS food_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_food_categories_display_order ON food_categories(display_order);

ALTER TABLE food_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view food categories" ON food_categories
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert food categories" ON food_categories
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
      AND (raw_user_meta_data->>'is_admin')::boolean = true
    )
  );

CREATE POLICY "Only admins can update food categories" ON food_categories
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
      AND (raw_user_meta_data->>'is_admin')::boolean = true
    )
  );

CREATE POLICY "Only admins can delete food categories" ON food_categories
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
      AND (raw_user_meta_data->>'is_admin')::boolean = true
    )
  );

-- Food menu items
CREATE TABLE IF NOT EXISTS menu_items_food (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES food_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  is_available BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  size_options JSONB,
  badges TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_menu_items_food_category_id ON menu_items_food(category_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_food_display_order ON menu_items_food(display_order);

ALTER TABLE menu_items_food ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view food menu items" ON menu_items_food
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert food menu items" ON menu_items_food
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
      AND (raw_user_meta_data->>'is_admin')::boolean = true
    )
  );

CREATE POLICY "Only admins can update food menu items" ON menu_items_food
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
      AND (raw_user_meta_data->>'is_admin')::boolean = true
    )
  );

CREATE POLICY "Only admins can delete food menu items" ON menu_items_food
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
      AND (raw_user_meta_data->>'is_admin')::boolean = true
    )
  );
