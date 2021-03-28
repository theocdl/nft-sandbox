require("@nomiclabs/hardhat-waffle");

// Go to https://infura.io/ and create a new project
// Replace this with your Infura project ID
const INFURA_PROJECT_ID = "e719881621e34ee3aa848d3bb3b28b50";

// Add your own private key here
const GOERLI_PRIVATE_KEY = "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

module.exports = {
  solidity: "0.7.3",
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${GOERLI_PRIVATE_KEY}`]
    }
  }
};
