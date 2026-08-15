"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { resend, FROM_EMAIL, isResendConfigured } from "@/lib/resend"
import { getApprovalEmail, getCancellationEmail, formatSeatingArea } from "@/lib/emailTemplates"

export type MenuItemTable =
  | "menu_items"
  | "menu_items_vip"
  | "menu_items_food"
  | "menu_items_cocktails"
  | "menu_items_mocktails"
export type CategoryTable = "categories" | "food_categories"

export async function updateReservationStatus(reservationId: string, status: "pending" | "confirmed" | "cancelled") {
  const supabase = await createClient()

  console.log("updateReservationStatus called with:", { reservationId, status })
  console.log("isResendConfigured:", isResendConfigured)
  console.log("resend instance:", resend ? "exists" : "null")

  const { data: reservation, error: fetchError } = await supabase.from("reservations").select("*").eq("id", reservationId).single()

  if (fetchError) {
    console.error("Fetch reservation error:", fetchError)
    return { error: "Failed to fetch reservation" }
  }

  console.log("Reservation fetched:", { id: reservation?.id, email: reservation?.guest_email, name: reservation?.guest_name })

  const { error } = await supabase.from("reservations").update({ status }).eq("id", reservationId)

  if (error) {
    console.error("Update reservation status error:", error)
    return { error: "Failed to update reservation status" }
  }

  console.log("Reservation updated successfully. Status:", status)

  if (reservation && isResendConfigured && resend) {
    try {
      const formattedDate = new Date(reservation.reservation_date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })

      console.log("Attempting to send email to:", reservation.guest_email)
      console.log("FROM_EMAIL:", FROM_EMAIL)

      if (status === "confirmed") {
        console.log("Sending confirmation email...")
        const confirmResult = await resend.emails.send({
          from: FROM_EMAIL,
          to: reservation.guest_email,
          subject: "Reservation Confirmed - H100 Lounge & Bar",
          html: getApprovalEmail({
            customerName: reservation.guest_name,
            date: formattedDate,
            time: reservation.reservation_time,
            partySize: reservation.party_size,
            seatingArea: reservation.seating_area || "main_lounge",
            specialRequests: reservation.special_requests || undefined,
          }),
        })
        console.log("Confirmation email response:", confirmResult)
      } else if (status === "cancelled") {
        console.log("Sending cancellation email...")
        const cancelResult = await resend.emails.send({
          from: FROM_EMAIL,
          to: reservation.guest_email,
          subject: "Reservation Cancelled - H100 Lounge & Bar",
          html: getCancellationEmail({
            customerName: reservation.guest_name,
            date: formattedDate,
            time: reservation.reservation_time,
          }),
        })
        console.log("Cancellation email response:", cancelResult)
      }
    } catch (emailError) {
      console.error("Failed to send email - Full error:", emailError)
      if (emailError instanceof Error) {
        console.error("Error message:", emailError.message)
        console.error("Error stack:", emailError.stack)
      }
    }
  } else {
    console.log("Email sending skipped - reservation:", !!reservation, "resendConfigured:", isResendConfigured, "resend:", !!resend)
  }

  revalidatePath("/admin/reservations")
  revalidatePath("/admin/dashboard")

  return { success: true }
}

export async function deleteReservation(reservationId: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("reservations").delete().eq("id", reservationId)

  if (error) {
    console.error("Delete reservation error:", error)
    return { error: "Failed to delete reservation" }
  }

  revalidatePath("/admin/reservations")
  revalidatePath("/admin/dashboard")

  return { success: true }
}

export async function toggleMenuItemAvailability(
  menuItemId: string,
  isAvailable: boolean,
  table: MenuItemTable = "menu_items",
) {
  const supabase = await createClient()

  const { error } = await supabase.from(table).update({ is_available: isAvailable }).eq("id", menuItemId)

  if (error) {
    console.error("Toggle menu item availability error:", error)
    return { error: "Failed to update menu item" }
  }

  revalidatePath("/admin/menu")
  revalidatePath("/menu")

  return { success: true }
}

export async function createMenuItem(data: {
  name: string
  description: string
  price: number
  category_id: string
  is_available?: boolean
  display_order?: number
  image_url?: string | null
  badges?: string[] | null
  is_highlighted?: boolean
  size_options?: { size: string; price: number }[] | null
  table?: MenuItemTable
}) {
  const supabase = await createClient()
  const { table = "menu_items", ...payload } = data

  const { data: inserted, error } = await supabase
    .from(table)
    .insert({
      ...payload,
      is_available: data.is_available ?? true,
      display_order: data.display_order ?? 0,
    })
    .select()
    .single()

  if (error) {
    console.error("Create menu item error:", error)
    return { error: "Failed to create menu item" }
  }

  revalidatePath("/admin/menu")
  revalidatePath("/menu")

  return { success: true, data: inserted }
}

export async function updateMenuItem(
  id: string,
  data: {
    name?: string
    description?: string
    price?: number
    category_id?: string
    is_available?: boolean
    display_order?: number
    image_url?: string | null
    badges?: string[] | null
    is_highlighted?: boolean
    size_options?: { size: string; price: number }[] | null
    table?: MenuItemTable
  },
) {
  const supabase = await createClient()
  const { table = "menu_items", ...payload } = data

  const { data: updated, error } = await supabase.from(table).update(payload).eq("id", id).select().single()

  if (error) {
    console.error("Update menu item error:", error)
    return { error: "Failed to update menu item" }
  }

  revalidatePath("/admin/menu")
  revalidatePath("/menu")

  return { success: true, data: updated }
}

export async function deleteMenuItem(id: string, table: MenuItemTable = "menu_items") {
  const supabase = await createClient()

  const { error } = await supabase.from(table).delete().eq("id", id)

  if (error) {
    console.error("Delete menu item error:", error)
    return { error: "Failed to delete menu item" }
  }

  revalidatePath("/admin/menu")
  revalidatePath("/menu")

  return { success: true }
}

export async function createCategory(
  data: {
    name: string
    slug: string
    description?: string
    display_order?: number
  },
  table: CategoryTable = "categories",
) {
  const supabase = await createClient()

  const { data: inserted, error } = await supabase
    .from(table)
    .insert({
      ...data,
      display_order: data.display_order ?? 0,
    })
    .select()
    .single()

  if (error) {
    console.error("Create category error:", error)
    return { error: "Failed to create category" }
  }

  revalidatePath("/admin/menu")
  revalidatePath("/menu")

  return { success: true, data: inserted }
}

export async function updateCategory(
  id: string,
  data: {
    name?: string
    slug?: string
    description?: string
    display_order?: number
  },
  table: CategoryTable = "categories",
) {
  const supabase = await createClient()

  const { data: updated, error } = await supabase.from(table).update(data).eq("id", id).select().single()

  if (error) {
    console.error("Update category error:", error)
    return { error: "Failed to update category" }
  }

  revalidatePath("/admin/menu")
  revalidatePath("/menu")

  return { success: true, data: updated }
}

export async function deleteCategory(id: string, table: CategoryTable = "categories") {
  const supabase = await createClient()

  const { error } = await supabase.from(table).delete().eq("id", id)

  if (error) {
    console.error("Delete category error:", error)
    return { error: "Failed to delete category" }
  }

  revalidatePath("/admin/menu")
  revalidatePath("/menu")

  return { success: true }
}

export async function updateSetting(key: string, value: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("settings")
    .update({ value, updated_at: new Date().toISOString() })
    .eq("key", key)

  if (error) {
    console.error("Update setting error:", error)
    return { error: "Failed to update setting" }
  }

  revalidatePath("/admin/settings")
  revalidatePath("/menu")

  return { success: true }
}
