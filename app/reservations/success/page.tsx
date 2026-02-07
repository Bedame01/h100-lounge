import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, ArrowRight, Mail } from "lucide-react"
import CustomButton from "@/components/kokonutui/CustomButton/CustomButton"

export default function ReservationSuccessPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-20 min-h-[80vh] flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto text-center space-y-8">
            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-accent" />
              </div>
            </div>

            {/* Heading */}
            <div className="space-y-3">
              <h1 className="font-serif text-4xl font-bold">Reservation Submitted</h1>
              <p className="text-muted-foreground text-lg text-pretty">
                Thank you for choosing H100 Lounge
              </p>
            </div>

            {/* Info Card */}
            <div className="p-6 rounded-2xl border border-border bg-card/50 space-y-4 text-left">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Check your email</p>
                  <p className="text-sm text-muted-foreground mt-1 text-pretty">
                    We've sent a confirmation to your email address. Our team will review your booking 
                    and send you an approval notification shortly.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <CustomButton 
                text="Back to Home" 
                // hoverText="Explore Our Offerings" 
                href="/" 
                variant="ghost" 
                className="min-w-full"
              />
              <CustomButton 
                text="View Price List"  
                href="/menu" 
                variant="primary" 
                className="min-w-full text-[#fff] group"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
