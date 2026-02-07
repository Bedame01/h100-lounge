"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { resend, FROM_EMAIL, isResendConfigured } from "@/lib/resend"

export async function updateReservationStatus(reservationId: string, status: "pending" | "confirmed" | "cancelled") {
  const supabase = await createClient()

  const { data: reservation } = await supabase.from("reservations").select("*").eq("id", reservationId).single()

  const { error } = await supabase.from("reservations").update({ status }).eq("id", reservationId)

  if (error) {
    console.error("[v0] Update reservation status error:", error)
    return { error: "Failed to update reservation status" }
  }

  if (status === "confirmed" && reservation && isResendConfigured && resend) {
    try {
      const formattedDate = new Date(reservation.reservation_date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })

      await resend.emails.send({
        from: FROM_EMAIL,
        to: reservation.guest_email,
        subject: "Reservation Confirmed - Noir Lounge",
        html: getApprovalEmail({
          customerName: reservation.guest_name,
          date: formattedDate,
          time: reservation.reservation_time,
          partySize: reservation.party_size,
          seatingArea: reservation.seating_area || "main_lounge",
          specialRequests: reservation.special_requests || undefined,
        }),
      })
      console.log("[v0] Approval email sent to customer")
    } catch (emailError) {
      console.error("[v0] Failed to send approval email:", emailError)
    }
  }

  revalidatePath("/admin/reservations")
  revalidatePath("/admin/dashboard")

  return { success: true }
}

function formatSeatingArea(area: string) {
  return area === "bar_counter" ? "Bar Counter" : "Main Lounge"
}

function getApprovalEmail({
  customerName,
  date,
  time,
  partySize,
  seatingArea,
  specialRequests,
}: {
  customerName: string
  date: string
  time: string
  partySize: number
  seatingArea: string
  specialRequests?: string
}) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .detail { margin: 15px 0; padding: 10px; background: white; border-radius: 4px; }
          .label { font-weight: bold; color: #10b981; }
          .highlight { background: #d1fae5; padding: 15px; border-left: 4px solid #10b981; margin: 20px 0; border-radius: 4px; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">🎉 Reservation Confirmed!</h1>
            <p style="margin: 10px 0 0 0;">Your table is waiting for you</p>
          </div>
          <div class="content">
            <p>Dear ${customerName},</p>
            
            <div class="highlight">
              <strong>Great news!</strong> Your reservation at Noir Lounge has been confirmed. We're excited to welcome you!
            </div>
            
            <div class="detail">
              <div><span class="label">Date:</span> ${date}</div>
              <div><span class="label">Time:</span> ${time}</div>
              <div><span class="label">Party Size:</span> ${partySize} guests</div>
              <div><span class="label">Seating:</span> ${formatSeatingArea(seatingArea)}</div>
              ${specialRequests ? `<div><span class="label">Special Requests:</span> ${specialRequests}</div>` : ""}
            </div>
            
            <p><strong>What to expect:</strong></p>
            <ul>
              <li>Please arrive 10 minutes before your reservation time</li>
              <li>We'll have your table ready upon arrival</li>
              <li>Browse our premium cocktail and small chops menu</li>
              <li>Enjoy our sophisticated ambiance and excellent service</li>
            </ul>
            
            <p>If you need to cancel or modify your reservation, please contact us at least 24 hours in advance.</p>
            
            <p style="margin-top: 30px;">
              We can't wait to serve you!<br />
              <strong>The Noir Lounge Team</strong>
            </p>
          </div>
          <div class="footer">
            <p>Noir Lounge | Premium Cocktails & Small Chops</p>
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
    </html>
  `
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
