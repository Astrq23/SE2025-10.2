import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { erc20Abi, formatUnits, parseUnits } from 'viem';
import { useEffect } from 'react';
import { CONTRACT_ADDRESSES } from '../constants/addresses';

export const useToken = (tokenAddressInput?: `0x${string}`) => {
  const { address: userAddress } = useAccount();

  // Ưu tiên địa chỉ truyền vào, nếu không có thì lấy địa chỉ mặc định (ZNT)
  const tokenAddress = tokenAddressInput || (CONTRACT_ADDRESSES.localhost.ZNT as `0x${string}`);

  // 1. Lấy số thập phân (Decimals) - Quan trọng để tính toán đúng số tiền
  const { data: decimalsData } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'decimals',
  });
  const decimals = decimalsData ?? 18; // Mặc định 18 nếu chưa load được

  // 2. Lấy Tên (Name)
  const { data: nameData } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'name',
  });

  // 3. Lấy Ký hiệu (Symbol)
  const { data: symbolData } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'symbol',
  });

  // 4. Lấy Số dư (Balance)
  const { 
    data: balanceData, 
    refetch: refetchBalance,
    isLoading: isLoadingBalance 
  } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress, // Chỉ chạy khi đã kết nối ví
    }
  });

  // 5. Setup chức năng chuyển tiền (Write Contract)
  const { 
    data: hash, 
    error: writeError, 
    isPending: isWritePending, 
    writeContractAsync 
  } = useWriteContract();

  // Theo dõi trạng thái transaction trên blockchain
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Tự động cập nhật số dư khi giao dịch thành công
  useEffect(() => {
    if (isConfirmed) {
      refetchBalance();
    }
  }, [isConfirmed, refetchBalance]);

  // Xử lý dữ liệu hiển thị
  const balance = balanceData ? formatUnits(balanceData, decimals) : '0';
  const name = nameData ?? 'Unknown Token';
  const symbol = symbolData ?? '???';

  // Hàm chuyển tiền
  const transfer = async (to: string, amount: string) => {
    try {
      await writeContractAsync({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'transfer',
        args: [to as `0x${string}`, parseUnits(amount, decimals)], // Dùng decimals động
      });
      // Không cần refetch ở đây vì useEffect ở trên sẽ tự chạy khi transaction xong
    } catch (err) {
      console.error("Transfer failed:", err);
      throw err; // Ném lỗi ra để component bên ngoài bắt được
    }
  };

  return {
    balance,
    symbol,
    name,          // Đã thêm trường này
    decimals,      // Đã thêm trường này
    isLoading: isLoadingBalance,
    isApproving: isWritePending || isConfirming, // Trạng thái "Đang xử lý" (gộp cả lúc ký và lúc chờ mạng)
    transfer,
    error: writeError?.message || null,
    refetch: refetchBalance,
  };
};