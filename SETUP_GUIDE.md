# SkillChain Setup Guide

## Prerequisites

1. **MetaMask Browser Extension**
   - Download from: https://metamask.io/download/
   - Install on your browser

2. **NFT.storage Account**
   - Sign up at: https://nft.storage/
   - Create an API key in your account dashboard

## Environment Setup

### 1. Configure NFT.storage API Key

1. Go to https://nft.storage/
2. Sign in to your account
3. Click on "API Keys" in the dashboard
4. Copy your API key
5. Create a `.env.local` file in the project root:

\`\`\`env
NFT_STORAGE_TOKEN=your_copied_api_key_here
\`\`\`

**Important:** This token is NOT prefixed with `NEXT_PUBLIC_` because it's kept securely on the server only and never exposed to the client.

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` to start using SkillChain.

## Using SkillChain

### For Students (My Wallet)

1. Click "Connect Wallet" button in the header
2. Approve the connection in MetaMask
3. View your stored credentials
4. Share QR codes with employers or institutions
5. Verify credentials instantly

### For Institutions (Issuer Portal)

1. Connect your MetaMask wallet
2. Go to "Issuer" page
3. Fill in:
   - Credential name (e.g., "Bachelor of Science")
   - Field of study
   - Student's wallet address
   - Optional expiry date
4. Click "Issue Credential"
5. Sign the transaction in MetaMask
6. Credential is stored on IPFS (securely via server) and signed on-chain

### For Verifiers (Verify Page)

1. Scan a credential QR code with your device
2. Upload credential metadata or enter token ID
3. Verify instant authenticity check
4. View credential details and issuer information

## Troubleshooting

### MetaMask Not Connecting

- Ensure MetaMask extension is installed and enabled
- Check that you have at least one account created in MetaMask
- Try switching networks in MetaMask and reconnecting

### NFT.storage Upload Failing

- Verify your API key is correctly set in `.env.local`
- Check that the token has sufficient credits
- Ensure you're connected to the internet
- Restart the development server after updating `.env.local`

### Credentials Not Appearing

- Refresh the page after issuing
- Check your wallet address matches in MetaMask
- Verify the IPFS CID was returned from NFT.storage

## Network Recommendations

- **Development:** Use Sepolia or Mumbai testnet (free faucets available)
- **Production:** Use Ethereum Mainnet or Polygon
- **Demo:** Sepolia Testnet is pre-configured

### Getting Test ETH (Sepolia)

Visit: https://sepoliafaucet.com/ and paste your wallet address

## Advanced Features

### Custom Chain Support

Edit `lib/web3.ts` to add support for additional networks:

\`\`\`typescript
export const NETWORKS = {
  YOUR_NETWORK: {
    chainId: "0x...",
    name: "Your Network Name",
    rpcUrl: "https://your-rpc-url",
  },
}
\`\`\`

### Credential Verification

Credentials are verified through:
1. MetaMask signature validation
2. IPFS content hash verification
3. Timestamp validation
4. Issuer wallet verification

## Security Architecture

- **Client Side:** MetaMask wallet connection and signing (user controls keys)
- **Server Side:** NFT.storage API key (securely stored, never exposed to client)
- **IPFS:** Immutable credential storage with content-addressed hashes
- **Blockchain:** Credential issuance events and signatures

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review MetaMask documentation: https://docs.metamask.io/
3. Check NFT.storage docs: https://nft.storage/docs/

## Security Notes

- Never share your MetaMask private keys
- Always verify wallet addresses before approving transactions
- NFT.storage API key is kept private on the server
- Credentials are immutable once stored on IPFS

---

**Last Updated:** 2025-11-22
