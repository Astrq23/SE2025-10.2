const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ZenithModule", (m) => {
    const owner = m.getAccount(0);
    // Deploy core token and NFT with owner set
    const zenithToken = m.contract("ZenithToken", [owner]);
    const zenithNFT = m.contract("ZenithNFT", [owner]);

    

    // Deploy staking contract and link it to the deployed ZenithToken
    const tokenStaking = m.contract("TokenStaking", [zenithToken]);

    return { zenithToken, zenithNFT,tokenStaking };
});

// const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

// module.exports = buildModule("ZenithModule", (m) => {
//     const owner = m.getAccount(0);
//     const zenithToken = m.contract("ZenithToken", [owner]);
//     const zenithNFT = m.contract("ZenithNFT", [owner]);

//     return { zenithToken, zenithNFT };
// });