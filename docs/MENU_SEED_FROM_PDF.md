# Menu seed from PDF price lists

Price data is sourced from these files in the project root:

- `H100 PRICE LIST DOWNSTAIRS.pdf` → `menu_items` (Regular / downstairs toggle)
- `H100 PRICE LIST VIP.pdf` → `menu_items_vip` (VIP toggle)
- `H100 FOOD MENU LIST.pdf` → `menu_items_food` (Food Menu toggle)

Drinks use the original **13 beverage categories** (Energy Drinks, Soft Drinks, Beer, wines, spirits, etc.) with PDF prices. Food uses **6 sections** from pages 1–2 of the food PDF (Pepper Soup, Small Chops, Rice, Main Dishes, Platters, Sides). Pages 3–4 of the food PDF are cover art only.

## Apply to Supabase

1. In the Supabase SQL Editor, run `scripts/005_create_menu_vip_and_food.sql` (once).
2. Run `scripts/006_seed_from_price_lists.sql` to replace drink and food rows with PDF data.

Or, with `.env.local` containing `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`:

```bash
npm run seed:menu
```

Ensure step 1 has been applied before using the Node seed script.
