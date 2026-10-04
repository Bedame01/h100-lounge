-- Distinguish regular menu categories from cocktail and mocktail categories.
ALTER TABLE categories
  ADD COLUMN IF NOT EXISTS category_type TEXT NOT NULL DEFAULT 'regular';

UPDATE categories
SET category_type = CASE
  WHEN slug = 'cocktails' THEN 'cocktails'
  WHEN slug = 'mocktails' THEN 'mocktails'
  WHEN EXISTS (
    SELECT 1 FROM menu_items_cocktails
    WHERE menu_items_cocktails.category_id = categories.id
  ) THEN 'cocktails'
  WHEN EXISTS (
    SELECT 1 FROM menu_items_mocktails
    WHERE menu_items_mocktails.category_id = categories.id
  ) THEN 'mocktails'
  ELSE 'regular'
END
WHERE category_type = 'regular';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'categories_category_type_check'
      AND conrelid = 'categories'::regclass
  ) THEN
    ALTER TABLE categories
      ADD CONSTRAINT categories_category_type_check
      CHECK (category_type IN ('regular', 'cocktails', 'mocktails'));
  END IF;
END $$;
