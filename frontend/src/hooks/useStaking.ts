import { useState, useCallback } from 'react';
import { useWriteContract, usePublicClient,useAccount } from 'wagmi';
import { parseUnits } from 'viem';
import { ERC20_ABI } from '../utils/erc20Abi';
import TokenStakingArtifact from '../abis/TokenStaking.json';
import { CONTRACT_ADDRESSES } from '../constants/addresses';

export const useStaking = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();
  const contractAbi = TokenStakingArtifact.abi;
  const contractAddress = CONTRACT_ADDRESSES.localhost.STAKING as `0x${string}`;
  const tokenAddress = CONTRACT_ADDRESSES.localhost.ZNT as `0x${string}`;

  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();

  const extractRpcErrorMessage = (err: any) => {
    try {
      if (!err) return 'Unknown error';
      if (typeof err === 'string') return err;
      return (
        err?.reason ||
        err?.message ||
        err?.data?.message ||
        err?.shortMessage ||
        'Unknown error'
      );
    } catch (e) {
      return 'Unknown error';
    }
  };
  
  // const stake = useCallback(async (amount: string) => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     if (!publicClient) throw new Error("Public Client not found");
      
  //     const amountWei = parseUnits(amount, 18);

  //     // --- BƯỚC 1: APPROVE ---
  //     // Lưu ý: Tốt nhất nên check allowance trước, nhưng để đơn giản ta cứ approve
  //     try {
  //       const approveHash = await writeContractAsync({
  //         address: tokenAddress,
  //         abi: ERC20_ABI as any,
  //         functionName: 'approve',
  //         args: [contractAddress, amountWei]
  //       });

  //       // Chờ transaction Approve được confirm trên blockchain
  //       // Đây là bước quan trọng thay thế cho waitForReceipt thủ công  
  //       await publicClient.waitForTransactionReceipt({ 
  //           hash: approveHash 
  //       });

  //     } catch (approveErr) {
  //       console.error("Approve Error:", approveErr);
  //       throw new Error("Phê duyệt Token thất bại (Approve Failed)");
  //     }

      
  //     const txHash = await writeContractAsync({
  //       address: contractAddress,
  //       abi: contractAbi,
  //       functionName: 'stake',
  //       args: [amountWei]
  //     });
      
  //     // (Tuỳ chọn) Chờ stake confirm xong mới tắt loading
  //     await publicClient.waitForTransactionReceipt({ 
  //         hash: txHash 
  //     });

  //     setIsLoading(false);
  //     return txHash;

  //   } catch (err: any) {
  //     console.error('Stake Error full:', err);
  //     const errorMsg = extractRpcErrorMessage(err) || 'Stake failed';
  //     setError(errorMsg);
  //     setIsLoading(false);
  //     throw err;
  //   }
  // }, [contractAddress, contractAbi, writeContractAsync, publicClient, tokenAddress]); // Thêm dependencies
  const stake = useCallback(async (amount: string) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!publicClient) throw new Error("Public Client not found");
      if (!address) throw new Error("Wallet not connected"); // Kiểm tra address

      const amountWei = parseUnits(amount, 18);

      console.log("--- BẮT ĐẦU QUY TRÌNH STAKE ---");
      console.log("1. Ví của bạn:", address);
      console.log("2. Staking Contract (Spender):", contractAddress);
      console.log("3. Token Address:", tokenAddress);

      // --- BƯỚC 1: APPROVE ---
      try {
        console.log("-> Đang gọi Approve...");
        const approveHash = await writeContractAsync({
          address: tokenAddress,
          abi: ERC20_ABI as any,
          functionName: 'approve',
          args: [contractAddress, amountWei]
        });

        console.log("-> Approve Hash:", approveHash);
        // Chờ transaction được xác nhận trên blockchain
        await publicClient.waitForTransactionReceipt({ 
            hash: approveHash 
        });
        console.log("-> Approve thành công!");

      } catch (approveErr) {
        console.error("Approve Thất bại:", approveErr);
        throw new Error("Lỗi ở bước Approve Token");
      }

      // --- BƯỚC KIỂM TRA QUAN TRỌNG: CHECK ALLOWANCE ---
      // Đọc trực tiếp từ Blockchain xem Contract đã thực sự nhận được quyền chưa
      const currentAllowance = await publicClient.readContract({
        address: tokenAddress,
        abi: ERC20_ABI as any,
        functionName: 'allowance',
        args: [address, contractAddress]
      }) as bigint;

      console.log(`4. KẾT QUẢ KIỂM TRA ALLOWANCE: ${currentAllowance.toString()}`);
      console.log(`   Cần Stake:             ${amountWei.toString()}`);

      if (currentAllowance < amountWei) {
        // Nếu dòng này hiện ra -> Nguyên nhân lỗi 100% là do Allowance
        throw new Error(`CRITICAL: Allowance chưa cập nhật! (Hiện tại: ${currentAllowance}, Cần: ${amountWei}). Có thể do sai địa chỉ Contract.`);
      }

      // --- BƯỚC 2: STAKE ---
      console.log("-> Allowance đã đủ. Đang gọi hàm Stake...");
      const txHash = await writeContractAsync({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'stake',
        args: [amountWei]
      });
      
      console.log("-> Stake Hash:", txHash);
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
  }, [contractAddress, contractAbi, writeContractAsync, publicClient, tokenAddress, address]);
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