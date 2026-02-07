import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminNav } from "@/components/admin-nav"
import { EnhancedDashboard } from "@/components/enhanced-dashboard"

export default async function AdminDashboardPage() {
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

  const { count: totalReservations } = await supabase.from("reservations").select("*", { count: "exact", head: true })

  const { count: pendingReservations } = await supabase
    .from("reservations")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending")

  const { count: confirmedReservations } = await supabase
    .from("reservations")
    .select("*", { count: "exact", head: true })
    .eq("status", "confirmed")

  const { count: cancelledReservations } = await supabase
    .from("reservations")
    .select("*", { count: "exact", head: true })
    .eq("status", "cancelled")

  const { count: menuItemsCount } = await supabase.from("menu_items").select("*", { count: "exact", head: true })

  const { count: availableItems } = await supabase
    .from("menu_items")
    .select("*", { count: "exact", head: true })
    .eq("is_available", true)

  const { count: categoriesCount } = await supabase.from("categories").select("*", { count: "exact", head: true })

  // Fetch recent reservations for chart
  const { data: recentReservations } = await supabase
    .from("reservations")
    .select("created_at, status")
    .order("created_at", { ascending: false })
    .limit(30)

  // Fetch all customers
  const { data: customers } = await supabase.from("reservations").select("guest_name, guest_email").limit(100)

  return (
    <div className="min-h-screen bg-background">
      <AdminNav user={user} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground">Welcome back, {user.email}</p>
        </div>

        <EnhancedDashboard
          stats={{
            totalReservations: totalReservations || 0,
            pendingReservations: pendingReservations || 0,
            confirmedReservations: confirmedReservations || 0,
            cancelledReservations: cancelledReservations || 0,
            menuItems: menuItemsCount || 0,
            availableItems: availableItems || 0,
            categories: categoriesCount || 0,
          }}
          recentReservations={recentReservations || []}
          customers={customers || []}
        />
      </main>
    </div>
  )
}