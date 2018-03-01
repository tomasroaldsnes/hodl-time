/**
 * Interfaces with a Solidity contract using Truffle
 */
import Web3 from './getWeb3';
import TruffleContract from 'truffle-contract';

export default class Web3Interface {
  // Initialize web3 if not already present
  initWeb3() {
    if (typeof this.web3 === 'undefined') {
      Web3.then((result) => {
        this.web3 = result.web3;
      });
    }
  }

  // Get the list of accounts
  async getAccounts() {
    await this.initWeb3();
    const web3 = this.web3;
    return new Promise(function (resolve, reject) {
      web3.eth.getAccounts(function (error, accounts) {
        resolve(accounts);
      });
    })
  }

  // Get the current account
  async getCurrentAccount() {
    await this.initWeb3();
    let accounts = await this.getAccounts();
    return accounts[0];
  }

  // Load and return any contract
  async getContract(contractName) {
    await this.initWeb3();
    if (typeof this.contractName === 'undefined') {
      this.contractName = await this.getDeployed(contractName);
    }
    return this.contractName;
  }

  // Get a deployed contract
  async getDeployed(contractName) {
    const contractJson = require('../../build/contracts/'+contractName+'.json');
    const web3Provider = this.web3.currentProvider;
    return new Promise(function (resolve, reject) {
      let Contract = TruffleContract(contractJson);
      Contract.setProvider(web3Provider);
      Contract.deployed().then(function (instance) {
        resolve(instance);
      });
    });
  }
}