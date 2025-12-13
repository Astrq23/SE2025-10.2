// D:\cnpm\my-defi-app/global.d.ts (ĐÃ FIX KHAI BÁO BUFFER)

import 'express-session';
import { SiweMessage } from 'siwe';

// ⚠️ FIX BUFFER: Khai báo kiểu cho đối tượng Buffer toàn cục
declare global {
    interface Window {
        Buffer: typeof Buffer;
    }
}
// Mở rộng kiểu dữ liệu của đối tượng Session (Giữ nguyên)
declare module 'express-session' {
  interface SessionData {
    nonce?: string;
    siwe?: SiweMessage;
    userId?: string;
  }
}

// Khai báo kiểu cho module CORS (Giữ nguyên)
declare module 'cors' {
  interface CorsOptions {
      origin?: boolean | string | RegExp | (string | RegExp)[] | ((origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => void);
      methods?: string | string[];
      allowedHeaders?: string | string[];
      exposedHeaders?: string | string[];
      credentials?: boolean;
      maxAge?: number;
      preflightContinue?: boolean;
      optionsSuccessStatus?: number;
  }
}