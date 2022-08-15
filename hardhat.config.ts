import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "@openzeppelin/hardhat-upgrades";

import "hardhat-abi-exporter";
import "hardhat-gas-reporter";
import { Networks } from "./config/networks";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: Networks,
  solidity: {
    version: "0.8.15",
    settings: {
      optimizer: {
        enabled: false,
        runs: 2000
      }
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  gasReporter: {
    enabled: true,
    token: 'MATIC'
  },
  abiExporter: {
    path: "./abi",
    runOnCompile: true,
    clear: true,
    
  }
};

export default config;
