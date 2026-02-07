# Supabase Configuration Guide

## Fixing CORS Issues with Authentication

The CORS error occurs because Supabase needs to know which URLs are allowed to redirect after authentication actions like signup, login, and password reset.

### Step 1: Add Redirect URLs in Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **URL Configuration**
3. Add the following URLs to **Redirect URLs**:

   For local development:
   ```
   http://localhost:3000/**
   ```

   For production (replace with your actual domain):
   ```
   https://yourdomain.com/**
   https://www.yourdomain.com/**
   ```

4. Set the **Site URL** to your main application URL:
   - Development: `http://localhost:3000`
   - Production: `https://yourdomain.com`

5. Click **Save**

### Step 2: Verify Environment Variables

Make sure these environment variables are set in your project:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ADMIN_SIGNUP_KEY=NOIR_ADMIN_2024
```

### Step 3: Enable Email Provider

1. In Supabase Dashboard, go to **Authentication** → **Providers**
2. Make sure **Email** provider is enabled
3. Configure email settings:
   - Enable email confirmations (recommended for production)
   - Customize email templates if needed

### Step 4: Test Authentication Flow

1. Try signing up a new admin account at `/admin/signup`
2. Check your email for the confirmation link
3. Click the confirmation link to verify your account
4. Log in at `/admin/login`

### Common Issues

**Issue**: "Invalid redirect URL"
- **Solution**: Make sure your redirect URLs in Supabase include wildcards (`**`) to allow all paths

**Issue**: "Email not confirmed"
- **Solution**: Check your spam folder or disable email confirmation in development

**Issue**: "Invalid admin key"
- **Solution**: Make sure `ADMIN_SIGNUP_KEY` environment variable is set correctly

### Security Notes

- The `ADMIN_SIGNUP_KEY` should be kept secret and only shared with authorized administrators
- For production, change the default admin key from `NOIR_ADMIN_2024` to something unique
- Enable Row Level Security (RLS) on all database tables (already configured in `001_create_tables.sql`)
- Use email confirmation for production environments
- Consider adding rate limiting for authentication endpoints

### Production Checklist

- [ ] Set custom `ADMIN_SIGNUP_KEY` environment variable
- [ ] Configure production redirect URLs in Supabase
- [ ] Enable email confirmations
- [ ] Customize email templates with your branding
- [ ] Test all authentication flows (signup, login, password reset)
- [ ] Verify RLS policies are working correctly
- [ ] Set up monitoring for failed login attempts
