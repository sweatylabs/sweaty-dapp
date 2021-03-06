
export interface ContractInfo {
  mintPrice: string
  numMinted: number
  maxSupply: number
  isWhitelistEnabled: boolean
  isPaused: boolean
  publicMintLimit: number
  whitelistMintLimit: number
}

export interface Provider {
  isConnected: () => boolean
  sync: () => Promise<string>
  reset: () => Promise<void>
  mint: (amount: number) => Promise<void>
  getContractInfo: () => Promise<ContractInfo>
  isWhitelisted: (address?: string) => Promise<boolean>
}
