// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title NFTMarketplace
 * @dev Marketplace để mua bán NFT giữa các user
 */
contract NFTMarketplace is Ownable, ReentrancyGuard {
    constructor() Ownable(msg.sender) {}
    
    // Thông tin listing
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool active;
        uint256 listedTime;
    }
    
    // Mapping: listingId => Listing
    mapping(uint256 => Listing) public listings;
    uint256 public listingCount;
    
    // Mapping: nftContract => tokenId => listingId (để track listing)
    mapping(address => mapping(uint256 => uint256)) public tokenListingId;
    
    // Marketplace fee: 2.5% (25 = 2.5%)
    uint256 public constant FEE_PERCENT = 25;
    uint256 public constant FEE_DENOMINATOR = 1000;
    
    // Fee collected
    uint256 public feesCollected;
    
    // Events
    event NFTListed(
        uint256 indexed listingId,
        address indexed seller,
        address indexed nftContract,
        uint256 tokenId,
        uint256 price
    );
    
    event NFTUnlisted(
        uint256 indexed listingId,
        address indexed seller,
        address indexed nftContract,
        uint256 tokenId
    );
    
    event NFTPriceUpdated(
        uint256 indexed listingId,
        uint256 oldPrice,
        uint256 newPrice
    );
    
    event NFTSold(
        uint256 indexed listingId,
        address indexed seller,
        address indexed buyer,
        address nftContract,
        uint256 tokenId,
        uint256 price,
        uint256 fee
    );
    
    /**
     * @dev List NFT cho bán
     * @param _nftContract Địa chỉ NFT contract
     * @param _tokenId ID của NFT
     * @param _price Giá bán (tính bằng wei)
     */
    function listNFT(
        address _nftContract,
        uint256 _tokenId,
        uint256 _price
    ) external nonReentrant {
        require(_nftContract != address(0), "Invalid NFT contract");
        require(_price > 0, "Price must be greater than 0");
        
        // Kiểm tra user có sở hữu NFT
        IERC721 nft = IERC721(_nftContract);
        require(nft.ownerOf(_tokenId) == msg.sender, "Not NFT owner");
        
        // Kiểm tra NFT đã được approve
        require(
            nft.isApprovedForAll(msg.sender, address(this)) ||
            nft.getApproved(_tokenId) == address(this),
            "NFT not approved"
        );
        
        // Kiểm tra chưa listing trước đó
        uint256 existingListingId = tokenListingId[_nftContract][_tokenId];
        if (existingListingId != 0) {
            require(!listings[existingListingId].active, "Already listed");
        }
        
        // Tạo listing mới
        uint256 listingId = ++listingCount;
        listings[listingId] = Listing({
            seller: msg.sender,
            nftContract: _nftContract,
            tokenId: _tokenId,
            price: _price,
            active: true,
            listedTime: block.timestamp
        });
        
        tokenListingId[_nftContract][_tokenId] = listingId;
        
        emit NFTListed(listingId, msg.sender, _nftContract, _tokenId, _price);
    }
    
    /**
     * @dev Hủy listing (chỉ seller)
     * @param _listingId ID của listing
     */
    function unlistNFT(uint256 _listingId) external nonReentrant {
        Listing storage listing = listings[_listingId];
        require(listing.active, "Listing not active");
        require(listing.seller == msg.sender, "Only seller can unlist");
        
        listing.active = false;
        
        emit NFTUnlisted(
            _listingId,
            listing.seller,
            listing.nftContract,
            listing.tokenId
        );
    }
    
    /**
     * @dev Cập nhật giá bán (chỉ seller)
     * @param _listingId ID của listing
     * @param _newPrice Giá mới
     */
    function updatePrice(uint256 _listingId, uint256 _newPrice) 
        external 
        nonReentrant 
    {
        Listing storage listing = listings[_listingId];
        require(listing.active, "Listing not active");
        require(listing.seller == msg.sender, "Only seller can update");
        require(_newPrice > 0, "Price must be greater than 0");
        
        uint256 oldPrice = listing.price;
        listing.price = _newPrice;
        
        emit NFTPriceUpdated(_listingId, oldPrice, _newPrice);
    }
    
    /**
     * @dev Mua NFT
     * @param _listingId ID của listing
     */
    function buyNFT(uint256 _listingId) external payable nonReentrant {
        Listing storage listing = listings[_listingId];
        require(listing.active, "Listing not active");
        require(msg.value >= listing.price, "Insufficient payment");
        require(listing.seller != msg.sender, "Cannot buy own NFT");
        
        address seller = listing.seller;
        address nftContract = listing.nftContract;
        uint256 tokenId = listing.tokenId;
        uint256 price = listing.price;
        
        // Tính marketplace fee
        uint256 fee = (price * FEE_PERCENT) / FEE_DENOMINATOR;
        uint256 sellerAmount = price - fee;
        
        // Hủy listing
        listing.active = false;
        
        // Transfer NFT từ seller cho buyer
        IERC721(nftContract).transferFrom(seller, msg.sender, tokenId);
        
        // Transfer tiền cho seller
        (bool sellerSuccess, ) = payable(seller).call{value: sellerAmount}("");
        require(sellerSuccess, "Payment to seller failed");
        
        // Lưu fee
        feesCollected += fee;
        
        // Refund thừa nếu có
        uint256 excess = msg.value - price;
        if (excess > 0) {
            (bool refundSuccess, ) = payable(msg.sender).call{value: excess}("");
            require(refundSuccess, "Refund failed");
        }
        
        emit NFTSold(_listingId, seller, msg.sender, nftContract, tokenId, price, fee);
    }
    
    /**
     * @dev Lấy thông tin listing
     * @param _listingId ID của listing
     * @return Listing info
     */
    function getListing(uint256 _listingId) external view returns (Listing memory) {
        return listings[_listingId];
    }
    
    /**
     * @dev Kiểm tra NFT đã listed hay chưa
     * @param _nftContract Địa chỉ NFT contract
     * @param _tokenId ID của NFT
     * @return Trả về listing ID (0 nếu chưa list)
     */
    function getListingByNFT(address _nftContract, uint256 _tokenId) 
        external 
        view 
        returns (uint256) 
    {
        uint256 listingId = tokenListingId[_nftContract][_tokenId];
        if (listingId > 0 && listings[listingId].active) {
            return listingId;
        }
        return 0;
    }
    
    /**
     * @dev Lấy tất cả active listings (helper function)
     * @return Array of active listing IDs
     */
    function getActiveListings() external view returns (uint256[] memory) {
        uint256 activeCount = 0;
        
        // Đếm active listings
        for (uint256 i = 1; i <= listingCount; i++) {
            if (listings[i].active) {
                activeCount++;
            }
        }
        
        // Tạo array
        uint256[] memory activeListings = new uint256[](activeCount);
        uint256 index = 0;
        
        for (uint256 i = 1; i <= listingCount; i++) {
            if (listings[i].active) {
                activeListings[index] = i;
                index++;
            }
        }
        
        return activeListings;
    }
    
    /**
     * @dev Rút fee (chỉ owner)
     */
    function withdrawFees() external onlyOwner nonReentrant {
        uint256 amount = feesCollected;
        require(amount > 0, "No fees collected");
        
        feesCollected = 0;
        (bool success, ) = payable(owner()).call{value: amount}("");
        require(success, "Withdrawal failed");
    }
    
    /**
     * @dev Fallback để nhận ETH
     */
    receive() external payable {}
}
