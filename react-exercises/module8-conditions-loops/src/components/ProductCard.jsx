import React from 'react';
import { Component } from 'react';
import '../styles/ProductCard.css'

const ProductCard = (props) => {

    const {name, description, price} = props.product
    
    return (
        <div className='ProductCard'>
            <h2>{name}</h2>
            <span>{description}</span>
            <span>Price: £{price}</span>
            <div>
                <button>Add to basket</button>
            </div>
            
        </div>
    )
}

export default ProductCard;