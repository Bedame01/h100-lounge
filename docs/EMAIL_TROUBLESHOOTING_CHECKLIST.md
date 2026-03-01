# Email System Troubleshooting Checklist

## ✅ Pre-Flight Checks

Before deploying or testing email functionality, verify:

### Environment Variables

- [ ] `RESEND_API_KEY` is set in `.env.local` and Vercel
- [ ] `FROM_EMAIL` is set correctly (or accept default)
- [ ] `ADMIN_EMAIL` is set to your admin email address
- [ ] `NEXT_PUBLIC_SITE_URL` is set to your domain

**Command to verify locally:**
```bash
grep -E "RESEND_API_KEY|FROM_EMAIL|ADMIN_EMAIL|NEXT_PUBLIC_SITE_URL" .env.local
```

---

## 🔍 Testing Procedure

### Step 1: Create a Test Reservation

1. Navigate to `https://yourdomain.com/reservations`
2. Fill in form with:
   - Name: "Test User"
   - Email: **Your test email**
   - Phone: "+234 800 0000"
   - Date: Pick a future date
   - Time: Pick a time
   - Guests: 2
   - Seating: "Main Lounge"

3. Submit and redirect to `/reservations/success`

### Step 2: Check Guest Confirmation Email

- [ ] Email received at your test email
- [ ] Subject: "Reservation Request Received - H100 Lounge & Bar"
- [ ] Contains your reservation details
- [ ] Shows "Pending approval" status

### Step 3: Admin Approval

1. Go to `/admin/reservations`
2. Login with admin credentials
3. Find your test reservation
4. Click "Approve"

- [ ] Status changes to "Confirmed"
- [ ] Confirmation email sent to guest
- [ ] Check your test email inbox
- [ ] Subject: "Reservation Confirmed - H100 Lounge & Bar"
- [ ] Shows ✅ confirmation message

### Step 4: Admin Cancellation

1. Go back to `/admin/reservations`
2. Find your test reservation
3. Click "Cancel"

- [ ] Status changes to "Cancelled"
- [ ] Cancellation email sent to guest
- [ ] Check your test email inbox
- [ ] Subject: "Reservation Cancelled - H100 Lounge & Bar"
- [ ] Shows cancellation notice

### Step 5: Verify Admin Notification

During Step 1, admin should receive email at `ADMIN_EMAIL`:
- [ ] Subject: "New Reservation Request - Test User"
- [ ] Contains full customer details
- [ ] Has link to admin dashboard

---

## 🐛 Common Issues & Solutions

### Problem: "No emails received at all"

**Check 1: Is Resend working?**
```bash
# In your Node/browser console:
fetch('https://api.resend.com/emails', {
  headers: { 'Authorization': `Bearer ${RESEND_API_KEY}` }
}).then(r => r.json()).then(console.log)
```

**Check 2: Is database saving email correctly?**
```sql
SELECT guest_email, status FROM reservations ORDER BY created_at DESC LIMIT 1;
```

**Check 3: Server logs**
Look for:
```
[v0] Customer confirmation email sent  ✅
[v0] Failed to send customer confirmation email: ... ❌
```

---

### Problem: "Email received but with wrong address"

**Check:** Verify email variables in `/lib/resend.ts`
```typescript
export const FROM_EMAIL = process.env.FROM_EMAIL || "H100 Lounge & Bar <noreply@h100lounge.com>"
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@h100lounge.com"
```

**Solution:** Set environment variables explicitly
```bash
FROM_EMAIL="H100 Lounge & Bar <noreply@yourdomain.com>"
ADMIN_EMAIL="your-real-admin@yourdomain.com"
```

---

### Problem: "Guest email correct but admin email wrong"

**Cause:** `ADMIN_EMAIL` environment variable not set

**Solution:**
1. Add `ADMIN_EMAIL=your-email@h100lounge.com` to `.env.local`
2. Deploy to Vercel: Settings → Environment Variables → Add `ADMIN_EMAIL`
3. Redeploy

---

### Problem: "Emails have old branding (Noir Lounge)"

**Cause:** Email templates not updated to H100

**Status:** ✅ Already fixed in codebase
- All email templates updated to "H100 Lounge & Bar"
- Check `/lib/emailTemplates.tsx` for "H100" branding

**If still showing old branding:**
- Clear browser cache
- Redeploy to production
- Resend may cache templates

---

### Problem: "Confirmation email doesn't show after approval"

**Check 1:** Did admin click "Approve"?
- [ ] Status in database changed to "confirmed"

**Check 2:** Is email function being called?
Look in server logs for:
```
[v0] Approval email sent to customer ✅
```

**Check 3:** Is guest email in database correct?
```sql
SELECT id, guest_email, status FROM reservations WHERE status = 'confirmed' LIMIT 1;
```

---

## 📊 Database Verification

### Check all reservations and their email status

```sql
SELECT 
  id,
  guest_name,
  guest_email,
  status,
  created_at,
  reservation_date,
  seating_area
FROM reservations
ORDER BY created_at DESC
LIMIT 10;
```

**What to verify:**
- [ ] `guest_email` is not NULL
- [ ] `guest_email` is valid format (contains @)
- [ ] `status` shows correct state (pending/confirmed/cancelled)
- [ ] `seating_area` is populated

---

## 🔗 Email Service Integration Verification

### Verify Resend Configuration

1. Go to https://resend.com
2. Login with your account
3. Go to "Emails" tab
4. You should see your sent emails listed

**What to check:**
- [ ] Emails appear in Resend dashboard
- [ ] Status shows "Delivered" or "Queued"
- [ ] Subject line matches H100 Lounge & Bar
- [ ] No error messages

### Verify Sender Email

1. In Resend dashboard, go to "Domains"
2. Check if `noreply@h100lounge.com` is configured
3. If not, add it or use `onboarding@resend.dev` (testing)

---

## 📋 Code File Checklist

### Files that handle emails (all ✅ fixed):

- [ ] `/lib/resend.ts` - Default values updated to H100
- [ ] `/lib/emailTemplates.tsx` - All templates have H100 branding
- [ ] `/app/actions/reservations.tsx` - Sends guest + admin emails on creation
- [ ] `/app/actions/admin.tsx` - Sends approval/cancellation emails

### Verify imports are correct:

```bash
# Should find getCancellationEmail import
grep "getCancellationEmail" app/actions/admin.tsx

# Should find all email template functions
grep "export function get" lib/emailTemplates.tsx
```

---

## 🧪 Manual Testing Commands

### Test email sending (if using Node REPL):

```javascript
const { Resend } = require('resend');
const resend = new Resend('your_api_key');

await resend.emails.send({
  from: 'H100 Lounge & Bar <noreply@h100lounge.com>',
  to: 'test@example.com',
  subject: 'Test Email',
  html: '<h1>Test</h1>'
});
```

---

## ✅ Final Verification

Run this checklist before marking emails as "working":

- [ ] Guest receives confirmation on reservation creation
- [ ] Admin receives notification on reservation creation
- [ ] Guest receives confirmation when admin approves
- [ ] Guest receives cancellation notice when admin cancels
- [ ] All emails have H100 Lounge & Bar branding
- [ ] All emails display correctly in client (Gmail, Outlook, etc.)
- [ ] Links in emails work (admin dashboard, etc.)
- [ ] Sender shows as "H100 Lounge & Bar"

---

## 📞 Still Having Issues?

1. **Check server logs** for error messages
2. **Check Resend dashboard** for failed deliveries
3. **Verify all environment variables** are set
4. **Test with Gmail/Outlook** to rule out client issues
5. **Check spam/promotions folder** in recipient inbox
6. **Contact Resend support** with error details

---

**Last Updated:** February 2026
**H100 Lounge & Bar Email System Troubleshooting Guide**
