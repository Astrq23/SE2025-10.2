const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting deployment...");

  const [deployer] = await hre.ethers.getSigners();
  console.log("📄 Deploying contracts with account:", deployer.address);

  // ===== EXISTING TOKEN ADDRESS =====
  const TOKEN_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  // ===============================
  // 1️⃣ Deploy TokenStaking
  // ===============================
  console.log("\n1️⃣ Deploying TokenStaking...");
  const TokenStaking = await hre.ethers.getContractFactory("TokenStaking");
  const stakingContract = await TokenStaking.deploy(TOKEN_ADDRESS);

  await stakingContract.waitForDeployment();
  const stakingAddress = stakingContract.target;

  console.log("✅ TokenStaking deployed to:", stakingAddress);

  // ===============================
  // 2️⃣ Deploy TokenSwap
  // ===============================
  console.log("\n2️⃣ Deploying TokenSwap...");
  const TokenSwap = await hre.ethers.getContractFactory("TokenSwap");
  const swapContract = await TokenSwap.deploy();

  await swapContract.waitForDeployment();
  const swapAddress = swapContract.target;

  console.log("✅ TokenSwap deployed to:", swapAddress);

  // ===============================
  // 3️⃣ Deploy NFTMarketplace
  // ===============================
  console.log("\n3️⃣ Deploying NFTMarketplace...");
  const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const marketplaceContract = await NFTMarketplace.deploy();

  await marketplaceContract.waitForDeployment();
  const marketplaceAddress = marketplaceContract.target;

  console.log("✅ NFTMarketplace deployed to:", marketplaceAddress);

  // ===============================
  // SUMMARY
  // ===============================
  console.log("\n" + "=".repeat(60));
  console.log("📋 DEPLOYMENT SUMMARY");
  console.log("=".repeat(60));
  console.log(`
TOKEN:        ${TOKEN_ADDRESS}
NFT:          0x5FbDB2315678afecb367f032d93F642f64180aa3
STAKING:      ${stakingAddress}
SWAP:         ${swapAddress}
MARKETPLACE:  ${marketplaceAddress}
  `);
  console.log("=".repeat(60));

  console.log("\n📝 Update frontend/src/constants/addresses.ts:");
  console.log(`
export const CONTRACT_ADDRESSES = {
  localhost: {
    TOKEN: "${TOKEN_ADDRESS}",
    NFT: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    STAKING: "${stakingAddress}",
    SWAP: "${swapAddress}",
    MARKETPLACE: "${marketplaceAddress}"
  }
};
  `);

  console.log("✨ All contracts deployed successfully!");
}

main().catch((error) => {
  console.error("❌ Deployment error:", error);
  process.exit(1);
});
