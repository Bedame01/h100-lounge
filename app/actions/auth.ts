"use server"

import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { redirect } from "next/navigation"

export async function validateAdminKey(adminKey: string) {
  const validAdminKey = process.env.ADMIN_SIGNUP_KEY || "NH100_ADMIN_2024"

  if (adminKey !== validAdminKey) {
    return { valid: false, error: "Invalid admin key. Please contact the system administrator." }
  }

  return { valid: true }
}

export async function signupAdmin(formData: { email: string; password: string; adminKey: string }) {
  try {
    const { email, password, adminKey } = formData

    const adminKeyValidation = await validateAdminKey(adminKey)

    if (!adminKeyValidation.valid) {
      return adminKeyValidation
    }

    // Validate password strength
    if (password.length < 8) {
      return { error: "Password must be at least 8 characters long." }
    }

    const adminClient = createAdminClient()

    const { data, error } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        is_admin: true,
        role: "admin",
      },
    })

    if (error) {
      console.error("[v0] Supabase admin signup error:", error)
      return { error: error.message }
    }

    if (!data.user) {
      return { error: "Failed to create admin account." }
    }

    return {
      success: true,
      message: "Admin account created successfully! You can now log in.",
    }
  } catch (error: unknown) {
    console.error("[v0] Unexpected error in signupAdmin:", error)
    return {
      error: error instanceof Error ? error.message : "An unexpected error occurred during signup. Please try again.",
    }
  }
}

export async function loginAdmin(formData: { email: string; password: string }) {
  try {
    const { email, password } = formData

    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { error: error.message }
    }

    if (data.user) {
      await supabase.rpc("update_admin_last_login", { admin_id: data.user.id }).catch((err) => {
        console.error("[v0] Failed to update last login:", err)
      })
    }

    redirect("/admin/dashboard")
  } catch (error: unknown) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error
    }

    return {
      error: error instanceof Error ? error.message : "An unexpected error occurred during login. Please try again.",
    }
  }
}
