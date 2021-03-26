require("@nomiclabs/hardhat-waffle");

// Go to https://infura.io/ and create a new project
// Replace this with your Infura project ID
const INFURA_PROJECT_ID = "e719881621e34ee3aa848d3bb3b28b50";

// Add your own private key here
const GOERLI_PRIVATE_KEY = "d49743deccbccc5dc7baa8e69e5be03298da8688a15dd202e20f15d5e0e9a9fb";

module.exports = {
  solidity: "0.7.3",
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${GOERLI_PRIVATE_KEY}`]
    }
  }
};
