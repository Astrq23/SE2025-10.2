import { useState, useCallback } from 'react';
import { useWriteContract, useReadContract } from 'wagmi';
import TokenStakingArtifact from '../abis/TokenStaking.json';
import { CONTRACT_ADDRESSES } from '../constants/addresses';

export const useStaking = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const contractAbi = TokenStakingArtifact.abi;
  const contractAddress = CONTRACT_ADDRESSES.localhost.STAKING as `0x${string}`;

  const { writeContractAsync } = useWriteContract();

  const stake = useCallback(async (amount: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const amountWei = BigInt(parseFloat(amount) * 10 ** 18);
      const tx = await writeContractAsync({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'stake',
        args: [amountWei]
      });
      setIsLoading(false);
      return tx;
    } catch (err: any) {
      const errorMsg = err?.message || 'Stake failed';
      setError(errorMsg);
      setIsLoading(false);
      throw err;
    }
  }, [contractAddress, contractAbi, writeContractAsync]);

  const unstake = useCallback(async (amount: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const amountWei = BigInt(parseFloat(amount) * 10 ** 18);
      const tx = await writeContractAsync({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'unstake',
        args: [amountWei]
      });
      setIsLoading(false);
      return tx;
    } catch (err: any) {
      const errorMsg = err?.message || 'Unstake failed';
      setError(errorMsg);
      setIsLoading(false);
      throw err;
    }
  }, [contractAddress, contractAbi, writeContractAsync]);

  const unstakeAll = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const tx = await writeContractAsync({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'unstakeAll'
      });
      setIsLoading(false);
      return tx;
    } catch (err: any) {
      const errorMsg = err?.message || 'Unstake all failed';
      setError(errorMsg);
      setIsLoading(false);
      throw err;
    }
  }, [contractAddress, contractAbi, writeContractAsync]);

  const claimRewards = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const tx = await writeContractAsync({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'claimRewards'
      });
      setIsLoading(false);
      return tx;
    } catch (err: any) {
      const errorMsg = err?.message || 'Claim rewards failed';
      setError(errorMsg);
      setIsLoading(false);
      throw err;
    }
  }, [contractAddress, contractAbi, writeContractAsync]);

  return {
    stake,
    unstake,
    unstakeAll,
    claimRewards,
    isLoading,
    error
  };
};

export default useStaking;
