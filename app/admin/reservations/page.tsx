import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminNav } from "@/components/admin-nav"
import { ReservationsTable } from "@/components/reservations-table"

export default async function AdminReservationsPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/admin/login")
  }

  const isAdmin = user.user_metadata?.is_admin === true

  if (!isAdmin) {
    redirect("/")
  }

  // Fetch all reservations ordered by date
  const { data: reservations } = await supabase
    .from("reservations")
    .select("*")
    .order("reservation_date", { ascending: false })
    .order("reservation_time", { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      <AdminNav user={user} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold mb-2">Reservations</h1>
          <p className="text-muted-foreground">Manage and review guest reservations</p>
        </div>

        <ReservationsTable reservations={reservations || []} />
      </main>
    </div>
  )
}
