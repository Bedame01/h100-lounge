# Resend Email Setup Guide

This guide will help you configure email notifications for Noir Lounge using Resend.

## Step 1: Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

## Step 2: Get Your API Key

1. Go to [API Keys](https://resend.com/api-keys) in your Resend dashboard
2. Click "Create API Key"
3. Give it a name like "Noir Lounge Production"
4. Copy the API key (you won't be able to see it again)
5. Add it to your `.env.local` file:
   ```
   RESEND_API_KEY=re_your_api_key_here
   ```

## Step 3: Verify Your Domain (Production Only)

For production use, you need to verify your domain:

1. Go to [Domains](https://resend.com/domains) in your Resend dashboard
2. Click "Add Domain"
3. Enter your domain (e.g., `noirlounge.com`)
4. Add the provided DNS records to your domain provider
5. Wait for verification (usually takes a few minutes)

**For Development:** You can use Resend's test mode which allows sending to your own email address without domain verification.

## Step 4: Configure Email Addresses

Add these to your `.env.local` file:

```env
# Admin email - where reservation notifications are sent
ADMIN_EMAIL=your-admin@email.com

# From email - must use your verified domain in production
# For development, you can use: "onboarding@resend.dev"
FROM_EMAIL=Noir Lounge <noreply@yourdomain.com>
```

## Step 5: Test Email Notifications

### Test Customer Reservation Email
1. Go to `/reservations` on your site
2. Fill out the reservation form
3. Submit the form
4. Check that emails were sent to:
   - Customer (confirmation email)
   - Admin (notification email)

### Test Admin Approval Email
1. Log in to `/admin/login`
2. Go to `/admin/reservations`
3. Find a pending reservation
4. Click "Confirm" to approve it
5. Check that the customer receives the approval email

## Email Templates

The application includes three email templates:

1. **Reservation Confirmation** (`emails/reservation-confirmation.tsx`)
   - Sent to customers when they submit a reservation
   - Confirms receipt and pending approval

2. **Reservation Approved** (`emails/reservation-approved.tsx`)
   - Sent to customers when admin approves their reservation
   - Includes all reservation details and what to expect

3. **Admin New Reservation** (`emails/admin-new-reservation.tsx`)
   - Sent to admin when a new reservation is submitted
   - Includes link to admin panel for quick approval

## Troubleshooting

### Emails Not Sending

1. **Check API Key**: Ensure `RESEND_API_KEY` is set correctly in your environment variables
2. **Check Domain**: In production, make sure your domain is verified in Resend
3. **Check Logs**: Look for `[v0]` email error messages in your server logs
4. **Rate Limits**: Free tier has limits - check your Resend dashboard

### Emails Going to Spam

1. Verify your domain with proper SPF/DKIM records
2. Use a recognizable sender name
3. Avoid spam trigger words in subject lines
4. Include an unsubscribe link (optional for transactional emails)

### Testing in Development

For local development, you can use `onboarding@resend.dev` as your FROM_EMAIL:

```env
FROM_EMAIL=Noir Lounge <onboarding@resend.dev>
```

This allows testing without domain verification.

## Production Deployment

When deploying to Vercel:

1. Add all environment variables to your Vercel project settings
2. Make sure to use your verified domain for `FROM_EMAIL`
3. Test thoroughly before going live
4. Monitor your Resend dashboard for delivery status

## Pricing

- **Free Tier**: 100 emails/day, 3,000 emails/month
- **Pro Tier**: $20/month for 50,000 emails
- See [Resend Pricing](https://resend.com/pricing) for details

For a small lounge, the free tier should be sufficient initially.
