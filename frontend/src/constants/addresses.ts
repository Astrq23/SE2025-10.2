// src/constants/addresses.ts
export const CONTRACT_ADDRESSES = {
// ZenithModule#ZenithNFT - 0x1C427d7035C76B9C370579330e1F90BBDD271112
// ZenithModule#ZenithToken - 0xa3bf0385BDBa1CEdB4E72F1F26Db286D562184C5
// ZenithModule#TokenStaking - 0xdfe10f3FF57a170e6D6F96c25104F1c219e09794
  localhost: {
    // ERC-20 Token Contract
    TOKEN: "0xa3bf0385BDBa1CEdB4E72F1F26Db286D562184C5",
    ZNT: "0xa3bf0385BDBa1CEdB4E72F1F26Db286D562184C5",
    
    // ERC-721 NFT Contract
    NFT: "0x1C427d7035C76B9C370579330e1F90BBDD271112",
    
    // Staking Contract (Feature 1) - Update after deployment
    STAKING: "0xdfe10f3FF57a170e6D6F96c25104F1c219e09794",

    // DEX/Swap Contract (Feature 2) - Update after deployment
    SWAP: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
    
    // NFT Marketplace Contract (Feature 3) - Update after deployment
    MARKETPLACE: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
  },

    iotextest: {
    TOKEN: "0xa3bf0385BDBa1CEdB4E72F1F26Db286D562184C5",
    ZNT: "0xa3bf0385BDBa1CEdB4E72F1F26Db286D562184C5",
    NFT: "0x1C427d7035C76B9C370579330e1F90BBDD271112",
    STAKING: "0xdfe10f3FF57a170e6D6F96c25104F1c219e09794",
    SWAP: "0x3A5417cB1055A03d7E7eEfB909c73f4c893a073f",
    MARKETPLACE: "0x5a1C7dE645Cd21344b41101263EaC26dc9A848cc"
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
    4690: 'iotextest',
    4689: 'iotexmain'
  };
  
  return CONTRACT_ADDRESSES[networkMap[chainId] || 'localhost'];
};
