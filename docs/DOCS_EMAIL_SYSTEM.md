# H100 Lounge & Bar - Email System Documentation

## Overview

The email system is built on **Resend** for transactional email delivery. It automatically sends notifications to both customers and admins for reservation lifecycle events.

---

## Configuration

### Environment Variables

All email configuration is managed through environment variables. Set these in your `.env.local` or Vercel project settings:

```bash
# Email Service Configuration
RESEND_API_KEY=your_resend_api_key_here

# Sender Information
FROM_EMAIL=H100 Lounge & Bar <noreply@h100lounge.com>
ADMIN_EMAIL=admin@h100lounge.com

# Site URL (used for admin panel links in emails)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

**Default Values:**
- `FROM_EMAIL`: "H100 Lounge & Bar <noreply@h100lounge.com>"
- `ADMIN_EMAIL`: "admin@h100lounge.com"

These defaults are defined in `/lib/resend.ts` and are used if environment variables are not set.

---

## Email Types

### 1. **Customer Confirmation Email** (Sent on Reservation Creation)

**File:** `lib/emailTemplates.tsx` → `getCustomerConfirmationEmail()`
**Trigger:** When a guest submits a new reservation
**Recipient:** Guest email (from form)
**Subject:** "Reservation Request Received - H100 Lounge & Bar"

**Contains:**
- Reservation details (date, time, party size, seating)
- Special requests (if provided)
- Status note: "Pending approval"
- Instructions to wait for confirmation

**Example Flow:**
```
Guest fills form → Reservation created → Email sent to guest email
```

---

### 2. **Admin Notification Email** (Sent on Reservation Creation)

**File:** `lib/emailTemplates.tsx` → `getAdminNotificationEmail()`
**Trigger:** When a guest submits a new reservation
**Recipient:** Admin email (`ADMIN_EMAIL`)
**Subject:** "New Reservation Request - {Customer Name}"

**Contains:**
- Full customer information (name, email, phone)
- Complete reservation details
- Special requests
- Reservation ID
- Direct link to admin dashboard for action

**Example Flow:**
```
Guest fills form → Reservation created → Email sent to admin
Admin reviews → Can approve/reject from email link
```

---

### 3. **Confirmation Email** (Sent on Admin Approval)

**File:** `lib/emailTemplates.tsx` → `getApprovalEmail()`
**Trigger:** When admin changes status to "confirmed"
**Recipient:** Guest email
**Subject:** "Reservation Confirmed - H100 Lounge & Bar"

**Contains:**
- ✅ Confirmation badge
- Reservation details with all information
- What to expect when arriving
- Cancellation policy (24-hour notice)

**Example Flow:**
```
Admin approves reservation → Status updated to "confirmed" → Email sent to guest
```

---

### 4. **Cancellation Email** (Sent on Admin Cancellation)

**File:** `lib/emailTemplates.tsx` → `getCancellationEmail()`
**Trigger:** When admin changes status to "cancelled"
**Recipient:** Guest email
**Subject:** "Reservation Cancelled - H100 Lounge & Bar"

**Contains:**
- ⚠️ Cancellation notice
- Original reservation date and time
- Invitation to rebook
- Contact information for questions

**Example Flow:**
```
Admin cancels reservation → Status updated to "cancelled" → Email sent to guest
```

---

## Code Flow Diagrams

### Reservation Creation Flow

```
Guest submits form
    ↓
createReservation() [app/actions/reservations.tsx]
    ↓
Validate input + Insert into database
    ↓
[Parallel Emails]
├─ Send to Guest: getCustomerConfirmationEmail()
└─ Send to Admin: getAdminNotificationEmail()
    ↓
Success message + Redirect to /reservations/success
```

### Admin Approval/Cancellation Flow

```
Admin clicks "Approve" or "Cancel"
    ↓
updateReservationStatus() [app/actions/admin.tsx]
    ↓
Update reservation status in database
    ↓
IF status === "confirmed"
    └─ Send getApprovalEmail() to guest
ELSE IF status === "cancelled"
    └─ Send getCancellationEmail() to guest
    ↓
Revalidate cache + Success
```

---

## Troubleshooting

### Issue: Emails Not Sending

**Check 1: Is Resend API Key configured?**
```bash
# Verify in environment variables
echo $RESEND_API_KEY
```

If empty, add to `.env.local` or Vercel project settings.

**Check 2: Is the email address valid?**
- Check that `guestEmail` is not empty
- Verify email format in database

**Check 3: Check Resend Dashboard**
- Go to https://resend.com/emails
- Look for failed deliveries
- Check spam folder of recipient

**Check 4: Console logs**
Look for these messages in server logs:
```
[v0] Customer confirmation email sent  ✅
[v0] Admin notification email sent      ✅
[v0] Approval email sent to customer    ✅
[v0] Cancellation email sent to customer ✅
```

Or errors:
```
[v0] Failed to send customer confirmation email: ...
[v0] Failed to send email: ...
```

### Issue: Emails Sent to Wrong Address

**Common Cause:** Email environment variables pointing to wrong addresses

**Solution:**
1. Check `/lib/resend.ts` for default values
2. Verify `FROM_EMAIL` and `ADMIN_EMAIL` in environment
3. Check that `reservation.guest_email` is correct in database

**Debug Query:**
```sql
SELECT id, guest_email, guest_name, status FROM reservations LIMIT 5;
```

---

## Email System Architecture

### File Structure

```
├── lib/
│   ├── resend.ts                    # Resend config, defaults
│   └── emailTemplates.tsx            # All email HTML templates
│
├── app/actions/
│   ├── reservations.tsx              # Sends: Confirmation + Admin notification
│   └── admin.tsx                     # Sends: Approval + Cancellation
│
└── DOCS_EMAIL_SYSTEM.md              # This file
```

### Key Functions

| Function | Location | Purpose |
|----------|----------|---------|
| `getCustomerConfirmationEmail()` | emailTemplates.tsx | Initial guest confirmation |
| `getAdminNotificationEmail()` | emailTemplates.tsx | New reservation alert to admin |
| `getApprovalEmail()` | emailTemplates.tsx | Confirmation after admin approves |
| `getCancellationEmail()` | emailTemplates.tsx | Notification when cancelled |
| `formatSeatingArea()` | emailTemplates.tsx | Format seating preference text |

---

## Email Content Customization

### Changing Email Templates

All email HTML is in `lib/emailTemplates.tsx`. Each function returns an HTML string.

**Example: Change confirmation email greeting**

```tsx
// Current:
<p>Dear ${customerName},</p>

// Change to:
<p>Hello ${customerName}! 🎉</p>
```

### Changing Sender Name/Address

```bash
# Edit in Vercel/local environment:
FROM_EMAIL=H100 Support <support@h100lounge.com>
```

### Changing Admin Email

```bash
# Edit in Vercel/local environment:
ADMIN_EMAIL=reservations@h100lounge.com
```

---

## Email Testing

### Test in Development

1. Set `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
2. Add valid `RESEND_API_KEY` and emails to `.env.local`
3. Create a test reservation
4. Check Resend dashboard: https://resend.com/emails

### Verify Delivery

1. Submit reservation with test email
2. Check admin email for notification
3. Admin approves → Guest should receive confirmation
4. Admin cancels → Guest should receive cancellation
5. All emails should have H100 branding

---

## Security Considerations

✅ **Email Verification:**
- Customers validate their email when making reservation
- Admin email is set via environment variables (secure)

✅ **Data Protection:**
- Only guest info visible in emails is name, not password
- Reservation ID included for admin reference
- No sensitive credentials in email content

✅ **Rate Limiting:**
- Resend handles spam prevention
- One email per reservation state change

---

## Best Practices

1. **Always set environment variables** - Don't use defaults in production
2. **Test email addresses** - Verify email works before going live
3. **Monitor Resend dashboard** - Check for delivery failures regularly
4. **Keep templates updated** - When changing business info, update email templates
5. **Use reply-to address** - Consider adding support@ email for customer replies

---

## Support & Debugging

### Enable Debug Logging

Email logs already include helpful console.log statements:
```javascript
console.log("[v0] Customer confirmation email sent")
console.error("[v0] Failed to send email:", error)
```

Check these in:
- Local: Browser console (if sent from client)
- Server: Server logs / Vercel function logs
- Production: Vercel dashboard → Function logs

### Contact Resend Support

If emails still don't deliver after checking everything:
1. Go to https://resend.com/support
2. Include error message from console logs
3. Include reservation ID for reference

---

**Last Updated:** February 2026
**H100 Lounge & Bar Email System v1.0**
