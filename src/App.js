import React, { Component } from 'react';
import './App.css';
import Greeting from "./components/Greeting";
import Buttons from "./components/Buttons";
import Details from "./components/Details";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">HODLtime.io</h1>
        </header>
        <div className="App-body">
          <Greeting/>
          <Buttons/>
          <Details/>
        </div>
      </div>
    );
  }
}

export default App;
