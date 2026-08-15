import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MenuListWithToggle } from "@/components/menu-list-with-toggle-vip"
import { Suspense } from "react"
import { MenuItemSkeleton } from "@/components/menu-item-skeleton"
import MenuBg from "@/components/menulist-bg"
import ScrollUp from "@/components/menu-scroll-to-top"
import { getAllMenus } from "@/lib/menu-service"

async function MenuContent() {
  const { regular, vip, food, cocktails, mocktails } = await getAllMenus()

  const categories = regular.map(({ items: _items, ...category }) => category)
  const regularItems = regular.flatMap((category) => category.items)
  const vipItems = vip.flatMap((category) => category.items)
  const foodCategories = food.map(({ items: _items, ...category }) => category)
  const foodItems = food.flatMap((category) => category.items)
  const cocktailsCategories = cocktails.map(({ items: _items, ...category }) => category)
  const cocktailsItems = cocktails.flatMap((category) => category.items)
  const mocktailsCategories = mocktails.map(({ items: _items, ...category }) => category)
  const mocktailsItems = mocktails.flatMap((category) => category.items)

  if (categories.length === 0 && foodCategories.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">Our menu is being prepared. Please check back soon.</p>
        </div>
      </section>
    )
  }

  return (
    <MenuListWithToggle
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
    <main className="min-h-screen relative scroll-smooth" id="up">
      <Navigation />

      <MenuBg />

      <ScrollUp />

      <div className="pt-16">
        <section className="backdrop-blur supports-[backdrop-filter]:bg-background/65 pt-16 md:pt-26 pb-6 md:pb-10! border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="title tracking-tighter font-semibold mb-4 ">
              Price<span className="font-serif italic text-accent font-medium tracking-tighter">List.</span>
            </h1>
            <p className="desc max-w-2xl mx-auto text-pretty">
              Our List includes refreshing cocktails, premium spirits, chilled wines, smooth champagnes, and flavorful Dishes. Explore 😋🍷.
            </p>
            <div className="allergiesInform flex items-center justify-center gap-2 max-w-lg mx-auto mt-6 bg-accent/5 py-2 px-4 border-accent/10 border rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                className="size-5"
              >
                <g id="Info-Fill">
                  <path
                    id="Subtract"
                    fill="#f31404"
                    d="M12 2c5.5228 0 10 4.47715 10 10 0 5.5228 -4.4772 10 -10 10 -5.52285 0 -10 -4.4772 -10 -10C2 6.47715 6.47715 2 12 2m-2.5 9v2H11v2H9.5v2h5v-2H13v-3c0 -0.5523 -0.4477 -1 -1 -1zm2.25 -4c-0.6904 0 -1.25 0.55964 -1.25 1.25s0.5596 1.25 1.25 1.25S13 8.94036 13 8.25 12.4404 7 11.75 7"
                    strokeWidth="1"
                  ></path>
                </g>
              </svg>
              <p className="text-sm text-foreground/80 font-medium">Please inform staff of any allergies</p>
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
