/**
 * Populates short, item-specific descriptions in menu_items, menu_items_vip, and menu_items_food.
 * Only updates the description column — no other fields are changed.
 *
 * Usage: node scripts/update-menu-descriptions.mjs
 */

import { createClient } from "@supabase/supabase-js"
import { readFileSync } from "fs"
import { join, dirname } from "path"
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
    // vars may already be set
  }
}

loadEnvLocal()

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY")
  process.exit(1)
}

const supabase = createClient(url, serviceKey)

/** Name → short description (shared across regular, VIP, and food where names match) */
const DESCRIPTIONS = {
  // Soft drinks & energy
  Water: "Pure bottled water, served chilled.",
  "Power Horse": "Nigerian energy drink for a quick boost.",
  Sprite: "Crisp lemon-lime soda.",
  "Red Bull": "Classic energy drink with caffeine and taurine.",
  Coke: "Classic Coca-Cola soda.",
  "Black Bullet": "Bold energy drink with a smooth kick.",
  Fayrouz: "Sparkling fruit-flavoured soft drink.",
  Maltina: "Malt-based non-alcoholic drink.",
  Schweppes: "Premium tonic or bitter lemon mixer.",
  "Hollandia Yoghurt": "Thick, creamy yoghurt drink.",
  Chivita: "100% fruit juice blend.",
  "5Alive": "Tropical fruit juice drink.",
  "5 Alive": "Tropical fruit juice drink.",

  // Wine
  Agor: "Smooth, easy-drinking red wine.",
  "4th Street Red": "Sweet, approachable South African red wine.",
  "Sweet kiss Red": "Light, fruity red wine.",
  "Four cousins": "Popular fruity wine blend.",
  "Carlo Rossi": "American jug wine — smooth and mellow.",
  Nederburg: "Premium South African red wine.",
  "All Seasons": "Easy-drinking red wine blend.",
  "Veuve du Vernay": "Light, refreshing sparkling wine.",
  "Andre Rose": "Sweet sparkling rosé wine.",
  "Bellaire Rose": "Luxury sparkling rosé with a crisp finish.",

  // Beer
  Desperado: "Tequila-flavoured beer with a citrus twist.",
  "Flying Fish": "Lemon-flavoured premium lager.",
  Trophy: "Crisp Nigerian lager beer.",
  Goldberg: "Smooth Nigerian lager.",
  "Goldberg Black": "Dark, rich Nigerian stout lager.",
  "Origin pet": "Origin beer in a convenient PET bottle.",
  Legend: "Full-bodied Nigerian lager.",
  "Star Radler": "Beer blended with lemon soda.",
  "33 Export": "Classic Nigerian pale lager.",
  Heineken: "Premium Dutch lager.",
  Budwesser: "Light American-style lager.",
  "Smirnoff Ice": "Vodka-based ready-to-drink malt beverage.",
  "Origin Beer": "Nigerian premium lager.",
  Gulder: "Bold Nigerian lager beer.",
  "Guinness Stout": "Rich, creamy Irish stout.",

  // Spirits
  Jagermeister: "Herbal German liqueur — best served ice cold.",
  Campari: "Italian bitter aperitif for classic cocktails.",
  "Smirnoff Large": "Large bottle of triple-distilled vodka.",
  "Absolute Vodka": "Swedish premium vodka — smooth and clean.",
  Barcadi: "White rum, perfect for cocktails and mixes.",
  "Martell VS": "French cognac with warm oak and fruit notes.",
  "Hennessy VS": "Iconic cognac with vanilla and spice.",
  "William Lawson": "Blended Scotch whisky — smooth and mellow.",
  Dusse: "Premium cognac with a rich, velvety finish.",
  Ballatines: "Fine blended Scotch whisky.",
  "Martell Blue Swift": "Cognac finished in bourbon barrels.",
  "Jameson Original": "Smooth triple-distilled Irish whiskey.",
  "Hennessy VSOP": "Aged cognac with depth and complexity.",
  "Jack Daniels": "Tennessee whiskey with charcoal mellowing.",
  "Jameson Black Barrel": "Jameson aged in double-charred barrels.",
  "Jameson Black": "Jameson aged in double-charred barrels.",
  "Glenfiddish 12 YRS": "Single malt Scotch whisky, aged 12 years.",
  "Glenfiddish 15 YRS": "Single malt Scotch whisky, aged 15 years.",
  "Best Cream": "Local cream liqueur — sweet and silky.",
  Baileys: "Irish cream liqueur with whiskey and chocolate notes.",
  "Sierra Tequila": "Classic Mexican tequila.",
  "Olmeca Blanca": "Silver tequila for shots and cocktails.",
  "Casamigos Reposado": "Aged tequila with smooth agave character.",
  "Don Julio": "Premium artisanal tequila.",
  Azul: "Ultra-premium Clase Azul tequila.",
  "Barcadi Shots": "Single shot of Barcadi rum.",
  "Tequila Shots": "Straight tequila shot, served chilled.",
  Shisha: "Flavoured hookah session — relax and unwind.",

  // Food — pepper soup
  "Goat Meat Pepper Soup": "Spicy Nigerian broth with tender goat meat.",
  "Turkey Pepper Soup": "Pepper soup with succulent turkey pieces.",
  "Assorted Pepper Soup": "Mixed offal in a hot, boldly spiced broth.",
  "Catfish Pepper Soup": "Fresh catfish in aromatic pepper soup.",
  "Croaker Fish Pepper Soup": "Croaker fish simmered in spicy pepper soup.",
  "Owere Pepper Soup": "Rich Igbo-style native pepper soup.",

  // Food — small chops
  Chicken: "Grilled or peppered chicken small chop.",
  "Peppered Turkey": "Turkey tossed in spicy pepper sauce.",
  "Peppered Beef": "Savoury beef in a fiery pepper marinade.",
  Gizzard: "Crisp fried or peppered chicken gizzards.",
  "Spicy Wings": "Chicken wings glazed in hot spicy sauce.",
  "Peppered Snail": "Tender snail in traditional pepper sauce.",
  "Bbq Wings": "Smoky barbecue-glazed chicken wings.",
  "Spicy Fish": "Fish fillet cooked in spicy pepper seasoning.",
  "Giz-Dodo": "Fried gizzard served with sweet fried plantain.",

  // Food — rice
  "Jollof Rice And Chicken/beef": "Smoky party-style jollof with chicken or beef.",
  "Jollof Rice And Turkey/fish/goat Meat":
    "Jollof rice with turkey, fish, or goat meat.",
  "Fried Rice And Chicken/beef": "Wok-fried rice with chicken or beef.",
  "Fried Rice And Turkey/fish/goat Meat":
    "Fried rice paired with turkey, fish, or goat meat.",

  // Food — main dishes
  "Chicken And Chips": "Crispy fried chicken with golden chips.",
  "Turkey And Chips": "Juicy turkey served with crispy chips.",
  "Chicken Shawarma": "Wrapped spiced chicken with vegetables and sauce.",
  "Chicken Stir Fry Pasta": "Penne pasta stir-fried with seasoned chicken.",
  "Beef Stir Fry Pasta": "Stir-fried pasta with tender beef strips.",
  "Special Noodles": "Noodles with the chef's special toppings.",
  "Native Rice With Any Protein Of Choices":
    "Local-style rice with your choice of protein.",

  // Food — platters & sides
  "Mini Platter {Gizzard, Wings, Chicken, Yam Chips, Spring Rolls, Sausage, Coleslaw}":
    "Sharing platter with wings, gizzard, spring rolls, and sides.",
  "White Rice": "Steamed plain white rice.",
  "Special Fried Rice": "Chef's seasoned fried rice with vegetables.",
  Chips: "Crispy golden potato fries.",
  Plantain: "Fried sweet ripe plantain slices.",
  "Yam Chips": "Crispy fried yam wedges.",
  "Extra Jollof Rice": "Additional serving of smoky jollof rice.",
  Coleslaw: "Creamy cabbage and carrot salad.",
}

const TABLES = ["menu_items", "menu_items_vip", "menu_items_food"]

async function updateTable(table) {
  const { data: items, error } = await supabase.from(table).select("id, name, description")
  if (error) throw new Error(`${table}: ${error.message}`)

  let updated = 0
  let skipped = 0
  const missing = []

  for (const item of items ?? []) {
    const description = DESCRIPTIONS[item.name]
    if (!description) {
      missing.push(item.name)
      continue
    }
    if (item.description === description) {
      skipped++
      continue
    }
    const { error: updateError } = await supabase
      .from(table)
      .update({ description })
      .eq("id", item.id)
    if (updateError) throw new Error(`${table} ${item.name}: ${updateError.message}`)
    updated++
  }

  return { table, total: items?.length ?? 0, updated, skipped, missing }
}

const results = []
for (const table of TABLES) {
  results.push(await updateTable(table))
}

for (const r of results) {
  console.log(
    `${r.table}: ${r.updated} updated, ${r.skipped} already set, ${r.total} total`
  )
  if (r.missing.length) {
    console.warn(`  No description mapping for: ${r.missing.join(", ")}`)
  }
}

console.log("Done.")
