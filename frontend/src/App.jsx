import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import ABI from '../utils/abi.json';
import { contractAddress } from '../config';
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

function App() {
  const [account, setAccount] = useState(null);
  const [count, setCount] = useState(0);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    async function loadBlockchainData() {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3Instance.eth.getAccounts();
        const contractInstance = new web3Instance.eth.Contract(ABI, contractAddress);

        setWeb3(web3Instance);
        setAccount(accounts[0]);
        setContract(contractInstance);

        // Fetch current count
        const currentCount = await contractInstance.methods.getCount().call();
        setCount(currentCount);
      }
    }
    loadBlockchainData();
  }, []);

  const increment = async () => {
    if (contract && account) {
      await contract.methods.increment().send({ from: account });
      const updatedCount = await contract.methods.getCount().call();
      setCount(updatedCount);
    }
  };

  const decrement = async () => {
    if (contract && account) {
      await contract.methods.decrement().send({ from: account });
      const updatedCount = await contract.methods.getCount().call();
      setCount(updatedCount);
    }
  };

  return (
    <>
      <ConnectButton />
      <div>
        <h1>Counter: {count}</h1>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </div>
    </>
  );
}

export default App;
