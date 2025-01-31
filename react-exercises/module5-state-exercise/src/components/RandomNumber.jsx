import { Component } from 'react';
import { useState } from 'react';

const RandomNumber = ({ onGenerate }) => {

    const[randomNumber, setRandomNumber] = useState(0)

    const generateRandomNumber = () => {
    
        const generatedNumber = Math.floor(Math.random() * 100)
        setRandomNumber(generatedNumber);
        onGenerate(generatedNumber);
    
    }

    return (
        <div>
            <h1>{ randomNumber }</h1>
            <button onClick={generateRandomNumber} className='generate-button'>
                Generate Random Number
            </button>
        </div>
    )
}

export default RandomNumber;