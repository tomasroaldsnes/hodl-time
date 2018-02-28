import React, {Component} from 'react';
import {observer} from "mobx-react/index";

@observer
class ButtonWithdraw extends Component {
  render() {
    const store = this.props.store;
    // Named conditions for readability
    let hasTimeLock = (store.state.timeRemaining > 0);
    let hasBalance = (store.state.userBalance > 0);

    // No balance (disable button)
    if (!hasBalance) {
      return (
        <button className="presetButton" disabled={true}>Withdraw</button>
      );
    }

    // Locked (withdraw penalty)
    if (hasTimeLock) {
      return (
        <button className="presetButton" onClick={() => store.earlyWithdraw()}>10% Penalty</button>
      );
    }

    // Default withdraw
    return (
      <button className="presetButton" onClick={() => store.withdraw()}>Withdraw</button>
    );
  };
}

export default ButtonWithdraw;
