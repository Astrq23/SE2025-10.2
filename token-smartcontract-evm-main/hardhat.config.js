const { config: dotenvConfig } = require("dotenv");
const { resolve } = require("path");
require("@nomicfoundation/hardhat-ignition-ethers");

// const dotenvConfigPath = process.env.DOTENV_CONFIG_PATH || "./.env";
const dotenvConfigPath = "D:\\cnpm\\SE2025-10.2\\token-smartcontract-evm-main\\.env";

dotenvConfig({ path: resolve(__dirname, dotenvConfigPath) });
console.log(">>> DEBUG privateKeys =", process.env.PRIVATE_KEYS);

const mnemonic = process.env.MNEMONIC || "";
const privateKeys = process.env.PRIVATE_KEYS ? process.env.PRIVATE_KEYS.split(',') : []
if (!mnemonic && !privateKeys.length) {
  throw new Error("Please set your MNEMONIC or PRIVATE_KEYS in a .env file");
}


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
    },
    iotextest: {
      accounts: privateKeys,
      chainId: 4690,
      url: "https://babel-api.testnet.iotex.io",
    },
    iotex: {
      accounts: privateKeys,
      chainId: 4689,
      url: "https://babel-api.mainnet.iotex.io",
    },
    sepolia: {
      chainId: 11155111,
      url: "https://1rpc.io/sepolia",
      accounts: privateKeys,
    },
    arbsep: {
      accounts: privateKeys,
      chainId: 421614,
      url: "https://sepolia-rollup.arbitrum.io/rpc"
    },
    arb: {
      accounts: privateKeys,
      chainId: 42161,
      url: "https://arb1.arbitrum.io/rpc",
    }
  },
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000
      }
    }
  }
};
