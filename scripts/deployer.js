async function main() {

    const [deployer] = await ethers.getSigners();

    console.log(
        "Deploying from:",
        deployer.address
    );

    // Deploy NFT.sol
    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy();
    console.log("NFT.sol deployed at", nft.address);

    const Game = await ethers.getContractFactory("Game");
    const game = await Game.deploy();
    console.log("Game.sol deployed at", game.address);


    saveFrontendFilesNFT(nft);
    saveFrontendFilesGame(game);
}

const fs = require("fs");
const contractsDir = __dirname + "/../frontend/src/contracts";

function saveFrontendFilesNFT(nft) {

    const NFTArtifact = artifacts.readArtifactSync("NFT");
    fs.writeFileSync(
        contractsDir + "/NFT.json",
        JSON.stringify(NFTArtifact, null, 2)
    );

    fs.writeFileSync(
        contractsDir + "/nftAddress.json",
        JSON.stringify({NFT: nft.address}, undefined, 2)
    );
}

function saveFrontendFilesGame(game) {

    const gameArtifact = artifacts.readArtifactSync("Game");
    fs.writeFileSync(
        contractsDir + "/Game.json",
        JSON.stringify(gameArtifact, null, 2)
    );

    fs.writeFileSync(
        contractsDir + "/gameAddress.json",
        JSON.stringify({Game: game.address}, undefined, 2)
    );
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
