// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title TokenSwap
 * @dev Simple DEX contract để swap giữa 2 token
 * Cơ chế: x*y = k (Uniswap style)
 */
contract TokenSwap is Ownable, ReentrancyGuard {
    
    constructor() Ownable(msg.sender) {}
    
    // Lưu thông tin trading pair
    struct TradingPair {
        address tokenA;
        address tokenB;
        uint256 reserveA;
        uint256 reserveB;
        bool active;
    }
    
    // Mapping: pairId => TradingPair
    mapping(uint256 => TradingPair) public tradingPairs;
    uint256 public pairCount;
    
    // Fee: 0.3% (tính bằng basis points, 3 = 0.3%)
    uint256 public constant FEE_PERCENT = 3;
    uint256 public constant FEE_DENOMINATOR = 1000;
    
    // Tổng fee collected
    mapping(address => uint256) public feeCollected;
    
    // Events
    event PairCreated(uint256 indexed pairId, address tokenA, address tokenB);
    event LiquidityAdded(
        uint256 indexed pairId,
        uint256 amountA,
        uint256 amountB,
        address indexed provider
    );
    event LiquidityRemoved(
        uint256 indexed pairId,
        uint256 amountA,
        uint256 amountB,
        address indexed provider
    );
    event Swapped(
        uint256 indexed pairId,
        address indexed user,
        address tokenIn,
        uint256 amountIn,
        address tokenOut,
        uint256 amountOut
    );
    
    /**
     * @dev Tạo trading pair mới
     * @param _tokenA Địa chỉ token A
     * @param _tokenB Địa chỉ token B
     */
    function createPair(address _tokenA, address _tokenB) 
        external 
        onlyOwner 
        returns (uint256) 
    {
        require(_tokenA != address(0) && _tokenB != address(0), "Invalid addresses");
        require(_tokenA != _tokenB, "Tokens must be different");
        
        uint256 pairId = pairCount;
        tradingPairs[pairId] = TradingPair({
            tokenA: _tokenA,
            tokenB: _tokenB,
            reserveA: 0,
            reserveB: 0,
            active: true
        });
        
        pairCount++;
        emit PairCreated(pairId, _tokenA, _tokenB);
        
        return pairId;
    }
    
    /**
     * @dev Thêm liquidity vào pool
     * @param _pairId ID của pair
     * @param _amountA Số lượng tokenA
     * @param _amountB Số lượng tokenB
     */
    function addLiquidity(
        uint256 _pairId,
        uint256 _amountA,
        uint256 _amountB
    ) external nonReentrant {
        TradingPair storage pair = tradingPairs[_pairId];
        require(pair.active, "Pair not active");
        require(_amountA > 0 && _amountB > 0, "Amounts must be greater than 0");
        
        // Transfer tokens từ user
        require(
            IERC20(pair.tokenA).transferFrom(msg.sender, address(this), _amountA),
            "TokenA transfer failed"
        );
        require(
            IERC20(pair.tokenB).transferFrom(msg.sender, address(this), _amountB),
            "TokenB transfer failed"
        );
        
        // Cập nhật reserves
        pair.reserveA += _amountA;
        pair.reserveB += _amountB;
        
        emit LiquidityAdded(_pairId, _amountA, _amountB, msg.sender);
    }
    
    /**
     * @dev Xoá liquidity từ pool
     * @param _pairId ID của pair
     * @param _amountA Số lượng tokenA muốn rút
     */
    function removeLiquidity(uint256 _pairId, uint256 _amountA) 
        external 
        nonReentrant 
    {
        TradingPair storage pair = tradingPairs[_pairId];
        require(pair.active, "Pair not active");
        require(_amountA > 0, "Amount must be greater than 0");
        require(pair.reserveA >= _amountA, "Insufficient reserve");
        
        // Tính proportional amount của tokenB
        uint256 amountB = (_amountA * pair.reserveB) / pair.reserveA;
        
        // Cập nhật reserves
        pair.reserveA -= _amountA;
        pair.reserveB -= amountB;
        
        // Chuyển tokens cho user
        require(
            IERC20(pair.tokenA).transfer(msg.sender, _amountA),
            "TokenA transfer failed"
        );
        require(
            IERC20(pair.tokenB).transfer(msg.sender, amountB),
            "TokenB transfer failed"
        );
        
        emit LiquidityRemoved(_pairId, _amountA, amountB, msg.sender);
    }
    
    /**
     * @dev Swap token
     * @param _pairId ID của pair
     * @param _tokenIn Token muốn sell
     * @param _amountIn Số lượng token sell
     * @return amountOut Số lượng token nhận được
     */
    function swap(
        uint256 _pairId,
        address _tokenIn,
        uint256 _amountIn
    ) external nonReentrant returns (uint256) {
        TradingPair storage pair = tradingPairs[_pairId];
        require(pair.active, "Pair not active");
        require(_amountIn > 0, "Amount must be greater than 0");
        
        address tokenOut;
        uint256 reserveIn;
        uint256 reserveOut;
        
        // Xác định token in/out
        if (_tokenIn == pair.tokenA) {
            tokenOut = pair.tokenB;
            reserveIn = pair.reserveA;
            reserveOut = pair.reserveB;
        } else if (_tokenIn == pair.tokenB) {
            tokenOut = pair.tokenA;
            reserveIn = pair.reserveB;
            reserveOut = pair.reserveA;
        } else {
            revert("Invalid token");
        }
        
        // Transfer input token từ user
        require(
            IERC20(_tokenIn).transferFrom(msg.sender, address(this), _amountIn),
            "Transfer failed"
        );
        
        // Tính fee
        uint256 amountInAfterFee = _amountIn * (FEE_DENOMINATOR - FEE_PERCENT) / FEE_DENOMINATOR;
        uint256 fee = _amountIn - amountInAfterFee;
        
        // Công thức: x*y = k (constant product formula)
        // newReserveOut = reserveOut - (reserveOut * reserveIn) / (reserveIn + amountInAfterFee)
        uint256 amountOut = (amountInAfterFee * reserveOut) / (reserveIn + amountInAfterFee);
        
        require(amountOut > 0, "Insufficient output amount");
        require(amountOut <= reserveOut, "Insufficient reserve");
        
        // Cập nhật reserves
        if (_tokenIn == pair.tokenA) {
            pair.reserveA += amountInAfterFee;
            pair.reserveB -= amountOut;
        } else {
            pair.reserveB += amountInAfterFee;
            pair.reserveA -= amountOut;
        }
        
        // Lưu fee
        feeCollected[_tokenIn] += fee;
        
        // Chuyển output token cho user
        require(
            IERC20(tokenOut).transfer(msg.sender, amountOut),
            "Transfer failed"
        );
        
        emit Swapped(_pairId, msg.sender, _tokenIn, _amountIn, tokenOut, amountOut);
        
        return amountOut;
    }
    
    /**
     * @dev Tính toán output amount từ input (quote)
     * @param _pairId ID của pair
     * @param _tokenIn Token input
     * @param _amountIn Số lượng input
     * @return Số lượng output estimate
     */
    function getQuote(
        uint256 _pairId,
        address _tokenIn,
        uint256 _amountIn
    ) external view returns (uint256) {
        TradingPair storage pair = tradingPairs[_pairId];
        require(pair.active, "Pair not active");
        
        uint256 reserveIn;
        uint256 reserveOut;
        
        if (_tokenIn == pair.tokenA) {
            reserveIn = pair.reserveA;
            reserveOut = pair.reserveB;
        } else if (_tokenIn == pair.tokenB) {
            reserveIn = pair.reserveB;
            reserveOut = pair.reserveA;
        } else {
            revert("Invalid token");
        }
        
        // Tính fee
        uint256 amountInAfterFee = _amountIn * (FEE_DENOMINATOR - FEE_PERCENT) / FEE_DENOMINATOR;
        
        // Tính output
        uint256 amountOut = (amountInAfterFee * reserveOut) / (reserveIn + amountInAfterFee);
        
        return amountOut;
    }
    
    /**
     * @dev Rút fee (chỉ owner)
     * @param _token Token để rút fee
     */
    function withdrawFee(address _token) external onlyOwner nonReentrant {
        uint256 amount = feeCollected[_token];
        require(amount > 0, "No fee collected");
        
        feeCollected[_token] = 0;
        require(IERC20(_token).transfer(owner(), amount), "Transfer failed");
    }
    
    /**
     * @dev Lấy thông tin pair
     * @param _pairId ID của pair
     * @return TradingPair info
     */
    function getPair(uint256 _pairId) external view returns (TradingPair memory) {
        return tradingPairs[_pairId];
    }
}
