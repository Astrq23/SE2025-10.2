import React, { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { toast } from 'react-toastify';
import NFTMarketplaceArtifact from '../abis/NFTMarketplace.json';
import { CONTRACT_ADDRESSES } from '../constants/addresses';

interface NFTListing {
  listingId: number;
  seller: string;
  nftContract: string;
  tokenId: number;
  price: string;
  active: boolean;
  listedTime: number;
}

const NFTMarketplace: React.FC = () => {
  const { isConnected, address } = useAccount();
  const [listings, setListings] = useState<NFTListing[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedListing, setSelectedListing] = useState<NFTListing | null>(null);

  const contractAbi = NFTMarketplaceArtifact.abi;
  const contractAddress = CONTRACT_ADDRESSES.localhost.MARKETPLACE as `0x${string}`;

  const { writeContractAsync } = useWriteContract();

  // Lấy danh sách listings
  const { data: activeListings, refetch: refetchListings } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getActiveListings',
    query: { enabled: !!contractAddress }
  });

  useEffect(() => {
    if (activeListings && Array.isArray(activeListings)) {

      setListings([]);
    }
  }, [activeListings]);

  const handleBuyNFT = async (listingId: number, price: string) => {
    if (!isConnected) {
      toast.warn('Please connect your wallet');
      return;
    }

    setIsLoading(true);
    try {
      const priceInWei = BigInt(parseFloat(price) * 10 ** 18);

      const tx = await writeContractAsync({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'buyNFT',
        args: [listingId],
        value: priceInWei
      });

      toast.success('NFT purchased successfully!');
      refetchListings();
      setSelectedListing(null);
    } catch (error: any) {
      toast.error(error?.message || 'Purchase failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '40px 20px',
      color: 'white'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#4ade80' }}>
          NFT Marketplace
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#b8c0cc' }}>
          Buy and sell unique NFTs in the community
        </p>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <div style={{
          backgroundColor: '#1e293b',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #334155'
        }}>
          <p style={{ color: '#b8c0cc', marginBottom: '10px' }}>Active Listings</p>
          <p style={{ fontSize: '2rem', color: '#4ade80', fontWeight: 'bold' }}>
            {listings.length}
          </p>
        </div>

        <div style={{
          backgroundColor: '#1e293b',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #334155'
        }}>
          <p style={{ color: '#b8c0cc', marginBottom: '10px' }}>Marketplace Fee</p>
          <p style={{ fontSize: '2rem', color: '#facc15', fontWeight: 'bold' }}>
            2.5%
          </p>
        </div>

        <div style={{
          backgroundColor: '#1e293b',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #334155'
        }}>
          <p style={{ color: '#b8c0cc', marginBottom: '10px' }}>Total Volume</p>
          <p style={{ fontSize: '2rem', color: '#60a5fa', fontWeight: 'bold' }}>
            0 ETH
          </p>
        </div>
      </div>

      {/* Listings Grid */}
      {listings.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          backgroundColor: '#1e293b',
          borderRadius: '16px',
          border: '1px solid #334155'
        }}>
          <p style={{ fontSize: '1.2rem', color: '#b8c0cc', marginBottom: '20px' }}>
            📭 No NFTs listed yet
          </p>
          <p style={{ color: '#88909c' }}>
            Be the first to list your NFT in our marketplace!
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {listings.map((nft, index) => (
            <div
              key={index}
              onClick={() => setSelectedListing(nft)}
              style={{
                backgroundColor: '#1e293b',
                borderRadius: '12px',
                border: '1px solid #334155',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.2s, border-color 0.2s',
                transform: selectedListing?.listingId === nft.listingId ? 'scale(1.05)' : 'scale(1)',
                borderColor: selectedListing?.listingId === nft.listingId ? '#4ade80' : '#334155'
              }}
            >
              {/* NFT Image Placeholder */}
              <div style={{
                width: '100%',
                aspectRatio: '1',
                backgroundColor: '#0f172a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem'
              }}>
                🖼️
              </div>

              {/* NFT Info */}
              <div style={{ padding: '15px' }}>
                <p style={{ color: '#b8c0cc', marginBottom: '10px' }}>
                  Token ID: {nft.tokenId}
                </p>
                <p style={{
                  fontSize: '1.4rem',
                  color: '#facc15',
                  fontWeight: 'bold',
                  marginBottom: '10px'
                }}>
                  {parseFloat(nft.price).toFixed(4)} ETH
                </p>
                <p style={{ color: '#88909c', fontSize: '0.9rem' }}>
                  Seller: {nft.seller.substring(0, 6)}...{nft.seller.substring(-4)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Purchase Modal */}
      {selectedListing && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#1e293b',
            padding: '40px',
            borderRadius: '16px',
            border: '1px solid #334155',
            maxWidth: '500px',
            width: '90%'
          }}>
            <h2 style={{ color: '#facc15', marginBottom: '20px' }}>
              Purchase NFT
            </h2>

            <div style={{
              backgroundColor: '#0f172a',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '3rem', marginBottom: '10px' }}>🖼️</p>
              <p style={{ color: '#b8c0cc', marginBottom: '10px' }}>
                Token ID: {selectedListing.tokenId}
              </p>
              <p style={{
                fontSize: '1.8rem',
                color: '#4ade80',
                fontWeight: 'bold'
              }}>
                {selectedListing.price} ETH
              </p>
            </div>

            {/* Fee Breakdown */}
            <div style={{
              backgroundColor: '#0f172a',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px',
              color: '#b8c0cc',
              fontSize: '0.9rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>Price</span>
                <span>{selectedListing.price} ETH</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Marketplace Fee (2.5%)</span>
                <span style={{ color: '#facc15' }}>
                  {(parseFloat(selectedListing.price) * 0.025).toFixed(4)} ETH
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setSelectedListing(null)}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: '#334155',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#b8c0cc',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>

              <button
                onClick={() => handleBuyNFT(selectedListing.listingId, selectedListing.price)}
                disabled={isLoading || !isConnected}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: isLoading || !isConnected ? '#334155' : '#4ade80',
                  border: 'none',
                  borderRadius: '8px',
                  color: isLoading || !isConnected ? '#888' : 'black',
                  fontWeight: 'bold',
                  cursor: isLoading || !isConnected ? 'not-allowed' : 'pointer'
                }}
              >
                {!isConnected ? 'Connect Wallet' : isLoading ? 'Processing...' : 'Buy Now'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* <div style={{
        marginTop: '40px',
        padding: '30px',
        backgroundColor: '#1e293b',
        borderRadius: '16px',
        border: '1px solid #334155'
      }}>
        <h3 style={{ color: '#facc15', marginBottom: '20px' }}>ℹ️ Marketplace Information</h3>
        <ul style={{ color: '#b8c0cc', lineHeight: '1.8' }}>
          <li>🔒 All NFTs are securely stored on the blockchain</li>
          <li>💰 A 2.5% fee is deducted from each sale</li>
          <li>⚡ Transactions are instant and verified</li>
          <li>🎨 You can list your own NFTs for sale</li>
          <li>📜 View complete transaction history</li>
        </ul>
      </div> */}
    </div>
  );
};

export default NFTMarketplace;
