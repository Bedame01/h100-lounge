import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { MenuItemCard } from "@/components/menu-item-card"
import { Suspense } from "react"
import { MenuItemSkeleton } from "@/components/menu-item-skeleton"

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  display_order: number
}

interface MenuItem {
  id: string
  category_id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  is_available: boolean
  display_order: number
  size_options: { size: string; price: number }[] | null
  badges: string[] | null
}

async function MenuContent() {
  const supabase = await createClient()

  const { data: categories } = await supabase.from("categories").select("*").order("display_order", { ascending: true })

  const { data: menuItems } = await supabase
    .from("menu_items")
    .select("*")
    .eq("is_available", true)
    .order("display_order", { ascending: true })

  if (!categories || categories.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">Our menu is being prepared. Please check back soon.</p>
        </div>
      </section>
    )
  }

  return (
    <>
      {categories.map((category: Category) => {
        const categoryItems = menuItems?.filter((item: MenuItem) => item.category_id === category.id) || []

        if (categoryItems.length === 0) return null

        return (
          <section key={category.id} className="py-6 px-2.5 md:px-10! lg:px-18! last:border-b-0">
            <div className="container rounded-2xl border border-border mx-auto p-4 sm:p-8 lg:p-10">
              <div className="text-center mb-12">
                <h2 className="font-serif text-2xl font-normal mb-3">{category.name}</h2>
                {category.description && (
                  <p className="text-muted-foreground text-base max-w-2xl mx-auto text-pretty">{category.description}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {categoryItems.map((item: MenuItem, index: number) => (
                  <MenuItemCard key={item.id} item={item} index={index} />
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}

function MenuLoadingSkeleton() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="h-12 w-64 bg-muted rounded mx-auto mb-3" />
          <div className="h-6 w-96 bg-muted rounded mx-auto" />
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <MenuItemSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function MenuPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      <div className="pt-16">
        <section className="pt-16 md:pt-26 pb-12 md:pb-16! mb-5 border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-serif text-5xl sm:text-6xl tracking-tight font-medium mb-4 ">Our <span className="italic text-accent">Menu.</span></h1>
            <p className="text-base/snug max-w-2xl mx-auto text-pretty">
              Explore our complete menu featuring fresh ingredients, innovative techniques, and exceptional flavors crafted by our talented culinary team.
            </p>
          </div>
        </section>

        <Suspense fallback={<MenuLoadingSkeleton />}>
          <MenuContent />
        </Suspense>
      </div>

      <Footer />
    </main>
  )
}