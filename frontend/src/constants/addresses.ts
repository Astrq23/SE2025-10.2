// src/constants/addresses.ts
export const CONTRACT_ADDRESSES = {
  localhost: {
    // ERC-20 Token Contract
    TOKEN: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    ZNT: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    
    // ERC-721 NFT Contract
    NFT: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    
    // Staking Contract (Feature 1) - Update after deployment
    STAKING: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
    
    // DEX/Swap Contract (Feature 2) - Update after deployment
    SWAP: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
    
    // NFT Marketplace Contract (Feature 3) - Update after deployment
    MARKETPLACE: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
  },
  iotextest: {
    TOKEN: "",
    ZNT: "",
    NFT: "",
    STAKING: "",
    SWAP: "",
    MARKETPLACE: ""
  },
  iotexmain: {
    TOKEN: "",
    ZNT: "",
    NFT: "",
    STAKING: "",
    SWAP: "",
    MARKETPLACE: ""
  }
} as const;

// Helper to get network config
export const getNetworkConfig = (chainId?: number) => {
  if (!chainId) return CONTRACT_ADDRESSES.localhost;
  
  const networkMap: { [key: number]: keyof typeof CONTRACT_ADDRESSES } = {
    31337: 'localhost',
    18000: 'iotextest',
    4689: 'iotexmain'
  };
  
  return CONTRACT_ADDRESSES[networkMap[chainId] || 'localhost'];
};
