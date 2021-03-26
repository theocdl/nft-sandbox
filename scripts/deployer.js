async function main() {

    const [deployer] = await ethers.getSigners();

    console.log(
        "Deploying from:",
        deployer.address
    );

    // Deploy Character.sol
    const Character = await ethers.getContractFactory("Character");
    const character = await Character.deploy();
    console.log("Character.sol deployed at", character.address);

    const Weapon = await ethers.getContractFactory("Weapon");
    const weapon = await Weapon.deploy();
    console.log("Weapon.sol deployed at", weapon.address);

    saveFrontendFilesCharacter(character);
    saveFrontendFilesWeapon(weapon);
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

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
