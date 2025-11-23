# Fix Google OAuth "Content is Blocked" Error

You're seeing "This content is blocked" because the Google OAuth credentials need to be added in **Supabase Dashboard**, not just Google Cloud Console.

## The Problem

Google Cloud Console is configured correctly, but Supabase doesn't know about your Google OAuth app yet. Supabase needs the Client ID and Secret to authorize the OAuth flow.

## Solution: Add Credentials to Supabase Dashboard

### Step 1: Get Your Google Credentials
From Google Cloud Console, copy:
- **Client ID** (from Credentials page)
- **Client Secret** (from Credentials page)

### Step 2: Add to Supabase Dashboard
1. Go to your Supabase Dashboard: `https://supabase.com/dashboard/project/wxmoatiqhegyombxaank`
2. Click **"Authentication"** in the left sidebar
3. Click **"Providers"** tab
4. Scroll to find **"Google"**
5. Toggle **"Enable Google provider"** to ON
6. Paste your credentials:
   - **Client ID (for OAuth)**: [paste your Google Client ID]
   - **Client Secret (for OAuth)**: [paste your Google Client Secret]
7. **Site URL** should be: `http://localhost:3000` (for development)
8. **Redirect URLs** should include:
   - `http://localhost:3000/auth/callback`
   - `https://skillchainbuilder.vercel.app/auth/callback`
9. Click **"Save"**

### Step 3: Test
1. Go to `/auth/signin` in your app
2. Open browser console (F12)
3. Click "Continue with Google"
4. Check console for debug messages
5. You should now see Google's account picker instead of "content blocked"

## Alternative: If You Can't Access Supabase Dashboard

The Supabase project is managed through Vercel's integration. Try:
1. Go to your Vercel project dashboard
2. Click "Integrations" → "Supabase"
3. Click "Manage" or "View in Supabase"
4. This should give you access to the Supabase Dashboard

## Need Help?

After adding credentials to Supabase Dashboard, the "content is blocked" error should disappear and you'll see the normal Google sign-in flow.
