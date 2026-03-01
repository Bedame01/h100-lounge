"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { resend, FROM_EMAIL, isResendConfigured } from "@/lib/resend"
import { getApprovalEmail, getCancellationEmail, formatSeatingArea } from "@/lib/emailTemplates"

export async function updateReservationStatus(reservationId: string, status: "pending" | "confirmed" | "cancelled") {
  const supabase = await createClient()

  console.log("[v0] updateReservationStatus called with:", { reservationId, status })
  console.log("[v0] isResendConfigured:", isResendConfigured)
  console.log("[v0] resend instance:", resend ? "exists" : "null")

  const { data: reservation, error: fetchError } = await supabase.from("reservations").select("*").eq("id", reservationId).single()

  if (fetchError) {
    console.error("[v0] Fetch reservation error:", fetchError)
    return { error: "Failed to fetch reservation" }
  }

  console.log("[v0] Reservation fetched:", { id: reservation?.id, email: reservation?.guest_email, name: reservation?.guest_name })

  const { error } = await supabase.from("reservations").update({ status }).eq("id", reservationId)

  if (error) {
    console.error("[v0] Update reservation status error:", error)
    return { error: "Failed to update reservation status" }
  }

  console.log("[v0] Reservation updated successfully. Status:", status)

  if (reservation && isResendConfigured && resend) {
    try {
      const formattedDate = new Date(reservation.reservation_date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })

      console.log("[v0] Attempting to send email to:", reservation.guest_email)
      console.log("[v0] FROM_EMAIL:", FROM_EMAIL)

      if (status === "confirmed") {
        console.log("[v0] Sending confirmation email...")
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
        console.log("[v0] Confirmation email response:", confirmResult)
      } else if (status === "cancelled") {
        console.log("[v0] Sending cancellation email...")
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
        console.log("[v0] Cancellation email response:", cancelResult)
      }
    } catch (emailError) {
      console.error("[v0] Failed to send email - Full error:", emailError)
      if (emailError instanceof Error) {
        console.error("[v0] Error message:", emailError.message)
        console.error("[v0] Error stack:", emailError.stack)
      }
    }
  } else {
    console.log("[v0] Email sending skipped - reservation:", !!reservation, "resendConfigured:", isResendConfigured, "resend:", !!resend)
  }

  revalidatePath("/admin/reservations")
  revalidatePath("/admin/dashboard")

  return { success: true }
}

export async function deleteReservation(reservationId: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("reservations").delete().eq("id", reservationId)

  if (error) {
    console.error("[v0] Delete reservation error:", error)
    return { error: "Failed to delete reservation" }
  }

  revalidatePath("/admin/reservations")
  revalidatePath("/admin/dashboard")

  return { success: true }
}

export async function toggleMenuItemAvailability(menuItemId: string, isAvailable: boolean) {
  const supabase = await createClient()

  const { error } = await supabase.from("menu_items").update({ is_available: isAvailable }).eq("id", menuItemId)

  if (error) {
    console.error("[v0] Toggle menu item availability error:", error)
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
}) {
  const supabase = await createClient()

  const { error } = await supabase.from("menu_items").insert({
    ...data,
    is_available: data.is_available ?? true,
    display_order: data.display_order ?? 0,
  })

  if (error) {
    console.error("[v0] Create menu item error:", error)
    return { error: "Failed to create menu item" }
  }

  revalidatePath("/admin/menu")
  revalidatePath("/menu")

  return { success: true }
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
  },
) {
  const supabase = await createClient()

  const { error } = await supabase.from("menu_items").update(data).eq("id", id)

  if (error) {
    console.error("[v0] Update menu item error:", error)
    return { error: "Failed to update menu item" }
  }

  revalidatePath("/admin/menu")
  revalidatePath("/menu")

  return { success: true }
}

export async function deleteMenuItem(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("menu_items").delete().eq("id", id)

  if (error) {
    console.error("[v0] Delete menu item error:", error)
    return { error: "Failed to delete menu item" }
  }

  revalidatePath("/admin/menu")
  revalidatePath("/menu")

  return { success: true }
}

export async function createCategory(data: {
  name: string
  slug: string
  description?: string
  display_order?: number
}) {
  const supabase = await createClient()

  const { error } = await supabase.from("categories").insert({
    ...data,
    display_order: data.display_order ?? 0,
  })

  if (error) {
    console.error("[v0] Create category error:", error)
    return { error: "Failed to create category" }
  }

  revalidatePath("/admin/menu")
  revalidatePath("/menu")

  return { success: true }
}

export async function updateCategory(
  id: string,
  data: {
    name?: string
    slug?: string
    description?: string
    display_order?: number
  },
) {
  const supabase = await createClient()

  const { error } = await supabase.from("categories").update(data).eq("id", id)

  if (error) {
    console.error("[v0] Update category error:", error)
    return { error: "Failed to update category" }
  }

  revalidatePath("/admin/menu")
  revalidatePath("/menu")

  return { success: true }
}

export async function deleteCategory(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("categories").delete().eq("id", id)

  if (error) {
    console.error("[v0] Delete category error:", error)
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
    console.error("[v0] Update setting error:", error)
    return { error: "Failed to update setting" }
  }

  revalidatePath("/admin/settings")
  revalidatePath("/menu")

  return { success: true }
}
