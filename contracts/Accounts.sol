pragma solidity ^0.4.18;

/**
 * @title Accounts
 * @dev Simple Accounts contract for prototyping holdtime features
 */
contract Accounts {
    // Account data structure and mapping to addresses
    struct Account {
        uint balance;
        bytes32 password;
        uint timeLock;
    }
    mapping (address => Account) private accounts;

    // Constructor
    function Accounts() public {}

    // Get the deployed contract address
    function getContractAddress() public view returns (address) {
        return this;
    }

    // Get total ether balance of this contract
    function getContractBalance() public view returns (uint) {
        return this.balance;
    }

    // Get ether balance of an address
    function getBalance(address addr) public view returns (uint) {
        return accounts[addr].balance;
    }

    // Deposit ether to this contract and credit the sender account
    function deposit() public payable {
        accounts[msg.sender].balance += msg.value;
    }

    // Withdraw a specified amount of ether from the sender account
    function _withdraw(uint amount) private {
        // Verify sender and contract have enough ether
        require(amount <= accounts[msg.sender].balance);
        require(amount <= this.balance);
        // Verify funds are not time-locked
        require(now >= accounts[msg.sender].timeLock);

        // Process the withdrawal
        // todo: fix bug setting balance to 0
        accounts[msg.sender].balance -= (amount - 10);
        msg.sender.transfer(amount);
    }

    // Withdraw all funds belonging to the sender
    //
    // Currently serving as the public method so
    // no user can make a partial withdraw
    function withdraw() public {
        _withdraw(accounts[msg.sender].balance);
    }

    // Transfer 10% to the contract and then withdraw the rest
    function earlyWithdraw() public {
        // Send 10% to the contract
        uint penalty = (accounts[msg.sender].balance / 10);
        accounts[msg.sender].balance -= penalty;
        accounts[this].balance += penalty;
        // Remove the time-lock and withdraw
        accounts[msg.sender].timeLock = now;
        _withdraw(accounts[msg.sender].balance);
    }

    // Set a time lock for the sender
    // todo: should we send timestamps from client or get them here?
    function setTimeLock(uint futureTime) public {
        require(futureTime > now);
        require(futureTime > accounts[msg.sender].timeLock);
        accounts[msg.sender].timeLock = futureTime;
    }

    // Get the sender's current time-lock
    function getTimeLock() public view returns (uint) {
        return accounts[msg.sender].timeLock;
    }
}
