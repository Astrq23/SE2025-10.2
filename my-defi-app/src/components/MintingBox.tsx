// D:\cnpm\my-defi-app/src/components/MintingBox.tsx - ĐÃ CHUYỂN SANG INLINE STYLE

import React, { useState } from 'react';
import { 
    useWriteContract, 
    useWaitForTransactionReceipt, 
    useAccount, 
    useSimulateContract
} from 'wagmi';
// @ts-ignore
import { contractAddress, contractAbi } from '../../contracts/nftContract.ts';

// Hợp đồng này không yêu cầu phí ETH/BNB
const MINT_COST_NOTE = "Hợp đồng này không yêu cầu phí mạng lưới (ETH/BNB) ngoài gas fee."; 

const MintingBox: React.FC = () => {
    const { isConnected } = useAccount();
    const [mintAmount, setMintAmount] = useState(1);
    
    // 1. Cấu hình giao dịch (Sử dụng useSimulateContract để kiểm tra lỗi)
    const { 
        data: simulationData, 
        error: simulationError, 
        isPending: isSimulating 
    } = useSimulateContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'mintNFT',
        args: [BigInt(mintAmount)],
        query: {
            enabled: isConnected && mintAmount > 0, 
        },
    });

    // 2. Hook Gửi giao dịch
    const { 
        data: hash, 
        writeContract, 
        isPending: isWritePending, 
        isError: isWriteError, 
        error: writeError 
    } = useWriteContract();

    // 3. Hook Chờ xác nhận
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

    // Trạng thái chung
    const isReadyToMint = isConnected && !isSimulating && simulationData?.request && !isWritePending && !isConfirming;
    const isDisabled = !isReadyToMint || isWritePending || isConfirming || simulationError !== null || mintAmount <= 0;

    const handleMint = () => {
        if (!isConnected) {
            alert("Vui lòng kết nối ví để Mint NFT.");
            return;
        }

        if (simulationError) {
             const errorMessage = (simulationError as any).shortMessage || simulationError.message;
             alert(`Lỗi Hợp Đồng: ${errorMessage}`);
             return;
        }

        if (simulationData?.request) {
            try {
                writeContract(simulationData.request);
            } catch (err) {
                console.error("Lỗi khi chuẩn bị giao dịch:", err);
            }
        }
    };
    
    // ĐỊNH NGHĨA INLINE STYLES CHO UI
    const colorRed = '#ef4444'; // text-red-500
    const colorGreen = '#10b981'; // text-green-500
    const colorYellow = '#f59e0b'; // text-yellow-500
    const colorGray = '#9ca3af'; // text-gray-400
    const colorWhite = 'white';

    const renderStatus = () => {
        let errorMessage = '';

        if (simulationError) {
            errorMessage = (simulationError as any).shortMessage || simulationError.message;
            return <p style={{ color: colorRed }}>Lỗi Hợp Đồng: {errorMessage}</p>;
        }
        
        if (isWriteError) {
            errorMessage = (writeError as any).shortMessage || writeError?.message;
            return <p style={{ color: colorRed }}>Lỗi Ví/Gửi: {errorMessage}</p>;
        }
        
        if (isConfirmed) return <p style={{ color: colorGreen, fontWeight: 'bold' }}>Mint thành công! Hash: {hash}</p>;
        if (isConfirming) return <p style={{ color: colorYellow }}>Đang chờ xác nhận giao dịch...</p>;
        if (isWritePending) return <p style={{ color: colorYellow }}>Đang chờ bạn xác nhận trong ví...</p>;
        if (isSimulating) return <p style={{ color: colorGray }}>Đang kiểm tra tính hợp lệ...</p>;

        return null;
    };

    // Style cho Input
    const inputStyle: React.CSSProperties = {
        width: '5rem', 
        padding: '0.5rem', 
        backgroundColor: '#374151', // bg-gray-700
        border: '1px solid #4b5563', // border-gray-600
        borderRadius: '0.25rem', // rounded
        color: colorWhite,
        textAlign: 'center'
    };
    
    // Style cho Button
    const buttonBaseStyle: React.CSSProperties = {
        width: '100%',
        padding: '0.75rem',
        borderRadius: '0.75rem', 
        fontSize: '1.125rem', 
        fontWeight: 'bold',
        transition: 'background-color 0.2s',
        border: 'none',
        cursor: 'pointer',
    };
    
    const buttonActiveStyle: React.CSSProperties = {
        ...buttonBaseStyle,
        backgroundColor: '#3b82f6', // bg-blue-600
        color: colorWhite,
    };

    const buttonDisabledStyle: React.CSSProperties = {
        ...buttonBaseStyle,
        backgroundColor: '#4b5563', // bg-gray-600
        color: colorGray, 
        cursor: 'not-allowed',
    };

    // Style cho Container chính
    const containerStyle: React.CSSProperties = {
        backgroundColor: '#1f2937', // bg-gray-800
        padding: '1.5rem', // p-6
        borderRadius: '1rem', // rounded-xl
        width: '100%',
        maxWidth: '24rem', // max-w-sm
        margin: '0 auto', // mx-auto (căn giữa)
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        boxSizing: 'border-box'
    };
    
    return (
        <div style={containerStyle}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: colorWhite, marginBottom: '1rem' }}>
                Mint Your NFT
            </h3>
            <p style={{ color: colorGray, marginBottom: '1rem', fontSize: '0.875rem', fontStyle: 'italic' }}>
                {MINT_COST_NOTE}
            </p>
            
            {/* Input số lượng */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <label style={{ color: colorWhite }}>Số lượng:</label>
                <input
                    type="number"
                    min="1"
                    value={mintAmount}
                    onChange={(e) => setMintAmount(Math.max(1, parseInt(e.target.value) || 1))}
                    style={inputStyle}
                />
            </div>

            {/* Tổng cộng */}
            <p style={{ fontSize: '1.125rem', color: '#fbbf24', marginBottom: '1.5rem' }}>
                Số lượng Mint: {mintAmount} NFT
            </p>
            
            {/* Nút Mint */}
            <button
                onClick={handleMint}
                disabled={isDisabled}
                style={isDisabled ? buttonDisabledStyle : buttonActiveStyle}
                onMouseEnter={(e) => {
                    if (!isDisabled) {
                        e.currentTarget.style.backgroundColor = '#2563eb'; // Darker blue on hover
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isDisabled) {
                        e.currentTarget.style.backgroundColor = '#3b82f6'; // Back to base blue
                    }
                }}
            >
                {isConnected ? 
                    (isSimulating ? 'Đang kiểm tra...' : (isDisabled ? renderStatus() : `Mint ${mintAmount} NFT`)) : 
                    'Vui lòng kết nối ví'}
            </button>
            
            {/* Trạng thái giao dịch */}
            <div style={{ marginTop: '1rem' }}>{renderStatus()}</div>
        </div>
    );
};

export default MintingBox;