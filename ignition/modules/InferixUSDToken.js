const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const hre = require("hardhat")

module.exports = buildModule("InferixUSDToken", (m) => {
    var owner = m.getAccount(0);

    const iusdContract = m.contract("InferixUSD", [owner]);

    return { iusdContract };
});