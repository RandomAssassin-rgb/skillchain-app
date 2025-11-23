// MetaMask is injected into the window object by the browser extension
// No additional configuration needed beyond environment variables

export const NETWORKS = {
  ETHEREUM: {
    chainId: "0x1",
    name: "Ethereum Mainnet",
    rpcUrl: "https://eth-mainnet.g.alchemy.com/v2/",
  },
  POLYGON: {
    chainId: "0x89",
    name: "Polygon",
    rpcUrl: "https://polygon-mainnet.g.alchemy.com/v2/",
  },
  MUMBAI: {
    chainId: "0x13881",
    name: "Mumbai Testnet",
    rpcUrl: "https://polygon-mumbai.g.alchemy.com/v2/",
  },
  SEPOLIA: {
    chainId: "0xaa36a7",
    name: "Sepolia Testnet",
    rpcUrl: "https://eth-sepolia.g.alchemy.com/v2/",
  },
}

// Recommended network for SkillChain demo (use a testnet)
export const RECOMMENDED_CHAIN = NETWORKS.SEPOLIA
