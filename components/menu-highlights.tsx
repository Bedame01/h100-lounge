import { createClient } from "@/lib/supabase/server"
import { MenuItemCard } from "@/components/menu-item-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import CustomButton from '@/components/kokonutui/CustomButton/CustomButton'

interface MenuItem {
  id: string
  category_id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  is_available: boolean
  is_highlighted: boolean
  size_options: { size: string; price: number }[] | null
  badges: string[] | null
}

export async function MenuHighlights() {
  const supabase = await createClient()

  const { data: highlightedItems } = await supabase
    .from("menu_items")
    .select("*")
    .eq("is_available", true)
    .eq("is_highlighted", true)
    .order("display_order", { ascending: true })
    .limit(6)

  if (!highlightedItems || highlightedItems.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl sm:text-6xl font-medium mb-4">Highlights</h2>
          <p className="text-accent uppercase tracking-wider text-sm font-semibold mb-4">DELICIOUS SELECTIONS</p>
          <p className="text-muted-foreground max-w-3xl mx-auto text-base text-pretty">
            Our Menu features scrumptious starters, delicious mains, tasty sides and dreamy desserts. Take a look at our
            tempting highlights of the day.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-11 mb-12">
          {highlightedItems.map((item: MenuItem, index: number) => (
            <MenuItemCard key={item.id} item={item} index={index} />
          ))}
        </div>

        <div className="text-center">
          {/* <Button asChild size="lg" variant="outline" className="px-8 bg-transparent">
            <Link href="/menu">VIEW FULL MENU</Link>
          </Button> */}
          <CustomButton 
            text="View Full Price Lists" 
            // hoverText="Explore Our Offerings" 
            href="/menu" 
            variant="ghost" 
            className="min-w-43"
          />
        </div>
      </div>
    </section>
  )
}