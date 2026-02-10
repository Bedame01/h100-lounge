import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ReservationBooking } from "@/components/reservation-booking"

export const metadata = {
  title: "Book a Table | H100 Lounge & Bar",
  description: "Reserve your table at H100 Lounge & Bar for an evening of refined cocktails and ambient sounds.",
}

export default function ReservationsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <ReservationBooking />
      </div>
      <Footer />
    </main>
  )
}
