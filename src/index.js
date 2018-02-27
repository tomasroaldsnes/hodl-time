import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Store from './store';

ReactDOM.render(<App store={new Store()} />, document.getElementById('root'));
registerServiceWorker();
