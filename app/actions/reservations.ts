"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { resend, ADMIN_EMAIL, FROM_EMAIL, isResendConfigured } from "@/lib/resend"

export async function createReservation(formData: FormData) {
  const supabase = await createClient()

  const guestName = formData.get("guest_name") as string
  const guestEmail = formData.get("guest_email") as string
  const guestPhone = formData.get("guest_phone") as string
  const reservationDate = formData.get("reservation_date") as string
  const reservationTime = formData.get("reservation_time") as string
  const partySize = Number.parseInt(formData.get("party_size") as string)
  const seatingArea = (formData.get("seating_area") as string) || "main_lounge"
  const specialRequests = formData.get("special_requests") as string

  // Validate inputs
  if (!guestName || !guestEmail || !guestPhone || !reservationDate || !reservationTime || !partySize) {
    return { error: "Please fill in all required fields." }
  }

  if (partySize < 1 || partySize > 12) {
    return { error: "Party size must be between 1 and 12 guests." }
  }

  // Check if the date is in the future
  const selectedDate = new Date(reservationDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (selectedDate < today) {
    return { error: "Please select a future date for your reservation." }
  }

  const { data: reservation, error } = await supabase
    .from("reservations")
    .insert({
      guest_name: guestName,
      guest_email: guestEmail,
      guest_phone: guestPhone,
      reservation_date: reservationDate,
      reservation_time: reservationTime,
      party_size: partySize,
      seating_area: seatingArea,
      special_requests: specialRequests || null,
      status: "pending",
    })
    .select()
    .single()

  if (error) {
    console.error("[v0] Reservation creation error:", error)
    return { error: "Failed to create reservation. Please try again." }
  }

  console.log("[v0] Reservation created successfully:", reservation.id)

  if (isResendConfigured && resend) {
    const formattedDate = new Date(reservationDate).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    // Send customer confirmation email
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: guestEmail,
        subject: "Reservation Request Received - Noir Lounge",
        html: getCustomerConfirmationEmail({
          customerName: guestName,
          date: formattedDate,
          time: reservationTime,
          partySize,
          seatingArea,
          specialRequests,
        }),
      })
      console.log("[v0] Customer confirmation email sent")
    } catch (emailError) {
      console.error("[v0] Failed to send customer confirmation email:", emailError)
    }

    // Send admin notification email
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `New Reservation Request - ${guestName}`,
        html: getAdminNotificationEmail({
          customerName: guestName,
          customerEmail: guestEmail,
          customerPhone: guestPhone,
          date: formattedDate,
          time: reservationTime,
          partySize,
          seatingArea,
          specialRequests,
          reservationId: reservation.id,
        }),
      })
      console.log("[v0] Admin notification email sent")
    } catch (emailError) {
      console.error("[v0] Failed to send admin notification email:", emailError)
    }
  } else {
    console.log("[v0] Resend not configured, skipping email notifications")
  }

  revalidatePath("/admin/reservations")

  return { success: true }
}

function formatSeatingArea(area: string) {
  return area === "bar_counter" ? "Bar Counter" : "Main Lounge"
}

function getCustomerConfirmationEmail({
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
          .header { background: linear-gradient(135deg, #d4a574 0%, #b8956a 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .detail { margin: 15px 0; padding: 10px; background: white; border-radius: 4px; }
          .label { font-weight: bold; color: #d4a574; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">Reservation Received</h1>
            <p style="margin: 10px 0 0 0;">Thank you for choosing Noir Lounge</p>
          </div>
          <div class="content">
            <p>Dear ${customerName},</p>
            <p>We're delighted to confirm your reservation request at Noir Lounge. Our team will review your request and send you a confirmation shortly.</p>
            
            <div class="detail">
              <div><span class="label">Date:</span> ${date}</div>
              <div><span class="label">Time:</span> ${time}</div>
              <div><span class="label">Party Size:</span> ${partySize} guests</div>
              <div><span class="label">Seating:</span> ${formatSeatingArea(seatingArea)}</div>
              ${specialRequests ? `<div><span class="label">Special Requests:</span> ${specialRequests}</div>` : ""}
            </div>
            
            <p>Please note that your reservation is pending approval. You will receive another email once it has been confirmed by our team.</p>
            <p>If you have any questions or need to modify your reservation, please don't hesitate to contact us.</p>
            <p>We look forward to hosting you!</p>
            
            <p style="margin-top: 30px;">
              Warm regards,<br />
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

function getAdminNotificationEmail({
  customerName,
  customerEmail,
  customerPhone,
  date,
  time,
  partySize,
  seatingArea,
  specialRequests,
  reservationId,
}: {
  customerName: string
  customerEmail: string
  customerPhone: string
  date: string
  time: string
  partySize: number
  seatingArea: string
  specialRequests?: string
  reservationId: string
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .detail { margin: 15px 0; padding: 10px; background: white; border-radius: 4px; }
          .label { font-weight: bold; color: #3b82f6; }
          .alert { background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0; border-radius: 4px; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .button { display: inline-block; padding: 12px 30px; background: #3b82f6; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">🔔 New Reservation Request</h1>
            <p style="margin: 10px 0 0 0;">Action Required</p>
          </div>
          <div class="content">
            <div class="alert">
              <strong>⚠️ Pending Approval:</strong> A new reservation request has been submitted and requires your review.
            </div>
            
            <h3>Customer Information:</h3>
            <div class="detail">
              <div><span class="label">Name:</span> ${customerName}</div>
              <div><span class="label">Email:</span> ${customerEmail}</div>
              <div><span class="label">Phone:</span> ${customerPhone}</div>
            </div>
            
            <h3>Reservation Details:</h3>
            <div class="detail">
              <div><span class="label">Date:</span> ${date}</div>
              <div><span class="label">Time:</span> ${time}</div>
              <div><span class="label">Party Size:</span> ${partySize} guests</div>
              <div><span class="label">Seating:</span> ${formatSeatingArea(seatingArea)}</div>
              ${specialRequests ? `<div><span class="label">Special Requests:</span> ${specialRequests}</div>` : ""}
              <div style="margin-top: 10px; font-size: 12px; color: #666;">
                <span class="label">Reservation ID:</span> ${reservationId}
              </div>
            </div>
            
            <p style="margin-top: 30px; padding: 20px; background: white; border-radius: 4px; text-align: center;">
              <a href="${siteUrl}/admin/reservations" class="button">Review in Admin Panel</a>
            </p>
            
            <p style="margin-top: 20px; font-size: 14px; color: #666;">
              Please review and approve/reject this reservation as soon as possible.
            </p>
          </div>
          <div class="footer">
            <p>Noir Lounge Admin Panel</p>
          </div>
        </div>
      </body>
    </html>
  `
}
