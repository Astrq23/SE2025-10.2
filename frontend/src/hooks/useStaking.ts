import { useState, useCallback } from 'react';
import { useWriteContract, useReadContract } from 'wagmi';
import { erc20Abi, parseUnits } from 'viem';
import TokenStakingArtifact from '../abis/TokenStaking.json';
import { CONTRACT_ADDRESSES } from '../constants/addresses';

export const useStaking = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const contractAbi = TokenStakingArtifact.abi;
  const contractAddress = CONTRACT_ADDRESSES.localhost.STAKING as `0x${string}`;
  const tokenAddress = CONTRACT_ADDRESSES.localhost.ZNT as `0x${string}`;

  const { writeContractAsync } = useWriteContract();

  // Helper: simple poll for tx receipt via provider (used to wait for approve confirmation)
  const waitForReceipt = async (hash: `0x${string}`, timeoutMs = 120000) => {
    if (!(window as any).ethereum) return;
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      try {
        const receipt = await (window as any).ethereum.request({
          method: 'eth_getTransactionReceipt',
          params: [hash]
        });
        if (receipt) return receipt;
      } catch (e) {
        // ignore and retry
      }
      // wait 1s
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, 1000));
    }
    throw new Error('Timeout waiting for transaction receipt');
  };

  const stake = useCallback(async (amount: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Convert to wei (bigint) safely
      const amountWei = parseUnits(amount, 18);

      // Ensure staking contract is approved to transfer user's tokens
      try {
        const approveHash = await writeContractAsync({
          address: tokenAddress,
          abi: erc20Abi,
          functionName: 'approve',
          args: [contractAddress, amountWei]
        });

        // Wait for approve to be mined to avoid race condition
        try {
          await waitForReceipt(approveHash as `0x${string}`);
        } catch (waitErr) {
          // proceed anyway; stake may still fail if approve not mined
          console.warn('approve receipt wait failed', waitErr);
        }
      } catch (approveErr) {
        // If approve fails, surface the error
        setIsLoading(false);
        setError((approveErr as any)?.message || 'Approve failed');
        throw approveErr;
      }

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
      const amountWei = parseUnits(amount, 18);
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
