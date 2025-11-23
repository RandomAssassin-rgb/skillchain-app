"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { generateQRCode } from "@/lib/qr-code-generator"
import { generateCredentialPDF } from "@/lib/pdf-generator"
import { toast } from "@/hooks/use-toast"

interface Credential {
  id: string
  title: string
  issuer: string
  issuedDate: string
  expiryDate: string | null
  status: string
  field: string
  qrCode?: string
  recipientAddress?: string
  signature?: string
}

export function CredentialCard({ credential }: { credential: Credential }) {
  const [showQR, setShowQR] = useState(false)
  const [qrImageUrl, setQrImageUrl] = useState<string | null>(null)
  const [isGeneratingQR, setIsGeneratingQR] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const isExpired = credential.expiryDate && new Date(credential.expiryDate) < new Date()

  const handleViewQR = async () => {
    setIsGeneratingQR(true)
    try {
      // Pass complete credential data for embedding in QR
      const fullCredentialData = {
        id: credential.id,
        title: credential.title,
        issuer: credential.issuer,
        recipientAddress: credential.recipientAddress || "Unknown",
        issuedDate: credential.issuedDate,
        expiryDate: credential.expiryDate,
        status: credential.status,
        field: credential.field,
        signature: credential.signature,
      }

      const url = await generateQRCode(credential.id, fullCredentialData)
      setQrImageUrl(url)
      setShowQR(!showQR)

      toast({
        title: "QR Code Generated",
        description: "Scan this QR code from any device to verify",
        variant: "success" as any,
      })
    } catch (error) {
      console.error("[v0] QR generation error:", error)
      toast({
        title: "QR Generation Failed",
        description: "Failed to generate QR code",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingQR(false)
    }
  }

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)
    try {
      // Generate fresh QR for PDF
      const fullCredentialData = {
        id: credential.id,
        title: credential.title,
        issuer: credential.issuer,
        recipientAddress: credential.recipientAddress || "Unknown",
        issuedDate: credential.issuedDate,
        expiryDate: credential.expiryDate,
        status: credential.status,
        field: credential.field,
        signature: credential.signature,
      }

      const qrUrl = await generateQRCode(credential.id, fullCredentialData)

      await generateCredentialPDF({
        title: credential.title,
        issuer: credential.issuer,
        recipientAddress: credential.recipientAddress || "Unknown",
        issuedDate: credential.issuedDate,
        expiryDate: credential.expiryDate || undefined,
        field: credential.field,
        qrCodeUrl: qrUrl,
        credentialId: credential.id,
        signature: credential.signature || "Not signed",
      })
      toast({
        title: "PDF Downloaded",
        description: "Credential certificate downloaded successfully",
        variant: "success" as any,
      })
    } catch (error) {
      console.error("[v0] PDF generation error:", error)
      toast({
        title: "Download Failed",
        description: "Failed to generate PDF",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const handleCopyCredentialId = async () => {
    try {
      await navigator.clipboard.writeText(credential.id)
      toast({
        title: "Copied",
        description: "Credential ID copied to clipboard",
        variant: "success" as any,
      })
    } catch {
      toast({
        title: "Copy Failed",
        description: "Failed to copy credential ID",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden hover:border-slate-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-blue-500/20 to-emerald-500/20 border-b border-slate-700 p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-white text-sm leading-tight">{credential.title}</h3>
          <span
            className={`px-2 py-1 text-xs rounded-full font-medium whitespace-nowrap ${
              isExpired ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"
            }`}
          >
            {isExpired ? "Expired" : credential.status}
          </span>
        </div>
        <p className="text-xs text-slate-300">{credential.issuer}</p>
      </div>

      {/* Card Body */}
      <div className="p-4 space-y-4">
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-3">
          <p className="text-slate-400 mb-1 text-xs">Credential ID</p>
          <div className="flex items-center gap-2">
            <code className="text-blue-400 text-xs font-mono flex-1 break-all">{credential.id}</code>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyCredentialId}
              className="h-7 px-2 text-xs hover:bg-blue-500/20 text-blue-400"
            >
              Copy
            </Button>
          </div>
          <p className="text-slate-500 text-xs mt-1">Click copy to verify this credential</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <p className="text-slate-400 mb-1">Field</p>
            <p className="text-slate-200">{credential.field}</p>
          </div>
          <div>
            <p className="text-slate-400 mb-1">Issued</p>
            <p className="text-slate-200">{new Date(credential.issuedDate).toLocaleDateString()}</p>
          </div>
        </div>

        {credential.expiryDate && (
          <div>
            <p className="text-slate-400 mb-1 text-xs">Expires</p>
            <p className="text-slate-200 text-xs">{new Date(credential.expiryDate).toLocaleDateString()}</p>
          </div>
        )}
      </div>

      {/* QR Preview */}
      {showQR && qrImageUrl && (
        <div className="border-t border-slate-700 p-6 bg-slate-900/50 animate-in fade-in duration-200">
          <div className="flex justify-center mb-4">
            <div className="bg-white p-4 rounded-lg">
              <img src={qrImageUrl || "/placeholder.svg"} alt="Credential QR Code" className="w-48 h-48" />
            </div>
          </div>
          <p className="text-xs text-center text-slate-400 mb-2">Scan to verify this credential from any device</p>
          <p className="text-xs text-center text-slate-500">Works with any QR scanner or Google Lens</p>
        </div>
      )}

      {/* Card Footer */}
      <div className="border-t border-slate-700 p-4 flex gap-2 bg-slate-900/30">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 text-xs bg-transparent hover:bg-blue-500/20 transition-colors duration-200 text-white"
          onClick={handleViewQR}
          disabled={isGeneratingQR}
        >
          {isGeneratingQR ? "Loading..." : showQR ? "Hide QR" : "View QR"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 text-xs bg-transparent hover:bg-purple-500/20 transition-colors duration-200 text-white"
          onClick={handleDownloadPDF}
          disabled={isGeneratingPDF}
        >
          {isGeneratingPDF ? "Generating..." : "PDF"}
        </Button>
      </div>
    </div>
  )
}
