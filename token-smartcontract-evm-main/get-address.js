const { ethers } = require("ethers");
require("dotenv").config();

const privateKey = process.env.PRIVATE_KEYS;
if (!privateKey) {
  console.error("PRIVATE_KEYS not found in .env");
  process.exit(1);
}

const wallet = new ethers.Wallet(privateKey);
console.log("Public Address:", wallet.address);
console.log("Private Key:", privateKey);
