import { ethers } from 'ethers';

// ERC20 ABI for approve function
export const ERC20_ABI = [
  'function approve(address spender, uint256 amount) public returns (bool)',
  'function balanceOf(address account) public view returns (uint256)',
  'function allowance(address owner, address spender) public view returns (uint256)',
  'function transfer(address to, uint256 amount) public returns (bool)',
];

// Helper to approve token for contract
export const approveToken = async (
  tokenAddress: string,
  spenderAddress: string,
  amount: string,
  signer: ethers.Signer
) => {
  try {
    const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
    const amountWei = ethers.parseEther(amount);
    
    console.log(`Approving ${amount} tokens...`);
    const tx = await tokenContract.approve(spenderAddress, amountWei);
    const receipt = await tx.wait();
    
    console.log('✅ Approval successful:', receipt?.transactionHash);
    return receipt;
  } catch (error) {
    console.error('❌ Approval failed:', error);
    throw error;
  }
};

// Helper to check allowance
export const checkAllowance = async (
  tokenAddress: string,
  ownerAddress: string,
  spenderAddress: string,
  provider: ethers.Provider
) => {
  try {
    const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
    const allowance = await tokenContract.allowance(ownerAddress, spenderAddress);
    return ethers.formatEther(allowance);
  } catch (error) {
    console.error('❌ Failed to check allowance:', error);
    throw error;
  }
};

// Helper to get token balance
export const getTokenBalance = async (
  tokenAddress: string,
  address: string,
  provider: ethers.Provider
) => {
  try {
    const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
    const balance = await tokenContract.balanceOf(address);
    return ethers.formatEther(balance);
  } catch (error) {
    console.error('❌ Failed to get balance:', error);
    throw error;
  }
};

// Format large numbers
export const formatNumber = (value: string, decimals: number = 2): string => {
  const num = parseFloat(value);
  if (num >= 1000000) {
    return (num / 1000000).toFixed(decimals) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(decimals) + 'K';
  } else {
    return num.toFixed(decimals);
  }
};

// Format wallet address
export const formatAddress = (address: string): string => {
  return `${address.substring(0, 6)}...${address.substring(-4)}`;
};

// Handle transaction error
export const handleTransactionError = (error: any): string => {
  if (error?.reason) {
    return error.reason;
  } else if (error?.message) {
    return error.message;
  } else {
    return 'An error occurred';
  }
};
