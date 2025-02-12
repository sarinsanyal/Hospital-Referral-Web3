import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { contractAddress } from '../config';
import abi from '../utils/abi.json'

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    connectWallet();
  }, [account]);

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      // contracts
      const contractInstance = new web3.eth.Contract(abi, contractAddress);
      setContract(contractInstance);

    } else {
      alert('MetaMask not detected. Please install MetaMask.');
    }
  };


  const admitPatient = async (patientId) => {
    if (!contract) {
      alert("Connect Wallet First!");
      return;
    }

    try {
      await contract.methods.admitPatient(patientId).send({ from: account });
      alert(`Patient ${patientId} admitted successfully!`);
    } catch (error) {
      alert(`Error admitting patient: ${error.message}`);
    }
  };



  return (
    <>
      {!account ? (
        <>
          <button onClick={connectWallet}>Connect Wallet</button>
        </>
      ) : (
        <>
          <p>Account connected: {account}</p>
          <button onClick={() => { admitPatient(12345678901234567890n) }}>Admit paitent</button>
        </>
      )}
    </>
  );
}

export default App;
