"use client"

import { Button } from "@/components/ui/button"
import { generateVerificationReportPDF } from "@/lib/pdf-generator"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"

interface VerificationResultProps {
  data: any
}

export function VerificationResult({ data }: VerificationResultProps) {
  const isValid = data.verified && data.status === "Valid"
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true)
      await generateVerificationReportPDF(data)
      toast({
        title: "Report Downloaded",
        description: "Verification report downloaded successfully",
        variant: "success" as any,
      })
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast({
        title: "Download Failed",
        description: "Failed to generate verification report",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const handleShareResult = async () => {
    const currentUrl = typeof window !== "undefined" ? window.location.href : ""

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(currentUrl)
        toast({
          title: "Link Copied",
          description: "Verification link copied to clipboard",
          variant: "success" as any,
        })
      } else {
        const textarea = document.createElement("textarea")
        textarea.value = currentUrl
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand("copy")
        document.body.removeChild(textarea)
        toast({
          title: "Link Copied",
          description: "Verification link copied to clipboard",
          variant: "success" as any,
        })
      }
    } catch (error) {
      console.error("Error copying to clipboard:", error)
      toast({
        title: "Copy Failed",
        description: "Failed to copy link to clipboard",
        variant: "destructive",
      })
    }
  }

  return (
    <div>
      {/* Status Header - Removed lucide icons */}
      <div
        className={`rounded-lg p-8 mb-6 border ${
          isValid ? "bg-emerald-500/10 border-emerald-500/20" : "bg-red-500/10 border-red-500/20"
        }`}
      >
        <div className="flex items-start gap-4">
          <div className="text-3xl">{isValid ? "✓" : "✗"}</div>
          <div>
            <h2 className={`text-2xl font-bold mb-2 ${isValid ? "text-emerald-300" : "text-red-300"}`}>
              {isValid ? "Credential Verified" : "Credential Invalid"}
            </h2>
            <p className={`text-sm ${isValid ? "text-emerald-200" : "text-red-200"}`}>
              {isValid
                ? "This credential is authentic and has been verified on the blockchain."
                : "This credential could not be verified. It may be forged or expired."}
            </p>
          </div>
        </div>
      </div>

      {/* Credential Details */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500/20 to-emerald-500/20 border-b border-slate-700 p-6">
          <h3 className="text-xl font-bold text-white mb-2">{data.title}</h3>
          <p className="text-slate-400">{data.issuer}</p>
        </div>

        {/* Details Grid */}
        <div className="p-6 grid md:grid-cols-2 gap-6">
          {[
            { label: "Credential ID", value: data.id },
            { label: "Status", value: data.status },
            { label: "Issued Date", value: data.issuedDate },
            { label: "Expiry Date", value: data.expiryDate },
            { label: "Issuer", value: data.issuer },
            { label: "Student Address", value: data.student },
          ].map((item, i) => (
            <div key={i}>
              <p className="text-xs text-slate-500 mb-1">{item.label}</p>
              <p className="text-sm text-slate-300 break-all">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="border-t border-slate-700 p-6 flex gap-3">
          <Button
            variant="outline"
            className="flex-1 bg-transparent text-background hover:bg-slate-700 transition-colors"
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
          >
            {isGeneratingPDF ? "⏳ Generating..." : "📥 Download PDF"}
          </Button>
          <Button
            variant="outline"
            className="flex-1 bg-transparent text-background hover:bg-slate-700 transition-colors"
            onClick={handleShareResult}
          >
            📤 Share Result
          </Button>
        </div>
      </div>
    </div>
  )
}
