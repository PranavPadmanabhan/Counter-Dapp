import React, { useState, useEffect } from 'react';
import './App.css';
import { ethers } from 'ethers';

const App = () => {

  const [count, setcount] = useState(0);
  const address = '0x93286917c45dA5337bF8368986ca203D3ef4077a';
  const abi = [
    {
      "inputs": [],
      "name": "decrement",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "increment",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "count",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  const connectWallet = () =>{
   if(window.ethereum){
      window.ethereum.request({method:"eth_requestAccounts"}).then((accounts) => {
      })
   }
   else alert("Add Metamask")
  }

  useEffect(() => {
    connectWallet();
    setInterval(() => {
      getCount()
    },2000)
  }, [count])
  

  const getCount = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address,abi,provider);
    const countVal = await contract.count();
    setcount(countVal.toString())
  }


  const increment = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address,abi,signer);
    contract.functions.increment();

  }
  const decrement = () => {
    if(count !== 0){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address,abi,signer);
    contract.functions.decrement();
    }

  }

    return (
      <div className="App">
        <button onClick={connectWallet} className='connect'>connect wallet</button>
        <h1>Counter</h1>
       <div className="container">
         <button onClick={decrement}>Decrement</button>
         <span className="count">{count}</span>
         <button onClick={increment}>Increment</button>
       </div>
      </div>
    );
  
}

export default App;
