import { EthNetwork } from "../providers/ethereum"

export const switchToEthereumChain = async (network: EthNetwork) => {
  try {
    const hexChainId = `0x${network.chainId.toString(16)}`

    await (window as any).ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: hexChainId }],
    })
  } catch (err) {
    console.error(err)
  }
}
