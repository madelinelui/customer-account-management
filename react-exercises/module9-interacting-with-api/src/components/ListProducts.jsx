import { Component } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListProducts = () => {

    const api = 'http://localhost:8088/api/v1/products';

    const navigate = useNavigate();

    const [productList, setProductList] = useState([

        
    ])

    const loadProducts = () => {
        axios.get(api)
            .then(response => { setProductList(response.data) })
            .catch(error => {console.log('Unable to load data')})
    }

    useEffect(() => {
        loadProducts(); // Fetch products when the component mounts
    }, []);

    const navigateToRegisterProduct = () => {
        navigate("/register-products")
    }

    return (
    <div>
        <button onClick={navigateToRegisterProduct}>Register New Product</button>
     
    </div>
    )

}

export default ListProducts;