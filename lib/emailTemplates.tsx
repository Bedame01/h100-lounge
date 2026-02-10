export function formatSeatingArea(area: string) {
  return area === "bar_counter" ? "Bar Counter" : "Main Lounge"
}

export function getApprovalEmail({
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
  partySize?: number
  seatingArea?: string
  specialRequests?: string
}) {
  // Handle cancellation emails (which don't have partySize)
  if (!partySize) {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .detail { margin: 15px 0; padding: 10px; background: white; border-radius: 4px; }
          .label { font-weight: bold; color: #ef4444; }
          .highlight { background: #fee2e2; padding: 15px; border-left: 4px solid #ef4444; margin: 20px 0; border-radius: 4px; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">Reservation Cancelled</h1>
            <p style="margin: 10px 0 0 0;">Your H100 Lounge & Bar reservation</p>
          </div>
          <div class="content">
            <p>Dear ${customerName},</p>
            
            <div class="highlight">
              <strong>Your reservation has been cancelled.</strong> If you didn't cancel this reservation or have questions, please contact us immediately.
            </div>
            
            <div class="detail">
              <div><span class="label">Original Date:</span> ${date}</div>
              <div><span class="label">Original Time:</span> ${time}</div>
            </div>
            
            <p>We'd love to welcome you another time! Feel free to make a new reservation whenever you're ready.</p>
            
            <p style="margin-top: 30px;">
              If you have any questions, please don't hesitate to reach out.<br />
              <strong>The H100 Lounge & Bar Team</strong>
            </p>
          </div>
          <div class="footer">
            <p>H100 Lounge & Bar | Relax, Refresh and Repeat</p>
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
    </html>
  `
  }

  // Confirmation/Approval email
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
              <strong>Great news!</strong> Your reservation at H100 Lounge & Bar has been confirmed. We're excited to welcome you!
            </div>
            
            <div class="detail">
              <div><span class="label">Date:</span> ${date}</div>
              <div><span class="label">Time:</span> ${time}</div>
              <div><span class="label">Party Size:</span> ${partySize} guests</div>
              ${seatingArea ? `<div><span class="label">Seating:</span> ${formatSeatingArea(seatingArea)}</div>` : ""}
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
              <strong>The H100 Lounge & Bar Team</strong>
            </p>
          </div>
          <div class="footer">
            <p>H100 Lounge & Bar | Relax, Refresh and Repeat</p>
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

export function getCustomerConfirmationEmail({
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
            <p style="margin: 10px 0 0 0;">Thank you for choosing H100 Lounge & Bar</p>
          </div>
          <div class="content">
            <p>Dear ${customerName},</p>
            <p>We're delighted to confirm your reservation request at H100 Lounge & Bar. Our team will review your request and send you a confirmation shortly.</p>
            
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
              <strong>The H100 Lounge & Bar Team</strong>
            </p>
          </div>
          <div class="footer">
            <p>H100 Lounge & Bar | Relax, Refresh and Repeat</p>
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

export function getAdminNotificationEmail({
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
            <p>H100 Lounge & Bar Admin Panel</p>
          </div>
        </div>
      </body>
    </html>
  `
}
