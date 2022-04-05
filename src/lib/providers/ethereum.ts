import { BigNumber, ethers } from "ethers"
import { formatEther } from "ethers/lib/utils"

import { SweatyBlockchainConfig, SweatyDappConfig } from ".."
import { SweatyContractCode } from "../utils/get-sweaty-contract-code"
import { switchToEthereumChain } from "../utils/switch-to-ethereum-chain"
import { switchToPolygonChain } from "../utils/switch-to-polygon-chain"
import { ContractInfo } from "./provider"

export interface EthNetwork {
  name: string
  chainId: number
}

export const NETWORK_ETHEREUM_MAINNET: EthNetwork = {
  name: "Ethereum Mainnet",
  chainId: 1,
}
export const NETWORK_ETHEREUM_RINKEBY: EthNetwork = {
  name: "Ethereum Rinkeby Testnet",
  chainId: 4,
}
export const NETWORK_POLYGON_MAINNET: EthNetwork = {
  name: "Polygon Mainnet",
  chainId: 137,
}
export const NETWORK_POLYGON_MUMBAI: EthNetwork = {
  name: "Polygon Mumbai Testnet",
  chainId: 80001,
}

const networksMap = {
  "etheruem-mainnet": NETWORK_ETHEREUM_MAINNET,
  "ethereum-rinkeby": NETWORK_ETHEREUM_RINKEBY,
  "polygon-mainnet": NETWORK_POLYGON_MAINNET,
  "polygon-mumbai": NETWORK_POLYGON_MUMBAI,
}

export default class EthereumProvider {
  config: SweatyDappConfig
  blockchainConfig: SweatyBlockchainConfig
  code: SweatyContractCode

  provider: ethers.providers.Web3Provider | null

  constructor(
    _code: SweatyContractCode,
    _config: SweatyDappConfig,
    _blockchainConfig: SweatyBlockchainConfig
  ) {
    if (!networksMap[_config.network]) {
      throw new Error(`invalid network: ${_config.network}`)
    }
    this.code = _code
    this.config = _config
    this.blockchainConfig = _blockchainConfig
  }

  async switchNetwork(): Promise<void> {
    try {
      const network: EthNetwork = networksMap[this.config.network]
      if ([NETWORK_POLYGON_MAINNET, NETWORK_POLYGON_MUMBAI].includes(network)) {
        await switchToPolygonChain(
          networksMap[this.config.network],
          this.blockchainConfig
        )
      } else {
        await switchToEthereumChain(networksMap[this.config.network])
      }
    } catch (err) {
      throw err
    }
  }

  isConnected(): boolean {
    return !!this.provider
  }

  async sync(): Promise<string> {
    try {
      if (this.isConnected()) {
        throw new Error("wallet already connected")
      }
      await this.switchNetwork()
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      )
      await provider.send("eth_requestAccounts", [])
      const account = await provider.getSigner().getAddress()
      this.provider = provider
      return account
    } catch (err) {
      throw err
    }
  }

  async reset(): Promise<void> {
    try {
      if (!this.isConnected()) {
        return
      }
      this.provider = null
    } catch (err) {
      throw err
    }
  }

  async mint(amount: number) {
    try {
      if (!this.isConnected()) {
        throw new Error("wallet not connected")
      }
      if (amount > 1) {
        throw new Error(
          "Ethereum/Polygon provider supports minting only 1 token at a time"
        )
      }
      await this.switchNetwork()

      const c = new ethers.Contract(
        this.config.contractAddress,
        this.code.abi,
        this.provider.getSigner()
      )
      const mintPrice = await c.mMintPrice()
      const result = await c.mintOne({
        value: mintPrice,
      })
      await result.wait()
    } catch (err) {
      throw err
    }
  }

  async getContractInfo(): Promise<ContractInfo> {
    try {
      // connect to node via RPC rather than wallet so that wallet doesn't need to be connected
      const p = new ethers.providers.JsonRpcProvider(this.config.rpcUrl)
      const c = new ethers.Contract(
        this.config.contractAddress,
        this.code.abi,
        p
      )

      // assume that the big number values won't be too big
      // as to cause overflow
      const mintPrice = (await c.mMintPrice()) as BigNumber
      const numMinted = (await c.tokensMinted()) as BigNumber
      const maxSupply = (await c.mMaxSupply()) as BigNumber
      const isWhitelistEnabled = (await c.mWhitelistEnabled()) as boolean
      const isPaused = (await c.mPaused()) as boolean
      const publicMintLimit = (await c.mPublicMintLimit()) as BigNumber
      const whitelistMintLiimt = (await c.mWhitelistMintLimit()) as BigNumber
      return {
        mintPrice: formatEther(mintPrice),
        numMinted: numMinted.toNumber(),
        maxSupply: maxSupply.toNumber(),
        isWhitelistEnabled,
        isPaused,
        publicMintLimit: publicMintLimit.toNumber(),
        whitelistMintLimit: whitelistMintLiimt.toNumber(),
      }
    } catch (err) {
      throw err
    }
  }

  async isWhitelisted(address?: string): Promise<boolean> {
    try {
      if (!this.isConnected()) {
        throw new Error("wallet not connected")
      }
      const c = new ethers.Contract(
        this.config.contractAddress,
        this.code.abi,
        this.provider.getSigner()
      )
      const source = this.provider.getSigner().getAddress()
      const result = await c.isWhitelisted(address || source)
      return result
    } catch (err) {
      throw err
    }
  }
}
