# SkillChain Deployment Guide

## Production Deployment Steps

### 1. Environment Variables Setup

When deploying to production (Vercel), add these environment variables:

\`\`\`
NEXT_PUBLIC_APP_URL=https://skillchain.vercel.app
\`\`\`

Or use your custom domain:
\`\`\`
NEXT_PUBLIC_APP_URL=https://yourcustomdomain.com
\`\`\`

### 2. Deploy to Vercel

1. Click the "Publish" button in v0 to deploy to Vercel
2. Once deployed, go to your Vercel project dashboard
3. Navigate to Settings → Environment Variables
4. Add `NEXT_PUBLIC_APP_URL` with your production URL
5. Redeploy the project for changes to take effect

### 3. QR Code Verification

After deployment:
- QR codes will automatically use your production URL
- Scanned QR codes will open the verify page with full credential data
- Links can be shared across any device/browser

### 4. Testing

1. Issue a test credential in production
2. Generate its QR code
3. Scan with phone camera or QR scanner app
4. Verify it opens the credential details correctly

## Local Development

For local testing, QR codes will use `http://localhost:3000`. This means:
- QR codes only work when scanned on the same network
- For external testing, deploy to Vercel first

## Features Included

✅ MetaMask wallet connection
✅ Credential issuance with unique IDs
✅ QR code generation with embedded credential data
✅ Credential verification (works across devices)
✅ PDF certificate download
✅ Toast notifications for all actions
✅ Responsive design for mobile and desktop
✅ Copy credential IDs for easy verification
✅ Dashboard with stats and activity feed

## Production Checklist

- [ ] Deploy to Vercel
- [ ] Set NEXT_PUBLIC_APP_URL environment variable
- [ ] Test QR code scanning from external device
- [ ] Verify credential verification works
- [ ] Test PDF downloads
- [ ] Confirm toast notifications appear
- [ ] Test on mobile devices
