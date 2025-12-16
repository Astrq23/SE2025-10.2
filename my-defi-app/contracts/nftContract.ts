// D:\cnpm\my-defi-app/contracts/nftContract.ts

import { Abi } from 'viem';

// CẦN THAY THẾ bằng địa chỉ Smart Contract MintingNFT đã triển khai của bạn
export const contractAddress = '0x07632c41d610ac4de5ffa7c5e9699df4cb76b310' as const; 

// ABI tối thiểu cần thiết, CHỈ CÓ hàm mintNFT (hoặc các hàm khác bạn muốn dùng)
export const contractAbi = [
  {
    inputs: [
      { internalType: 'uint256', name: 'quantity', type: 'uint256' } // Tham số: quantity
    ],
    name: 'mintNFT', // Tên hàm chính xác
    outputs: [],
    stateMutability: 'nonpayable', // Phù hợp với hợp đồng của bạn (không gửi ETH/BNB)
    type: 'function',
  },
  {
    // Cần giữ lại constructor nếu Wagmi yêu cầu, nhưng nếu bạn dùng ABI đầy đủ thì không cần
    inputs: [
      { internalType: 'string', name: 'name', type: 'string' },
      { internalType: 'string', name: 'symbol', type: 'string' },
      { internalType: 'address', name: 'validator', type: 'address' }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
] as const satisfies Abi;