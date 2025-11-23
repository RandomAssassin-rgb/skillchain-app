"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Download, X } from "lucide-react"
import Image from "next/image"

interface ShareCredentialModalProps {
  credential: any
  isOpen: boolean
  onClose: () => void
}

export function ShareCredentialModal({ credential, isOpen, onClose }: ShareCredentialModalProps) {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const shareableLink = `https://skillchain.vercel.app/verify?id=${credential.id}`

  const handleCopy = () => {
    navigator.clipboard.writeText(shareableLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Share Credential</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* QR Code */}
        <div className="flex justify-center mb-6 bg-white p-4 rounded-lg">
          <Image src={credential.qrCode || "/placeholder.svg"} alt="Credential QR Code" width={200} height={200} />
        </div>

        {/* Shareable Link */}
        <div className="mb-6">
          <p className="text-xs text-slate-400 mb-2">Shareable Link</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={shareableLink}
              readOnly
              className="flex-1 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-xs text-slate-300"
            />
            <Button size="sm" variant="outline" onClick={handleCopy} className="gap-1 bg-transparent">
              <Copy className="w-3 h-3" />
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Download QR
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
