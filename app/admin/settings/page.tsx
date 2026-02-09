import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminNav } from "@/components/admin-nav"
import { SettingsManager } from "@/components/settings-manager"

export default async function AdminSettingsPage() {
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

  // Fetch all settings
  const { data: settings } = await supabase.from("settings").select("*")

  const settingsMap =
    settings?.reduce(
      (acc, setting) => {
        acc[setting.key] = setting.value
        return acc
      },
      {} as Record<string, string>,
    ) || {}

  return (
    <div className="min-h-screen bg-background">
      <AdminNav user={user} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-medium mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage site configuration and currency settings</p>
        </div>

        <SettingsManager settings={settingsMap} />
      </main>
    </div>
  )
}
