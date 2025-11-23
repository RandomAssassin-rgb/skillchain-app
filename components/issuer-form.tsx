"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { useWalletInfo } from "@/lib/hooks"
import { getMetaMaskProvider } from "@/lib/metamask"
import type { CredentialMetadata } from "@/lib/nft-storage"
import { issueCredential as issueCredentialAction } from "@/app/actions/credentials"
import { storeCredential } from "@/lib/credentials-store"

const FIELDS = [
  "Computer Science",
  "Cloud Computing",
  "Web Development",
  "Data Science",
  "Cybersecurity",
  "AI & Machine Learning",
  "Blockchain & Web3",
  "Mobile Development",
  "UI/UX Design",
  "Custom", // Added "Custom" option
]

export function IssuerForm() {
  const { address: issuerAddress, isConnected } = useWalletInfo()
  const [formData, setFormData] = useState({
    name: "",
    field: "",
    customField: "", // Added customField state
    studentAddress: "",
    expiryDate: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, field: value }))
  }

  const generateCredentialId = () => {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 10000)
    return `SC-${timestamp}-${random}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const selectedField = formData.field === "Custom" ? formData.customField : formData.field

    if (!formData.name || !selectedField || !formData.studentAddress) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    if (!isConnected || !issuerAddress) {
      toast({
        title: "Wallet Required",
        description: "Please connect your MetaMask wallet first",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const credentialMetadata: CredentialMetadata = {
        id: generateCredentialId(),
        title: formData.name,
        issuer: issuerAddress,
        recipientAddress: formData.studentAddress,
        issuedDate: new Date().toISOString().split("T")[0],
        expiryDate: formData.expiryDate,
        field: selectedField,
        timestamp: Date.now(),
      }

      const messageToSign = JSON.stringify(credentialMetadata)
      const provider = getMetaMaskProvider()
      const signature = await provider.signMessage(messageToSign, issuerAddress)

      const result = await issueCredentialAction({
        credential: credentialMetadata,
        signature,
      })

      if (!result.success) {
        throw new Error(result.error || "Failed to store credential")
      }

      if (result.ipfsCid) {
        storeCredential(credentialMetadata, result.ipfsCid, signature)
      }

      toast({
        title: "Credential Issued Successfully",
        description: `Credential ID: ${credentialMetadata.id}`,
        variant: "success" as any,
      })

      setFormData({ name: "", field: "", customField: "", studentAddress: "", expiryDate: "" })
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to issue credential"
      toast({
        title: "Issuance Failed",
        description: message,
        variant: "destructive",
      })
      console.error("[v0] Error issuing credential:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Issuer Info */}
      {isConnected && issuerAddress && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-sm text-emerald-300">
            ✓ Issuing as:{" "}
            <span className="font-mono">
              {issuerAddress.slice(0, 6)}...{issuerAddress.slice(-4)}
            </span>
          </p>
        </div>
      )}

      {/* Credential Name */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">Credential Name *</label>
        <Input
          type="text"
          name="name"
          placeholder="e.g., Bachelor of Science in Computer Science"
          value={formData.name}
          onChange={handleChange}
          disabled={!isConnected}
          className="bg-slate-900 border-slate-700 text-white placeholder-slate-500"
        />
      </div>

      {/* Field of Study */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">Field of Study *</label>
        <Select value={formData.field} onValueChange={handleSelectChange} disabled={!isConnected}>
          <SelectTrigger className="bg-slate-900 border-slate-700 text-white hover:border-slate-600 transition-colors">
            <SelectValue placeholder="Select a field" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-700">
            {FIELDS.map((field) => (
              <SelectItem key={field} value={field} className="text-white hover:bg-slate-700">
                {field}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Custom Field of Study */}
      {formData.field === "Custom" && (
        <div className="animate-in fade-in duration-200">
          <label className="block text-sm font-medium text-white mb-2">Custom Field of Study *</label>
          <Input
            type="text"
            name="customField"
            placeholder="e.g., Quantum Computing, Game Development..."
            value={formData.customField}
            onChange={handleChange}
            disabled={!isConnected}
            className="bg-slate-900 border-slate-700 text-white placeholder-slate-500"
          />
        </div>
      )}

      {/* Student Address */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">Student Wallet Address *</label>
        <Input
          type="text"
          name="studentAddress"
          placeholder="0x742d35Cc6634C0532925a3b844Bc9e7595f4bEb..."
          value={formData.studentAddress}
          onChange={handleChange}
          disabled={!isConnected}
          className="bg-slate-900 border-slate-700 text-white placeholder-slate-500 font-mono text-xs"
        />
      </div>

      {/* Expiry Date */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">Expiry Date (Optional)</label>
        <Input
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          disabled={!isConnected}
          className="bg-slate-900 border-slate-700 text-white"
        />
      </div>

      {/* Info Box */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <p className="text-sm text-blue-300">
          ℹ️ This credential will be signed with your wallet and stored on IPFS via NFT.storage, making it tamper-proof
          and permanently available.
        </p>
      </div>

      {/* Connection Warning */}
      {!isConnected && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <p className="text-sm text-yellow-300">⚠️ Please connect your MetaMask wallet to issue credentials</p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading || !isConnected}
        className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-semibold disabled:opacity-50"
      >
        {!isConnected ? "Connect Wallet First" : isLoading ? "Issuing..." : "Issue Credential"}
      </Button>
    </form>
  )
}
