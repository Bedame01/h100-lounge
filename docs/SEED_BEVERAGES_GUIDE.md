# H100 Lounge & Bar - Beverages Menu Seed Script Guide

## Overview
This guide explains how to populate your H100 Lounge & Bar menu database with all beverages from the physical menu images.

## What Gets Added
- **13 Categories**: Energy Drinks, Soft Drinks, Beer, Red Wine, White Wine, Sparkling Wine, Whisky, Vodka, Tequila, Cognac, Cream, Liquor, Others
- **108 Menu Items**: All beverages organized by category
- **Display Order**: Items are automatically ordered for proper display

## Data Summary
| Category | Items |
|----------|-------|
| Energy Drinks | 4 |
| Soft Drinks | 10 |
| Beer | 16 |
| Red Wine | 6 |
| White Wine | 2 |
| Sparkling Wine | 6 |
| Whisky | 12 |
| Vodka | 3 |
| Tequila | 7 |
| Cognac | 7 |
| Cream | 2 |
| Liquor | 2 |
| Others | 3 |
| **TOTAL** | **108** |

## How to Execute the Script

### Option 1: Supabase SQL Editor (Recommended)
1. Go to **Supabase Dashboard** → Your Project
2. Click **SQL Editor** in left sidebar
3. Click **New Query**
4. Copy the entire contents of `scripts/003_seed_beverages.sql`
5. Paste into the editor
6. Click **Run** button
7. Check the output - you should see:
   - "Categories created: 13"
   - "Menu items created: 108"
   - Summary table by category

### Option 2: Using CLI (if configured)
```bash
# Make sure your Supabase URL and key are in .env.local
npm run supabase-exec -- scripts/003_seed_beverages.sql
```

## What Happens

### Categories Table
Creates 13 categories with:
- Name (e.g., "Energy Drinks")
- Slug (e.g., "energy-drinks") - for URL-safe identification
- Description - category description
- Display Order - for menu sorting (1-13)

### Menu Items Table
Creates 108 items with:
- Category ID - links to parent category
- Name - item name (e.g., "Power Horse")
- Description - generic description (can be customized)
- Price - defaults to 0 (update manually or with price script)
- is_available - defaults to true (all items available)
- display_order - automatic ordering within category

## Important Notes

⚠️ **Before Running:**
- Ensure your `categories` and `menu_items` tables exist
- Run `001_create_tables.sql` first if tables don't exist
- If you have existing data, the script uses `ON CONFLICT DO NOTHING` to avoid duplicates

⚠️ **Price Field:**
- All items default to price = 0
- Prices are not in the menu images, so you'll need to add them manually
- Use the admin panel or update query to set prices

✅ **Customization:**
- You can edit the script before running to change descriptions, prices, or availability
- Update the `display_order` values if you want different item ordering

## After Running

1. **Verify in Supabase:**
   - Go to Data Editor
   - Check "categories" table - should have 13 rows
   - Check "menu_items" table - should have 108 rows
   - Click on a category to see its items

2. **Update Prices:**
   - Visit your H100 admin panel at `/admin`
   - Go to Menu Management
   - Add prices for each item manually, OR
   - Run a bulk price update script

3. **Test in Frontend:**
   - Visit `/menu` on your site
   - All categories and items should appear
   - Click through categories to verify organization

## Troubleshooting

### "Categories already exist" Error
The script has `ON CONFLICT DO NOTHING` - this means if categories already exist, it skips them. This is safe and expected behavior.

### "Not all items appear"
Check the database:
```sql
SELECT COUNT(*) FROM menu_items;
SELECT name, COUNT(*) FROM menu_items GROUP BY category_id;
```

### Items appear but prices are 0
Prices are not in the menu images. You'll need to:
1. Research current prices for each item
2. Manually add via admin panel
3. OR run an UPDATE query

### Wrong category assignment
The script uses category slugs to find the right ID. If items are in wrong categories, check that category slugs match exactly.

## Editing the Script

If you want to:
- **Change descriptions**: Edit the VALUES clause for each category
- **Add/remove items**: Add/remove lines from the VALUES clauses
- **Change display order**: Modify the `display_order` numbers
- **Rename categories**: Edit the INSERT INTO categories section

## Next Steps

1. ✅ Run this script
2. 📊 Add prices via admin panel or script
3. 🖼️ Add item images (optional)
4. 📱 Test menu display on frontend
5. 🚀 Deploy changes

---

**Created**: April 2026
**For**: H100 Lounge & Bar
**Database**: Supabase PostgreSQL
