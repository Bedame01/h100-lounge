import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminNav } from "@/components/admin-nav"
import { MenuManager } from "@/components/menu-manager"

export default async function AdminMenuPage() {
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

  const { data: categories } = await supabase.from("categories").select("*").order("display_order", { ascending: true })

  const { data: menuItems } = await supabase.from("menu_items").select("*").order("display_order", { ascending: true })

  return (
    <div className="min-h-screen bg-background">
      <AdminNav user={user} />

      <main className="container mx-auto px-2.5 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-medium mb-2 ">
            Menu Management
          </h1>
          <p className="text-muted-foreground">Menu items and categories full operational Management</p>
        </div>

        <MenuManager categories={categories || []} menuItems={menuItems || []} />
      </main>
    </div>
  )
}
