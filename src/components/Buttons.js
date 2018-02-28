import React from 'react';

export default function Buttons(props) {
  const store = props.store;
  return (
    <p>
      <button onClick={()=>store.refreshContractData()}>Refresh</button>
      <button onClick={()=>store.setTime()}>Set Time</button>
      <button onClick={()=>store.depositEth()}>Deposit ETH</button>
      <button onClick={()=>store.withdraw()}>Withdraw</button>
    </p>
  );
};
