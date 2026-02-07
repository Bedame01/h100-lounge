import { GlassWater, UtensilsCrossed } from "lucide-react"
import CardFlip from "./kokonutui/card-flip"
import Drinks from "@/components/icons/drink"
import Dish from "@/components/icons/dish"
import Sparkles from "@/components/icons/sparkles"

const features = [
  {
    icon: GlassWater,
    title: "Signature Cocktails",
    description: "Expertly crafted drinks using premium spirits and fresh ingredients",
  },
  {
    icon: UtensilsCrossed,
    title: "Small Chops",
    description: "Delicious bites perfectly paired to complement your experience",
  },
  {
    icon: Sparkles,
    title: "Refined Atmosphere",
    description: "An intimate setting designed for those who appreciate the finer things",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 pt-15! bg-[#2a2524]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="textDisplay text-4xl sm:text-5xl font-bold mb-4 text-[#fefbf8]">The H100 Experience</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Every detail curated for discerning tastes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* <CardFlip 
            title="Signature Cocktails."
            subtitle="Expertly crafted drinks using premium spirits and fresh ingredients"
            description="Our mixologists, with their deep knowledge of spirits and flavors, meticulously craft each cocktail. They are not just drinks, but liquid artistry designed to captivate your senses."
            features={["Expertly Crafted Elixirs", "Premium Spirits", "Diverse Selection", "Unique Flavor Journeys"]}
            // className="mb-16"
            text="Explore Cocktails"
            href="/menu"
            icon={<Drinks className="size-18 fill-accent" />}
          />
          <CardFlip 
            title="Sides Menus."
            subtitle="Delicious bites perfectly paired to complement your experience"
            description="Delicious bites perfectly paired to complement your experience"
            features={["Gourmet Culinary Delights", "Artful Presentation", "Fresh Ingredients", "Complementary Flavors"]}
            // className="mb-16"
            text="Explore Menu"
            href="/menu"
            icon={<Dish className="size-18 fill-accent" />}
          />
          <CardFlip 
            title="Refined Atmosphere."
            subtitle=" Elegant surroundings and soulful melodies."
            description=" Elegant surroundings and soulful melodies."
            features={["Elegant Decor", "Soulful Melodies", "Intimate Sanctuary", "Exceptional Service"]}
            // className="mb-16"
            text="Make a Reservation"
            href="/reservations"
            icon={<Sparkles className="size-18 fill-accent" />}
          /> */}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center text-center p-8 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="textDisplay text-2xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-pretty">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
