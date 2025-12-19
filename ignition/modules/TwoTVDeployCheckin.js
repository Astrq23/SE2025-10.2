const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    console.log("Deploy DailyCheckinReward Contract");

    const TWO_TV_TOKEN = "0x54852E99475254eCB4f79E30247a35E0008238a1";

    console.log("Token 2TV:", TWO_TV_TOKEN);
    console.log("Dang deploy DailyCheckinReward...");

    const DailyCheckinReward = await ethers.getContractFactory("DailyCheckinReward");
    const checkin = await DailyCheckinReward.deploy(TWO_TV_TOKEN);

    await checkin.waitForDeployment();

    const contractAddress = await checkin.getAddress();

    console.log("Deploy thanh cong");
    console.log("Contract Address:", contractAddress);
    console.log("Etherscan:", `https://sepolia.etherscan.io/address/${contractAddress}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Loi deploy:", error);
        process.exit(1);
    });
