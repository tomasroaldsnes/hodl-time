import { observable } from 'mobx'
import Web3Interface from "./utils/Web3Interface";

export default class Store {
  // Application state object
  @observable state = {
    currentAddress: null,
    contractBalance: 0,
    hodlerFund: 0,
    userBalance: 0,
    userTimeLock: 0,
    accounts: null,
    timeRemaining: 0,
  };

  // Load web3 interface components
  constructor() {
    this.web3Interface = new Web3Interface();
  }

  // Refresh all contract data
  async refreshContractData() {
    let contract = await this.web3Interface.getContract('Accounts');

    // Get the current user address
    this.state.currentAddress = await this.web3Interface.getCurrentAccount();

    // Get contract balance
    let balance = await contract.getContractBalance();
    this.state.contractBalance = balance.toNumber() / 10**18;

    // Get HODLer fund balance
    let contractAddress = await contract.getContractAddress();
    balance = await contract.getBalance(contractAddress);
    this.state.hodlerFund = balance.toNumber() / 10**18;

    // Get current address balance
    balance = await contract.getBalance(this.state.currentAddress);
    balance = balance.toNumber();

    // Temporary bug fix
    if (balance <= 10) this.state.userBalance = 0;
    else this.state.userBalance = balance / 10**18;

    // Get current user time lock and calculate time remaining
    let timestamp = await contract.getTimeLock({from: this.state.currentAddress});
    this.state.userTimeLock = timestamp.toNumber();
    this.state.timeRemaining = this.state.userTimeLock - Math.floor(Date.now() / 1000);
    if (this.state.timeRemaining <= 0) this.state.timeRemaining = 0;
  }

  // Set time-lock on current address account
  async setTime() {
    // Calculate future timestamp and execute transaction
    let minutes = prompt("Enter number of minutes to lock for");
    let timestamp = Math.floor(Date.now() / 1000);
    let futureTime = timestamp + (minutes * 60);

    // Execute transaction
    let contract = await this.web3Interface.getContract('Accounts');
    console.log(await contract.setTimeLock(futureTime, {from: this.state.currentAddress}));

    // Update state
    await this.refreshContractData();
  }

  // Deposit ether to the contract under the current address
  async depositEth() {
    // Collect user input
    let amount = prompt("Enter an amount in ether (ETH)");

    // Execute transaction
    let contract = await this.web3Interface.getContract('Accounts');
    console.log(await contract.deposit({
      from: this.state.currentAddress,
      value: (amount * 10**18)
    }));

    // Update state
    await this.refreshContractData();
  }

  // Withdraw full balance belonging to current address
  async withdraw() {
    let contract = await this.web3Interface.getContract('Accounts');
    console.log(await contract.withdraw({from: this.state.currentAddress}));
    await this.refreshContractData();
  }

  // Withdraw early and incur a penalty
  async earlyWithdraw() {
    let contract = await this.web3Interface.getContract('Accounts');
    console.log(await contract.earlyWithdraw({from: this.state.currentAddress}));
    await this.refreshContractData();
  }
}
