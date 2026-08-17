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
  is_highlighted BOOLEAN NOT NULL DEFAULT false,
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
  is_highlighted BOOLEAN NOT NULL DEFAULT false,
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

-- Cocktails menu items (separate table)
CREATE TABLE IF NOT EXISTS menu_items_cocktails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  is_available BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_highlighted BOOLEAN NOT NULL DEFAULT false,
  size_options JSONB,
  badges TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_menu_items_cocktails_category_id ON menu_items_cocktails(category_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_cocktails_display_order ON menu_items_cocktails(display_order);

ALTER TABLE menu_items_cocktails ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view cocktails menu items" ON menu_items_cocktails
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert cocktails menu items" ON menu_items_cocktails
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
      AND (raw_user_meta_data->>'is_admin')::boolean = true
    )
  );

CREATE POLICY "Only admins can update cocktails menu items" ON menu_items_cocktails
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
      AND (raw_user_meta_data->>'is_admin')::boolean = true
    )
  );

CREATE POLICY "Only admins can delete cocktails menu items" ON menu_items_cocktails
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
      AND (raw_user_meta_data->>'is_admin')::boolean = true
    )
  );

-- Mocktails menu items (separate table)
CREATE TABLE IF NOT EXISTS menu_items_mocktails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  is_available BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_highlighted BOOLEAN NOT NULL DEFAULT false,
  size_options JSONB,
  badges TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_menu_items_mocktails_category_id ON menu_items_mocktails(category_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_mocktails_display_order ON menu_items_mocktails(display_order);

ALTER TABLE menu_items_mocktails ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view mocktails menu items" ON menu_items_mocktails
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert mocktails menu items" ON menu_items_mocktails
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
      AND (raw_user_meta_data->>'is_admin')::boolean = true
    )
  );

CREATE POLICY "Only admins can update mocktails menu items" ON menu_items_mocktails
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
      AND (raw_user_meta_data->>'is_admin')::boolean = true
    )
  );

CREATE POLICY "Only admins can delete mocktails menu items" ON menu_items_mocktails
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
      AND (raw_user_meta_data->>'is_admin')::boolean = true
    )
  );
