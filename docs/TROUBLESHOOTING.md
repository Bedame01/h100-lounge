# Troubleshooting Guide

## Admin Signup CORS Error

If you're seeing a CORS error like:
```
Access to fetch at 'https://xxx.supabase.co/auth/v1/signup' has been blocked by CORS policy
```

### Solution 1: Add Redirect URLs to Supabase (Recommended)

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **Authentication** > **URL Configuration**
4. Under **Redirect URLs**, add these URLs:
   - `http://localhost:3000` (for local development)
   - `http://localhost:3000/admin/dashboard` (for admin redirect)
   - `https://yourdomain.com` (for production)
   - `https://yourdomain.com/admin/dashboard` (for production admin)
5. Click **Save**
6. Wait a few seconds for the changes to propagate

### Solution 2: Disable Email Confirmation (Development Only)

**⚠️ WARNING: Only use this for local development, NEVER in production!**

1. Go to your Supabase Dashboard
2. Go to **Authentication** > **Providers** > **Email**
3. Disable **"Confirm email"**
4. Click **Save**

Now users can sign up without email verification (useful for testing).

### Solution 3: Check Environment Variables

Make sure these environment variables are set correctly:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

To verify:
1. Check your `.env.local` file (create it if it doesn't exist)
2. Restart your development server after changing environment variables
3. Check the browser console to see if the Supabase client is initializing correctly

### Solution 4: Check Browser Console

Open your browser's Developer Tools (F12) and check the Console tab for detailed error messages. Look for:
- `[v0]` prefixed logs showing where the signup process fails
- Network tab showing the failed request and its response
- Any Supabase-specific error messages

### Common Issues

**Issue**: "Invalid admin key"
- **Solution**: Make sure you're using the correct admin key (default: `NOIR_ADMIN_2024`)
- Set the `ADMIN_SIGNUP_KEY` environment variable if you want a custom key

**Issue**: "An account with this email already exists"
- **Solution**: The email is already registered. Try logging in or use a different email

**Issue**: "Password must be at least 8 characters long"
- **Solution**: Use a stronger password with at least 8 characters

**Issue**: Email verification email not arriving
- **Solution**: 
  - Check your spam folder
  - Verify your email provider settings in Supabase
  - For development, consider disabling email confirmation (Solution 2)

### Still Having Issues?

1. Check the [Supabase documentation](https://supabase.com/docs/guides/auth)
2. Review the `SUPABASE_SETUP.md` file for configuration details
3. Make sure all SQL scripts in the `scripts/` folder have been executed
4. Check that your Supabase project is active (not paused)

### Debug Checklist

- [ ] Redirect URLs added to Supabase
- [ ] Environment variables set correctly
- [ ] Development server restarted
- [ ] Browser cache cleared
- [ ] Checked browser console for errors
- [ ] Checked Network tab for failed requests
- [ ] SQL scripts executed successfully
- [ ] Supabase project is active
