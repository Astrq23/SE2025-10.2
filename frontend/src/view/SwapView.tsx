import React from 'react';
import SwapInterface from '../components/SwapInterface';

/**
 * Swap View - Feature 2: Token Swap/DEX
 * Displays the token swapping interface where users can:
 * - Select token pairs to swap
 * - Enter swap amounts and view estimates
 * - Execute token swaps with 0.3% fee
 * - View fee breakdown and slippage
 */
const SwapView: React.FC = () => {
  return <SwapInterface />;
};

export default SwapView;
