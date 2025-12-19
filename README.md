# Inferix Token Contracts

This repository contains the smart contracts of tokens, including tokens for the **Testnet phase** of the [Inferix](https://inferix.io/) project. These contracts enable users to interact with the EVM Testnet environment and test a simple ERC20 token implementation.

## Project Overview

Inferix aims to decentralize verification processes. The Testnet phase focuses on:

- Testing the functionality and robustness of the ERC20 token contract.
- Preparing for the Mainnet launch by gathering feedback and ensuring security.

## Features

- **ERC20 Token Contract**: Implements a basic ERC20 token for the Testnet phase.
- **Test Environment**: Provides a controlled environment to validate contract interactions and performance.

## Repository Structure

- **contracts/**: Contains the Solidity smart contracts.
- **ignition/modules/**: Includes the deployment script `InferixToken.js` and `InferixUSDToken.js` for the Testnet phase.
- **test/**: Contains unit tests to ensure contract functionality.
- **hardhat.config.js**: Configuration for the Hardhat development environment.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- [Hardhat](https://hardhat.org/)
- Access to the Arbitrum One and IoTeX Testnet network

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/inferixgpu/token-smartcontract-evm.git
   cd token-smartcontract-evm
   ```

2. Install dependencies:

   ```bash
   npm install
   ```
2. Create .env file at project's root folder

   ```
   PRIVATE_KEYS=<Contract owner's wallet Private Key>
   ETHERSCAN_API_KEY=8KWKNUKA2NWKK4SWS76F54D3JUE442Y88E
   RPC_IOTEX_TESTNET=https://babel-api.testnet.iotex.io
   RPC_IOTEX_MAINNET=https://babel-api.mainnet.iotex.io
   RPC_ARBITRIUM_SEPOLIA=https://sepolia-rollup.arbitrum.io/rpc
   RPC_ARBITRIUM=https://arb1.arbitrum.io/rpc
   ETHERSCAN_ARB_APIKEY=8KWKNUKA2NWKK4SWS76F54D3JUE442Y88E
   ```

4. Compile the contracts:

   ```bash
   npx hardhat compile
   ```

5. Run the tests:

   ```bash
   npx hardhat test
   ```

### Deployment

1. Configure the blockchain network details in `hardhat.config.js`.
2. Deploy the ERC20 token contract using the Ignition module:

   ```bash
   npx hardhat ignition deploy ignition/modules/InferixToken.js --network iotex_testnet
   ```

### Interaction

Use the provided scripts in the `ignition/modules/` directory to interact with the deployed ERC20 token contract, such as transferring tokens or checking balances.

## Testing

The Testnet phase includes comprehensive tests to ensure the contracts function as expected. Run the test suite with:

```bash
npx hardhat test
```

## Feedback

As this is the Testnet phase, feedback is crucial for identifying issues and improving the contracts. Please report any bugs or suggestions via GitHub issues or contact us directly.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contribution

Contributions are welcome! Open an issue or pull request with your ideas or improvements.

## Contact

For more information, visit [Inferix](https://inferix.io) or contact us via [contact@inferix.io](mailto:contact@inferix.io).

