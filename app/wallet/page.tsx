"use client"

import { useWalletInfo } from "@/lib/hooks"
import { DashboardHeader } from "@/components/dashboard-header"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getMetaMaskProvider } from "@/lib/metamask"
import { useState } from "react"
import { toast } from "@/lib/toast"

export default function WalletPage() {
  const { address, isConnected, chainId, networkName, isLoading } = useWalletInfo()
  const [isCopied, setIsCopied] = useState(false)

  const handleConnect = async () => {
    try {
      const provider = getMetaMaskProvider()
      if (!provider.isMetaMaskInstalled()) {
        toast.error("MetaMask is not installed")
        return
      }
      await provider.connectWallet()
      toast.success("Wallet connected!")
      window.location.reload()
    } catch (error) {
      const message = error instanceof Error ? error.message : "Connection failed"
      toast.error(message)
    }
  }

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <DashboardHeader />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="mb-8 text-slate-300 hover:text-white">
            ← Back to Dashboard
          </Button>
        </Link>

        {isLoading ? (
          <div className="text-center text-slate-400">Loading wallet info...</div>
        ) : isConnected && address ? (
          <div className="space-y-6">
            {/* Connected Wallet Card */}
            <div className="bg-slate-800/50 border border-emerald-500/30 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                <h2 className="text-2xl font-bold text-white">Wallet Connected</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-400 mb-2">Wallet Address</p>
                  <div className="flex items-center gap-2">
                    <code className="bg-slate-900 border border-slate-700 rounded px-4 py-2 text-emerald-400 font-mono text-sm break-all flex-1">
                      {address}
                    </code>
                    <Button size="sm" variant="outline" onClick={copyAddress}>
                      {isCopied ? "✓ Copied" : "Copy"}
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-slate-400 mb-2">Network</p>
                  <p className="text-white font-medium">{networkName || "Unknown"}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-400 mb-2">Chain ID</p>
                  <p className="text-white font-mono text-sm">{chainId || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Credentials Info */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
              <h3 className="text-lg font-semibold text-white mb-4">Your Credentials</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900/50 rounded p-4">
                  <p className="text-slate-400 text-sm mb-1">Total Credentials</p>
                  <p className="text-2xl font-bold text-white">3</p>
                </div>
                <div className="bg-slate-900/50 rounded p-4">
                  <p className="text-slate-400 text-sm mb-1">Stored on IPFS</p>
                  <p className="text-2xl font-bold text-white">3</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Link href="/issuer" className="flex-1">
                <Button className="w-full gap-2 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white">
                  Issue Credential
                </Button>
              </Link>
              <Link href="/verify" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent text-background">
                  Verify Credential
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-12 text-center">
            <div className="text-5xl mb-4">🔌</div>
            <h2 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h2>
            <p className="text-slate-400 mb-6">
              Connect your MetaMask wallet to start issuing and verifying credentials on the blockchain.
            </p>
            <Button
              onClick={handleConnect}
              className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white gap-2 px-6"
            >
              Connect MetaMask
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
