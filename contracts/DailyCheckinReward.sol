// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DailyCheckinReward is Ownable {
    IERC20 public token;
    uint256 public reward = 100 * 10**18; // thưởng 100 token
    uint256 public cooldown = 1 days; // 24 giờ

    mapping(address => uint256) public lastCheckin;

    event CheckedIn(address indexed user, uint256 reward, uint256 timestamp);

    constructor(address tokenAddress) Ownable(msg.sender) {
        require(tokenAddress != address(0), "Token address khong hop le");
        token = IERC20(tokenAddress);
    }

    /**
     * @dev Kiểm tra thời gian còn lại trước khi có thể check-in tiếp
     * @param user Địa chỉ ví người dùng
     * @return Số giây còn lại (0 = có thể check-in)
     */
    function timeRemaining(address user) public view returns (uint256) {
        if (block.timestamp >= lastCheckin[user] + cooldown) {
            return 0;
        }
        return (lastCheckin[user] + cooldown) - block.timestamp;
    }

    /**
     * @dev User tự check-in (gọi trực tiếp từ ví của họ)
     */
    function checkIn() external {
        require(timeRemaining(msg.sender) == 0, "Chua du 24h de checkin lai");

        lastCheckin[msg.sender] = block.timestamp;

        require(token.transfer(msg.sender, reward), "Chuyen token that bai");

        emit CheckedIn(msg.sender, reward, block.timestamp);
    }

    /**
     * @dev Admin check-in cho người dùng (quan trọng!)
     * @param user Địa chỉ ví người dùng nhận thưởng
     */
    function checkInFor(address user) external onlyOwner {
        require(user != address(0), "Dia chi khong hop le");
        require(timeRemaining(user) == 0, "Nguoi dung chua du 24h de checkin lai");

        lastCheckin[user] = block.timestamp;

        require(token.transfer(user, reward), "Chuyen token that bai");

        emit CheckedIn(user, reward, block.timestamp);
    }

    /**
     * @dev Thay đổi số lượng thưởng (chỉ owner)
     */
    function setReward(uint256 newReward) external onlyOwner {
        reward = newReward;
    }

    /**
     * @dev Thay đổi cooldown time (chỉ owner)
     */
    function setCooldown(uint256 newCooldown) external onlyOwner {
        cooldown = newCooldown;
    }

    /**
     * @dev Rút token dư về ví owner (phòng trường hợp khẩn cấp)
     */
    function withdrawTokens(uint256 amount) external onlyOwner {
        require(token.transfer(owner(), amount), "Rut token that bai");
    }

    /**
     * @dev Kiểm tra balance của contract
     */
    function getContractBalance() external view returns (uint256) {
        return token.balanceOf(address(this));
    }
}