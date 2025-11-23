# QR Code Implementation Guide

## How It Works

The SkillChain QR code system embeds all credential information directly in the verification URL using base64 encoding. When someone scans a QR code:

1. **QR Code Contains**: `http://localhost:3000/verify?data=<base64-encoded-credential-data>`
2. **Data Embedded**: All credential details (title, issuer, field, dates, status, etc.)
3. **No Server Lookup**: Credential data is already in the URL - works anywhere

## Testing Locally

Your QR codes now point to `http://localhost:3000`. When you:
- Scan QR codes with your phone on the same network, they'll show 404 (different origin)
- Copy the generated link and paste it on localhost, it works perfectly
- The verify page auto-detects and decodes the credential data from the URL

## Deploying to Production

1. Deploy the app to Vercel using the "Publish" button
2. Get your Vercel URL (e.g., `skillchain-demo.vercel.app`)
3. Update the environment variable:
   \`\`\`
   NEXT_PUBLIC_APP_URL=https://skillchain-demo.vercel.app
   \`\`\`
4. Redeploy or update in Vercel dashboard
5. Generate new QR codes - they will now work when scanned from any device worldwide

## Future Credentials

All future credentials will automatically use this same system:
- QR codes embed full credential data
- No backend lookup needed
- Works offline and across all networks
- Scannable from any QR reader or Google Lens

## Example QR Data Structure

\`\`\`json
{
  "id": "credential-1763819038572",
  "title": "AI Professional",
  "issuer": "0x4622cabd49e8d57dfef76c55b4f59086e30c853b",
  "issuedDate": "2025-11-22",
  "expiryDate": "2028-02-21",
  "status": "Valid",
  "field": "AI & Machine Learning"
}
