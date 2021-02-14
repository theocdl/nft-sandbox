const {expect} = require("chai");

describe("NFT Sandbox", function () {

    let NFT;
    let nft;
    let owner;
    let attacker;

    beforeEach(async function () {

        [owner, attacker] = await ethers.getSigners(0);

        NFT = await ethers.getContractFactory("NFT");
        nft = await NFT.deploy();
        await nft.deployed();

    });

    describe("Interactions", function () {

        it("Owner should receive the NFT", async function () {
            await nft.connect(owner).create(1);
            let balance = await nft.balanceOf(owner.address, 0);
            let balanceHex = balance.toString();
            expect(balanceHex).to.equal('1000000000000000000');
        });

        it("Attacker should not be able to mint", async function () {
            await expect(nft.connect(attacker).create(1)).to.be.revertedWith("Ownable: caller is not the owner");
        });

    });
});
