// D:\cnpm\my-defi-app/contracts/MintingNFT.sol (ĐÃ CẬP NHẬT)

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// SỬ DỤNG IMPORT TIÊU CHUẨN TỪ OPENEZEPPELIN
import "@openzeppelin/contracts/token/ERC721/ERC721.sol"; 
import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol"; // ECDSA không cần thiết cho Minting cơ bản

contract MintingNFT is ERC721 {
    // address validatorAddress; // Bỏ đi nếu không dùng logic xác thực chữ ký

    using Counters for Counters.Counter;
    Counters.Counter currentTokenId;

    // Constructor chỉ cần Name và Symbol
    constructor(
        string memory name,
        string memory symbol
        // address validator // Bỏ đi nếu không dùng
    ) ERC721(name, symbol) {
        // validatorAddress = validator; // Bỏ đi nếu không dùng
    }

    // Hàm Mint công khai
    function mintNFT(
        uint256 quantity
    ) public { // Đổi external thành public
        require(quantity > 0, "quantity must be greater than zero");

        // Logic Minting
        for (uint256 i = 0; i < quantity; i++) { 
            currentTokenId.increment(); // Tăng Token ID trước
            uint256 newTokenId = currentTokenId.current();
            _safeMint(msg.sender, newTokenId); // Sử dụng _safeMint để đảm bảo an toàn
        }
    }
}