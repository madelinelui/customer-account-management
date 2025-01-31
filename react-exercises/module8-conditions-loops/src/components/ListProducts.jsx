import { Component } from 'react';
import { useState } from 'react';
import ProductCard from './ProductCard';

const ListProducts = () => {

    const [productList, setProductList] = useState([
        {
            id: 1,
            name: "Dell Laptop",
            description: "2Ghz quad core processor, 500GB SSD, 8GB RAM",
            price: 700
        },
        {
            id: 2,
            name: "Samsung Laptop",
            description: "2.2Ghz quad core processor, 700GB SSD, 16GB RAM",
            price: 1200
        },
        {
            id: 3,
            name: "Chromebook",
            description: "2Ghz celeron processor, 100GB SSD, 2GB RAM",
            price: 200
        },
        
    ])

    return (
    <div>
      {productList.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
    )

}

export default ListProducts;