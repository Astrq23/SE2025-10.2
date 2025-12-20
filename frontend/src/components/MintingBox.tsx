// src/components/MintingBox.tsx

import React, { useState } from 'react';
import { 
    useWriteContract, 
    useWaitForTransactionReceipt, 
    useAccount, 
    useSimulateContract
} from 'wagmi';

import ZenithNFTArtifact from "../abis/ZenithNFT.json"; 
import { CONTRACT_ADDRESSES } from "../constants/addresses";

const MINT_COST_NOTE = "Hợp đồng này không yêu cầu phí mạng lưới (ETH/BNB) ngoài gas fee."; 

const MintingBox: React.FC = () => {
    // 1. Lấy thêm 'address' từ hook này để biết ví nhận NFT
    const { isConnected, address } = useAccount();
    const [mintAmount, setMintAmount] = useState(1);

    const contractAbi = ZenithNFTArtifact.abi;
    const contractAddress = CONTRACT_ADDRESSES.localhost.NFT as `0x${string}`;

    // 2. Cấu hình giao dịch (Simulate)
    const { 
        data: simulationData, 
        error: simulationError, 
        isPending: isSimulating 
    } = useSimulateContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'safeMint', 
        args: [
            // --- SỬA LỖI Ở ĐÂY ---
            // Truyền đúng 2 tham số mà Contract yêu cầu:
            address, // 1. Địa chỉ người nhận (Ví đang kết nối)
            "https://gateway.pinata.cloud/ipfs/QmExampleHash" // 2. URI của NFT (Link ảnh mẫu)
        ],
        query: {
            enabled: isConnected && !!address, 
        },
    });

    // 3. Hook Gửi giao dịch
    const { 
        data: hash, 
        writeContract, 
        isPending: isWritePending, 
        isError: isWriteError, 
        error: writeError 
    } = useWriteContract();

    // 4. Hook Chờ xác nhận
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

    // Trạng thái chung
    const isReadyToMint = isConnected && !isSimulating && simulationData?.request && !isWritePending && !isConfirming;
    const isDisabled = !isReadyToMint || isWritePending || isConfirming || simulationError !== null;

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
    
    // --- STYLES ---
    const colorRed = '#ef4444'; 
    const colorGreen = '#10b981';
    const colorYellow = '#f59e0b'; 
    const colorGray = '#9ca3af'; 
    const colorWhite = 'white';

    const renderStatus = () => {
        let errorMessage = '';

        if (simulationError) {
            errorMessage = (simulationError as any).shortMessage || simulationError.message;
            return <p style={{ color: colorRed, marginTop: '10px' }}>Lỗi Hợp Đồng: {errorMessage}</p>;
        }
        
        if (isWriteError) {
            errorMessage = (writeError as any).shortMessage || writeError?.message;
            return <p style={{ color: colorRed, marginTop: '10px' }}>Lỗi Ví/Gửi: {errorMessage}</p>;
        }
        
        if (isConfirmed) return <p style={{ color: colorGreen, fontWeight: 'bold', marginTop: '10px' }}>Mint thành công! Hash: {hash}</p>;
        if (isConfirming) return <p style={{ color: colorYellow, marginTop: '10px' }}>Đang chờ xác nhận giao dịch...</p>;
        if (isWritePending) return <p style={{ color: colorYellow, marginTop: '10px' }}>Đang chờ bạn xác nhận trong ví...</p>;
        if (isSimulating) return <p style={{ color: colorGray, marginTop: '10px' }}>Đang kiểm tra tính hợp lệ...</p>;

        return null;
    };

    const inputStyle: React.CSSProperties = {
        width: '5rem', 
        padding: '0.5rem', 
        backgroundColor: '#374151', 
        border: '1px solid #4b5563', 
        borderRadius: '0.25rem', 
        color: colorWhite,
        textAlign: 'center'
    };
    
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
        backgroundColor: '#3b82f6', 
        color: colorWhite,
    };

    const buttonDisabledStyle: React.CSSProperties = {
        ...buttonBaseStyle,
        backgroundColor: '#4b5563', 
        color: colorGray, 
        cursor: 'not-allowed',
    };

    const containerStyle: React.CSSProperties = {
        backgroundColor: '#1f2937', 
        padding: '1.5rem', 
        borderRadius: '1rem', 
        width: '100%',
        maxWidth: '24rem', 
        margin: '0 auto', 
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
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <label style={{ color: colorWhite }}>Số lượng:</label>
                <input
                    type="number"
                    min="1"
                    value={mintAmount}
                    onChange={(e) => setMintAmount(Math.max(1, parseInt(e.target.value) || 1))}
                    style={inputStyle}
                    // Tạm thời disable input này vì contract chỉ mint 1 cái/lần
                    disabled={true} 
                    title="Hiện tại chỉ hỗ trợ Mint từng cái một"
                />
            </div>

            <p style={{ fontSize: '1.125rem', color: '#fbbf24', marginBottom: '1.5rem' }}>
                Đang Mint: 1 NFT
            </p>
            
            <button
                onClick={handleMint}
                disabled={isDisabled}
                style={isDisabled ? buttonDisabledStyle : buttonActiveStyle}
                onMouseEnter={(e) => {
                    if (!isDisabled) e.currentTarget.style.backgroundColor = '#2563eb';
                }}
                onMouseLeave={(e) => {
                    if (!isDisabled) e.currentTarget.style.backgroundColor = '#3b82f6';
                }}
            >
                {isConnected ? 
                    (isSimulating ? 'Đang kiểm tra...' : (isDisabled ? 'Không thể Mint' : `Mint Ngay`)) : 
                    'Vui lòng kết nối ví'}
            </button>
            
            <div style={{ marginTop: '1rem' }}>{renderStatus()}</div>
        </div>
    );
};

export default MintingBox;