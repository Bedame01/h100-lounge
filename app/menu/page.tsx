import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { MenuItemCard } from "@/components/menu-item-card"
import { Suspense } from "react"
import { MenuItemSkeleton } from "@/components/menu-item-skeleton"
import MenuBg from "@/components/menulist-bg"

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
          <section key={category.id} className="py-6 px-2 sm:px-10! lg:px-18! last:border-b-0">
            <div className="container backdrop-blur supports-[backdrop-filter]:bg-card/65 rounded-sm border border-border mx-auto px-3.5 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-14 boxShadow">
              <div className="text-center mb-12">
                <h2 className="font-serif text-2xl sm:text-3xl font-medium mb-3 priceCategory">{category.name}</h2>
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
    <main className="min-h-screen relative">
      <Navigation />

      <MenuBg />

      <div className="pt-16">
        <section className="backdrop-blur supports-[backdrop-filter]:bg-background/65 pt-16 md:pt-26 pb-10 md:pb-14! mb-5 border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-serif text-5xl sm:text-6xl tracking-tight font-semibold mb-4 ">Menu<span className="italic text-accent font-medium tracking-tighter">List.</span></h1>
            <p className="text-base/snug max-w-2xl mx-auto text-pretty">
              Explore our complete menu featuring fresh ingredients, innovative techniques, and exceptional flavors crafted by our talented culinary team.
            </p>
            <div className="allergiesInform flex items-center justify-center gap-2 w-full max-w-lg mx-auto mt-7 bg-accent/10 py-3 px-4 border-accent/10 border rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24" width="24" className="size-5">
                <g id="Info-Fill">
                  <path id="Subtract" fill="#f31404" d="M12 2c5.5228 0 10 4.47715 10 10 0 5.5228 -4.4772 10 -10 10 -5.52285 0 -10 -4.4772 -10 -10C2 6.47715 6.47715 2 12 2m-2.5 9v2H11v2H9.5v2h5v-2H13v-3c0 -0.5523 -0.4477 -1 -1 -1zm2.25 -4c-0.6904 0 -1.25 0.55964 -1.25 1.25s0.5596 1.25 1.25 1.25S13 8.94036 13 8.25 12.4404 7 11.75 7" stroke-width="1"></path>
                </g>
              </svg>
              <p className="text-sm text-foreground/90 font-semibold">Please inform staff of any allergies</p>
            </div>
          </div>
        </section>

        <Suspense fallback={<MenuLoadingSkeleton />}>
          <MenuContent />
        </Suspense>
      </div>

      <div className="bg-background">
        <Footer />
      </div>
    </main>
  )
}