// NFT.storage client for storing credentials on IPFS
// You need to set NFT_STORAGE_TOKEN in your environment variables

export interface CredentialMetadata {
  id: string
  title: string
  issuer: string
  recipientAddress: string
  issuedDate: string
  expiryDate?: string
  field: string
  timestamp: number
}

// All credential storage now happens on the server via Server Actions
