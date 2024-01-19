import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './CartSlice';
import apiService from '../utils/ApiService';

const loadCart = () => {
    try {
        const cartState = sessionStorage.getItem('localCart');
        if (cartState === null) {
            return undefined;
        }
        return JSON.parse(cartState);
    } catch (error) {
        console.log(error);
        return undefined;
    }
};

const store = configureStore({
    reducer: {
        cart: cartReducer
    },
    preloadedState: {
        cart: loadCart()
    }
});

const saveCartOnServer = (cartState) => {
    apiService.post("/cart",cartState
    ).then(res => {
        if (res.status!==200) throw new Error(`HTTP error! status: ${res.status}`);
    });
};

store.subscribe(() => {
    const state = store.getState();
    try {
        sessionStorage.setItem('localCart', JSON.stringify(state.cart));
        saveCartOnServer(JSON.stringify({cartData:state.cart}));
    } catch (error) {
        console.error('Error saving state to sessionStorage:', error);
    }
});

export default store;