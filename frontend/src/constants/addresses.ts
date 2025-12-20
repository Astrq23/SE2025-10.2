// src/constants/addresses.ts
export const CONTRACT_ADDRESSES = {
  localhost: {
    ZNT: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", // Địa chỉ Token localhost của bạn
    NFT: "0x5FbDB2315678afecb367f032d93F642f64180aa3"  // Địa chỉ NFT localhost của bạn
  },
  iotextest: {
    ZNT: "", // Điền sau khi deploy testnet
    NFT: ""
  }
} as const;
