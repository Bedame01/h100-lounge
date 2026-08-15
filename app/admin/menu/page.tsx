import { redirect } from "next/navigation"
import { AdminNav } from "@/components/admin-nav"
import { MenuManager } from "@/components/menu-manager"
import { getRegularMenu, getVipMenu, getFoodMenu, getCocktailsMenu, getMocktailsMenu } from "@/lib/menu-service"

export default async function AdminMenuPage() {
  const supabase = await import("@/lib/supabase/server").then((mod) => mod.createClient())

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/admin/login")
  }

  const isAdmin = user.user_metadata?.is_admin === true

  if (!isAdmin) {
    redirect("/")
  }

  const [regular, vip, food, cocktails, mocktails] = await Promise.all([
    getRegularMenu(false),
    getVipMenu(false),
    getFoodMenu(false),
    getCocktailsMenu(false),
    getMocktailsMenu(false),
  ])

  const categories = regular.map(({ items: _items, ...category }) => category)
  const regularItems = regular.flatMap((category) => category.items)
  const vipItems = vip.flatMap((category) => category.items)
  const foodCategories = food.map(({ items: _items, ...category }) => category)
  const foodItems = food.flatMap((category) => category.items)
  const cocktailsCategories = cocktails.map(({ items: _items, ...category }) => category)
  const cocktailsItems = cocktails.flatMap((category) => category.items)
  const mocktailsCategories = mocktails.map(({ items: _items, ...category }) => category)
  const mocktailsItems = mocktails.flatMap((category) => category.items)

  return (
    <div className="min-h-screen bg-background">
      <AdminNav user={user} />

      <main className="container mx-auto px-2.5 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-semibold mb-2 tracking-tight">
            Menu Management
          </h1>
          <p className="text-muted-foreground">Menu items and categories full operational Management</p>
        </div>

        <MenuManager
          categories={categories}
          regularItems={regularItems}
          vipItems={vipItems}
          foodCategories={foodCategories}
          foodItems={foodItems}
          cocktailsCategories={cocktailsCategories}
          cocktailsItems={cocktailsItems}
          mocktailsCategories={mocktailsCategories}
          mocktailsItems={mocktailsItems}
        />
      </main>
    </div>
  )
}
