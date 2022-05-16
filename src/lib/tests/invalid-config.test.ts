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

  it('should throw error when rcpUrl is missing (ethereum rinkeby)', async () => {
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

  it('should throw error when rcpUrl is missing (ethereum mainnet)', async () => {
    let resultErr = null
    try {
      const app = new SweatyDapp({
        contractAddress: '0x0000000000000000000000000000000000000000',
        contractVersion: 'sweaty-erc721-v3',
        network: 'ethereum-mainnet'
      })
    } catch (err) {
      resultErr = err
    }
    expect(resultErr).toBeTruthy()
  })


  it('should throw error when rcpUrl is missing (polygon-mumbai)', async () => {
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

  it('should throw error when rcpUrl is missing (polygon-mainnet)', async () => {
    let resultErr = null
    try {
      const app = new SweatyDapp({
        contractAddress: '0x0000000000000000000000000000000000000000',
        contractVersion: 'sweaty-erc721-v3',
        network: 'polygon-mainnet'
      })
    } catch (err) {
      resultErr = err
    }
    expect(resultErr).toBeTruthy()
  })

})
