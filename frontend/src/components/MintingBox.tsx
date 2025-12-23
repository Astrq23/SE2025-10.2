import React, { useState } from 'react';
import { useWriteContract, useAccount } from 'wagmi';
import { toast } from 'react-toastify'; 

import ZenithNFTArtifact from "../abis/ZenithNFT.json"; 
import { CONTRACT_ADDRESSES } from "../constants/addresses";

const MINT_COST_NOTE = "This contract requires no network fees (ETH/BNB) beyond gas fees."; 

const MintingBox: React.FC = () => {
    const { isConnected, address } = useAccount();
    const [mintAmount, setMintAmount] = useState<number>(1);
    const [isProcessing, setIsProcessing] = useState(false);

    const contractAbi = ZenithNFTArtifact.abi;
    const contractAddress = CONTRACT_ADDRESSES.localhost.NFT as `0x${string}`;
    const { writeContractAsync } = useWriteContract();

    // --- HANDLERS ---
    const handleDecrease = () => {
        if (mintAmount > 1) setMintAmount(prev => prev - 1);
    };

    const handleIncrease = () => {
        if (mintAmount < 10) setMintAmount(prev => prev + 1); 
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        if (!isNaN(val) && val >= 1 && val <= 50) {
            setMintAmount(val);
        } else if (e.target.value === "") {
            setMintAmount(0);
        }
    };

    const handleMint = async () => {
        if (!isConnected) {
            toast.warn("Please connect your wallet to Mint NFTs.");
            return;
        }
        setIsProcessing(true); 
        try {
            for (let i = 0; i < mintAmount; i++) {
                toast.info(`📝 Requesting signature ${i + 1}/${mintAmount}...`, { autoClose: 2000 });
                const txHash = await writeContractAsync({
                    address: contractAddress,
                    abi: contractAbi,
                    functionName: 'safeMint',
                    args: [address, "https://gateway.pinata.cloud/ipfs/QmExampleHash"],
                });
                toast.success(`🚀 Transaction ${i + 1} sent!`);
                await new Promise(r => setTimeout(r, 1000));
            }
            toast.success("✅ Minting process completed!");
        } catch (error: any) {
            console.error("Mint Error:", error);
            toast.error("An error occurred while Minting.");
        } finally {
            setIsProcessing(false); 
        }
    };
    
    // --- STYLES ---
    const colorWhite = 'white';
    const colorGray = '#9ca3af'; 

    const inputStyle: React.CSSProperties = {
        width: '4.5rem', 
        padding: '0.5rem', 
        backgroundColor: '#374151', 
        border: '1px solid #4b5563', 
        borderRadius: '0.75rem', 
        color: colorWhite,
        textAlign: 'center',
        fontSize: '1.4rem',
        fontWeight: 'bold',
        outline: 'none',
    };
    
    const controlButtonStyle: React.CSSProperties = {
        background: '#4b5563',
        border: 'none',
        color: 'white',
        fontSize: '1.4rem',
        width: '44px',
        height: '44px',
        borderRadius: '12px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s'
    };

    return (
        <div style={{
            backgroundColor: '#1f2937', 
            padding: '2rem', 
            borderRadius: '1.5rem', 
            width: '100%',
            maxWidth: '28rem', 
            margin: '0 auto', 
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)',
            border: '1px solid #374151'
        }}>
            {/* CSS ĐỂ XÓA MŨI TÊN INPUT NUMBER */}
            <style>
                {`
                    input::-webkit-outer-spin-button,
                    input::-webkit-inner-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
                    }
                    input[type=number] {
                        -moz-appearance: textfield;
                    }
                `}
            </style>

            <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: colorWhite, marginBottom: '0.5rem', textAlign: 'center' }}>
                Mint Your NFT
            </h3>
            <p style={{ color: colorGray, marginBottom: '2.5rem', fontSize: '0.85rem', textAlign: 'center' }}>
                {MINT_COST_NOTE}
            </p>
            
            {/* AMOUNT SELECTION */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', backgroundColor: '#111827', padding: '1.25rem', borderRadius: '1.25rem' }}>
                <label style={{ color: colorWhite, fontWeight: '600' }}>Quantity</label>
                <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                     <button onClick={handleDecrease} disabled={isProcessing} style={controlButtonStyle}> - </button>
                     <input
                        type="number"
                        value={mintAmount}
                        onChange={handleInputChange}
                        disabled={isProcessing} 
                        style={inputStyle}
                    />
                     <button onClick={handleIncrease} disabled={isProcessing} style={controlButtonStyle}> + </button>
                </div>
            </div>

            {/* SUMMARY SECTION */}
            <div style={{ backgroundColor: '#111827', borderRadius: '1rem', padding: '1.25rem', marginBottom: '2.5rem', border: '1px solid #374151' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                    <span style={{ color: colorGray }}>Unit Price:</span>
                    <span style={{ color: '#10b981', fontWeight: 'bold' }}>Free</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                    <span style={{ color: colorGray }}>Total Quantity:</span>
                    <span style={{ color: colorWhite }}>{mintAmount} NFT{mintAmount > 1 ? 's' : ''}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                    <span style={{ color: colorGray }}>Network:</span>
                    <span style={{ color: colorWhite }}>Ethereum Local</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', paddingTop: '0.75rem', borderTop: '1px solid #374151', marginTop: '0.25rem' }}>
                    <span style={{ color: colorGray }}>Recipient:</span>
                    <span style={{ color: '#3b82f6', fontFamily: 'monospace' }}>
                        {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not Connected'}
                    </span>
                </div>
            </div>
            
            {/* MINT BUTTON - Tăng margin top để đẩy xuống */}
            <button
                onClick={handleMint}
                disabled={!isConnected || isProcessing} 
                style={{
                    width: '100%',
                    padding: '1.1rem', 
                    borderRadius: '0.75rem', 
                    fontSize: '1.1rem', 
                    fontWeight: 'bold',
                    border: 'none',
                    backgroundColor: (!isConnected || isProcessing) ? '#4b5563' : '#3b82f6',
                    color: colorWhite,
                    cursor: isProcessing ? 'wait' : 'pointer',
                    marginTop: '0.5rem', 
                    boxShadow: isConnected && !isProcessing ? '0 4px 14px 0 rgba(59, 130, 246, 0.39)' : 'none'
                }}
            >
                {!isConnected ? 'Connect Wallet' : isProcessing ? 'Processing...' : 'Mint Now'}
            </button>
        </div>
    );
};

export default MintingBox;