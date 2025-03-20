const Web3 = require('web3');
const INVToken = require('../../../smart-contracts/src/INVToken.json');

class BlockchainService {
  constructor() {
    this.web3 = null;
    this.tokenContract = null;
  }

  async initialize() {
    // Initialize Web3 with provider
    this.web3 = new Web3(process.env.ETHEREUM_NODE_URL);
    
    // Initialize token contract
    this.tokenContract = new this.web3.eth.Contract(
      INVToken.abi,
      process.env.TOKEN_CONTRACT_ADDRESS
    );
  }

  async getTokenBalance(address) {
    return await this.tokenContract.methods.balanceOf(address).call();
  }

  async transferTokens(from, to, amount) {
    const tx = this.tokenContract.methods.transfer(to, amount);
    const gas = await tx.estimateGas({ from });
    
    return await tx.send({
      from,
      gas,
    });
  }

  async mintRewardTokens(address, amount) {
    const tx = this.tokenContract.methods.mint(address, amount);
    const gas = await tx.estimateGas({ from: process.env.ADMIN_ADDRESS });
    
    return await tx.send({
      from: process.env.ADMIN_ADDRESS,
      gas,
    });
  }

  async stakeTokens(address, amount) {
    const tx = this.tokenContract.methods.stake(amount);
    const gas = await tx.estimateGas({ from: address });
    
    return await tx.send({
      from: address,
      gas,
    });
  }

  async getStakedBalance(address) {
    return await this.tokenContract.methods.stakedBalance(address).call();
  }
}

module.exports = new BlockchainService(); 