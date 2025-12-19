const { expect } = require("chai");
const { ethers } = require("hardhat");
require("@nomicfoundation/hardhat-chai-matchers");
describe("Zenith Ecosystem", function () {
    let ZenithToken, zenithToken, ZenithNFT, zenithNFT;
    let owner, addr1, addr2;

    beforeEach(async function () {
        // Lấy các tài khoản giả lập từ Hardhat
        [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy Zenith Token (ERC-20)
        ZenithToken = await ethers.getContractFactory("ZenithToken");
        zenithToken = await ZenithToken.deploy(owner.address);

        // Deploy Zenith NFT (ERC-721)
        ZenithNFT = await ethers.getContractFactory("ZenithNFT");
        zenithNFT = await ZenithNFT.deploy(owner.address);
    });

    describe("Zenith Token (ERC-20)", function () {
        it("Nên có tên và ký hiệu chính xác", async function () {
            expect(await zenithToken.name()).to.equal("Zenith");
            expect(await zenithToken.symbol()).to.equal("ZEN");
        });

        it("Nên mint 1 tỷ token cho owner khi khởi tạo", async function () {
            const ownerBalance = await zenithToken.balanceOf(owner.address);
            const totalSupply = await zenithToken.totalSupply();
            // 1 tỷ * 10^18
            const expectedSupply = ethers.parseEther("1000000000"); 
            expect(ownerBalance).to.equal(expectedSupply);
            expect(totalSupply).to.equal(expectedSupply);
        });

        it("Nên cho phép chuyển token giữa các ví", async function () {
            const amount = ethers.parseEther("1000");
            await zenithToken.transfer(addr1.address, amount);
            expect(await zenithToken.balanceOf(addr1.address)).to.equal(amount);
        });
    });

    describe("Zenith NFT (ERC-721)", function () {
        it("Nên mint được NFT thành công", async function () {
            const tokenURI = "https://zenith.io/nft/1";
            // Owner mint cho addr1
            await expect(zenithNFT.safeMint(addr1.address, tokenURI))
                .to.emit(zenithNFT, "Transfer");
            
            expect(await zenithNFT.ownerOf(0)).to.equal(addr1.address);
            expect(await zenithNFT.tokenURI(0)).to.equal(tokenURI);
        });

        it("Chỉ Owner mới có quyền mint NFT", async function () {
            const tokenURI = "https://zenith.io/nft/2";
            // addr1 cố gắng tự mint sẽ bị lỗi
            await expect(
                zenithNFT.connect(addr1).safeMint(addr1.address, tokenURI)
            ).to.be.revertedWithCustomError(zenithNFT, "OwnableUnauthorizedAccount");
        });
    });
});