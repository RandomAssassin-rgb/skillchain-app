"use client"

import { useAccount, useBalance } from "wagmi"

export function useWallet() {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })

  return {
    address,
    isConnected,
    balance,
    displayBalance: balance ? `${Number.parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : "N/A",
  }
}
