export interface CredentialValidationResult {
  isValid: boolean
  reason?: string
}

export function validateCredential(credential: any): CredentialValidationResult {
  if (!credential) {
    return { isValid: false, reason: "Credential not found" }
  }

  if (credential.revoked) {
    return { isValid: false, reason: "Credential has been revoked" }
  }

  if (credential.expiryDate) {
    const expiryDate = new Date(credential.expiryDate)
    if (expiryDate < new Date()) {
      return { isValid: false, reason: "Credential has expired" }
    }
  }

  return { isValid: true }
}

export function formatCredentialDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function truncateAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`
}
