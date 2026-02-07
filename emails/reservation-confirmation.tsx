import type * as React from "react"

interface ReservationConfirmationEmailProps {
  customerName: string
  date: string
  time: string
  partySize: number
  specialRequests?: string
}

export const ReservationConfirmationEmail: React.FC<ReservationConfirmationEmailProps> = ({
  customerName,
  date,
  time,
  partySize,
  specialRequests,
}) => (
  <html>
    <head>
      <style>{`
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #d4a574 0%, #b8956a 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .detail { margin: 15px 0; padding: 10px; background: white; border-radius: 4px; }
        .label { font-weight: bold; color: #d4a574; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
      `}</style>
    </head>
    <body>
      <div className="container">
        <div className="header">
          <h1>Reservation Received</h1>
          <p>Thank you for choosing H100 Lounge & Bar</p>
        </div>
        <div className="content">
          <p>Dear {customerName},</p>
          <p>
            We're delighted to confirm your reservation request at H100 Lounge & Bar. Our team will review your request and
            send you a confirmation shortly.
          </p>

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
          </div>

          <p>
            Please note that your reservation is pending approval. You will receive another email once it has been
            confirmed by our team.
          </p>

          <p>If you have any questions or need to modify your reservation, please don't hesitate to contact us.</p>

          <p>We look forward to hosting you!</p>

          <p style={{ marginTop: "30px" }}>
            Warm regards,
            <br />
            <strong>The H100 Lounge & Bar Team</strong>
          </p>
        </div>
        <div className="footer">
          <p>H100 Lounge & Bar | Premium Cocktails & Small Chops</p>
          <p>This is an automated message. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
  </html>
)
