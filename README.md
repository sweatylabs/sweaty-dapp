 # SweatyDapp

 ### Mint Button SDK

SweatyDapp is a Javascript browser library to help interact with SweatyNFT smart contracts. It is designed to be minimal in order to give users maximum flexibility.

### Supported Contracts
- [x] Tezos (via Taquito/Beacon)
- [ ] Ethereum/Polygon

### Example
 ```js
  <script src='https://cloud.sweatynft.com/downloads/sweaty-dapp-v0.3.0.js'></script>
  <script>
    window.addEventListener('DOMContentLoaded', async function () {

      // create instance
      const sweaty = new SweatyDapp.default({
        contractAddress: 'KT1LYXcyjNqfdxTBBXzbB2krReEeQern9Gqx',
        contractVersion: 'sweaty-fa2-v3',
        network: 'tezos-hangzhounet'
      })

      // initialize
      await sweaty.init()

      const mintButton = document.getElementById('mint-button')

      mintButton.onclick = async () => {
        // check if connected
        const isConnected = await sweaty.isConnected()
        if (!isConnected) {
          // if not, prompt to connect wallet
          await sweaty.sync()
        }
        // prompt to mint 1
        await sweaty.mint(1)
      }


      // get info for the deployed contract
      const info = await sweaty.getContractInfo()
      /*
      interface ContractInfo {
        numMinted: number
        maxSupply: number
        isWhitelistEnabled: boolean
        isPaused: boolean
        publicMintLimit: number
        whitelistMintLimit: number
      }
      */

    })
  </script>
 ```

### Demo
See `public/index.html` for a working HTML example.

### Development

`yarn start` – start demo server on port 9000

`yarn build` – build JS lib

### Thank You

A special thanks goes to [Tezos Israel](https://tezos.co.il) for sponsoring the initial SweatyNFT Tezos integration.
