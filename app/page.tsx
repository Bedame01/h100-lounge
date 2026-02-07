import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
// import { FeaturesSection } from "@/components/features-section"
import { MenuHighlights } from "@/components/menu-highlights"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { Suspense } from "react"
import { MenuItemSkeleton } from "@/components/menu-item-skeleton"
import { WelcomeSection } from "@/components/WelcomeSection"

function HighlightsLoading() {
  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="h-14 w-64 bg-muted rounded mx-auto mb-4" />
          <div className="h-6 w-48 bg-muted rounded mx-auto mb-4" />
          <div className="h-6 w-96 bg-muted rounded mx-auto" />
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <MenuItemSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <WelcomeSection />
      {/* <FeaturesSection /> */}
      <Suspense fallback={<HighlightsLoading />}>
        <MenuHighlights />
      </Suspense>
      <CTASection />
      <Footer />
    </main>
  )
}