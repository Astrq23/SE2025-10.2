// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title TokenStaking
 * @dev Staking contract cho phép user stake token để kiếm lợi nhuận passive
 */
contract TokenStaking is Ownable, ReentrancyGuard {
    IERC20 public stakingToken;
    
    constructor(address _stakingToken) Ownable(msg.sender) {
        stakingToken = IERC20(_stakingToken);
    }
    
    // APY Rate: 12% per year
    uint256 public constant APY_RATE = 12;
    uint256 public constant DECIMALS = 18;
    
    // Thông tin stake của từng user
    struct StakeInfo {
        uint256 amount;
        uint256 startTime;
        uint256 rewardsClaimed;
    }
    
    // Lưu thông tin stake của user
    mapping(address => StakeInfo) public stakers;
    
    // Tổng số token đang stake
    uint256 public totalStaked;
    
    // Event logs
    event Staked(address indexed user, uint256 amount, uint256 timestamp);
    event Unstaked(address indexed user, uint256 amount, uint256 timestamp);
    event RewardsClaimed(address indexed user, uint256 rewards, uint256 timestamp);
    event APYRateChanged(uint256 newRate);
    
    /**
     * @dev Constructor - Initialize staking contract
     * @param _tokenAddress Địa chỉ token ERC-20 để stake
     */
    
    /**
     * @dev Stake token
     * @param amount Số lượng token muốn stake
     */
    function stake(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(
            stakingToken.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );
        
        // Nếu đã stake trước đó, claim rewards trước
        if (stakers[msg.sender].amount > 0) {
            _claimRewards();
        }
        
        stakers[msg.sender].amount += amount;
        stakers[msg.sender].startTime = block.timestamp;
        totalStaked += amount;
        
        emit Staked(msg.sender, amount, block.timestamp);
    }
    
    /**
     * @dev Tính toán lợi nhuận của user
     * @param user Địa chỉ user
     * @return Số lượng rewards earned
     */
    function calculateRewards(address user) public view returns (uint256) {
        StakeInfo storage stakeInfo = stakers[user];
        if (stakeInfo.amount == 0) return 0;
        
        // Tính số ngày đã stake
        uint256 stakingSeconds = block.timestamp - stakeInfo.startTime;
        uint256 stakingDays = stakingSeconds / 1 days;
        
        if (stakingDays == 0) return 0;
        
        // Công thức: (amount * APY_RATE * days) / (365 * 100)
        // APY_RATE = 12 có nghĩa là 12% mỗi năm
        uint256 dailyRate = (stakeInfo.amount * APY_RATE) / (365 * 100);
        uint256 totalRewards = dailyRate * stakingDays;
        
        // Trừ đi rewards đã claim
        return totalRewards > stakeInfo.rewardsClaimed 
            ? totalRewards - stakeInfo.rewardsClaimed 
            : 0;
    }
    
    /**
     * @dev Claim rewards
     */
    function claimRewards() external nonReentrant {
        _claimRewards();
    }
    
    /**
     * @dev Internal function để claim rewards
     */
    function _claimRewards() internal {
        uint256 rewards = calculateRewards(msg.sender);
        require(rewards > 0, "No rewards available");
        
        // Cập nhật lợi nhuận đã claim
        stakers[msg.sender].rewardsClaimed += rewards;
        
        // Chuyển rewards cho user
        require(
            stakingToken.transfer(msg.sender, rewards),
            "Reward transfer failed"
        );
        
        emit RewardsClaimed(msg.sender, rewards, block.timestamp);
    }
    
    /**
     * @dev Unstake token
     * @param amount Số lượng token muốn rút
     */
    function unstake(uint256 amount) external nonReentrant {
        StakeInfo storage stakeInfo = stakers[msg.sender];
        require(stakeInfo.amount >= amount, "Insufficient staked balance");
        require(amount > 0, "Amount must be greater than 0");
        
        // Claim rewards trước unstake
        uint256 rewards = calculateRewards(msg.sender);
        if (rewards > 0) {
            stakeInfo.rewardsClaimed += rewards;
            require(
                stakingToken.transfer(msg.sender, rewards),
                "Reward transfer failed"
            );
            emit RewardsClaimed(msg.sender, rewards, block.timestamp);
        }
        
        // Rút token
        stakeInfo.amount -= amount;
        totalStaked -= amount;
        stakeInfo.startTime = block.timestamp;
        
        require(
            stakingToken.transfer(msg.sender, amount),
            "Unstake transfer failed"
        );
        
        emit Unstaked(msg.sender, amount, block.timestamp);
    }
    
    /**
     * @dev Unstake tất cả token
     */
    function unstakeAll() external nonReentrant {
        StakeInfo storage stakeInfo = stakers[msg.sender];
        uint256 amount = stakeInfo.amount;
        require(amount > 0, "No staked balance");
        
        // Claim rewards trước
        uint256 rewards = calculateRewards(msg.sender);
        if (rewards > 0) {
            stakeInfo.rewardsClaimed += rewards;
            require(
                stakingToken.transfer(msg.sender, rewards),
                "Reward transfer failed"
            );
            emit RewardsClaimed(msg.sender, rewards, block.timestamp);
        }
        
        // Rút tất cả
        stakeInfo.amount = 0;
        totalStaked -= amount;
        
        require(
            stakingToken.transfer(msg.sender, amount),
            "Unstake transfer failed"
        );
        
        emit Unstaked(msg.sender, amount, block.timestamp);
    }
    
    /**
     * @dev Lấy thông tin stake của user
     * @param user Địa chỉ user
     * @return StakeInfo
     */
    function getStakeInfo(address user) external view returns (StakeInfo memory) {
        return stakers[user];
    }
    
    /**
     * @dev Lấy thông tin stake đầy đủ: amount, rewards, APY
     * @param user Địa chỉ user
     * @return stakedAmount Số token đang stake
     * @return availableRewards Rewards chưa claim
     * @return totalRewardsEarned Tổng rewards đã kiếm
     */
    function getUserStakingInfo(address user) 
        external 
        view 
        returns (
            uint256 stakedAmount,
            uint256 availableRewards,
            uint256 totalRewardsEarned
        ) 
    {
        StakeInfo memory stakeInfo = stakers[user];
        stakedAmount = stakeInfo.amount;
        totalRewardsEarned = stakeInfo.rewardsClaimed + calculateRewards(user);
        availableRewards = calculateRewards(user);
    }
    
    /**
     * @dev Lấy APY rate hiện tại
     * @return APY percentage (ví dụ 12 = 12% per year)
     */
    function getAPYRate() external pure returns (uint256) {
        return APY_RATE;
    }
}
