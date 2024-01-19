import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './Body.css';
import ProductItem from './ProductItem';
import { useNavigate } from 'react-router-dom';
import apiService from '../utils/ApiService';
import productNotFound from '../logo/productNotFound.jpg'


function Body({ searchQuery }) {
    console.log('Search Query:', searchQuery);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const filteredProducts = searchQuery ? products.filter((product) =>
             product.description.toLowerCase().includes(searchQuery.toLowerCase())
             || product.title.toLowerCase().includes(searchQuery.toLowerCase())
        ) : products;

    useEffect(() => {
        if (!sessionStorage.getItem('token')) {
            navigate('/');
        }
        const fetchProducts = async () => {
            await apiService.get("/products")
                .then(res => res.data)
                .then(data => setProducts(data));
        };
        if (products && products.length === 0) {
            fetchProducts();
        }
    }, [searchQuery]);

    const getEmptyItem = () =>{
        return <div><img src={productNotFound}></img></div>
    }

    return (
        <div className='body'>
            <div className='bodyItems'>
                {
                filteredProducts.length===0 
                  ?  getEmptyItem() 
                  :  filteredProducts.map((item, index) => (
                       <ProductItem item={item} key={item.id} />
                      ))
                }
            </div>
        </div>
    )
}

export default Body