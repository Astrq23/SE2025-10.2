// src/constants/addresses.ts
export const CONTRACT_ADDRESSES = {
//   ZenithModule#ZenithNFT - 0xfa05C67d65A03615489606248D8592D776557C24
// ZenithModule#ZenithToken - 0x46f62615A7D2FB052A00A8a56eE3F5a36b2581B5
// ZenithModule#TokenStaking - 0x9CadBEB8326B557C8D49789f74369497E02F12Aa
  localhost: {
    // ERC-20 Token Contract
    TOKEN: "0x46f62615A7D2FB052A00A8a56eE3F5a36b2581B5",
    ZNT: "0x46f62615A7D2FB052A00A8a56eE3F5a36b2581B5",
    
    // ERC-721 NFT Contract
    NFT: "0xfa05C67d65A03615489606248D8592D776557C24",
    
    // Staking Contract (Feature 1) - Update after deployment
    STAKING: "0x9CadBEB8326B557C8D49789f74369497E02F12Aa",

    // DEX/Swap Contract (Feature 2) - Update after deployment
    SWAP: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
    
    // NFT Marketplace Contract (Feature 3) - Update after deployment
    MARKETPLACE: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
  },

    iotextest: {
    TOKEN: "0x46f62615A7D2FB052A00A8a56eE3F5a36b2581B5",
    ZNT: "0x46f62615A7D2FB052A00A8a56eE3F5a36b2581B5",
    NFT: "0xfa05C67d65A03615489606248D8592D776557C24",
    STAKING: "0x9CadBEB8326B557C8D49789f74369497E02F12Aa",
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
    18000: 'iotextest',
    4689: 'iotexmain'
  };
  
  return CONTRACT_ADDRESSES[networkMap[chainId] || 'localhost'];
};
