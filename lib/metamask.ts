// MetaMask Web3 integration
export interface WalletInfo {
  address: string
  chainId: string
  networkName: string
}

export class MetaMaskProvider {
  private window: any

  constructor() {
    if (typeof window !== "undefined") {
      this.window = window as any
    }
  }

  // Check if MetaMask is installed
  isMetaMaskInstalled(): boolean {
    if (typeof window === "undefined") return false
    const ethereum = (window as any).ethereum
    return ethereum !== undefined && ethereum.isMetaMask
  }

  // Request wallet connection
  async connectWallet(): Promise<WalletInfo> {
    if (!this.isMetaMaskInstalled()) {
      throw new Error("MetaMask is not installed. Please install MetaMask browser extension.")
    }

    const ethereum = (window as any).ethereum

    try {
      // Request account access
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      })

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found. Please approve the connection in MetaMask.")
      }

      // Get chain info
      const chainId = await ethereum.request({
        method: "eth_chainId",
      })

      const networkName = this.getNetworkName(chainId)

      return {
        address: accounts[0],
        chainId,
        networkName,
      }
    } catch (error) {
      if ((error as any).code === 4001) {
        throw new Error("Connection rejected. User denied the connection request.")
      }
      throw error
    }
  }

  // Get current connected wallet
  async getConnectedWallet(): Promise<WalletInfo | null> {
    if (!this.isMetaMaskInstalled()) {
      return null
    }

    const ethereum = (window as any).ethereum

    try {
      const accounts = await ethereum.request({
        method: "eth_accounts",
      })

      if (!accounts || accounts.length === 0) {
        return null
      }

      const chainId = await ethereum.request({
        method: "eth_chainId",
      })

      const networkName = this.getNetworkName(chainId)

      return {
        address: accounts[0],
        chainId,
        networkName,
      }
    } catch (error) {
      console.error("[v0] Error getting connected wallet:", error)
      return null
    }
  }

  // Sign a message with the wallet
  async signMessage(message: string, address: string): Promise<string> {
    if (!this.isMetaMaskInstalled()) {
      throw new Error("MetaMask is not installed")
    }

    const ethereum = (window as any).ethereum

    try {
      const signature = await ethereum.request({
        method: "personal_sign",
        params: [message, address],
      })

      return signature
    } catch (error) {
      console.error("[v0] Error signing message:", error)
      throw error
    }
  }

  // Get network name from chain ID
  private getNetworkName(chainId: string): string {
    const networks: Record<string, string> = {
      "0x1": "Ethereum Mainnet",
      "0x89": "Polygon",
      "0x13881": "Mumbai Testnet",
      "0xaa36a7": "Sepolia Testnet",
    }
    return networks[chainId] || `Unknown Network (${chainId})`
  }

  // Listen to account changes
  onAccountsChanged(callback: (accounts: string[]) => void): () => void {
    if (typeof window === "undefined") return () => {}

    const ethereum = (window as any).ethereum
    if (!ethereum) return () => {}

    ethereum.on("accountsChanged", callback)

    // Return unsubscribe function
    return () => {
      ethereum.removeListener("accountsChanged", callback)
    }
  }

  // Listen to chain changes
  onChainChanged(callback: (chainId: string) => void): () => void {
    if (typeof window === "undefined") return () => {}

    const ethereum = (window as any).ethereum
    if (!ethereum) return () => {}

    ethereum.on("chainChanged", callback)

    // Return unsubscribe function
    return () => {
      ethereum.removeListener("chainChanged", callback)
    }
  }
}

// Singleton instance
let metamaskProvider: MetaMaskProvider | null = null

export function getMetaMaskProvider(): MetaMaskProvider {
  if (!metamaskProvider) {
    metamaskProvider = new MetaMaskProvider()
  }
  return metamaskProvider
}
