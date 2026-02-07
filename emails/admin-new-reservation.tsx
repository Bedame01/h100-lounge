import type * as React from "react"

interface AdminNewReservationEmailProps {
  customerName: string
  customerEmail: string
  customerPhone: string
  date: string
  time: string
  partySize: number
  specialRequests?: string
  reservationId: string
}

export const AdminNewReservationEmail: React.FC<AdminNewReservationEmailProps> = ({
  customerName,
  customerEmail,
  customerPhone,
  date,
  time,
  partySize,
  specialRequests,
  reservationId,
}) => (
  <html>
    <head>
      <style>{`
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .detail { margin: 15px 0; padding: 10px; background: white; border-radius: 4px; }
        .label { font-weight: bold; color: #3b82f6; }
        .alert { background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0; border-radius: 4px; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
      `}</style>
    </head>
    <body>
      <div className="container">
        <div className="header">
          <h1>🔔 New Reservation Request</h1>
          <p>Action Required</p>
        </div>
        <div className="content">
          <div className="alert">
            <strong>⚠️ Pending Approval:</strong> A new reservation request has been submitted and requires your review.
          </div>

          <h3>Customer Information:</h3>
          <div className="detail">
            <div>
              <span className="label">Name:</span> {customerName}
            </div>
            <div>
              <span className="label">Email:</span> {customerEmail}
            </div>
            <div>
              <span className="label">Phone:</span> {customerPhone}
            </div>
          </div>

          <h3>Reservation Details:</h3>
          <div className="detail">
            <div>
              <span className="label">Date:</span> {date}
            </div>
            <div>
              <span className="label">Time:</span> {time}
            </div>
            <div>
              <span className="label">Party Size:</span> {partySize} guests
            </div>
            {specialRequests && (
              <div>
                <span className="label">Special Requests:</span> {specialRequests}
              </div>
            )}
            <div style={{ marginTop: "10px", fontSize: "12px", color: "#666" }}>
              <span className="label">Reservation ID:</span> {reservationId}
            </div>
          </div>

          <p
            style={{
              marginTop: "30px",
              padding: "20px",
              background: "white",
              borderRadius: "4px",
              textAlign: "center",
            }}
          >
            <a
              href={`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin/reservations`}
              style={{
                display: "inline-block",
                padding: "12px 30px",
                background: "#3b82f6",
                color: "white",
                textDecoration: "none",
                borderRadius: "6px",
                fontWeight: "bold",
              }}
            >
              Review in Admin Panel
            </a>
          </p>

          <p style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
            Please review and approve/reject this reservation as soon as possible.
          </p>
        </div>
        <div className="footer">
          <p>H100 Lounge & Bar Admin Panel</p>
        </div>
      </div>
    </body>
  </html>
)
