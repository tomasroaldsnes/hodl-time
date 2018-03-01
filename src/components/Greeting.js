import React, { Component } from 'react';
import {observer} from "mobx-react/index";

@observer
class Greeting extends Component {
  render() {
    // Named conditions for readability
    let hasTimeLock = (this.props.timeRemaining > 0);
    let hasBalance = (this.props.userBalance > 0);

    // User has time-lock but no balance
    if (hasTimeLock && !hasBalance) {
      return (
        <div>
          <p>Welcome to your HODLtime account.</p>
          <p>
            You do not have any ether locked away. Go ahead and click
            the "Deposit ETH" button to add some. Remember though, you
            won't be able to withdraw any of it for {this.props.timeRemaining} seconds.
          </p>
        </div>
      );
    }

    // User has balance and it is time-locked
    if (hasBalance && hasTimeLock) {
      return (
        <div>
          <p>Welcome to your HODLtime account.</p>
          <p>
            Your balance of {this.props.userBalance} ETH is locked away for the
            next {this.props.timeRemaining} seconds. Go kill some time. You can
            click the "Set Time" button to lock it up even longer or click
            the "Deposit ETH" button to add more to your balance.
          </p>
          <p>
            If you really want to withdraw right now, you can do so by
            clicking the "10% Penalty" button. This will withdraw 90% of
            your balance to your wallet and send 10% to the contract to
            be dispersed as rewards to the true HODLers.
          </p>
        </div>
      );
    }

    // User balance but no time-lock
    if (hasBalance && !hasTimeLock) {
      return (
        <div>
          <p>Welcome to your HODLtime account.</p>
          <p>
            You have a balance of {this.props.userBalance} ETH that is ready
            to withdraw. Go ahead and click the "Withdraw" button. If you're
            not ready, click "Set Time" to lock it away.
          </p>
        </div>
      );
    }

    // Default: no time-lock and no balance is a new user
    return (
      <div>
        <p>Welcome to HODLtime. You do not currently have a time-locked savings account.</p>
        <p>
          To create one, press the "Set Time" button and specify how many minutes you
          would like your account to be locked for. You can always increase the time,
          but you cannot decrease it without penalty.
        </p>
      </div>
    );
  };
}

export default Greeting;