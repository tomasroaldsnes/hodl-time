import React, { Component } from 'react';
import './App.css';
import { observer } from 'mobx-react';
import Greeting from "./components/Greeting";
import Buttons from "./components/Buttons";
import Details from "./components/Details";

@observer
class App extends Component {
  // Load contract data
  async componentWillMount() {
    await this.props.store.refreshContractData();
  }

  render() {
    const store = this.props.store;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">HODLtime.io</h1>
        </header>
        <div className="App-body">
          <Greeting/>
          <Buttons/>
          <Details store={store}/>
        </div>
      </div>
    );
  }
}

export default App;
