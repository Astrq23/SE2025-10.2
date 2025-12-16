import { useState, useCallback } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { ERC20_ABI } from '../utils/erc20Abi';
import { formatTokenAmount, parseTokenAmount } from '../utils/tokenUtils';

export interface UseTokenHookResult {
  // State
  balance: string;
  decimals: number;
  symbol: string;
  name: string;
  isLoading: boolean;
  isApproving: boolean;
  isTransferring: boolean;
  transactionHash: `0x${string}` | undefined;
  error: string | null;

  // Methods
  getBalance: (tokenAddress: `0x${string}`) => void;
  approve: (tokenAddress: `0x${string}`, spenderAddress: `0x${string}`, amount: string) => void;
  transfer: (tokenAddress: `0x${string}`, toAddress: `0x${string}`, amount: string) => void;
  transferFrom: (
    tokenAddress: `0x${string}`,
    fromAddress: `0x${string}`,
    toAddress: `0x${string}`,
    amount: string
  ) => void;
  getAllowance: (tokenAddress: `0x${string}`, spenderAddress: `0x${string}`) => void;
}

/**
 * Custom Hook để interact với ERC-20 tokens
 */
export const useToken = (tokenAddress?: `0x${string}`): UseTokenHookResult => {
  const { address: userAddress } = useAccount();
  const [balance, setBalance] = useState<string>('0');
  const [decimals, setDecimals] = useState<number>(18);
  const [symbol, setSymbol] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [transactionHash, setTransactionHash] = useState<`0x${string}` | undefined>();

  const { writeContractAsync, isPending: isWritePending } = useWriteContract();

  // Read: Get balance
  const { data: balanceData } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    account: userAddress,
    query: { enabled: !!tokenAddress && !!userAddress },
  });

  // Read: Get decimals
  const { data: decimalsData } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'decimals',
    query: { enabled: !!tokenAddress },
  });

  // Read: Get symbol
  const { data: symbolData } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'symbol',
    query: { enabled: !!tokenAddress },
  });

  // Read: Get name
  const { data: nameData } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'name',
    query: { enabled: !!tokenAddress },
  });

  // Update state khi data thay đổi
  React.useEffect(() => {
    if (balanceData !== undefined) {
      const formatted = formatTokenAmount(balanceData.toString(), decimals);
      setBalance(formatted);
    }
  }, [balanceData, decimals]);

  React.useEffect(() => {
    if (decimalsData !== undefined) setDecimals(decimalsData as number);
  }, [decimalsData]);

  React.useEffect(() => {
    if (symbolData !== undefined) setSymbol(symbolData as string);
  }, [symbolData]);

  React.useEffect(() => {
    if (nameData !== undefined) setName(nameData as string);
  }, [nameData]);

  // Method: Approve token spending
  const approve = useCallback(
    async (tokenAddr: `0x${string}`, spender: `0x${string}`, amount: string) => {
      if (!userAddress) {
        setError('Wallet not connected');
        return;
      }

      try {
        setError(null);
        const parsedAmount = parseTokenAmount(amount, decimals);
        const hash = await writeContractAsync({
          address: tokenAddr,
          abi: ERC20_ABI,
          functionName: 'approve',
          args: [spender, parsedAmount],
          account: userAddress,
        });
        setTransactionHash(hash);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Approve failed');
      }
    },
    [userAddress, decimals, writeContractAsync]
  );

  // Method: Transfer token
  const transfer = useCallback(
    async (tokenAddr: `0x${string}`, to: `0x${string}`, amount: string) => {
      if (!userAddress) {
        setError('Wallet not connected');
        return;
      }

      try {
        setError(null);
        const parsedAmount = parseTokenAmount(amount, decimals);
        const hash = await writeContractAsync({
          address: tokenAddr,
          abi: ERC20_ABI,
          functionName: 'transfer',
          args: [to, parsedAmount],
          account: userAddress,
        });
        setTransactionHash(hash);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Transfer failed');
      }
    },
    [userAddress, decimals, writeContractAsync]
  );

  // Method: Transfer from (requires approval first)
  const transferFrom = useCallback(
    async (tokenAddr: `0x${string}`, from: `0x${string}`, to: `0x${string}`, amount: string) => {
      if (!userAddress) {
        setError('Wallet not connected');
        return;
      }

      try {
        setError(null);
        const parsedAmount = parseTokenAmount(amount, decimals);
        const hash = await writeContractAsync({
          address: tokenAddr,
          abi: ERC20_ABI,
          functionName: 'transferFrom',
          args: [from, to, parsedAmount],
          account: userAddress,
        });
        setTransactionHash(hash);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'TransferFrom failed');
      }
    },
    [userAddress, decimals, writeContractAsync]
  );

  // Method: Get balance (manual trigger)
  const getBalance = useCallback((_tokenAddress: `0x${string}`) => {
    // Được handle tự động bởi useReadContract
  }, []);

  // Method: Get allowance
  const getAllowance = useCallback(
    async (tokenAddr: `0x${string}`, spender: `0x${string}`) => {
      if (!userAddress) {
        setError('Wallet not connected');
        return;
      }
      // Có thể được implement thêm nếu cần
    },
    [userAddress]
  );

  return {
    balance,
    decimals,
    symbol,
    name,
    isLoading: false,
    isApproving: isWritePending,
    isTransferring: isWritePending,
    transactionHash,
    error,
    getBalance,
    approve,
    transfer,
    transferFrom,
    getAllowance,
  };
};

// Import React để fix lỗi
import React from 'react';
