// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TwoTVDeposit is Ownable {

    IERC20 public token;

    struct Deposit {
        uint256 amount;
        uint256 startTime;
        uint256 months;
        bool withdrawn;
    }

    mapping(address => Deposit[]) private _deposits;

    uint256[] public validMonths   = [0, 1, 3, 6, 12, 18, 24, 36];
    uint256[] public interestRates = [10, 160, 190, 290, 460, 460, 470, 470];

    // ✔ OpenZeppelin v6 yêu cầu truyền owner
    constructor(IERC20 _token) Ownable(msg.sender) {
        token = _token;
    }

    // --- Deposit ---
    function deposit(uint256 amount, uint256 months) external {
        require(amount > 0, "Amount must be > 0");
        require(isValidMonth(months), "Invalid months");

        token.transferFrom(msg.sender, address(this), amount);

        _deposits[msg.sender].push(
            Deposit({
                amount: amount,
                startTime: block.timestamp,
                months: months,
                withdrawn: false
            })
        );
    }

    // --- Withdraw ---
    function withdraw(uint256 depositIndex) external {
        require(depositIndex < _deposits[msg.sender].length, "Invalid index");

        Deposit storage userDeposit = _deposits[msg.sender][depositIndex];
        require(!userDeposit.withdrawn, "Already withdrawn");

        uint256 endTime = userDeposit.startTime + userDeposit.months * 30 days;
        require(block.timestamp >= endTime, "Deposit not matured");

        uint256 interest = (userDeposit.amount * getInterestRate(userDeposit.months)) / 1000;

        userDeposit.withdrawn = true;
        token.transfer(msg.sender, userDeposit.amount + interest);
    }

    // --- Check valid month ---
    function isValidMonth(uint256 months) internal view returns (bool) {
        for (uint256 i = 0; i < validMonths.length; i++) {
            if (validMonths[i] == months) return true;
        }
        return false;
    }

    // --- Interest rate ---
    function getInterestRate(uint256 months) public view returns (uint256) {
        for (uint256 i = 0; i < validMonths.length; i++) {
            if (validMonths[i] == months) return interestRates[i];
        }
        return 0;
    }

    // --- View deposits safely for ethers.js ---
    function depositsLength(address user) external view returns (uint256) {
        return _deposits[user].length;
    }

    function getDeposit(address user, uint256 index)
        external
        view
        returns (uint256 amount, uint256 startTime, uint256 months, bool withdrawn)
    {
        Deposit storage dep = _deposits[user][index];
        return (dep.amount, dep.startTime, dep.months, dep.withdrawn);
    }
}
