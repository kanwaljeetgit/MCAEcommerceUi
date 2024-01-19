import React from 'react'
import './ProductItem.css'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart,removeFromCart } from '../redux/CartSlice';
import { useNavigate } from 'react-router-dom';

function ProductItem({ item }) {
    const cart = useSelector(state => state.cart.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const addItemToCart = (item) => {
        dispatch(addToCart(item));
    };
    const removeItemFromCart = (item) => {
        dispatch(removeFromCart(item));
    };
    const navigateToCart = (item) =>{
        dispatch(addToCart(item));
        navigate("/cart");
    };
    
    return (
        <div className='productItem' id={item.id}>
            {/* product image */}
            <img style={{
                height: 200,
                width: 200
            }} src={item.image} />

            {/* product title */}
            <div style={{ fontWeight: 750 }}>{item.title.length > 30 ? item.title.substr(0, 30) : item.title}</div>

            {/* product description */}
            <div style={{ fontWeight: 450 }}>{item.description.length > 60 ? item.description.substr(0, 60) : item.description}</div>

            {/* product price */}
            <div style={{ fontWeight: 750 }}>{item.price}</div>

            {/* product add cart button */}
            {cart && cart.some((x) =>  x.id === item.id) ? (
                <button className='productItemButton' onClick={() => removeItemFromCart(item)}>Remove From Cart</button>
            ) : (
                <button className='productItemButton' onClick={() => addItemToCart(item)}>Add to Cart</button>
            )}

            {/* product buy now button */}
            <button onClick={() => navigateToCart(item)} style={{ backgroundColor: '#FFD700' }} className='productItemButton'>Buy Now</button>

        </div>
    )
}

export default ProductItem