import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import bg from '@/public/images/drink pouring from glass.avif'
import image1 from '@/public/images/Elegant Crystal Glass Celebration.png'
import image2 from '@/public/images/Elegant Wine Glass.png'
import CustomButton from '@/components/kokonutui/CustomButton/CustomButton'

export const metadata = {
  title: "About Us - H100 Lounge",
  description: "Discover H100 Lounge's journey and what makes our luxury lounge experience truly special.",
}

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Minimal Hero */}
        <section className="relative h-[30vh] md:h-[40vh] flex items-end overflow-hidden pt-16 border-b border-border">
          {/* <Image
            src={bg}
            alt="H100 Lounge"
            fill
            className="object-cover"
            priority
          /> */}
          {/* <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" /> */}
          <div className="relative z-20 pb-12 px-4 container mx-auto w-full">
            <h1 className="font-serif text-6xl md:text-7xl text-center font-medium">Our Story</h1>
          </div>
        </section>

        {/* About Section - Minimal & Modern */}
        <section className="py-20 md:py-32 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <p className="text-accent font-semibold tracking-wide text-sm uppercase mb-4">Who We Are</p>
                <h2 className="font-serif text-3xl md:text-4xl font-medium mb-6 leading-tight">
                  Where refinement meets experience
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6 text-pretty">
                  H100 Lounge is a sanctuary for those who appreciate the finer things. 
                  We craft moments, not just drinks.
                </p>
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <Image
                  src={image1}
                  alt="Cocktails at H100"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values - Simple Cards */}
        <section className="py-20 md:py-32 px-4 bg-card/30">
          <div className="container mx-auto max-w-6xl">
            <p className="text-accent font-medium tracking-widest text-sm uppercase mb-4 text-center">Our Philosophy</p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-center mb-16">Four Pillars</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Excellence", desc: "Premium in every detail" },
                { title: "Passion", desc: "Heart in every serve" },
                { title: "Elegance", desc: "Timeless sophistication" },
                { title: "Community", desc: "Welcomed always" },
              ].map((pillar) => (
                <div key={pillar.title} className="p-6 rounded-xl border border-border/50 bg-background hover:border-primary/50 transition-colors">
                  <h3 className="text-2xl font-semibold mb-2">{pillar.title}</h3>
                  <p className="text-muted-foreground text-sm">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-20 md:py-32 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-96 rounded-2xl overflow-hidden order-last md:order-first">
                <Image
                  src={image2}
                  alt="Mixology"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-accent font-medium tracking-wide text-sm uppercase mb-4">What We Craft</p>
                <h2 className="font-serif text-3xl md:text-4xl font-medium mb-6">Artisanal moments</h2>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span className="text-muted-foreground"><strong>Cocktails</strong> made with intent and premium spirits</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span className="text-muted-foreground"><strong>Good Taste</strong> that elevate the experience</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span className="text-muted-foreground"><strong>Ambiance</strong> curated for meaningful connections</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Minimal */}
        <section className="py-20 md:py-32 px-4 bg-gradient-to-b from-card/30 to-background">
          <div className="container mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-4">Ready?</h2>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              Join us for an evening you won't forget
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CustomButton 
                text="Book Now" 
                // hoverText="Book a Table" 
                href="/reservations" 
                variant="primary" 
                className="min-w-full py-5.5 px-1 text-sm text-center textDisplay text-[#fff]"
              />
              <CustomButton 
                text="Check Price List" 
                // hoverText="Book a Table" 
                href="/menu" 
                variant="ghost" 
                className="min-w-full py-5.5 px-1 text-sm text-center textDisplay"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
