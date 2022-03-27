import "@babel/polyfill"
import { ContractInfo, Provider } from "./providers/provider"
import TezosProvider from "./providers/tezos"
import {
  getSweatyContractCode,
  SweatyContractCode,
} from "./utils/get-sweaty-contract-code"
import { sweatyLog } from "./utils/sweaty-log"
import { validateConfig } from "./utils/validate-config"

export interface SweatyDappConfig {
  appName?: string
  contractAddress: string
  contractVersion: string
  network: string
}
export default class SweatyDapp {
  config: SweatyDappConfig
  code: SweatyContractCode
  provider: Provider

  constructor(_config: SweatyDappConfig) {
    validateConfig(_config)
    this.config = { ..._config }
  }

  async init(): Promise<void> {
    try {
      if (this.code) {
        return
      }
      this.code = await getSweatyContractCode(this.config.contractVersion)
      if (this.isTezos()) {
        this.provider = new TezosProvider(this.code, this.config)
        sweatyLog("using tezos provider")
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

  async isConnected(): Promise<boolean> {
    try {
      return await this.provider.isConnected()
    } catch (err) {
      sweatyLog(err)
      throw err
    }
  }

  async sync(): Promise<void> {
    try {
      await this.provider.sync()
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
      return await this.provider.isWhitelisted(address)
    } catch (err) {
      sweatyLog(err)
      throw err
    }
  }
}
