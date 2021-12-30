
import React, { useState, useEffect } from "react";
import HeroFactoryContract from "./contracts/HeroFactory.json";
import getWeb3 from "./getWeb3";
import Header from './components/header/header';
import Content from './components/content/content';
import { GlobalProvider } from "./context/globalContext";

import "./styles/css/App.css";

function App() {
    // initialize the state variables of the application
    const [web3, setWeb3] = useState(undefined);
    const [accounts, setAccounts] = useState(undefined);
    const [contract, setContract] = useState(undefined);
    const globalVariable = { web3: web3, accounts: accounts, contract: contract };


    
    // equivalent to the componentDidMount function of older React frameworks
    useEffect( () => {
        const init = async () => {
            try {
                // Get network provider (typically MetaMask) and web3 instance
                const web3 = await getWeb3();

                // Use web3 to get the user's accounts from the provider (MetaMask)
                const accounts = await web3.eth.getAccounts();

                // Get the contract instance
                const networkId = await web3.eth.net.getId();
                const deployedNetwork = HeroFactoryContract.networks[networkId];
                const instance = new web3.eth.Contract(
                    HeroFactoryContract.abi,
                    deployedNetwork && deployedNetwork.address,
                );
                // Set web3, accounts, contract to the state
                setWeb3(web3);
                setContract(instance);
                setAccounts(accounts);
            } catch (error) {
                // Catch any errors for any of the above operations
                alert(
                    `Failed to load web3, accounts, or contract. Did you migrate the contract or install MetaMask? Check console for details.`,
                );
                console.error(error);
            }
        };
        init();
    }, []);

    useEffect(() => {
        const GetAllHeroesByOwner = async (owner) => {
            try {
                const list = await contract.methods
                    .getHeroesByOwner(owner)
                    .call({ from: accounts[0] });

                console.log(list);
            } catch (error) {
                console.log(error);
            }
        };
        web3 && accounts && contract && GetAllHeroesByOwner(accounts[0]);
    }, [web3, accounts, contract]);



    if (typeof(web3) === 'undefined') {
        return <div className="App">Loading Web3, accounts, and contract... Reload page</div>;
    }

    return (
        <GlobalProvider value={globalVariable}>
            <div className="App">
            <Header/>
            <Content/>
            </div>
        </GlobalProvider>
    );

}

export default App;