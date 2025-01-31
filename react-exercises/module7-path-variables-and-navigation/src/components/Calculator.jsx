import { Component } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Calculator = () => {

    const [number1, setNumber1] = useState(0);
    const [number2, setNumber2] = useState(0);

    const navigate = useNavigate();

    const performCalculation = (event) => {

        const num1 = Number(number1);
        const num2 = Number(number2);
        const sum = num1 + num2;

        navigate("/show-results/" + sum);

    }



    return (
        <form onSubmit={performCalculation}>
            <input name="number1" type="value" value={number1}
                onChange={ event => setNumber1(event.target.value)}></input>
            +
            <input name="number2" type="value" value={number2}
                onChange={ event => setNumber2(event.target.value)}></input>
            <button type="submit">Calculate</button>

        </form>
    )
}

export default Calculator;
