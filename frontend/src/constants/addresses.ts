// src/constants/addresses.ts
export const CONTRACT_ADDRESSES = {
  localhost: {
    // ERC-20 Token Contract
    TOKEN: "0x3f4D3D5CC8e5bC2d9AC4CCC38296f1be8B822856",
    ZNT: "0x3f4D3D5CC8e5bC2d9AC4CCC38296f1be8B822856",
    
    // ERC-721 NFT Contract
    NFT: "0xF2f083A5441838BC4894B18922BC2ECc6724b1C1",
    
    // Staking Contract (Feature 1) - Update after deployment
    STAKING: "0x9c5268152491fd9230d002A1A0847207Bd30822D",

    // DEX/Swap Contract (Feature 2) - Update after deployment
    SWAP: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
    
    // NFT Marketplace Contract (Feature 3) - Update after deployment
    MARKETPLACE: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
  },
// ZenithModule#ZenithNFT - 0xF2f083A5441838BC4894B18922BC2ECc6724b1C1
// ZenithModule#ZenithToken - 0x3f4D3D5CC8e5bC2d9AC4CCC38296f1be8B822856
// ZenithModule#TokenStaking - 0x9c5268152491fd9230d002A1A0847207Bd30822D
  iotextest: {
    TOKEN: "0x3f4D3D5CC8e5bC2d9AC4CCC38296f1be8B822856",
    ZNT: "0x3f4D3D5CC8e5bC2d9AC4CCC38296f1be8B822856",
    NFT: "0xF2f083A5441838BC4894B18922BC2ECc6724b1C1",
    STAKING: "0x9c5268152491fd9230d002A1A0847207Bd30822D",
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
