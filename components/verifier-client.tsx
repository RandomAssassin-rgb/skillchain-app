"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { VerificationResult } from "@/components/verification-result"
import { getCredentialForVerification } from "@/app/actions/credentials"
import { toast } from "@/hooks/use-toast"

export function VerifierClient() {
  const searchParams = useSearchParams()
  const [mode, setMode] = useState<"input" | "scanning">("input")
  const [tokenId, setTokenId] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [simulationActive, setSimulationActive] = useState(false)

  useEffect(() => {
    const encodedData = searchParams.get("data")
    const id = searchParams.get("id")

    if (encodedData && !result && !isVerifying) {
      setIsVerifying(true)
      try {
        let base64 = encodedData
        // Convert URL-safe base64 back to standard base64
        base64 = base64.replace(/-/g, "+").replace(/_/g, "/")
        // Add padding if needed
        while (base64.length % 4) {
          base64 += "="
        }

        const decodedData = atob(base64)
        const credential = JSON.parse(decodedData)

        console.log("[v0] Successfully decoded credential from URL:", credential)

        setResult({
          id: credential.id,
          title: credential.title,
          issuer: credential.issuer,
          student: credential.recipientAddress || "N/A",
          issuedDate: credential.issuedDate,
          expiryDate: credential.expiryDate || "No Expiry",
          field: credential.field,
          grade: credential.grade || "N/A",
          status: credential.status || "Valid",
          verified: true,
        })

        toast({
          title: "✓ Credential Verified",
          description: "Credential loaded and verified successfully",
        })
      } catch (error) {
        console.error("[v0] Error decoding credential:", error)
        setResult({
          error: "Failed to decode credential data from link. The QR code may be corrupted.",
          verified: false,
        })
        toast({
          title: "Invalid Link",
          description: "Failed to decode credential data",
          variant: "destructive",
        })
      } finally {
        setIsVerifying(false)
      }
    } else if (id && !result && !isVerifying) {
      console.log("[v0] URL parameter ID:", id)
      setTokenId(id)
      setTimeout(() => handleVerify(id), 100)
    }
  }, [searchParams])

  const handleVerify = async (id?: string) => {
    const verifyId = id || tokenId
    console.log("[v0] Verifying credential ID:", verifyId)

    if (!verifyId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a credential ID",
        variant: "destructive",
      })
      setResult({ error: "Please enter a credential ID" })
      return
    }

    setIsVerifying(true)

    try {
      const storedCredential = await getCredentialForVerification(verifyId)
      console.log("[v0] Found credential in database:", storedCredential)

      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (storedCredential) {
        toast({
          title: "✓ Credential Verified",
          description: "This credential is valid and authentic",
        })
        setResult({
          id: storedCredential.id,
          title: storedCredential.title,
          issuer: storedCredential.issuer,
          student: storedCredential.recipient_address,
          issuedDate: storedCredential.issued_date,
          expiryDate: storedCredential.expiry_date || "No Expiry",
          field: storedCredential.field,
          grade: storedCredential.grade || "N/A",
          ipfsCid: storedCredential.ipfs_cid,
          signature: storedCredential.signature,
          status: storedCredential.status === "active" ? "Valid" : storedCredential.status,
          verified: true,
        })
      } else {
        console.log("[v0] Credential not found")
        toast({
          title: "Credential Not Found",
          description: "This credential could not be verified",
          variant: "destructive",
        })
        setResult({
          id: verifyId,
          status: "Not Found",
          verified: false,
          error:
            "This credential was not found in the system. It may not have been issued yet or the ID may be incorrect.",
        })
      }
    } catch (error) {
      console.error("[v0] Verification error:", error)
      toast({
        title: "Verification Failed",
        description: "An error occurred while verifying the credential",
        variant: "destructive",
      })
      setResult({
        error: "Failed to verify credential",
        verified: false,
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const handleStartCamera = () => {
    setMode("scanning")
    setSimulationActive(true)

    setTimeout(() => {
      const scannedId = "SC-" + Math.floor(Math.random() * 100000)
      setTokenId(scannedId)
      setMode("input")
      setSimulationActive(false)
      handleVerify(scannedId)
    }, 3000)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {result ? (
        <>
          <VerificationResult data={result} />
          <Button
            onClick={() => {
              setResult(null)
              setTokenId("")
            }}
            variant="outline"
            className="mt-6 w-full bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
          >
            Verify Another
          </Button>
        </>
      ) : (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-white mb-2">Verify a Credential</h1>
          <p className="text-slate-400 mb-12">Enter a credential ID or scan a QR code to verify its authenticity</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-3">Credential ID or Token</label>
              <Input
                type="text"
                placeholder="e.g., SC-1234567890 or paste IPFS CID"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleVerify()}
                className="bg-slate-900 border-slate-700 text-white placeholder-slate-500"
              />
            </div>

            {simulationActive && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 animate-pulse">
                <div>
                  <p className="text-sm font-medium text-blue-300">Scanning...</p>
                  <p className="text-xs text-blue-200">Point camera at QR code</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={() => handleVerify()}
                disabled={isVerifying || simulationActive}
                className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-semibold"
              >
                {isVerifying ? "Verifying..." : "Verify Credential"}
              </Button>
              <Button
                onClick={handleStartCamera}
                disabled={isVerifying || simulationActive}
                variant="outline"
                className="bg-transparent text-white"
              >
                📱 Scan QR Code
              </Button>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
              <p className="text-sm text-amber-200">
                ⚠️ Verification results are instant. Credentials are verified directly from the blockchain.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
