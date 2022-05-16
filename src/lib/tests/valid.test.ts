import SweatyDapp from '../index';

describe('SweatyDapp – config is valid', () => {

  it('should NOT throw error when config is valid (ethereum-rinkeby)', async () => {
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

  it('should NOT throw error when config is valid (ethereum-mainnet)', async () => {
    let resultErr = null
    try {
      const app = new SweatyDapp({
        contractAddress: '0x0000000000000000000000000000000000000000',
        contractVersion: 'sweaty-erc721-v3',
        network: 'ethereum-mainnet',
        rpcUrl: 'blah'
      })
    } catch (err) {
      resultErr = err
    }
    expect(resultErr).toBe(null)
  })

  it('should NOT throw error when config is valid (polygon)', async () => {
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

  it('should NOT throw error when config is valid (polygon-mumbai)', async () => {
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

  it('should NOT throw error when config is valid (polygon-mainnet)', async () => {
    let resultErr = null
    try {
      const app = new SweatyDapp({
        contractAddress: '0x0000000000000000000000000000000000000000',
        contractVersion: 'sweaty-erc721-v3',
        network: 'polygon-mainnet',
        rpcUrl: 'blah'
      })
    } catch (err) {
      resultErr = err
    }
    expect(resultErr).toBe(null)
  })

  it('should NOT throw error when config is valid (tezos-mainnet)', async () => {
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

  it('should NOT throw error when config is valid (tezos-hangzhounet)', async () => {
    let resultErr = null
    try {
      const app = new SweatyDapp({
        contractAddress: 'KT19etCHSt75MTF4NvUHxRNBPvp74ggv9g3P',
        contractVersion: 'sweaty-fa2-v3',
        network: 'tezos-hangzhounet'
      })
    } catch (err) {
      resultErr = err
    }
    expect(resultErr).toBe(null)
  })

})
