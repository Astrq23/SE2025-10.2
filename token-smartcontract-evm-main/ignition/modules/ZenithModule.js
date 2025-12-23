const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { ethers } = require("hardhat"); // <--- DÒNG QUAN TRỌNG: Import ethers

module.exports = buildModule("ZenithModule", (m) => {
    const owner = m.getAccount(0);

    // 1. Deploy Token & NFT
    const zenithToken = m.contract("ZenithToken", [owner]);
    const zenithNFT = m.contract("ZenithNFT", [owner]);

    // 2. Deploy Staking (Liên kết với Token vừa deploy)
    const tokenStaking = m.contract("TokenStaking", [zenithToken]);

    // 3. Nạp quỹ thưởng cho Staking Contract
    // Sửa lỗi: dùng ethers.parseEther thay vì parseEther trần
    m.call(zenithToken, "transfer", [tokenStaking, ethers.parseEther("100000")], {
        after: [tokenStaking],
    });

    return { zenithToken, zenithNFT, tokenStaking };
});