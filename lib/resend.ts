import { Resend } from "resend"

const RESEND_API_KEY = process.env.RESEND_API_KEY
const isResendConfigured = Boolean(RESEND_API_KEY)

export const resend = isResendConfigured ? new Resend(RESEND_API_KEY) : null

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@nh100lounge.com"
export const FROM_EMAIL = process.env.FROM_EMAIL || "H100 Lounge <noreply@noirlounge.com>"

export { isResendConfigured }