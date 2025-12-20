// Token utilities - Các hàm hỗ trợ ERC-20
import { parseUnits, formatUnits } from 'viem';

/**
 * Interface cho Token info
 */
export interface TokenInfo {
  address: `0x${string}`;
  name: string;
  symbol: string;
  decimals: number;
  balance?: string;
  allowance?: string;
}

/**
 * Interface cho Token transfer
 */
export interface TokenTransfer {
  from: `0x${string}`;
  to: `0x${string}`;
  amount: string;
  tokenAddress: `0x${string}`;
}

/**
 * Common ERC-20 token addresses trên các blockchain
 * SỬA QUAN TRỌNG: Thêm type Record<string, Record<string, string>> để tránh lỗi
 */
export const COMMON_TOKENS: Record<string, Record<string, string>> = {
  // BNB Chain
  BNB_CHAIN: {
    WBNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    BUSD: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    USDT: '0x55d398326f99059fF775485246999027B3197955',
    ETH:  '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
    CAKE: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  },
  // Ethereum Mainnet
  ETHEREUM: {
    USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    DAI:  '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  },
  // Arbitrum
  ARBITRUM: {
    USDC: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5F86',
    USDT: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    ARB:  '0x912CE59144191c1204E64559FE8253a0e108FF4e',
  },
};

/**
 * Format token amount từ Wei sang readable format
 * @param amount - Amount in wei
 * @param decimals - Token decimals (mặc định 18)
 * @returns Formatted amount
 */
export const formatTokenAmount = (
  amount: string | bigint,
  decimals: number = 18
): string => {
  try {
    return formatUnits(BigInt(amount), decimals);
  } catch {
    return '0';
  }
};

/**
 * Parse token amount từ readable format sang Wei
 * @param amount - Readable amount (e.g., "1.5")
 * @param decimals - Token decimals (mặc định 18)
 * @returns Amount in wei
 */
export const parseTokenAmount = (
  amount: string,
  decimals: number = 18
): bigint => {
  try {
    return parseUnits(amount as `${number}`, decimals);
  } catch {
    return BigInt(0);
  }
};

/**
 * Truncate token address
 * @param address - Full address
 * @returns Truncated address (0x1234...5678)
 */
export const truncateAddress = (address: string): string => {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/**
 * Check if address is valid (Type Guard xịn)
 */
export const isValidAddress = (address: string): address is `0x${string}` => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

/**
 * Get token logo URL từ Chainlist
 */
export const getTokenLogoUrl = (tokenAddress: string): string => {
  const address = tokenAddress.toLowerCase();
  return `https://tokens.1inch.io/${address}.png`;
};