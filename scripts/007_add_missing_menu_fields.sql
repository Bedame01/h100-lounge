-- Migration for existing Supabase databases.
-- Run this in the Supabase SQL editor if your menu tables were created before the admin CRUD fields were added.

ALTER TABLE public.menu_items
  ADD COLUMN IF NOT EXISTS is_highlighted BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS size_options JSONB,
  ADD COLUMN IF NOT EXISTS badges TEXT[];

ALTER TABLE public.menu_items_vip
  ADD COLUMN IF NOT EXISTS is_highlighted BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS size_options JSONB,
  ADD COLUMN IF NOT EXISTS badges TEXT[];

ALTER TABLE public.menu_items_food
  ADD COLUMN IF NOT EXISTS is_highlighted BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS size_options JSONB,
  ADD COLUMN IF NOT EXISTS badges TEXT[];

ALTER TABLE public.menu_items_cocktails
  ADD COLUMN IF NOT EXISTS is_highlighted BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS size_options JSONB,
  ADD COLUMN IF NOT EXISTS badges TEXT[];

ALTER TABLE public.menu_items_mocktails
  ADD COLUMN IF NOT EXISTS is_highlighted BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS size_options JSONB,
  ADD COLUMN IF NOT EXISTS badges TEXT[];
