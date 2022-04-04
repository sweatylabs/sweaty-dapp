import { SweatyDappConfig } from ".."

const ALL_NETWORKS = [
  "ethereum-mainnet",
  "ethereum-rinkeby",
  "polygon-mainnet",
  "polygon-mumbai",
  "tezos-mainnet",
  "tezos-hangzhounet",
]

interface ConfigValidationCase {
  key: string
  message: string
  validate: (v: any) => boolean
}

const validationCases = (config: SweatyDappConfig): ConfigValidationCase[] => [
  {
    key: "contractAddress",
    message:
      'An Ethereum, Polygon, or Tezos account contract address. Starts with "0x" or "KT".',
    validate: (v: any) =>
      typeof v === "string" && (v.startsWith("0x") || v.startsWith("KT")),
  },
  {
    key: "contractVersion",
    message:
      'The version of the contract. Starts with "sweaty-erc721" or "sweaty-fa2".',
    validate: (v: any) =>
      (typeof v === "string" && v.startsWith("sweaty-erc721")) ||
      v.startsWith("sweaty-fa2"),
  },
  {
    key: "network",
    message: `The blockchain network for the contract. Valid values: ${ALL_NETWORKS.map(
      (v) => `"${v}"`
    ).join(", ")}.`,
    validate: (v: any) => ALL_NETWORKS.includes(v),
  },
  {
    key: "rpcUrl",
    message: `The node RPC URL for connecting to the blockchain. Must be a URL.`,
    validate: (v: any) => {
      if (config.network.startsWith("tezos")) {
        // tezos doesn't require rpcUrl
        return true
      }
      return typeof v === "string" && v.length > 0
    },
  },
]

const msg = (str: string): string => {
  return `SweatyDapp config error: ${str}`
}

export const validateConfig = (config: SweatyDappConfig) => {
  if (!config) {
    throw new Error("config is missing")
  }
  const cases = validationCases(config)
  for (const c of cases) {
    if (!c.validate(config[c.key])) {
      throw new Error(
        msg(`invalid value for property "${c.key}"\nExpected: ${c.message}`)
      )
    }
  }
}
