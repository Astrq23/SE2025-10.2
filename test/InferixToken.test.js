const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Inferix Token", function () {
    let Inferix, inferix, owner, addr1, addr2;

    before(async function () {
        Inferix = await ethers.getContractFactory("Inferix");
        [owner, addr1, addr2] = await ethers.getSigners();
        inferix = await Inferix.deploy(owner.address);
        await inferix.waitForDeployment();
    });

    it("should deploy with correct initial values", async function () {
        expect(await inferix.name()).to.equal("Inferix");
        expect(await inferix.symbol()).to.equal("tIFX");
        expect(await inferix.owner()).to.equal(owner.address);
    });

    it("should mint initial supply to owner", async function () {
        const ownerBalance = await inferix.balanceOf(owner.address);
        const totalSupply = await inferix.totalSupply();
        expect(ownerBalance).to.equal(ethers.parseEther("100000000"));
        expect(totalSupply).to.equal(ownerBalance);
    });

    it("should transfer ownership", async function () {
        await expect(inferix.transferOwnership(addr1.address))
            .to.emit(inferix, "OwnershipTransferred")
            .withArgs(owner.address, addr1.address);

        expect(await inferix.owner()).to.equal(addr1.address);
    });

    it("should only allow owner to transfer ownership", async function () {
        await expect(
            inferix.transferOwnership(addr2.address)
        ).to.be.revertedWithCustomError(inferix, "OwnableUnauthorizedAccount");
    });

    it("should allow token transfers", async function () {
        await expect(inferix.transfer(addr1.address, ethers.parseEther("100")))
            .to.emit(inferix, "Transfer")
            .withArgs(owner.address, addr1.address, ethers.parseEther("100"));

        const addr1Balance = await inferix.balanceOf(addr1.address);
        expect(addr1Balance).to.equal(ethers.parseEther("100"));
    });

    it("should not transfer more than balance", async function () {
        await expect(
            inferix.transfer(addr1.address, ethers.parseEther("200000000"))
        ).to.be.revertedWithCustomError(inferix, "ERC20InsufficientBalance");
    });
});
