import 'dotenv/config'
import { ContractFactory, JsonRpcProvider, Wallet } from 'ethers'
import EchoSwapFactory from '../build/EchoSwapFactory.json'

const provider = new JsonRpcProvider('https://open-campus-codex-sepolia.drpc.org')

const wallet = new Wallet(process.env.WALLET_PVT_KEY || '0x', provider)

async function main() {
  const factory = new ContractFactory(EchoSwapFactory.abi, EchoSwapFactory.bytecode, wallet)
  const contract = await factory.deploy()

  console.log('deployed to : ', await contract.getAddress())
}

main()