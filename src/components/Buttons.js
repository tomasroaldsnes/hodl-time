import React from 'react';
import ButtonWithdraw from "./ButtonWithdraw";

export default function Buttons(props) {
  const store = props.store;
  return (
    <p>
      <button onClick={()=>store.refreshContractData()}>Refresh</button>
      <button onClick={()=>store.setTime()}>Set Time</button>
      <button onClick={()=>store.depositEth()}>Deposit ETH</button>
      <ButtonWithdraw store={store}/>
    </p>
  );
};
