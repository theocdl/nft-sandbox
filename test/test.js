const {expect} = require("chai");

describe("NFT Sandbox", function () {

    let Character;
    let character;
    let Weapon;
    let weapon;
    let DAI;
    let dai;

    let owner;
    let player;
    let attacker;

    beforeEach(async function () {

        [owner, attacker, player] = await ethers.getSigners(0);

        DAI = await ethers.getContractFactory("DAI");
        dai = await DAI.connect(player).deploy();
        await dai.deployed();

        Character = await ethers.getContractFactory("Character");
        character = await Character.connect(owner).deploy(dai.address, owner.address);
        await character.deployed();

        Weapon = await ethers.getContractFactory("Weapon");
        weapon = await Weapon.connect(owner).deploy();
        await weapon.deployed();

    });
    describe("DAI", function () {

        it("Player should receive 1000000 DAI", async function () {
            let balancePlayer = await dai.balanceOf(player.address);
            balancePlayer = balancePlayer.toString();
            expect(balancePlayer).to.equal('1000000000000000000000000');
        });
    });

    describe("Characters", function () {

        it("Player should buy the NFT", async function () {
            await dai.connect(player).approve(character.address, 1);
            await character.connect(player).buyEmperor(1);
            let balance = await character.balanceOf(player.address, 0);
            let balanceHex = balance.toString();
            expect(balanceHex).to.equal('1');
        });

    });

    describe("Weapons", function () {

        it("Attacker can't call the function 'whitelistWinner'", async function () {
            await expect(weapon.connect(attacker).whitelistWinner(player.address)).to.be.revertedWith("Ownable: caller is not the owner");
        });

        it("Player can't claim his reward if he doesn't win the game", async function () {
            await expect(weapon.connect(player).claimReward()).to.be.revertedWith("You didn't win the game");
        });

        it("The player should win the game", async function () {
            await weapon.connect(owner).whitelistWinner(player.address);
            let playerWon = await weapon.connect(player).getWin();
            expect(playerWon).to.equal(true);
        });

        it("The player should receive his reward", async function () {
            await weapon.connect(owner).whitelistWinner(player.address);
            await weapon.connect(player).claimReward();
            let balance = await weapon.balanceOf(player.address, 0);
            let balanceHex = balance.toString();
            expect(balanceHex).to.equal('1');
        });

        it("Shouldn't claim a reward twice", async function () {
            await weapon.connect(owner).whitelistWinner(player.address);
            await weapon.connect(player).claimReward();
            await expect(weapon.connect(player).claimReward()).to.be.revertedWith("You have already collected your reward");
        });
    });
});
