// src/components/MintingBox.tsx

import React, { useState } from 'react';
import { useWriteContract, useAccount } from 'wagmi';
import { toast } from 'react-toastify'; 

import ZenithNFTArtifact from "../abis/ZenithNFT.json"; 
import { CONTRACT_ADDRESSES } from "../constants/addresses";

// English Note
const MINT_COST_NOTE = "This contract requires no network fees (ETH/BNB) beyond gas fees."; 

const MintingBox: React.FC = () => {
    // 1. Wallet Info
    const { isConnected, address } = useAccount();
    
    // State for Amount
    const [mintAmount, setMintAmount] = useState<number>(1);
    const [isProcessing, setIsProcessing] = useState(false);

    const contractAbi = ZenithNFTArtifact.abi;
    const contractAddress = CONTRACT_ADDRESSES.localhost.NFT as `0x${string}`;

    // Write Hook
    const { writeContractAsync } = useWriteContract();

    // --- HANDLERS ---
    const handleDecrease = () => {
        if (mintAmount > 1) setMintAmount(prev => prev - 1);
    };

    const handleIncrease = () => {
        if (mintAmount < 10) setMintAmount(prev => prev + 1); // Max 10
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        if (!isNaN(val) && val >= 1 && val <= 50) {
            setMintAmount(val);
        }
    };

    // --- MINT FUNCTION ---
    const handleMint = async () => {
        if (!isConnected) {
            toast.warn("Please connect your wallet to Mint NFTs.");
            return;
        }

        setIsProcessing(true); 

        try {
            // Loop for Batch Minting (since contract supports single mint)
            for (let i = 0; i < mintAmount; i++) {
                
                toast.info(`📝 Requesting signature ${i + 1}/${mintAmount}...`, { autoClose: 2000 });

                // Call Wallet
                const txHash = await writeContractAsync({
                    address: contractAddress,
                    abi: contractAbi,
                    functionName: 'safeMint',
                    args: [
                        address, // Receiver
                        "https://gateway.pinata.cloud/ipfs/QmExampleHash" // URI
                    ],
                });

                // Toast Transaction Sent
                toast.success(`🚀 Transaction ${i + 1} sent! Hash: ${txHash.slice(0, 6)}...`);
                
                // Small delay
                await new Promise(r => setTimeout(r, 1000));
            }

            toast.success("✅ Minting process completed!");

        } catch (error: any) {
            console.error("Mint Error:", error);
            if (error.code === 4001 || error.message.includes("User denied")) {
                toast.warn("You denied the transaction.");
            } else {
                toast.error("An error occurred while Minting.");
            }
        } finally {
            setIsProcessing(false); 
        }
    };
    
    // --- STYLES ---
    const colorWhite = 'white';
    const colorGray = '#9ca3af'; 

    const inputStyle: React.CSSProperties = {
        width: '4rem', 
        padding: '0.5rem', 
        backgroundColor: '#374151', 
        border: '1px solid #4b5563', 
        borderRadius: '0.25rem', 
        color: colorWhite,
        textAlign: 'center',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        outline: 'none'
    };
    
    const controlButtonStyle: React.CSSProperties = {
        background: '#4b5563',
        border: 'none',
        color: 'white',
        fontSize: '1.2rem',
        width: '36px',
        height: '36px',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.2s'
    };

    const buttonBaseStyle: React.CSSProperties = {
        width: '100%',
        padding: '0.75rem',
        borderRadius: '0.75rem', 
        fontSize: '1.125rem', 
        fontWeight: 'bold',
        transition: 'background-color 0.2s',
        border: 'none',
        cursor: isProcessing ? 'wait' : 'pointer', 
    };
    
    const buttonActiveStyle: React.CSSProperties = {
        ...buttonBaseStyle,
        backgroundColor: '#3b82f6', 
        color: colorWhite,
        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
    };

    const buttonDisabledStyle: React.CSSProperties = {
        ...buttonBaseStyle,
        backgroundColor: '#4b5563', 
        color: colorGray, 
        cursor: 'not-allowed',
    };

    const containerStyle: React.CSSProperties = {
        backgroundColor: '#1f2937', 
        padding: '2rem', 
        borderRadius: '1rem', 
        width: '100%',
        maxWidth: '28rem', 
        margin: '0 auto', 
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
        boxSizing: 'border-box',
        border: '1px solid #374151'
    };
    
    return (
        <div style={containerStyle}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: colorWhite, marginBottom: '0.5rem' }}>
                Mint Your NFT
            </h3>
            <p style={{ color: colorGray, marginBottom: '2rem', fontSize: '0.9rem', fontStyle: 'italic', lineHeight: '1.4' }}>
                {MINT_COST_NOTE}
            </p>
            
            {/* AMOUNT SELECTION */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', backgroundColor: '#111827', padding: '1rem', borderRadius: '0.75rem' }}>
                <label style={{ color: colorWhite, fontWeight: '600' }}>Amount:</label>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                     <button 
                        onClick={handleDecrease}
                        disabled={isProcessing}
                        style={{...controlButtonStyle, opacity: isProcessing ? 0.5 : 1}}
                     >
                        -
                     </button>

                     <input
                        type="number"
                        min="1"
                        max="50"
                        value={mintAmount}
                        onChange={handleInputChange}
                        disabled={isProcessing} 
                        style={inputStyle}
                    />

                     <button 
                        onClick={handleIncrease}
                        disabled={isProcessing}
                        style={{...controlButtonStyle, opacity: isProcessing ? 0.5 : 1}}
                     >
                        +
                     </button>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                 <span style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '1rem', background: 'rgba(251, 191, 36, 0.1)', padding: '0.5rem 1rem', borderRadius: '2rem' }}>
                    🔥 Total Mint: {mintAmount} NFT
                 </span>
            </div>
            
            {/* MINT BUTTON */}
            <button
                onClick={handleMint}
                disabled={!isConnected || isProcessing} 
                style={(!isConnected || isProcessing) ? buttonDisabledStyle : buttonActiveStyle}
                onMouseEnter={(e) => {
                    if (isConnected && !isProcessing) e.currentTarget.style.backgroundColor = '#2563eb';
                }}
                onMouseLeave={(e) => {
                    if (isConnected && !isProcessing) e.currentTarget.style.backgroundColor = '#3b82f6';
                }}
            >
                {!isConnected ? 'Please Connect Wallet' : 
                 isProcessing ? `Processing ${mintAmount} NFT...` : 
                 `Mint Now`}
            </button>
        </div>
    );
};

export default MintingBox;