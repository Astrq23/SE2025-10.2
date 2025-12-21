import React, { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { toast } from 'react-toastify';
import TokenStakingArtifact from '../abis/TokenStaking.json';
import { CONTRACT_ADDRESSES } from '../constants/addresses';

const StakingDashboard: React.FC = () => {
  const { isConnected, address } = useAccount();
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [stakingInfo, setStakingInfo] = useState({
    stakedAmount: '0',
    availableRewards: '0',
    totalRewardsEarned: '0'
  });

  const contractAbi = TokenStakingArtifact.abi;
  const contractAddress = CONTRACT_ADDRESSES.localhost.STAKING as `0x${string}`;

  const { writeContractAsync } = useWriteContract();

  // Đọc thông tin staking của user
  const { data: userStakingData, refetch: refetchStakingInfo } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getUserStakingInfo',
    args: address ? [address] : undefined,
    query: { enabled: !!address }
  });

  // Cập nhật UI khi có data
  useEffect(() => {
    if (userStakingData && Array.isArray(userStakingData)) {
      setStakingInfo({
        stakedAmount: (BigInt(userStakingData[0]?.toString() || 0) / BigInt(10 ** 18)).toString(),
        availableRewards: (BigInt(userStakingData[1]?.toString() || 0) / BigInt(10 ** 18)).toString(),
        totalRewardsEarned: (BigInt(userStakingData[2]?.toString() || 0) / BigInt(10 ** 18)).toString()
      });
    }
  }, [userStakingData]);

  // Handle Stake
  const handleStake = async () => {
    if (!isConnected) {
      toast.warn('Please connect your wallet');
      return;
    }

    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    try {
      const amount = BigInt(parseFloat(stakeAmount) * 10 ** 18).toString();
      
      // Thực hiện approve trước (nếu cần)
      // Sau đó gọi stake function

      const tx = await writeContractAsync({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'stake',
        args: [BigInt(amount)]
      });

      toast.success('Stake successful!');
      setStakeAmount('');
      refetchStakingInfo();
    } catch (error: any) {
      toast.error(error?.message || 'Stake failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Unstake
  const handleUnstake = async () => {
    if (!isConnected) {
      toast.warn('Please connect your wallet');
      return;
    }

    if (!unstakeAmount || parseFloat(unstakeAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    try {
      const amount = BigInt(parseFloat(unstakeAmount) * 10 ** 18).toString();

      const tx = await writeContractAsync({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'unstake',
        args: [BigInt(amount)]
      });

      toast.success('Unstake successful!');
      setUnstakeAmount('');
      refetchStakingInfo();
    } catch (error: any) {
      toast.error(error?.message || 'Unstake failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Claim Rewards
  const handleClaimRewards = async () => {
    if (!isConnected) {
      toast.warn('Please connect your wallet');
      return;
    }

    if (parseFloat(stakingInfo.availableRewards) <= 0) {
      toast.warn('No rewards available');
      return;
    }

    setIsLoading(true);
    try {
      const tx = await writeContractAsync({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'claimRewards'
      });

      toast.success('Rewards claimed!');
      refetchStakingInfo();
    } catch (error: any) {
      toast.error(error?.message || 'Claim failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Unstake All
  const handleUnstakeAll = async () => {
    if (!isConnected) {
      toast.warn('Please connect your wallet');
      return;
    }

    setIsLoading(true);
    try {
      const tx = await writeContractAsync({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'unstakeAll'
      });

      toast.success('All tokens unstaked!');
      refetchStakingInfo();
    } catch (error: any) {
      toast.error(error?.message || 'Unstake all failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '40px 20px',
      color: 'white'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#4ade80' }}>
          Staking Dashboard
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#b8c0cc' }}>
          Stake your tokens and earn 12% APY
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        {/* Staked Amount */}
        <div style={{
          backgroundColor: '#1e293b',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #334155'
        }}>
          <p style={{ color: '#b8c0cc', marginBottom: '10px' }}>Staked Amount</p>
          <p style={{ fontSize: '1.8rem', color: '#4ade80', fontWeight: 'bold' }}>
            {stakingInfo.stakedAmount}
          </p>
          <p style={{ color: '#88909c', fontSize: '0.9rem' }}>Tokens</p>
        </div>

        {/* Available Rewards */}
        <div style={{
          backgroundColor: '#1e293b',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #334155'
        }}>
          <p style={{ color: '#b8c0cc', marginBottom: '10px' }}>Available Rewards</p>
          <p style={{ fontSize: '1.8rem', color: '#facc15', fontWeight: 'bold' }}>
            {parseFloat(stakingInfo.availableRewards).toFixed(4)}
          </p>
          <p style={{ color: '#88909c', fontSize: '0.9rem' }}>Ready to Claim</p>
        </div>

        {/* Total Rewards */}
        <div style={{
          backgroundColor: '#1e293b',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #334155'
        }}>
          <p style={{ color: '#b8c0cc', marginBottom: '10px' }}>Total Rewards Earned</p>
          <p style={{ fontSize: '1.8rem', color: '#60a5fa', fontWeight: 'bold' }}>
            {parseFloat(stakingInfo.totalRewardsEarned).toFixed(4)}
          </p>
          <p style={{ color: '#88909c', fontSize: '0.9rem' }}>All Time</p>
        </div>

        {/* APY */}
        <div style={{
          backgroundColor: '#1e293b',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #334155'
        }}>
          <p style={{ color: '#b8c0cc', marginBottom: '10px' }}>APY Rate</p>
          <p style={{ fontSize: '1.8rem', color: '#10b981', fontWeight: 'bold' }}>
            12%
          </p>
          <p style={{ color: '#88909c', fontSize: '0.9rem' }}>Per Year</p>
        </div>
      </div>

      {/* Actions Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px'
      }}>
        {/* Stake Card */}
        <div style={{
          backgroundColor: '#1e293b',
          padding: '30px',
          borderRadius: '16px',
          border: '1px solid #334155'
        }}>
          <h3 style={{ color: '#facc15', marginBottom: '20px', fontSize: '1.3rem' }}>
            🔒 Stake Tokens
          </h3>
          
          <input
            type="number"
            placeholder="Enter amount"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '15px',
              backgroundColor: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: 'white',
              fontSize: '1rem'
            }}
          />

          <button
            onClick={handleStake}
            disabled={isLoading || !isConnected}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#4ade80',
              color: 'black',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: isLoading || !isConnected ? 'not-allowed' : 'pointer',
              opacity: isLoading || !isConnected ? 0.5 : 1,
              fontSize: '1rem'
            }}
          >
            {isLoading ? 'Processing...' : 'Stake Now'}
          </button>
        </div>

        {/* Unstake Card */}
        <div style={{
          backgroundColor: '#1e293b',
          padding: '30px',
          borderRadius: '16px',
          border: '1px solid #334155'
        }}>
          <h3 style={{ color: '#facc15', marginBottom: '20px', fontSize: '1.3rem' }}>
            📤 Unstake Tokens
          </h3>
          
          <input
            type="number"
            placeholder="Enter amount"
            value={unstakeAmount}
            onChange={(e) => setUnstakeAmount(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '15px',
              backgroundColor: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: 'white',
              fontSize: '1rem'
            }}
          />

          <button
            onClick={handleUnstake}
            disabled={isLoading || !isConnected}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#f59e0b',
              color: 'black',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: isLoading || !isConnected ? 'not-allowed' : 'pointer',
              opacity: isLoading || !isConnected ? 0.5 : 1,
              marginBottom: '10px',
              fontSize: '1rem'
            }}
          >
            {isLoading ? 'Processing...' : 'Unstake'}
          </button>

          <button
            onClick={handleUnstakeAll}
            disabled={isLoading || !isConnected}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: isLoading || !isConnected ? 'not-allowed' : 'pointer',
              opacity: isLoading || !isConnected ? 0.5 : 1,
              fontSize: '0.9rem'
            }}
          >
            Unstake All
          </button>
        </div>

        {/* Claim Rewards Card */}
        <div style={{
          backgroundColor: '#1e293b',
          padding: '30px',
          borderRadius: '16px',
          border: '1px solid #334155'
        }}>
          <h3 style={{ color: '#facc15', marginBottom: '20px', fontSize: '1.3rem' }}>
            🎁 Claim Rewards
          </h3>
          
          <div style={{
            backgroundColor: '#0f172a',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '15px',
            textAlign: 'center'
          }}>
            <p style={{ color: '#b8c0cc', fontSize: '0.9rem', marginBottom: '5px' }}>
              Claimable Rewards
            </p>
            <p style={{ fontSize: '1.5rem', color: '#10b981', fontWeight: 'bold' }}>
              {parseFloat(stakingInfo.availableRewards).toFixed(4)}
            </p>
          </div>

          <button
            onClick={handleClaimRewards}
            disabled={isLoading || !isConnected || parseFloat(stakingInfo.availableRewards) <= 0}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: isLoading || !isConnected || parseFloat(stakingInfo.availableRewards) <= 0 ? 'not-allowed' : 'pointer',
              opacity: isLoading || !isConnected || parseFloat(stakingInfo.availableRewards) <= 0 ? 0.5 : 1,
              fontSize: '1rem'
            }}
          >
            {isLoading ? 'Processing...' : 'Claim Rewards'}
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div style={{
        marginTop: '40px',
        padding: '30px',
        backgroundColor: '#1e293b',
        borderRadius: '16px',
        border: '1px solid #334155'
      }}>
        <h3 style={{ color: '#facc15', marginBottom: '20px' }}>ℹ️ How Staking Works</h3>
        <ul style={{ color: '#b8c0cc', lineHeight: '1.8' }}>
          <li>📌 Stake your tokens to earn 12% APY (Annual Percentage Yield)</li>
          <li>💰 Rewards are calculated daily based on your staked amount</li>
          <li>🎁 Claim your rewards anytime without unstaking</li>
          <li>📤 Unstake your tokens whenever you want with no lock-in period</li>
          <li>⚡ All transactions are instant and secured by the blockchain</li>
        </ul>
      </div>
    </div>
  );
};

export default StakingDashboard;
