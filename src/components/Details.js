import React, {Component} from 'react';
import {observer} from "mobx-react/index";

@observer
class Details extends Component {
  render() {
    const state = this.props.store.state;
    return (
      <table>
        <tbody>
        <tr>
          <td>Your Address</td>
          <td>{state.currentAddress}</td>
        </tr>
        <tr>
          <td>Contract Balance</td>
          <td>{state.contractBalance}</td>
        </tr>
        <tr>
          <td>HODLer Fund</td>
          <td>{state.hodlerFund}</td>
        </tr>
        <tr>
          <td>Your Balance</td>
          <td>{state.userBalance}</td>
        </tr>
        <tr>
          <td>Current Time</td>
          <td>{Math.floor(Date.now() / 1000)}</td>
        </tr>
        <tr>
          <td>Your Time Lock</td>
          <td>{state.userTimeLock}</td>
        </tr>
        <tr>
          <td>Seconds Remaining</td>
          <td>{state.timeRemaining}</td>
        </tr>
        </tbody>
      </table>
    );
  }
}

export default Details;

