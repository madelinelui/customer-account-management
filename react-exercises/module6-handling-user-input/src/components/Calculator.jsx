import { Component } from 'react';
import { useState } from 'react';

const Calculator = () => {

    const [number1, setNumber1] = useState(0);
    const [number2, setNumber2] = useState(0);
    const [message, setMessage] = useState("");

    const performCalculation = (event) => {

        const num1 = Number(number1);
        const num2 = Number(number2);
        const sum = num1 + num2;

        setMessage(`${num1} + ${num2} = ${sum}`);
        event.preventDefault();
    }

    const resetPage = () => {
        setNumber1(0);
        setNumber2(0);
        setMessage("");
    }

    return (
        <form onSubmit={performCalculation}>
            <input name="number1" type="value" value={number1}
                onChange={ event => setNumber1(event.target.value)}></input>
            +
            <input name="number2" type="value" value={number2}
                onChange={ event => setNumber2(event.target.value)}></input>
            <button type="submit">Calculate</button>
            <button onClick={ resetPage} type="reset">Reset</button>
            <p>
                <h1>{message}</h1>
            </p>
        </form>
    )
}

export default Calculator;
