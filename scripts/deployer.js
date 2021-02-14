async function main() {

  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying from:",
    deployer.address
  );

  // Deploy NFT.sol
  const NFT = await ethers.getContractFactory("NFT");
  const nft = await NFT.deploy();
  await nft.deployed();
  console.log("NFT.sol deployed at", nft.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
