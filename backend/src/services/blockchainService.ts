import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import { AppError } from '../utils/AppError';
import { User } from '../models/User';

// Contract ABI
const TOKEN_ABI: AbiItem[] = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    type: 'function',
  },
];

export class BlockchainService {
  private web3: Web3;
  private contract: Contract;
  private contractAddress: string;

  constructor() {
    // Initialize Web3 with provider
    const provider = process.env.ETHEREUM_PROVIDER || 'http://localhost:8545';
    this.web3 = new Web3(provider);

    // Contract address
    this.contractAddress = process.env.TOKEN_CONTRACT_ADDRESS || '';

    // Initialize contract
    this.contract = new this.web3.eth.Contract(TOKEN_ABI, this.contractAddress);
  }

  async getBalance(address: string): Promise<string> {
    try {
      const balance = await this.contract.methods.balanceOf(address).call();
      return this.web3.utils.fromWei(balance, 'ether');
    } catch (error) {
      throw new AppError('Failed to get balance', 500);
    }
  }

  async transferTokens(fromAddress: string, toAddress: string, amount: string): Promise<boolean> {
    try {
      const weiAmount = this.web3.utils.toWei(amount, 'ether');
      
      // Get the user's private key from environment variables or secure storage
      const privateKey = process.env.ETHEREUM_PRIVATE_KEY;
      if (!privateKey) {
        throw new AppError('Private key not configured', 500);
      }

      // Create transaction
      const tx = await this.contract.methods
        .transfer(toAddress, weiAmount)
        .send({ from: fromAddress, gas: 200000 });

      return tx.status;
    } catch (error) {
      throw new AppError('Failed to transfer tokens', 500);
    }
  }

  async updateUserWallet(userId: string, walletAddress: string): Promise<void> {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new AppError('User not found', 404);
      }

      // Get balance for the new wallet
      const balance = await this.getBalance(walletAddress);

      // Update user's wallet address and balance
      user.walletAddress = walletAddress;
      user.balance = parseFloat(balance);
      await user.save();
    } catch (error) {
      throw new AppError('Failed to update wallet', 500);
    }
  }

  async verifyTransaction(txHash: string): Promise<boolean> {
    try {
      const receipt = await this.web3.eth.getTransactionReceipt(txHash);
      return receipt.status;
    } catch (error) {
      throw new AppError('Failed to verify transaction', 500);
    }
  }
} 