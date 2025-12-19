const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const hre = require("hardhat")

module.exports = buildModule("TwoTVModule", (m) => {
    const owner = m.getAccount(0);

    // Deploy contract TwoTV với constructor(address initialOwner)
    const twoTV = m.contract("TwoTV", [owner]);

    return { twoTV };
});