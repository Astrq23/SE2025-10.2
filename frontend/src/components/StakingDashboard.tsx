import React, { useState, useEffect } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { formatEther } from 'viem';
import { toast } from 'react-toastify';
import TokenStakingArtifact from '../abis/TokenStaking.json';
import { CONTRACT_ADDRESSES } from '../constants/addresses';
import useStaking from '../hooks/useStaking';

const StakingDashboard: React.FC = () => {
  const { isConnected, address } = useAccount();
  const [activeTab, setActiveTab] = useState<'stake' | 'unstake'>('stake');
  const [amount, setAmount] = useState('');
  
  const [stakingInfo, setStakingInfo] = useState({
    stakedAmount: '0',
    availableRewards: '0',
    totalRewardsEarned: '0'
  });

  const contractAbi = TokenStakingArtifact.abi;
  const contractAddress = CONTRACT_ADDRESSES.localhost.STAKING as `0x${string}`;
  const { stake, unstake, unstakeAll, claimRewards, isLoading: stakingLoading, error: stakingError } = useStaking();

  const { data: userStakingData, refetch: refetchStakingInfo } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getUserStakingInfo',
    args: address ? [address] : undefined,
    query: { enabled: !!address }
  });

  useEffect(() => {
    if (!userStakingData) return;

    try {
      // Some providers return an array-like tuple, others return an object with numeric keys or named keys.
      if (Array.isArray(userStakingData)) {
        setStakingInfo({
          stakedAmount: formatEther(userStakingData[0]),
          availableRewards: formatEther(userStakingData[1]),
          totalRewardsEarned: formatEther(userStakingData[2])
        });
        return;
      }

      // If it's an object with numeric keys ("0","1","2")
      if (typeof userStakingData === 'object' && userStakingData !== null) {
        const a = (userStakingData as any)[0] ?? (userStakingData as any)['0'] ?? (userStakingData as any).stakedAmount;
        const b = (userStakingData as any)[1] ?? (userStakingData as any)['1'] ?? (userStakingData as any).availableRewards;
        const c = (userStakingData as any)[2] ?? (userStakingData as any)['2'] ?? (userStakingData as any).totalRewardsEarned;

        setStakingInfo({
          stakedAmount: a ? formatEther(a) : '0',
          availableRewards: b ? formatEther(b) : '0',
          totalRewardsEarned: c ? formatEther(c) : '0'
        });
      }
    } catch (e) {
      // Guard against unexpected shapes/types
      // eslint-disable-next-line no-console
      console.warn('Failed to parse staking data', e, userStakingData);
    }
  }, [userStakingData]);

  const handleAction = async () => {
    if (!isConnected) return toast.warn('Please connect wallet');
    if (!amount || parseFloat(amount) <= 0) return toast.error('Enter valid amount');

    try {
      if (activeTab === 'stake') {
        await stake(amount);
        toast.success('Deposit successful!');
      } else {
        await unstake(amount);
        toast.success('Withdraw successful!');
      }
      setAmount('');
      refetchStakingInfo();
    } catch (error: any) {
      // Provide more detailed error log for debugging
      // eslint-disable-next-line no-console
      console.error('handleAction error', error);
      const errMsg = error?.message || error?.reason || (error?.data && (error.data.message || JSON.stringify(error.data))) || 'Transaction failed';
      toast.error(errMsg);
    }
  };

  const handleClaim = async () => {
    if (!isConnected) return toast.warn('Connect wallet');
    try {
      await claimRewards();
      toast.success('Claimed successfully!');
      refetchStakingInfo();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || 'Claim failed');
    }
  };

  const handleUnstakeAll = async () => {
    if (!isConnected) return toast.warn('Connect wallet');
    try {
      await unstakeAll();
      toast.success('Unstaked All!');
      refetchStakingInfo();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || 'Failed');
    }
  };

  // --- STYLES TINH CHỈNH ---
  const glassCardStyle: React.CSSProperties = {
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    backdropFilter: 'blur(16px)',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '30px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    // QUAN TRỌNG: Để 2 ô cao bằng nhau, ta dùng height 100% nhưng thêm flex column để nội dung dàn đều
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px',
    fontSize: '1.1rem',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    color: 'white',
    outline: 'none',
    marginBottom: '10px'
  };

  // Info Row Style trong Transaction Summary
  const infoRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    fontSize: '0.85rem',
    color: '#cbd5e1'
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px 20px 80px', color: 'white' }}>
      {/* CSS ĐỂ XÓA MŨI TÊN INPUT NUMBER */}
      <style>
        {`
          input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          input[type=number] {
            -moz-appearance: textfield;
          }
        `}
      </style>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '5px', background: '-webkit-linear-gradient(left, #4ade80, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Staking Vault
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
          Passive Income Generator • <span style={{ color: '#4ade80', fontWeight: 'bold' }}>12% APY</span>
        </p>
      </div>

      {/* Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px', alignItems: 'stretch' }}>
        
        {/* === CARD 1: PORTFOLIO === */}
        <div style={glassCardStyle}>
          {/* Top Section */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>
                  
                  My Portfolio
                </h3>
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', color: '#94a3b8' }}>
                Live
                </div>
            </div>

            <div style={{ marginBottom: '20px', padding: '15px', background: 'rgba(0,0,0,0.2)', borderRadius: '16px' }}>
                <p style={{ color: '#94a3b8', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '5px' }}>Total Staked Balance</p>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'white', lineHeight: '1' }}>
                {parseFloat(stakingInfo.stakedAmount).toFixed(2)}
                <span style={{ fontSize: '1rem', color: '#64748b', marginLeft: '10px', fontWeight: 'normal' }}>TOKEN</span>
                </div>
            </div>

            <div style={{ 
                background: 'rgba(16, 185, 129, 0.08)', 
                border: '1px solid rgba(16, 185, 129, 0.2)', 
                borderRadius: '16px', 
                padding: '15px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
            }}>
                <div>
                <p style={{ color: '#4ade80', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '2px' }}>Unclaimed Rewards</p>
                <p style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#4ade80', margin: 0 }}>
                    {parseFloat(stakingInfo.availableRewards).toFixed(6)}
                </p>
                </div>
                <button 
                onClick={handleClaim}
                disabled={stakingLoading || parseFloat(stakingInfo.availableRewards) <= 0}
                style={{
                    padding: '8px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#10b981',
                    color: 'white',
                    fontWeight: 'bold',
                    cursor: parseFloat(stakingInfo.availableRewards) > 0 ? 'pointer' : 'not-allowed',
                    opacity: parseFloat(stakingInfo.availableRewards) > 0 ? 1 : 0.6,
                    fontSize: '0.9rem'
                }}
                >
                Claim
                </button>
            </div>
          </div>
          
          {/* Spacer để đẩy footer xuống đáy nếu cần */}
          <div style={{ flexGrow: 1 }}></div>

          {/* Footer Stats */}
          <div style={{ display: 'flex', gap: '15px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px', marginTop: 'auto' }}>
            <div style={{ flex: 1 }}>
              <p style={{ color: '#64748b', fontSize: '0.75rem' }}>Lifetime Earned</p>
              <p style={{ color: '#60a5fa', fontWeight: 'bold', fontSize: '1.1rem' }}>{parseFloat(stakingInfo.totalRewardsEarned).toFixed(2)}</p>
            </div>
            <div style={{ flex: 1, borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '15px' }}>
              <p style={{ color: '#64748b', fontSize: '0.75rem' }}>Fixed APY</p>
              <p style={{ color: '#facc15', fontWeight: 'bold', fontSize: '1.1rem' }}>12.0%</p>
            </div>
          </div>
        </div>

        {/* === CARD 2: ACTION PANEL === */}
        <div style={glassCardStyle}>
            {/* Top Section */}
            <div>
                {/* Tabs */}
                <div style={{ display: 'flex', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '10px', padding: '3px', marginBottom: '20px' }}>
                    <button 
                    onClick={() => setActiveTab('stake')}
                    style={{
                        flex: 1, padding: '10px', borderRadius: '8px', border: 'none',
                        background: activeTab === 'stake' ? '#334155' : 'transparent',
                        color: activeTab === 'stake' ? 'white' : '#94a3b8',
                        fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s'
                    }}
                    >
                    Deposit
                    </button>
                    <button 
                    onClick={() => setActiveTab('unstake')}
                    style={{
                        flex: 1, padding: '10px', borderRadius: '8px', border: 'none',
                        background: activeTab === 'unstake' ? '#334155' : 'transparent',
                        color: activeTab === 'unstake' ? 'white' : '#94a3b8',
                        fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s'
                    }}
                    >
                    Withdraw
                    </button>
                </div>

                <h3 style={{ fontSize: '1rem', marginBottom: '10px', color: '#cbd5e1' }}>
                    {activeTab === 'stake' ? 'Amount to Stake' : 'Amount to Withdraw'}
                </h3>

                <div style={{ position: 'relative', marginBottom: '20px' }}>
                    <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    style={inputStyle}
                    />
                    <span style={{ position: 'absolute', right: '15px', top: '16px', fontWeight: 'bold', color: '#64748b', fontSize: '0.8rem' }}>TOKEN</span>
                    
                    <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#64748b' }}>
                    Available: <span style={{ color: '#3b82f6', cursor: 'pointer' }}>MAX</span>
                    </div>
                </div>
            </div>

            {/* Spacer: Đẩy phần dưới xuống */}
            <div style={{ flexGrow: 1 }}></div>

            {/* Middle: Transaction Summary (ĐÂY LÀ PHẦN MỚI THÊM ĐỂ CÂN ĐỐI) */}
            <div style={{ 
                background: 'rgba(0, 0, 0, 0.2)', 
                borderRadius: '12px', 
                padding: '15px', 
                marginBottom: '20px',
                border: '1px solid rgba(255,255,255,0.05)'
            }}>
                <div style={infoRowStyle}>
                    <span>Exchange Rate</span>
                    <span style={{ color: 'white', fontWeight: 'bold' }}>1 TOKEN = 1 stTOKEN</span>
                </div>
                <div style={infoRowStyle}>
                    <span>Unlock Period</span>
                    <span style={{ color: '#4ade80', fontWeight: 'bold' }}>Instant</span>
                </div>
                <div style={{ borderTop: '1px dashed rgba(255,255,255,0.1)', marginTop: '8px', paddingTop: '8px', ...infoRowStyle, marginBottom: 0 }}>
                    <span>You will receive</span>
                    <span style={{ color: 'white', fontWeight: 'bold' }}>{amount || '0'} stTOKEN</span>
                </div>
            </div>

            {/* Bottom: Action Button */}
            <div>
              <button
                onClick={handleAction}
                disabled={
                  stakingLoading ||
                  !isConnected ||
                  !amount ||
                  parseFloat(amount) <= 0
                }
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  borderRadius: '10px',
                  border: 'none',
                  cursor:
                    stakingLoading || !isConnected || !amount || parseFloat(amount) <= 0
                      ? 'not-allowed'
                      : 'pointer',
                  transition: 'all 0.2s',
                  background:
                    activeTab === 'stake'
                      ? 'linear-gradient(90deg, #2563eb, #06b6d4)'
                      : 'linear-gradient(90deg, #ea580c, #dc2626)',
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  opacity:
                    stakingLoading || !isConnected || !amount || parseFloat(amount) <= 0
                      ? 0.6
                      : 1,
                }}
              >
                {stakingLoading
                  ? 'Processing...'
                  : activeTab === 'stake'
                  ? 'Confirm Deposit'
                  : 'Confirm Withdraw'}
              </button>

                
                {activeTab === 'unstake' && (
                    <p 
                    onClick={handleUnstakeAll} 
                    style={{ textAlign: 'center', marginTop: '15px', color: '#94a3b8', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.8rem' }}
                    >
                    Unstake All Assets
                    </p>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};

export default StakingDashboard;