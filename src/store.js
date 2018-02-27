import { observable } from 'mobx'

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
}