// D:\cnpm\my-defi-app/src/view/MintView.tsx

import React from 'react';
import MintingBox from '../components/MintingBox';
import AppPagination from '../components/AppPagination';
import FeaturesSection from '../components/FeaturesSection';

const MintView: React.FC = () => {
    return (
        // Main Container: Full width 100%
        <div className="min-h-screen bg-defi-bg text-white" style={{ width: '100%', boxSizing: 'border-box' }}>
            <div
                style={{
                    width: '100%',          // Required 100%
                    maxWidth: '100%',       // Remove old limit
                    margin: '0',
                    // --- CHANGED HERE: Use % instead of fixed px ---
                    padding: '40px 8%',     // Left/Right 8% for breathing room
                    // -----------------------------------------------
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'    // Center content inside
                }}
            >
                {/* Title Section */}
                <div style={{ textAlign: 'center', marginBottom: '50px', maxWidth: '800px' }}>
                    <h1 style={{ color: '#facc15', fontSize: '3rem', marginBottom: '20px', fontWeight: 'bold' }}>
                        NFT Minting Station
                    </h1>
                    <p style={{ color: '#b8c0cc', fontSize: '1.3rem' }}>
                        Create and own unique NFTs on the blockchain. Mint your NFTs quickly, securely, and seamlessly.
                    </p>
                </div>

                {/* Minting Box Area */}
                <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '80px'
                }}>
                    <MintingBox />
                </div>

                {/* Detailed Info: Full Width Grid Layout */}
                <div
                    style={{
                        padding: '40px',
                        backgroundColor: '#1e293b',
                        borderRadius: '20px',
                        border: '1px solid #334155',
                        width: '100%',       // Occupy full parent width
                        boxSizing: 'border-box'
                    }}
                >
                    <h2 style={{ color: '#facc15', fontSize: '2rem', marginBottom: '40px', textAlign: 'center' }}>
                        About NFT Minting
                    </h2>

                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // Flexible columns
                        gap: '40px' 
                    }}>
                        {/* Item 1 */}
                        <div>
                            <h3 style={{ color: '#4ade80', marginBottom: '15px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                🎨 Create Unique NFTs
                            </h3>
                            <p style={{ color: '#b8c0cc', lineHeight: '1.6' }}>
                                Mint NFTs with custom designs and metadata. Each NFT is unique and can represent art, collectibles, or digital assets.
                            </p>
                        </div>

                        {/* Item 2 */}
                        <div>
                            <h3 style={{ color: '#4ade80', marginBottom: '15px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                ⚡ Fast Minting
                            </h3>
                            <p style={{ color: '#b8c0cc', lineHeight: '1.6' }}>
                                Minting transactions are processed quickly on the blockchain with optimized gas fees and instant confirmation.
                            </p>
                        </div>

                        {/* Item 3 */}
                        <div>
                            <h3 style={{ color: '#4ade80', marginBottom: '15px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                🔒 Permanent Ownership
                            </h3>
                            <p style={{ color: '#b8c0cc', lineHeight: '1.6' }}>
                                Your NFTs are securely stored on the blockchain, immutable and unerasable by anyone.
                            </p>
                        </div>

                        {/* Item 4 */}
                        <div>
                            <h3 style={{ color: '#4ade80', marginBottom: '15px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                🌐 Multi-Chain Support
                            </h3>
                            <p style={{ color: '#b8c0cc', lineHeight: '1.6' }}>
                                Mint NFTs on various blockchains such as BNB Chain, Ethereum, and Layer 2 networks.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pagination */}
            <div
                style={{
                    width: '100%',
                    padding: '0 0 60px',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <AppPagination />
            </div>

             {/* Footer Features: Updated padding to 8% to match */}
             <div style={{ width: '100%', padding: '0 8%', boxSizing: 'border-box' }}>
                <FeaturesSection />
            </div>
        </div>
    );
};

export default MintView;