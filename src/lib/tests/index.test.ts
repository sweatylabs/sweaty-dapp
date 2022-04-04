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

  it('should throw error when rcpUrl is missing (ethereum)', async () => {
    let resultErr = null
    try {
      const app = new SweatyDapp({
        contractAddress: '0x0000000000000000000000000000000000000000',
        contractVersion: 'sweaty-erc721-v3',
        network: 'ethereum-rinkeby'
      })
    } catch (err) {
      resultErr = err
    }
    expect(resultErr).toBeTruthy()
  })

  it('should throw error when rcpUrl is missing (polygon)', async () => {
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
    expect(resultErr).toBeTruthy()
  })

  it('should NOT throw error when args are valid (ethereum)', async () => {
    let resultErr = null
    try {
      const app = new SweatyDapp({
        contractAddress: '0x0000000000000000000000000000000000000000',
        contractVersion: 'sweaty-erc721-v3',
        network: 'ethereum-rinkeby',
        rpcUrl: 'blah'
      })
    } catch (err) {
      resultErr = err
    }
    expect(resultErr).toBe(null)
  })

  it('should NOT throw error when args are valid (polygon)', async () => {
    let resultErr = null
    try {
      const app = new SweatyDapp({
        contractAddress: '0x0000000000000000000000000000000000000000',
        contractVersion: 'sweaty-erc721-v3',
        network: 'polygon-mumbai',
        rpcUrl: 'blah'
      })
    } catch (err) {
      resultErr = err
    }
    expect(resultErr).toBe(null)
  })

  it('should NOT throw error when args are valid (tezos)', async () => {
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
