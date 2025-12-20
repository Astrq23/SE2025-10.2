// frontend/src/wagmi.tsx
import { createConfig, http } from 'wagmi';
// QUAN TRỌNG: Phải import localhost và iotexTestnet thay vì mainnet
import { localhost, iotexTestnet } from 'wagmi/chains'; 
import { injected } from 'wagmi/connectors';
import { QueryClient } from '@tanstack/react-query'; 

export const config = createConfig({
  chains: [localhost, iotexTestnet], 
  connectors: [
    injected(), // Chỉ cần injected là đủ để test với MetaMask trên máy tính
  ],
  transports: {
    [localhost.id]: http(), // Kết nối cổng 8545
    [iotexTestnet.id]: http(),
  },
});

export const queryClient = new QueryClient();