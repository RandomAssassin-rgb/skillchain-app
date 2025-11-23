# Google OAuth Setup Guide for SkillChain

## Step 1: Configure Google OAuth in Supabase Dashboard

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your SkillChain project
3. Navigate to **Authentication** → **Providers**
4. Find **Google** in the list of providers
5. Toggle **Enable Sign in with Google**
6. You'll see two fields:
   - **Client ID (for OAuth)**
   - **Client Secret (for OAuth)**
7. Keep this tab open - you'll need to add these values after creating them in Google Cloud Console

## Step 2: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing:
   - Click project dropdown at top
   - Click "NEW PROJECT"
   - Name it "SkillChain" and click CREATE
3. Enable Google+ API:
   - Go to **APIs & Services** → **Library**
   - Search for "Google+ API"
   - Click on it and click **ENABLE**
4. Create OAuth Consent Screen:
   - Go to **APIs & Services** → **OAuth consent screen**
   - Select **External** and click CREATE
   - Fill in required fields:
     - App name: "SkillChain"
     - User support email: your email
     - Developer contact: your email
   - Click **SAVE AND CONTINUE** through all steps
5. Create OAuth Credentials:
   - Go to **APIs & Services** → **Credentials**
   - Click **+ CREATE CREDENTIALS** → **OAuth client ID**
   - Application type: **Web application**
   - Name: "SkillChain OAuth Client"
   - Authorized JavaScript origins:
     - `http://localhost:3000` (for development)
     - `https://your-production-domain.vercel.app` (for production)
   - Authorized redirect URIs:
     - `https://[YOUR-SUPABASE-PROJECT-REF].supabase.co/auth/v1/callback`
     - Find your project ref in Supabase Dashboard under Settings → API
     - Example: `https://abcdefghijklmnop.supabase.co/auth/v1/callback`
   - Click **CREATE**
6. Copy your credentials:
   - You'll see **Client ID** and **Client secret**
   - Copy both values

## Step 3: Add Credentials to Supabase

1. Go back to Supabase Dashboard → **Authentication** → **Providers** → **Google**
2. Paste your **Client ID**
3. Paste your **Client Secret**
4. Click **Save**

## Step 4: Test the Integration

1. In v0, refresh your preview
2. Click "Continue with Google" on the sign-in page
3. You should be redirected to Google's OAuth consent screen
4. After signing in, you'll be redirected back to your dashboard

## Troubleshooting

**Error: "redirect_uri_mismatch"**
- Make sure your redirect URI in Google Cloud Console exactly matches:
  `https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback`

**Error: "Access blocked: This app's request is invalid"**
- Ensure Google+ API is enabled in Google Cloud Console
- Check that OAuth consent screen is properly configured

**Button says "Configure in Vars"**
- This is a Next.js environment variable issue, but with Supabase Auth, you don't need to add anything to Vars
- The configuration is done entirely in Supabase Dashboard

## Production Deployment

When deploying to production:
1. Add your production domain to Google Cloud Console authorized origins
2. No changes needed in Supabase - the same OAuth credentials work for all environments

## How It Works

1. User clicks "Continue with Google"
2. Supabase Auth redirects to Google OAuth
3. User signs in with Google account
4. Google redirects back to Supabase with authorization code
5. Supabase exchanges code for session
6. User is redirected to `/auth/callback` in your app
7. App redirects to `/dashboard` with authenticated session
8. Middleware protects routes and refreshes session automatically
