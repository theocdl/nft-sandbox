async function main() {

    const [deployer] = await ethers.getSigners();

    console.log(
        "Deploying from:",
        deployer.address
    );

    const DAI = await  ethers.getContractFactory("DAI");
    const dai = await DAI.deploy();
    console.log("DAI.sol deployed at", dai.address);

    const Character = await ethers.getContractFactory("Character");
    const character = await Character.deploy(dai.address,deployer.address );
    console.log("Character.sol deployed at", character.address);

    const Weapon = await ethers.getContractFactory("Weapon");
    const weapon = await Weapon.deploy();
    console.log("Weapon.sol deployed at", weapon.address);


    saveFrontendFilesCharacter(character);
    saveFrontendFilesWeapon(weapon);
    saveFrontendFilesDAI(dai);
}

const fs = require("fs");
const contractsDir = __dirname + "/../frontend/src/contracts";

function saveFrontendFilesCharacter(character) {

    const CharacterArtifact = artifacts.readArtifactSync("Character");
    fs.writeFileSync(
        contractsDir + "/Character.json",
        JSON.stringify(CharacterArtifact, null, 2)
    );

    fs.writeFileSync(
        contractsDir + "/characterAddress.json",
        JSON.stringify({Character: character.address}, undefined, 2)
    );
}

function saveFrontendFilesWeapon(weapon) {

    const weaponArtifact = artifacts.readArtifactSync("Weapon");
    fs.writeFileSync(
        contractsDir + "/Weapon.json",
        JSON.stringify(weaponArtifact, null, 2)
    );

    fs.writeFileSync(
        contractsDir + "/weaponAddress.json",
        JSON.stringify({Weapon: weapon.address}, undefined, 2)
    );
}

function saveFrontendFilesDAI(dai) {

    const DAIArtifact = artifacts.readArtifactSync("DAI");
    fs.writeFileSync(
        contractsDir + "/DAI.json",
        JSON.stringify(DAIArtifact, null, 2)
    );

    fs.writeFileSync(
        contractsDir + "/daiAddress.json",
        JSON.stringify({DAI: dai.address}, undefined, 2)
    );
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
