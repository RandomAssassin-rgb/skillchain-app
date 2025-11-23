"use server"

import type { CredentialMetadata } from "@/lib/nft-storage"
import { createServiceRoleClient } from "@/lib/supabase/server"

export interface IssueCredentialInput {
  credential: CredentialMetadata
  signature: string
}

export interface IssueCredentialResponse {
  success: boolean
  ipfsCid?: string
  error?: string
}

export async function issueCredential(input: IssueCredentialInput): Promise<IssueCredentialResponse> {
  try {
    const supabase = await createServiceRoleClient()

    // Generate a mock CID for IPFS (can be replaced with real IPFS later)
    const credentialString = JSON.stringify(input.credential)
    const mockCid = await generateMockCid(credentialString)

    console.log("[v0] Storing credential with CID:", mockCid)

    const { data, error } = await supabase
      .from("credentials")
      .insert({
        id: input.credential.id,
        ipfs_cid: mockCid,
        title: input.credential.title,
        issuer: input.credential.issuer,
        recipient_address: input.credential.recipientAddress,
        issued_date: input.credential.issuedDate,
        expiry_date: input.credential.expiryDate || null,
        field: input.credential.field,
        signature: input.signature,
        status: "active",
        // user_id will be null for MetaMask-only users
        user_id: null,
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Database error:", error)
      throw new Error(`Failed to store credential: ${error.message}`)
    }

    console.log("[v0] Credential successfully stored:", data)

    return {
      success: true,
      ipfsCid: mockCid,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error occurred"
    console.error("[v0] Error storing credential:", message)

    return {
      success: false,
      error: message,
    }
  }
}

// Generate a mock CID that looks like a real IPFS CID
async function generateMockCid(data: string): Promise<string> {
  // Create a simple hash from the data
  let hash = 0
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }

  // Add timestamp to make it unique
  const timestamp = Date.now().toString(36)
  const hashString = Math.abs(hash).toString(36)

  // Format like a real IPFS CID (starts with bafybei or Qm)
  return `bafybei${hashString}${timestamp}abcdefghijklmnopqrstuvwxyz123456789`.substring(0, 59)
}

export async function retrieveCredential(ipfsCid: string): Promise<CredentialMetadata | null> {
  try {
    // In production, retrieve from your database or IPFS
    // For demo purposes, credentials are stored in localStorage on the client
    console.log("[v0] Retrieving credential:", ipfsCid)
    return null
  } catch (error) {
    console.error("[v0] Error retrieving credential:", error)
    return null
  }
}

export async function getCredentialsByWallet(walletAddress: string) {
  try {
    const supabase = await createServiceRoleClient()

    const { data, error } = await supabase
      .from("credentials")
      .select("*")
      .or(`issuer.eq.${walletAddress},recipient_address.eq.${walletAddress}`)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error fetching credentials:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("[v0] Error in getCredentialsByWallet:", error)
    return []
  }
}

export async function getCredentialForVerification(credentialId: string) {
  try {
    const supabase = await createServiceRoleClient()

    const { data, error } = await supabase
      .from("credentials")
      .select("*")
      .or(`id.eq.${credentialId},ipfs_cid.eq.${credentialId}`)
      .single()

    if (error) {
      console.error("[v0] Error fetching credential:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("[v0] Error in getCredentialForVerification:", error)
    return null
  }
}

export async function getDashboardStats(walletAddress?: string, userId?: string) {
  try {
    const supabase = await createServiceRoleClient()

    // Build query based on authentication method
    let query = supabase.from("credentials").select("*", { count: "exact" })

    if (walletAddress) {
      query = query.or(`issuer.eq.${walletAddress},recipient_address.eq.${walletAddress}`)
    } else if (userId) {
      query = query.eq("user_id", userId)
    } else {
      return {
        totalCredentials: 0,
        validCredentials: 0,
        verificationCount: 0,
        trustScore: 0,
      }
    }

    const { data: credentials, count, error } = await query

    if (error) {
      console.error("[v0] Error fetching stats:", error)
      return {
        totalCredentials: 0,
        validCredentials: 0,
        verificationCount: 0,
        trustScore: 0,
      }
    }

    const totalCredentials = count || 0
    const validCredentials = credentials?.filter((c) => c.status === "active").length || 0

    // Calculate verification count (for now, use a multiplier of credentials)
    // In a real system, you'd have a separate verifications table
    const verificationCount = totalCredentials * 3

    // Calculate trust score based on active credentials
    const trustScore = totalCredentials > 0 ? Math.min(95 + totalCredentials * 0.5, 100) : 0

    return {
      totalCredentials,
      validCredentials,
      verificationCount,
      trustScore: Math.round(trustScore),
    }
  } catch (error) {
    console.error("[v0] Error in getDashboardStats:", error)
    return {
      totalCredentials: 0,
      validCredentials: 0,
      verificationCount: 0,
      trustScore: 0,
    }
  }
}
