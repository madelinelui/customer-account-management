import { Component } from 'react';
import RandomNumber from './RandomNumber'
import { useState, useRef, useEffect } from 'react';

const Game = () => {

    const [currentValue, setCurrentValue] = useState(0);
    const previousValue = useRef(0);
    useEffect(() => {
        previousValue.current = currentValue;
    }, [currentValue]);

    const [message, setMessage] = useState("");
    const [userPred, setUserPred] = useState("");

    const buttonClicked = (prediction) => {
        setUserPred(prediction);

        if (prediction === "higher") {
            setMessage("Your prediction is higher. Click generate random number to find out.")
        } else {
            setMessage("Your prediction is lower. Click generate random number to find out.")
        }
    }

    const checkPrediction = (newValue) => {
        setCurrentValue(newValue);
        if ((newValue > previousValue.current && userPred === "higher") ||
        (newValue < previousValue.current && userPred === "lower")) {
            setMessage("You guessed correctly!")
        } else {
            setMessage("Your guess was wrong.")
        }
            
    }

    return (
        <div>
            <RandomNumber onGenerate={checkPrediction} />
            <h1>Will the next number be higher or lower?</h1>
            <button onClick={() => buttonClicked("higher")}>
                Higher</button>
            <button onClick={() => buttonClicked("lower")}>
                Lower</button>
            <h3>{ message}</h3>
        </div>
    )
}

export default Game;