// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TwoTVDepositNoEarlyInterest is Ownable {
    IERC20 public token;

    struct Deposit {
        uint256 amount;
        uint256 startTime;
        uint256 months;
        bool withdrawn;
    }

    mapping(address => Deposit[]) public deposits;

    uint256 public annualInterest = 10; // 10% mỗi năm

    event Deposited(address indexed user, uint256 amount, uint256 months);
    event Withdrawn(address indexed user, uint256 index, uint256 payout, bool matured);

    constructor(IERC20 _token) Ownable(msg.sender) {
        token = _token;
    }

    // ================== DEPOSIT ==================
    function deposit(uint256 _amount, uint256 _months) external {
        require(_amount > 0, "Amount > 0");
        require(_months > 0, "Months > 0");

        require(token.transferFrom(msg.sender, address(this), _amount), "Transfer failed");

        deposits[msg.sender].push(
            Deposit({
                amount: _amount,
                startTime: block.timestamp,
                months: _months,
                withdrawn: false
            })
        );

        emit Deposited(msg.sender, _amount, _months);
    }

    // ================== WITHDRAW ==================
    function withdrawByIndex(uint256 index) external {
        require(index < deposits[msg.sender].length, "Invalid index");

        Deposit storage dep = deposits[msg.sender][index];
        require(!dep.withdrawn, "Already withdrawn");
        require(dep.amount > 0, "Empty");

        uint256 depositedAmount = dep.amount;
        uint256 elapsed = block.timestamp - dep.startTime;
        uint256 termSeconds = dep.months * 30 days;

        uint256 payout = depositedAmount; // Mặc định = gốc
        bool matured = false;

        // ======= KIỂM TRA ĐỦ HẠN ========
        if (elapsed >= termSeconds) {
            // ✅ ĐỦ HẠN → TÍNH LÃI
            matured = true;
            uint256 interest = (depositedAmount * annualInterest * dep.months)
                                 / 12
                                 / 100;
            
            payout = depositedAmount + interest;
        } else {
            // ⚠️ RÚT SỚM → CHỈ TRẢ GỐC (không lãi)
            payout = depositedAmount;
        }

        // ===== AN TOÀN: CHECK CONTRACT CÓ ĐỦ TOKEN =====
        uint256 bal = token.balanceOf(address(this));
        require(bal >= payout, "Contract lacks funds");

        // update state
        dep.withdrawn = true;
        dep.amount = 0;

        require(token.transfer(msg.sender, payout), "Token transfer failed");

        emit Withdrawn(msg.sender, index, payout, matured);
    }

    // ========= VIEW =========
    function depositsLength(address user) external view returns (uint256) {
        return deposits[user].length;
    }

    function getDeposit(address user, uint256 index) external view returns (Deposit memory) {
        return deposits[user][index];
    }

    // ========= OWNER FUNDING =========
    function fundContract(uint256 amount) external onlyOwner {
        require(token.transferFrom(msg.sender, address(this), amount));
    }

    function contractBalance() external view returns (uint256) {
        return token.balanceOf(address(this));
    }
}