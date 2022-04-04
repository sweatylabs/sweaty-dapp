import { SweatyBlockchainConfig } from ".."
import {
  EthNetwork,
  NETWORK_POLYGON_MAINNET,
  NETWORK_POLYGON_MUMBAI,
} from "../providers/ethereum"

export const switchToPolygonChain = async (
  network: EthNetwork,
  blockchainConfig: SweatyBlockchainConfig
) => {
  try {
    const isPolygonNetwork = [
      NETWORK_POLYGON_MAINNET,
      NETWORK_POLYGON_MUMBAI,
    ].includes(network)
    if (!isPolygonNetwork) {
      throw new Error(`not a polygon network: ${network.name}`)
    }
    const hexChainId = `0x${network.chainId.toString(16)}`

    try {
      await (window as any).ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: hexChainId }],
      })
      // do NOT continue to add chain to wallet
      return
    } catch (err) {
      console.error("could not switch chain: ", err)
      // continue to add chain to wallet
    }

    const rpcUrls: string[] =
      network === NETWORK_POLYGON_MAINNET
        ? [blockchainConfig.rpcUrls.polygon]
        : [blockchainConfig.rpcUrls.mumbai]

    const blockExplorerUrls: string[] =
      network === NETWORK_POLYGON_MAINNET
        ? [blockchainConfig.blockchainExplorerUrls.polygon]
        : [blockchainConfig.blockchainExplorerUrls.mumbai]

    const params = [
      {
        chainId: hexChainId,
        chainName: network.name,
        nativeCurrency: {
          name: "MATIC",
          symbol: "MATIC",
          decimals: 18,
        },
        rpcUrls,
        blockExplorerUrls,
      },
    ]

    await (window as any).ethereum.request({
      method: "wallet_addEthereumChain",
      params,
    })
  } catch (err) {
    console.error(err)
  }
}
