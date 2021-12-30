import React , { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../context/globalContext';

import '../../styles/css/header.css';

const Header = () => {
    const { web3, accounts, contract } = useContext(GlobalContext);
    const [isBuy, setIsBuy] = useState[false];

    console.log(accounts);

    const summonHero = async () => {
        console.log("asas")
    }
    
    const buyGoldToken  = async () => {
        await contract.methods.buyGoldToken().send({from: accounts[0]})
    }

    
 
    return (
        <div className="header">
           
            Hello ...{accounts} , U have ...

            <button onClick={() => {summonHero()}}>Summon Hero</button>
            <button onClick={() => {setIsBuy(!isBuy)}}>Buy Gold </button>
            <div className={`bgold ${isBuy ? 'showUI': 'hideUI'}`}>
                asdasdsaasasdasda
            </div>
        </div>
    )
}

export default Header;
