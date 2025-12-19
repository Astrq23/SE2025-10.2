// D:\cnpm\SE2025-10.2\hardhat.config.js - ĐÃ THÊM CẤU HÌNH PATHS

const { config: dotenvConfig } = require("dotenv");
const { resolve } = require("path");

require("@nomicfoundation/hardhat-ignition-ethers");
require("@nomicfoundation/hardhat-chai-matchers");

const dotenvConfigPath = process.env.DOTENV_CONFIG_PATH || "../.env";
dotenvConfig({ path: resolve(__dirname, dotenvConfigPath) });

const mnemonic = process.env.MNEMONIC || "";
const privateKeys = process.env.PRIVATE_KEYS ? process.env.PRIVATE_KEYS.split(',') : []
if (!mnemonic && !privateKeys.length) {
  throw new Error("Please set your MNEMONIC or PRIVATE_KEYS in a .env file");
}


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {  paths: {
    sources: "./my-defi-app/contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },  networks: {
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
  },
  // **********************************************
  // ** CẤU HÌNH PATHS ĐÃ ĐƯỢC THÊM VÀO ĐÂY **
  // **********************************************
  paths: {
    // Hardhat tìm file Solidity trong thư mục con 'my-defi-app/contracts'
    sources: './my-defi-app/contracts', 
    
    // Hardhat tạo file output (artifacts) trong thư mục con 'my-defi-app/artifacts'
    artifacts: './my-defi-app/artifacts' 
  }
};