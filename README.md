# NFT Sandbox

## Install

```
git clone https://github.com/julienbrg/nft-sandbox.git
cd nft-sandbox
npm i
```

## Test

```
npx hardhat test
```

## Deploy to Localhost

```
npx hardhat node
```

Then in a new tab:

```
cd nft-sandbox
npx hardhat run scripts/deployer.js --network localhost
```

## Run

```
cd frontend
npm i
npm start
```

## Deploy to Goerli testnet

- Make sure you have some [Goerli ETH](https://goerli-faucet.slock.it/) in your wallet.
- Add your own private key in `hardhat.config.js`
- In `Dapp.js`, uncomment line 13 and comment line 14

```
npx hardhat run scripts/deployer.js --network goerli
```

## Contact

Feel free to [contact me](https://strat.eth.link/contact.html) if you need anything.

## License

[GPL 3.0](https://github.com/julienbrg/ato/blob/main/LICENSE.md)
