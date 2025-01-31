import { Component } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ResultPage = () => {

    const params = useParams();
    const sum = params.sum;
    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate("/");
    }

    return (
        <div>
            <h1>{sum}</h1>
            <button type="button" onClick={ navigateToHome}>Do another calculation</button>
        </div>
    )
}

export default ResultPage;