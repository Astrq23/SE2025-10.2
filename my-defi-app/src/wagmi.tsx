// D:\cnpm\my-defi-app/src/wagmi.tsx (FIX TÊN GÓI WALLETCONNECT)

import { createConfig, http } from 'wagmi';
import { mainnet, bsc, arbitrum } from 'wagmi/chains';
// ⚠️ THAY THẾ: Import cả walletConnect và injected từ gói connectors (đã cài đặt ở Bước 1)
import { walletConnect, injected } from 'wagmi/connectors'; 
import { QueryClient } from '@tanstack/react-query'; 

// Lấy ID Dự án WalletConnect từ biến môi trường (Hoặc đặt tạm)
// Bạn nên đăng ký một Project ID miễn phí trên cloud.walletconnect.com
const projectId = 'YOUR_WALLETCONNECT_PROJECT_ID'; // Thay thế bằng ID thực tế (ví dụ: '123abc456def789')

const supportedChains = [bsc, mainnet, arbitrum] as const;

export const config = createConfig({
  chains: supportedChains,
  
  // SỬ DỤNG CONNECTOR WALLETCONNECT VÀ INJECTED
  connectors: [
    // 1. WalletConnect (Dùng cho ví di động)
    walletConnect({ projectId, showQrModal: true }), 
    // 2. Injected (Dùng cho ví trên máy tính)
    injected(), 
  ],
  
  transports: {
    [bsc.id]: http(),
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
  },
})

export const queryClient = new QueryClient();