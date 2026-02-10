import { Button } from "@/components/ui/button"
import Link from "next/link"
import CustomButton from "@/components/kokonutui/CustomButton/CustomButton"

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight mb-6 text-balance">Reserve Your Evening</h2>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            Join us for an unforgettable experience. Limited seating available nightly.
          </p>
          <CustomButton 
            text="Book Your Table" 
            // hoverText="Explore Our Offerings" 
            href="/reservations" 
            variant="primary" 
            className="min-w-45 textDisplay text-[#fff]!"
          />
        </div>
      </div>
    </section>
  )
}
