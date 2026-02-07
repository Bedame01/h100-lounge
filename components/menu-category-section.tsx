import { Card, CardContent } from "@/components/ui/card"

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
}

interface MenuCategorySectionProps {
  category: Category
  items: MenuItem[]
}

export function MenuCategorySection({ category, items }: MenuCategorySectionProps) {
  if (!items || items.length === 0) return null

  return (
    <section className="py-16 border-b border-border last:border-b-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold mb-3">{category.name}</h2>
          {category.description && <p className="text-muted-foreground text-pretty">{category.description}</p>}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-serif text-xl font-semibold text-balance">{item.name}</h3>
                    <span className="text-primary font-semibold whitespace-nowrap ml-4">
                      ₦{item.price.toLocaleString()}
                    </span>
                  </div>

                  {item.description && (
                    <p className="text-sm text-muted-foreground flex-grow text-pretty">{item.description}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
