import SweatyDapp from '../index';

describe('SweatyDapp', () => {

  it('should throw error when args are empty', async () => {
    let resultErr = null
    try {
      const app = new SweatyDapp()
    } catch (err) {
      resultErr = err
    }
    expect(resultErr).toBeTruthy()
  })

  it('should not throw error when args are valid (ethereum/polygon)', async () => {
    let resultErr = null
    try {
      const app = new SweatyDapp({
        contractAddress: '0x0000000000000000000000000000000000000000',
        contractVersion: 'sweaty-erc721-v3',
        network: 'polygon-mumbai'
      })
    } catch (err) {
      resultErr = err
    }
    expect(resultErr).toBe(null)
  })

  it('should not throw error when args are valid (tezos)', async () => {
    let resultErr = null
    try {
      const app = new SweatyDapp({
        contractAddress: 'KT19etCHSt75MTF4NvUHxRNBPvp74ggv9g3P',
        contractVersion: 'sweaty-fa2-v3',
        network: 'tezos-mainnet'
      })
    } catch (err) {
      resultErr = err
    }
    expect(resultErr).toBe(null)
  })

})
