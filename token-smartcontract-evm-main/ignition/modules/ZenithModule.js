const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ZenithModule", (m) => {
    const owner = m.getAccount(0);
    const zenithToken = m.contract("ZenithToken", [owner]);
    const zenithNFT = m.contract("ZenithNFT", [owner]);

    return { zenithToken, zenithNFT };
});