import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Body.css';
import ProductItem from './ProductItem';
import { useNavigate } from 'react-router-dom';


function Body() {
    const [products, setProducts] = useState([]);
    const cart = useSelector(state => state.cart.cart);
    const navigate = useNavigate();
    console.log(cart);

    useEffect(() => {
        if(!localStorage.getItem('token')){
            navigate('/');
        }
        const fetchProducts = async () => {
            await fetch("http://localhost:8080/products",{
                method: 'GET',
                headers: {
                    "Authorization" : "Bearer "+localStorage.getItem('token')
                 }})
                .then(res => res.json())
                .then(data => setProducts(data));
        };
        fetchProducts();
    }, []);
    
    return (
        <div className='body'>
            <div className='bodyItems'>
               {products.map((item,index) => (
                  <ProductItem item={item} key={item.id}/>
               ))}
            </div>
        </div>
    )
}

export default Body