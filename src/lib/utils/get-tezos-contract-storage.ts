interface TezosContractStorage {
  [k: string]: any
}

export const getTezoContractStorage = async (
  network: string,
  address: string
): Promise<TezosContractStorage> => {
  try {
    const bcdNetwork =
      network === "tezos-hangzhounet" ? "hangzhou2net" : "mainnet"
    const url = `https://api.better-call.dev/v1/contract/${bcdNetwork}/${address}/storage`
    const res = await fetch(url)
    const json = await res.json()
    return json[0].children.reduce((acc: any, child: any) => {
      const { name, value } = child
      return {
        ...acc,
        [name]: value,
      }
    }, {})
  } catch (err) {
    throw err
  }
}
