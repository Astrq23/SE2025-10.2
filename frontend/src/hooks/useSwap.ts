import { useState, useCallback } from 'react';
import { useWriteContract, useReadContract } from 'wagmi';
import TokenSwapArtifact from '../abis/TokenSwap.json';
import { CONTRACT_ADDRESSES } from '../constants/addresses';

export interface TokenPair {
  pairId: number;
  tokenA: string;
  tokenB: string;
  reserveA: string;
  reserveB: string;
}

export const useSwap = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const contractAbi = TokenSwapArtifact.abi;
  const contractAddress = CONTRACT_ADDRESSES.localhost.SWAP as `0x${string}`;

  const { writeContractAsync } = useWriteContract();

  const createPair = useCallback(async (tokenA: string, tokenB: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const tx = await writeContractAsync({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'createPair',
        args: [tokenA, tokenB]
      });
      setIsLoading(false);
      return tx;
    } catch (err: any) {
      const errorMsg = err?.message || 'Create pair failed';
      setError(errorMsg);
      setIsLoading(false);
      throw err;
    }
  }, [contractAddress, contractAbi, writeContractAsync]);

  const addLiquidity = useCallback(async (pairId: number, amountA: string, amountB: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const amountAWei = BigInt(parseFloat(amountA) * 10 ** 18);
      const amountBWei = BigInt(parseFloat(amountB) * 10 ** 18);

      const tx = await writeContractAsync({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'addLiquidity',
        args: [pairId, amountAWei, amountBWei]
      });
      setIsLoading(false);
      return tx;
    } catch (err: any) {
      const errorMsg = err?.message || 'Add liquidity failed';
      setError(errorMsg);
      setIsLoading(false);
      throw err;
    }
  }, [contractAddress, contractAbi, writeContractAsync]);

  const removeLiquidity = useCallback(async (pairId: number, amountA: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const amountAWei = BigInt(parseFloat(amountA) * 10 ** 18);

      const tx = await writeContractAsync({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'removeLiquidity',
        args: [pairId, amountAWei]
      });
      setIsLoading(false);
      return tx;
    } catch (err: any) {
      const errorMsg = err?.message || 'Remove liquidity failed';
      setError(errorMsg);
      setIsLoading(false);
      throw err;
    }
  }, [contractAddress, contractAbi, writeContractAsync]);

  const swap = useCallback(async (pairId: number, tokenIn: string, amountIn: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const amountInWei = BigInt(parseFloat(amountIn) * 10 ** 18);

      const tx = await writeContractAsync({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'swap',
        args: [pairId, tokenIn, amountInWei]
      });
      setIsLoading(false);
      return tx;
    } catch (err: any) {
      const errorMsg = err?.message || 'Swap failed';
      setError(errorMsg);
      setIsLoading(false);
      throw err;
    }
  }, [contractAddress, contractAbi, writeContractAsync]);

  return {
    createPair,
    addLiquidity,
    removeLiquidity,
    swap,
    isLoading,
    error
  };
};

export default useSwap;
