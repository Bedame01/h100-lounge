# Disabling Email Confirmation for Admin Signup

The admin signup may fail with "Failed to fetch" errors in certain environments. To ensure smooth admin account creation, you should disable email confirmation in your Supabase project.

## Steps to Disable Email Confirmation:

1. **Open Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Select your project

2. **Navigate to Authentication Settings**
   - Click on "Authentication" in the left sidebar
   - Click on "Providers"
   - Find "Email" provider

3. **Disable Email Confirmation**
   - Toggle OFF "Confirm email"
   - This allows users to sign up without email verification

4. **Alternative: Enable Auto-Confirm**
   - If you want to keep email confirmation for regular users but not admins
   - You can set up a Database Trigger or Edge Function to auto-confirm admin users
   - Check the `user_metadata` for `is_admin: true` and auto-confirm those users

## Why This Helps:

- Removes dependency on email redirect URLs
- Eliminates CORS issues with redirect flows
- Allows immediate admin login after signup
- Simplifies the authentication flow

## Security Note:

Since admin signup requires a special `ADMIN_SIGNUP_KEY`, disabling email confirmation for admins is safe because:
- Only people with the admin key can create admin accounts
- The admin key should be kept secret and not shared publicly
- Regular user signups (if you add them later) can still require email confirmation

## Testing:

After disabling email confirmation:
1. Go to `/admin/signup`
2. Enter email, password, and the admin key
3. Click "Create Admin Account"
4. You should be redirected to login immediately
5. Log in with your new credentials
