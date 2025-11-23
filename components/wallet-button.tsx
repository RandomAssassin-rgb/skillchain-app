"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { getMetaMaskProvider } from "@/lib/metamask"
import { toast } from "@/lib/toast"

export function WalletButton() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)

  const connectWallet = async () => {
    setIsConnecting(true)
    try {
      const provider = getMetaMaskProvider()

      if (!provider.isMetaMaskInstalled()) {
        toast.error("MetaMask is not installed. Please install the MetaMask browser extension.")
        window.open("https://metamask.io/download/", "_blank")
        return
      }

      const walletInfo = await provider.connectWallet()
      setAddress(walletInfo.address)
      setIsConnected(true)
      toast.success(`Connected: ${walletInfo.address.slice(0, 6)}...${walletInfo.address.slice(-4)}`)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to connect wallet"
      toast.error(message)
      console.error("[v0] Wallet connection error:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setAddress(null)
    setIsConnected(false)
    toast.success("Wallet disconnected")
  }

  if (isConnected && address) {
    return (
      <Button variant="outline" size="sm" onClick={disconnectWallet} className="text-xs text-background bg-foreground">
        {address.slice(0, 6)}...{address.slice(-4)}
      </Button>
    )
  }

  return (
    <Button
      size="sm"
      onClick={connectWallet}
      disabled={isConnecting}
      className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white"
    >
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  )
}
