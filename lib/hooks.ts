"use client"

import { useEffect, useState } from "react"
import { getMetaMaskProvider, type WalletInfo } from "@/lib/metamask"

export function useWalletInfo() {
  const [wallet, setWallet] = useState<WalletInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initWallet = async () => {
      try {
        const provider = getMetaMaskProvider()
        const walletInfo = await provider.getConnectedWallet()
        setWallet(walletInfo)
      } catch (err) {
        console.error("[v0] Error initializing wallet:", err)
        setError(err instanceof Error ? err.message : "Failed to initialize wallet")
      } finally {
        setIsLoading(false)
      }
    }

    initWallet()
  }, [])

  return {
    address: wallet?.address || null,
    isConnected: wallet !== null,
    chainId: wallet?.chainId || null,
    networkName: wallet?.networkName || null,
    isLoading,
    error,
  }
}

export async function signMessageWithWallet(message: string, address: string): Promise<string> {
  const provider = getMetaMaskProvider()
  return await provider.signMessage(message, address)
}
