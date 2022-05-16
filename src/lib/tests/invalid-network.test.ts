import SweatyDapp from '../index';

describe('SweatyDapp – network is invalid', () => {

  it('should throw error when network is invalid (erc721)', async () => {
    let resultErr = null
    try {
      const app = new SweatyDapp({
        contractAddress: '0x0000000000000000000000000000000000000000',
        contractVersion: 'sweaty-erc721-v3',
        network: 'invalid'
      })
    } catch (err) {
      resultErr = err
    }
    expect(resultErr).toBeTruthy()
    expect(resultErr.message as string).toContain('invalid value for property \"network\"')
  })

  it('should throw error when network is invalid (fa2)', async () => {
    let resultErr = null
    try {
      const app = new SweatyDapp({
        contractAddress: '0x0000000000000000000000000000000000000000',
        contractVersion: 'sweaty-fa2-v3',
        network: 'invalid'
      })
    } catch (err) {
      resultErr = err
    }
    expect(resultErr).toBeTruthy()
    expect(resultErr.message as string).toContain('invalid value for property \"network\"')
  })

})
