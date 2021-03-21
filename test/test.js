const {expect} = require("chai");

describe("NFT Sandbox", function () {

    let NFT;
    let nft;
    let Game;
    let game;

    let owner;
    let player;
    let attacker;

    beforeEach(async function () {

        [owner, attacker, player] = await ethers.getSigners(0);

        NFT = await ethers.getContractFactory("NFT");
        nft = await NFT.connect(owner).deploy();
        await nft.deployed();

        Game = await ethers.getContractFactory("Game");
        game = await Game.connect(owner).deploy();
        await game.deployed();

    });

    describe("NFT Interactions", function () {

        it("Owner should receive the NFT", async function () {
            let create = await nft.connect(owner).create();
            let balance = await nft.balanceOf(owner.address, 0);
            let balanceHex = balance.toString();
            expect(balanceHex).to.equal('1');
        });

        it("Attacker should not be able to mint", async function () {
            await expect(nft.connect(attacker).create()).to.be.revertedWith("Ownable: caller is not the owner");
        });
    });

    describe("Game Interactions", function () {

        it("Attacker can't call the function 'whitelistWinner'", async function () {
            await expect(game.connect(attacker).whitelistWinner(player.address)).to.be.revertedWith("Ownable: caller is not the owner");
        });

        it("You can't claim reward if you didn't win the game", async function () {
            await expect(game.connect(player).claimReward()).to.be.revertedWith("You didn't won the game");
        });

        it("The player won the game", async function () {
            await game.connect(owner).whitelistWinner(player.address);
            let playerWon = await game.connect(player).getWin();
            expect(playerWon).to.equal(true);
        });

        it("The player receive his reward", async function () {
            await game.connect(owner).whitelistWinner(player.address);
            await game.connect(player).claimReward();
            let balance = await game.balanceOf(player.address, 0);
            let balanceHex = balance.toString();
            expect(balanceHex).to.equal('1');
        });

        it("You can't reclaim reward", async function () {
            await game.connect(owner).whitelistWinner(player.address);
            await game.connect(player).claimReward();
            await expect(game.connect(player).claimReward()).to.be.revertedWith("You have already collected your reward");


        });
    });
});
