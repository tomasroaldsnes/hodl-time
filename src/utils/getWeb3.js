/**
 * Loads the Web3 object
 */
import Web3 from 'web3';

let getWeb3 = new Promise(function(resolve, reject) {
    let results;
    let provider;
    let web3 = window.web3;

    // Check if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        console.log('Injected web3 detected.');
        provider = web3.currentProvider;
    } else {
        console.log('No web3 injected, use local instance.');
        provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
    }

    // Build and resolve
    web3 = new Web3(provider);
    results = {web3: web3};
    resolve(results);
});

export default getWeb3;
