const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TwoTVDepositModule", (m) => {
    // Địa chỉ token TwoTV mới vừa deploy trên Sepolia
    const TWO_TV_ADDRESS = "0x54852E99475254eCB4f79E30247a35E0008238a1";

    // Deploy hợp đồng TwoTVDeposit và truyền vào address của token TwoTV
    const twoTVDepositContract = m.contract("TwoTVDeposit", [TWO_TV_ADDRESS]);

    return { twoTVDepositContract };
});
