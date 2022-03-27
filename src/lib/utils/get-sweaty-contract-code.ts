export interface SweatyContractCode {
  abi?: string
  bytecode: string
}

export interface SweatyContractCodeResponse {
  data: SweatyContractCode
}

export const getSweatyContractCode = async (
  contractVersion: string
): Promise<SweatyContractCode> => {
  try {
    const url = `https://cloud.sweatynft.com/contracts/${contractVersion}`
    const res = await fetch(url)
    const json: SweatyContractCodeResponse = await res.json()
    return json.data
  } catch (err) {
    throw err
  }
}
