import type * as React from "react"

interface ReservationApprovedEmailProps {
  customerName: string
  date: string
  time: string
  partySize: number
  specialRequests?: string
}

export const ReservationApprovedEmail: React.FC<ReservationApprovedEmailProps> = ({
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
        .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .detail { margin: 15px 0; padding: 10px; background: white; border-radius: 4px; }
        .label { font-weight: bold; color: #10b981; }
        .highlight { background: #d1fae5; padding: 15px; border-left: 4px solid #10b981; margin: 20px 0; border-radius: 4px; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
      `}</style>
    </head>
    <body>
      <div className="container">
        <div className="header">
          <h1>🎉 Reservation Confirmed!</h1>
          <p>Your table is waiting for you</p>
        </div>
        <div className="content">
          <p>Dear {customerName},</p>

          <div className="highlight">
            <strong>Great news!</strong> Your reservation at H100 Lounge & Bar has been confirmed. We're excited to welcome
            you!
          </div>

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
            <strong>What to expect:</strong>
          </p>
          <ul>
            <li>Please arrive 10 minutes before your reservation time</li>
            <li>We'll have your table ready upon arrival</li>
            <li>Browse our premium cocktail and small chops menu</li>
            <li>Enjoy our sophisticated ambiance and excellent service</li>
          </ul>

          <p>If you need to cancel or modify your reservation, please contact us at least 24 hours in advance.</p>

          <p style={{ marginTop: "30px" }}>
            We can't wait to serve you!
            <br />
            <strong>The H100 Lounge & Bar Team</strong>
          </p>
        </div>
        <div className="footer">
          <p>H100 Lounge & Bar | Relax, Refresh and Repeat</p>
          <p>This is an automated message. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
  </html>
)
