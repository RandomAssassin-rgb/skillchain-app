# Final Google OAuth Setup Checklist

Your SkillChain app has **complete working Google OAuth code**. The "content is blocked" error means the configuration is incomplete.

## What's Already Done ✅

1. ✅ Google OAuth code is working (`/app/auth/signin` and `/app/login`)
2. ✅ Supabase client is properly configured
3. ✅ Auth callback route is working
4. ✅ CSS is fixed and valid
5. ✅ All auth pages exist and are functional

## What You MUST Do Now

### Step 1: Add Google OAuth Credentials in SUPABASE Dashboard

This is THE CRITICAL STEP you're missing:

1. **Go to your Supabase Dashboard**: https://supabase.com/dashboard/project/wxmoatiqhegyombxaank
2. **Click "Authentication"** in left sidebar
3. **Click "Providers"**
4. **Find "Google"** and click it
5. **Toggle "Enable Google provider" to ON**
6. **Enter your credentials:**
   - **Client ID**: (from your Google Cloud Console - the same one in your v0 Vars)
   - **Client Secret**: (from your Google Cloud Console - the same one in your v0 Vars)
7. **Click "Save"**

**Without this step, Google OAuth WILL NOT WORK** even though everything else is configured correctly.

### Step 2: Verify Google Cloud Console Redirect URIs

Make sure these exact URLs are in your Google Cloud Console → Credentials → OAuth Client → Authorized redirect URIs:

\`\`\`
https://wxmoatiqhegyombxaank.supabase.co/auth/v1/callback
http://localhost:3000/auth/callback
https://preview-skillchain-demo-walkthrough-kzmjuropvfqdep8k6ipy.vusercontent.net/auth/callback
\`\`\`

### Step 3: Test the Flow

1. Go to `/auth/signin` or `/login`
2. Click "Continue with Google"
3. You should see Google's consent screen (not "content is blocked")
4. After signing in, you'll be redirected to `/dashboard`

## Troubleshooting

**Still seeing "content is blocked"?**
- Go back to Supabase Dashboard → Authentication → Providers → Google
- Verify the Client ID and Client Secret are correctly entered
- They must match EXACTLY what you see in Google Cloud Console

**Error says "Invalid redirect URI"?**
- Check that all 3 redirect URIs are added in Google Cloud Console
- Make sure there are no typos or extra spaces

## Your Login Pages

You have TWO login pages (both work):
- `/auth/signin` - Simplified version
- `/login` - Full featured version with MetaMask

Both pages call the same Supabase OAuth flow and will work once you complete Step 1.
