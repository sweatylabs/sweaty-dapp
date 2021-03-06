import "@babel/polyfill"
import EthereumProvider from "./providers/ethereum"
import { ContractInfo, Provider } from "./providers/provider"
import TezosProvider from "./providers/tezos"
import { getSweatyBlockchainConfig } from "./utils/get-blockchain-config"
import { getSweatyContractCode } from "./utils/get-sweaty-contract-code"
import { sweatyLog } from "./utils/sweaty-log"
import { validateConfig } from "./utils/validate-config"

export interface SweatyDappConfig {
  appName?: string
  contractAddress: string
  contractVersion: string
  network: string
  rpcUrl?: string
}
export interface SweatyBlockchainConfig {
  rpcUrls: {
    polygon: string
    mumbai: string
  }
  blockchainExplorerUrls: {
    polygon: string
    mumbai: string
  }
}

export default class SweatyDapp {
  config: SweatyDappConfig
  provider: Provider

  constructor(_config: SweatyDappConfig) {
    validateConfig(_config)
    this.config = { ..._config }
  }

  async init(): Promise<void> {
    try {
      if (this.provider) {
        sweatyLog("already initialized")
        return
      }

      if (this.isTezos()) {
        this.provider = new TezosProvider(this.config)
        sweatyLog("using tezos provider")
      } else if (this.isEthereum()) {
        const code = await getSweatyContractCode(this.config.contractVersion)
        const blockchainConfig = await getSweatyBlockchainConfig()
        this.provider = new EthereumProvider(
          code,
          this.config,
          blockchainConfig
        )
        sweatyLog("using ethereum provider")
      } else {
        throw new Error("invalid provider")
      }

      sweatyLog("initialized")
    } catch (err) {
      sweatyLog(err)
      throw err
    }
  }

  isEthereum(): boolean {
    return this.config.contractAddress.startsWith("0x")
  }

  isTezos(): boolean {
    return this.config.contractAddress.startsWith("KT")
  }

  isConnected(): boolean {
    try {
      return this.provider.isConnected()
    } catch (err) {
      sweatyLog(err)
      throw err
    }
  }

  async sync(): Promise<string> {
    try {
      return this.provider.sync()
    } catch (err) {
      sweatyLog(err)
      throw err
    }
  }

  async mint(amount: number): Promise<void> {
    try {
      await this.provider.mint(amount)
    } catch (err) {
      sweatyLog(err)
      throw err
    }
  }

  async getContractInfo(): Promise<ContractInfo> {
    try {
      return this.provider.getContractInfo()
    } catch (err) {
      sweatyLog(err)
      throw err
    }
  }

  async isWhitelisted(address?: string): Promise<boolean> {
    try {
      return this.provider.isWhitelisted(address)
    } catch (err) {
      sweatyLog(err)
      throw err
    }
  }
}
