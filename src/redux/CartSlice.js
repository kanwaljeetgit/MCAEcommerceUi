import {createSlice} from "@reduxjs/toolkit"

const removeItem = (state,action) => {
    const removeItem = state.cart.filter(item => item.id !== action.payload.id);
    state.cart = removeItem;
}

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cart: [],
    },
    reducers:{
        loadCart: (state,action) => {
            state.cart=[...action.payload.cart];
        },
        addToCart: (state,action) => {
            const itemPresent = state.cart.find(item => item.id === action.payload.id);
            if(itemPresent){
                itemPresent.quantity++;
            }else{
                state.cart.push({...action.payload,quantity:1});
            }
        },
        removeFromCart:(state,action) => {
            removeItem(state,action);
        },
        incrementQuantity: (state,action) => {
            const itemPresent = state.cart.find(item => item.id === action.payload.id);
            itemPresent.quantity++;
        },
        decrementQuantity: (state,action) => {
            const itemPresent = state.cart.find(item => item.id === action.payload.id);
            if(itemPresent.quantity === 1){
                removeItem(state,action);
            }else{
                itemPresent.quantity--;
            }
        },
        cleanCart: (state) => {
            state.cart = []
        }
    }
});

export const {addToCart,removeFromCart,incrementQuantity,decrementQuantity, cleanCart, loadCart} = cartSlice.actions;

export default cartSlice.reducer;
