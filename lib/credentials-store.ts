// Client-side credential storage for demo purposes
// In production, replace with a database (Supabase, PostgreSQL, etc.)

import type { CredentialMetadata } from "./nft-storage"

const STORAGE_KEY = "skillchain_credentials"

export interface StoredCredential {
  credential: CredentialMetadata
  ipfsCid: string
  signature: string
  createdAt: string
}

export function storeCredential(credential: CredentialMetadata, ipfsCid: string, signature: string): void {
  try {
    const stored = getAllCredentials()
    const newCredential: StoredCredential = {
      credential,
      ipfsCid,
      signature,
      createdAt: new Date().toISOString(),
    }
    stored.push(newCredential)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
  } catch (error) {
    console.error("[v0] Error storing credential locally:", error)
  }
}

export function getAllCredentials(): StoredCredential[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("[v0] Error retrieving credentials:", error)
    return []
  }
}

export function getCredentialById(credentialId: string): StoredCredential | null {
  try {
    const credentials = getAllCredentials()
    return credentials.find((c) => c.credential.id === credentialId) || null
  } catch (error) {
    console.error("[v0] Error finding credential:", error)
    return null
  }
}

export function getCredentialByCid(ipfsCid: string): StoredCredential | null {
  try {
    const credentials = getAllCredentials()
    return credentials.find((c) => c.ipfsCid === ipfsCid) || null
  } catch (error) {
    console.error("[v0] Error finding credential by CID:", error)
    return null
  }
}
