/**
 * Menu Service
 * 
 * Server-side service for fetching menu items from both regular and VIP tables
 * Organized by category for efficient UI rendering
 * 
 * Architecture:
 * - Separates concerns between regular and VIP pricing
 * - Uses consistent data structure for both menu types
 * - Cached/optimized queries for performance
 */

import { createClient } from '@/lib/supabase/server';

export interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean;
  display_order: number;
  size_options: { size: string; price: number }[] | null;
  badges: string[] | null;
}

export interface MenuCategoryMeta {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  display_order: number;
}

export interface MenuCategory extends MenuCategoryMeta {
  items: MenuItem[];
}

export interface FoodCategoryMeta {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  display_order: number;
}

export interface FoodCategory extends FoodCategoryMeta {
  items: MenuItem[];
}

/**
 * Fetch regular menu items grouped by category
 * @returns MenuCategory[] - Categories with their associated menu items
 */
export async function getRegularMenu(): Promise<MenuCategory[]> {
  try {
    const supabase = await createClient();

    // Fetch all categories
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, name, slug, description, display_order')
      .order('display_order', { ascending: true });

    if (categoriesError) throw categoriesError;

    // Fetch all menu items
    const { data: items, error: itemsError } = await supabase
      .from('menu_items')
      .select('*')
      .eq('is_available', true)
      .order('display_order', { ascending: true });

    if (itemsError) throw itemsError;

    // Group items by category
    return (categories || []).map((category) => ({
      ...category,
      items: (items || []).filter((item) => item.category_id === category.id),
    }));
  } catch (error) {
    console.error('[Menu Service] Error fetching regular menu:', error);
    return [];
  }
}

/**
 * Fetch VIP menu items grouped by category
 * @returns MenuCategory[] - Categories with their associated VIP menu items
 */
export async function getVipMenu(): Promise<MenuCategory[]> {
  try {
    const supabase = await createClient();

    // Fetch all categories
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, name, slug, description, display_order')
      .order('display_order', { ascending: true });

    if (categoriesError) throw categoriesError;

    // Fetch all VIP menu items
    const { data: items, error: itemsError } = await supabase
      .from('menu_items_vip')
      .select('*')
      .eq('is_available', true)
      .order('display_order', { ascending: true });

    if (itemsError) throw itemsError;

    // Group items by category
    return (categories || []).map((category) => ({
      ...category,
      items: (items || []).filter((item) => item.category_id === category.id),
    }));
  } catch (error) {
    console.error('[Menu Service] Error fetching VIP menu:', error);
    return [];
  }
}

/**
 * Fetch both regular and VIP menu items
 * Useful for UI that needs to display price comparison
 * @returns { regular: MenuCategory[], vip: MenuCategory[] }
 */
/**
 * Fetch food menu items grouped by category
 */
export async function getFoodMenu(): Promise<FoodCategory[]> {
  try {
    const supabase = await createClient();

    const { data: categories, error: categoriesError } = await supabase
      .from('food_categories')
      .select('id, name, slug, description, display_order')
      .order('display_order', { ascending: true });

    if (categoriesError) throw categoriesError;

    const { data: items, error: itemsError } = await supabase
      .from('menu_items_food')
      .select('*')
      .eq('is_available', true)
      .order('display_order', { ascending: true });

    if (itemsError) throw itemsError;

    return (categories || []).map((category) => ({
      ...category,
      items: (items || []).filter((item) => item.category_id === category.id),
    }));
  } catch (error) {
    console.error('[Menu Service] Error fetching food menu:', error);
    return [];
  }
}

export async function getAllMenus() {
  const [regular, vip, food] = await Promise.all([getRegularMenu(), getVipMenu(), getFoodMenu()]);
  return { regular, vip, food };
}

/**
 * Calculate price difference between regular and VIP
 * @param regularPrice - Regular menu price
 * @param vipPrice - VIP menu price
 * @returns Price difference percentage
 */
export function calculatePriceDifference(regularPrice: number, vipPrice: number): number {
  if (regularPrice === 0) return 0;
  return ((vipPrice - regularPrice) / regularPrice) * 100;
}

/**
 * Get items by category slug
 * @param categorySlug - Category slug identifier
 * @param isVip - Whether to fetch VIP or regular items
 * @returns MenuItem[]
 */
export async function getItemsByCategory(categorySlug: string, isVip = false): Promise<MenuItem[]> {
  try {
    const supabase = await createClient();

    // Get category ID from slug
    const { data: category, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', categorySlug)
      .single();

    if (categoryError) throw categoryError;
    if (!category) return [];

    // Fetch items from appropriate table
    const table = isVip ? 'menu_items_vip' : 'menu_items';
    const { data: items, error: itemsError } = await supabase
      .from(table)
      .select('*')
      .eq('category_id', category.id)
      .eq('is_available', true)
      .order('display_order', { ascending: true });

    if (itemsError) throw itemsError;
    return items || [];
  } catch (error) {
    console.error(`[Menu Service] Error fetching ${isVip ? 'VIP' : 'regular'} items for ${categorySlug}:`, error);
    return [];
  }
}
