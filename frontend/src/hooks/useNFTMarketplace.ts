import { useState, useCallback } from 'react';
import { useWriteContract } from 'wagmi';
import NFTMarketplaceArtifact from '../abis/NFTMarketplace.json';
import { CONTRACT_ADDRESSES } from '../constants/addresses';

export interface NFTListing {
  listingId: number;
  seller: string;
  nftContract: string;
  tokenId: number;
  price: string;
  active: boolean;
  listedTime: number;
}

export const useNFTMarketplace = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const contractAbi = NFTMarketplaceArtifact.abi;
  const contractAddress = CONTRACT_ADDRESSES.localhost.MARKETPLACE as `0x${string}`;

  const { writeContractAsync } = useWriteContract();

  const listNFT = useCallback(async (nftContract: string, tokenId: number, price: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const priceWei = BigInt(parseFloat(price) * 10 ** 18);

      const tx = await writeContractAsync({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'listNFT',
        args: [nftContract, tokenId, priceWei]
      });
      setIsLoading(false);
      return tx;
    } catch (err: any) {
      const errorMsg = err?.message || 'List NFT failed';
      setError(errorMsg);
      setIsLoading(false);
      throw err;
    }
  }, [contractAddress, contractAbi, writeContractAsync]);

  const unlistNFT = useCallback(async (listingId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const tx = await writeContractAsync({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'unlistNFT',
        args: [listingId]
      });
      setIsLoading(false);
      return tx;
    } catch (err: any) {
      const errorMsg = err?.message || 'Unlist NFT failed';
      setError(errorMsg);
      setIsLoading(false);
      throw err;
    }
  }, [contractAddress, contractAbi, writeContractAsync]);

  const updatePrice = useCallback(async (listingId: number, newPrice: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const priceWei = BigInt(parseFloat(newPrice) * 10 ** 18);

      const tx = await writeContractAsync({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'updatePrice',
        args: [listingId, priceWei]
      });
      setIsLoading(false);
      return tx;
    } catch (err: any) {
      const errorMsg = err?.message || 'Update price failed';
      setError(errorMsg);
      setIsLoading(false);
      throw err;
    }
  }, [contractAddress, contractAbi, writeContractAsync]);

  const buyNFT = useCallback(async (listingId: number, priceETH: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const priceWei = BigInt(parseFloat(priceETH) * 10 ** 18);

      const tx = await writeContractAsync({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'buyNFT',
        args: [listingId],
        value: priceWei
      });
      setIsLoading(false);
      return tx;
    } catch (err: any) {
      const errorMsg = err?.message || 'Buy NFT failed';
      setError(errorMsg);
      setIsLoading(false);
      throw err;
    }
  }, [contractAddress, contractAbi, writeContractAsync]);

  return {
    listNFT,
    unlistNFT,
    updatePrice,
    buyNFT,
    isLoading,
    error
  };
};

export default useNFTMarketplace;
