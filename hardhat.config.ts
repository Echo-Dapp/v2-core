import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: { version: "0.5.16", settings: { optimizer: true } },
  networks: {
    testnet: {
      url: "https://open-campus-codex-sepolia.drpc.org",
      chainId: 656476.,
      accounts: [`${process.env.DEPLOYER_PRIVATE_KEY}`],
    },
  },
};

export default config;
