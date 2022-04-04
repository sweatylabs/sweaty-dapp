import { SweatyBlockchainConfig } from ".."

export interface SweatyBlockchainConfigResponse {
  data: SweatyBlockchainConfig
}

export const getSweatyBlockchainConfig =
  async (): Promise<SweatyBlockchainConfig> => {
    try {
      const url = `https://cloud.sweatynft.com/blockchain-config`
      const res = await fetch(url)
      const json: SweatyBlockchainConfigResponse = await res.json()
      return json.data
    } catch (err) {
      throw err
    }
  }
