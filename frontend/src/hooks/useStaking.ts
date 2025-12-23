import { useState, useCallback } from 'react';
import { useWriteContract, usePublicClient } from 'wagmi'; // Thêm usePublicClient
import { parseUnits } from 'viem';
import { ERC20_ABI } from '../utils/erc20Abi';
import TokenStakingArtifact from '../abis/TokenStaking.json';
import { CONTRACT_ADDRESSES } from '../constants/addresses';

export const useStaking = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const contractAbi = TokenStakingArtifact.abi;
  const contractAddress = CONTRACT_ADDRESSES.localhost.STAKING as `0x${string}`;
  const tokenAddress = CONTRACT_ADDRESSES.localhost.ZNT as `0x${string}`;

  // Hook để tương tác blockchain
  const { writeContractAsync } = useWriteContract();
  // Hook để lấy client nhằm chờ transaction receipt
  const publicClient = usePublicClient();

  const extractRpcErrorMessage = (err: any) => {
    try {
      if (!err) return 'Unknown error';
      if (typeof err === 'string') return err;
      return (
        err?.reason ||
        err?.message ||
        err?.data?.message ||
        err?.shortMessage || // Viem thường trả về shortMessage dễ đọc hơn
        'Unknown error'
      );
    } catch (e) {
      return 'Unknown error';
    }
  };

  const stake = useCallback(async (amount: string) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!publicClient) throw new Error("Public Client not found");
      
      const amountWei = parseUnits(amount, 18);

      // --- BƯỚC 1: APPROVE ---
      // Lưu ý: Tốt nhất nên check allowance trước, nhưng để đơn giản ta cứ approve
      try {
        const approveHash = await writeContractAsync({
          address: tokenAddress,
          abi: ERC20_ABI as any,
          functionName: 'approve',
          args: [contractAddress, amountWei]
        });

        // Chờ transaction Approve được confirm trên blockchain
        // Đây là bước quan trọng thay thế cho waitForReceipt thủ công
        await publicClient.waitForTransactionReceipt({ 
            hash: approveHash 
        });

      } catch (approveErr) {
        console.error("Approve Error:", approveErr);
        throw new Error("Phê duyệt Token thất bại (Approve Failed)");
      }

      // --- BƯỚC 2: STAKE ---
      const txHash = await writeContractAsync({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'stake',
        args: [amountWei]
      });
      
      // (Tuỳ chọn) Chờ stake confirm xong mới tắt loading
      await publicClient.waitForTransactionReceipt({ 
          hash: txHash 
      });

      setIsLoading(false);
      return txHash;

    } catch (err: any) {
      console.error('Stake Error full:', err);
      const errorMsg = extractRpcErrorMessage(err) || 'Stake failed';
      setError(errorMsg);
      setIsLoading(false);
      throw err;
    }
  }, [contractAddress, contractAbi, writeContractAsync, publicClient, tokenAddress]); // Thêm dependencies

  const unstake = useCallback(async (amount: string) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!publicClient) throw new Error("Client unavailable");
      const amountWei = parseUnits(amount, 18);
      
      const txHash = await writeContractAsync({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'unstake',
        args: [amountWei]
      });

      await publicClient.waitForTransactionReceipt({ hash: txHash });
      
      setIsLoading(false);
      return txHash;
    } catch (err: any) {
      const errorMsg = extractRpcErrorMessage(err) || 'Unstake failed';
      setError(errorMsg);
      setIsLoading(false);
      throw err;
    }
  }, [contractAddress, contractAbi, writeContractAsync, publicClient]);

  const unstakeAll = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!publicClient) throw new Error("Client unavailable");

      const txHash = await writeContractAsync({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'unstakeAll'
      });

      await publicClient.waitForTransactionReceipt({ hash: txHash });

      setIsLoading(false);
      return txHash;
    } catch (err: any) {
      const errorMsg = extractRpcErrorMessage(err) || 'Unstake all failed';
      setError(errorMsg);
      setIsLoading(false);
      throw err;
    }
  }, [contractAddress, contractAbi, writeContractAsync, publicClient]);

  const claimRewards = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!publicClient) throw new Error("Client unavailable");

      const txHash = await writeContractAsync({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'claimRewards'
      });

      await publicClient.waitForTransactionReceipt({ hash: txHash });

      setIsLoading(false);
      return txHash;
    } catch (err: any) {
      const errorMsg = extractRpcErrorMessage(err) || 'Claim rewards failed';
      setError(errorMsg);
      setIsLoading(false);
      throw err;
    }
  }, [contractAddress, contractAbi, writeContractAsync, publicClient]);

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