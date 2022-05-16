import { NetworkType } from "@airgap/beacon-sdk"
import { BeaconWallet } from "@taquito/beacon-wallet"
import { TezosToolkit } from "@taquito/taquito"
import { SweatyDappConfig } from ".."
import BigNumber from "bignumber.js"
import { getTezosContractStorage } from "../utils/get-tezos-contract-storage"
import { ContractInfo } from "./provider"

export interface TezNetwork {
  name: string
  url: string
}

export const NETWORK_TEZOS_MAINNET: TezNetwork = {
  name: "mainnet",
  url: "https://mainnet-node.madfish.solutions",
}
export const NETWORK_TEZOS_HANGZHOUNET: TezNetwork = {
  name: "hangzhounet",
  url: "https://hangzhounet.api.tez.ie",
}

const networksMap = {
  "tezos-mainnet": NETWORK_TEZOS_MAINNET,
  "tezos-hangzhounet": NETWORK_TEZOS_HANGZHOUNET,
}

export default class TezosProvider {
  config: SweatyDappConfig

  toolkit: TezosToolkit | null
  wallet: BeaconWallet | null

  constructor(_config: SweatyDappConfig) {
    if (!networksMap[_config.network]) {
      throw new Error(`invalid network: ${_config.network}`)
    }
    this.config = _config
  }

  isConnected(): boolean {
    return !!(this.toolkit && this.wallet)
  }

  async sync(): Promise<string> {
    try {
      if (this.isConnected()) {
        throw new Error("wallet already connected")
      }
      const n = networksMap[this.config.network]
      const toolkit = new TezosToolkit(n.url)
      const wallet = new BeaconWallet({
        name: this.config.appName || "SweatyDapp",
        preferredNetwork: n.name as NetworkType,
      })
      await wallet.requestPermissions({
        network: {
          type: n.name as any,
        },
      })
      toolkit.setWalletProvider(wallet)
      this.toolkit = toolkit
      this.wallet = wallet
      return await wallet.getPKH()
    } catch (err) {
      throw err
    }
  }

  async reset(): Promise<void> {
    try {
      if (!this.isConnected()) {
        return
      }
      await this.wallet.disconnect()
      await this.wallet.client.destroy()
      this.wallet = null
      this.toolkit = null
    } catch (err) {
      throw err
    }
  }

  async mint(amount: number) {
    try {
      if (!this.isConnected()) {
        throw new Error("wallet not connected")
      }
      const c = await this.toolkit.wallet.at(this.config.contractAddress)

      const storage: any = await c.storage()
      const mintFee = storage.mint_price as BigNumber

      let batch = await this.toolkit.wallet.batch()
      for (let i = 0; i < amount; i++) {
        batch = batch.withTransfer(
          c.methods.mintOne().toTransferParams({
            amount: mintFee.toNumber(),
            mutez: true,
          })
        )
      }
      const result = await batch.send()
      await result.confirmation()
    } catch (err) {
      throw err
    }
  }

  async getContractInfo(): Promise<ContractInfo> {
    try {
      // fetch storage via 3rd party API, not wallet
      const storage = await getTezosContractStorage(
        this.config.network,
        this.config.contractAddress
      )
      // assume that the big number values won't be too big
      // as to cause overflow
      return {
        mintPrice: `${storage.mint_price / 1000000}`,
        numMinted: parseInt(storage.current_token_index),
        maxSupply: parseInt(storage.max_supply),
        isWhitelistEnabled: storage.whitelist_enabled,
        isPaused: storage.paused,
        publicMintLimit: parseInt(storage.public_mint_limit),
        whitelistMintLimit: parseInt(storage.whitelist_mint_limit),
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
      const c = await this.toolkit.wallet.at(this.config.contractAddress)
      const source = await this.wallet.getPKH()
      const walletAddress = address || source
      const value = await c.contractViews
        .isWhitelisted(walletAddress)
        .executeView({
          source,
          viewCaller: this.config.contractAddress,
        })
      return value
    } catch (err) {
      throw err
    }
  }
}
