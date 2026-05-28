/**
 * Applies menu migrations and PDF price-list seed to Supabase.
 *
 * Requires .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL=
 *   SUPABASE_SERVICE_ROLE_KEY=
 *
 * Usage: node scripts/seed-price-lists.mjs
 */

import { createClient } from "@supabase/supabase-js"
import { readFileSync } from "fs"
import { dirname, join } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")

function loadEnvLocal() {
  try {
    const raw = readFileSync(join(root, ".env.local"), "utf8")
    for (const line of raw.split("\n")) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith("#")) continue
      const eq = trimmed.indexOf("=")
      if (eq === -1) continue
      const key = trimmed.slice(0, eq).trim()
      let value = trimmed.slice(eq + 1).trim()
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1)
      }
      if (!process.env[key]) process.env[key] = value
    }
  } catch {
    // .env.local optional if vars already set
  }
}

loadEnvLocal()

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Add them to .env.local and retry."
  )
  process.exit(1)
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

function readSql(name) {
  return readFileSync(join(__dirname, name), "utf8")
}

async function runSqlFile(filename) {
  const sql = readSql(filename)
  const { error } = await supabase.rpc("exec_sql", { query: sql })
  if (error) {
    throw new Error(
      `${filename}: Supabase RPC exec_sql is not available (${error.message}). Run ${filename} manually in the Supabase SQL Editor instead.`
    )
  }
}

async function seedViaApi() {
  console.log("Seeding via Supabase client (delete + insert)...")

  await supabase.from("menu_items_food").delete().neq("id", "00000000-0000-0000-0000-000000000000")
  await supabase.from("menu_items_vip").delete().neq("id", "00000000-0000-0000-0000-000000000000")
  await supabase.from("menu_items").delete().neq("id", "00000000-0000-0000-0000-000000000000")
  await supabase.from("food_categories").delete().neq("id", "00000000-0000-0000-0000-000000000000")
  await supabase.from("categories").delete().neq("id", "00000000-0000-0000-0000-000000000000")

  const seedSql = readSql("006_seed_from_price_lists.sql")

  const parseCategoryRows = (tableName) => {
    const re = new RegExp(
      `INSERT INTO ${tableName} \\(name, slug, description, display_order\\) VALUES\\s*([\\s\\S]*?);`,
      "m"
    )
    const match = seedSql.match(re)
    if (!match) return []
    const rows = []
    const tupleRe = /\('([^']*(?:''[^']*)*)',\s*'([^']+)',\s*'([^']*(?:''[^']*)*)',\s*(\d+)\)/g
    let m
    while ((m = tupleRe.exec(match[1])) !== null) {
      rows.push({
        name: m[1].replace(/''/g, "'"),
        slug: m[2],
        description: m[3].replace(/''/g, "'"),
        display_order: Number(m[4]),
      })
    }
    return rows
  }

  const drinkCategories = parseCategoryRows("categories")
  const { data: insertedDrinkCats, error: drinkCatErr } = await supabase
    .from("categories")
    .insert(drinkCategories)
    .select("id, slug")
  if (drinkCatErr) throw drinkCatErr
  const drinkCatBySlug = Object.fromEntries(insertedDrinkCats.map((c) => [c.slug, c.id]))

  const foodCategories = parseCategoryRows("food_categories")
  const { data: insertedFoodCats, error: foodCatErr } = await supabase
    .from("food_categories")
    .insert(foodCategories)
    .select("id, slug")
  if (foodCatErr) throw foodCatErr
  const foodCatBySlug = Object.fromEntries(insertedFoodCats.map((c) => [c.slug, c.id]))

  const parseInserts = (table, categoryTable, slugToId) => {
    const rows = []
    const re = new RegExp(
      `INSERT INTO ${table} \\(category_id, name, price, is_available, display_order\\) SELECT \\(SELECT id FROM ${categoryTable} WHERE slug = '([^']+)'\\), '([^']*(?:''[^']*)*)', (\\d+), true, (\\d+);`,
      "g"
    )
    let m
    while ((m = re.exec(seedSql)) !== null) {
      const slug = m[1]
      rows.push({
        category_id: slugToId[slug],
        name: m[2].replace(/''/g, "'"),
        price: Number(m[3]),
        is_available: true,
        display_order: Number(m[4]),
      })
    }
    return rows
  }

  const downstairs = parseInserts("menu_items", "categories", drinkCatBySlug)
  const vip = parseInserts("menu_items_vip", "categories", drinkCatBySlug)
  const food = parseInserts("menu_items_food", "food_categories", foodCatBySlug)

  const chunk = async (table, rows) => {
    for (let i = 0; i < rows.length; i += 50) {
      const { error } = await supabase.from(table).insert(rows.slice(i, i + 50))
      if (error) throw error
    }
  }

  await chunk("menu_items", downstairs)
  await chunk("menu_items_vip", vip)
  await chunk("menu_items_food", food)

  console.log(`Inserted downstairs: ${downstairs.length}, VIP: ${vip.length}, food: ${food.length}`)
}

async function main() {
  console.log("H100 price list seed")
  console.log("1. Run scripts/005_create_menu_vip_and_food.sql in Supabase SQL Editor if tables are missing.")
  console.log("2. Seeding data...")

  try {
    await runSqlFile("006_seed_from_price_lists.sql")
    console.log("Seed complete via SQL RPC.")
  } catch {
    await seedViaApi()
  }
}

main().catch((err) => {
  console.error(err.message || err)
  process.exit(1)
})
