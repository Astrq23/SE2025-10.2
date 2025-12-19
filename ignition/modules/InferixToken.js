const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const hre = require("hardhat")

module.exports = buildModule("InferixToken", (m) => {
    var owner = m.getAccount(0);

    const ifxTokenContract = m.contract("Inferix", [owner]);

    return { ifxTokenContract };
});