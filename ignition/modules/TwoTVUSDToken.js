const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const hre = require("hardhat")

module.exports = buildModule("TwoTVModule", (m) => {
    var owner = m.getAccount(0);

    const iusdContract = m.contract("TwoUSD", [owner]);

    return { iusdContract };
});