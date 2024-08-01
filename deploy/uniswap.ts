import "dotenv/config";
import { ethers } from "hardhat";
import { JsonRpcProvider } from "ethers";
import { writeFileSync, readFileSync } from "fs";

async function main() {
  if (!process.env.DEPLOYER_PRIVATE_KEY) throw "Provide deployer private key";

  const provider = new JsonRpcProvider(
    "https://open-campus-codex-sepolia.drpc.org"
  );

  const [deployer] = await ethers.getSigners();

  console.log("Deployer : ", deployer.address);

  const EchoSwapFactory = await ethers.getContractFactory("EchoSwapFactory");
  const echoSwap = await EchoSwapFactory.deploy(deployer.address);
  await echoSwap.waitForDeployment();

  console.log("EchoSwapFactory : ", await echoSwap.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
