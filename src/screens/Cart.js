import React from 'react'
import './Cart.css'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { incrementQuantity, decrementQuantity, removeFromCart } from '../redux/CartSlice';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import apiService from '../utils/ApiService';

function Cart() {
    const cart = useSelector(state => state.cart.cart);
    const navigate = useNavigate()
    const orders = [...cart]
    const total = cart.map((item) => item.price * item.quantity).reduce((curr, prev) => curr + prev, 0);
    const charges = 20;
    const dispatch = useDispatch()
    const incrementItemQuantity = (item) => {
        dispatch(incrementQuantity(item));
    };
    const decrementItemQuantity = (item) => {
        dispatch(decrementQuantity(item));
    };
    const removeItem = (item) => {
        dispatch(removeFromCart(item));
    };
    const placeOrder = async () => {
        let orderObj = { items: [] };
        cart.map(item => {
            orderObj.items.push({ product: item, quantity: item.quantity, amount: item.amount })
        });
        const response = await apiService.post('/order',JSON.stringify(orderObj)
        ).then(res => {
            if (res.status==200) {
                return res.data;
            } else {
                throw new Error(`Error with status ${res.status}`);
            }
        }).catch(error => {
            console.error('Error:', error.message);
            return error.message;
        });
        toast.success('Order Placed Successfully!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

        setTimeout(() => {
            navigate('/orders', {
                state: {
                    orders: orders,
                    totalPrice: total + charges
                }
            })
        }, 3500)

    };
    return (
        <>
            <Header />
            {total === 0 ? (
                <h3 className='emptyCart'>Cart is Empty</h3>
            )
                : (
                    <div className='cart'>
                        <ToastContainer
                            position="top-center"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                        {/* cart left side */}
                        <div className='leftCart'>
                            {cart.map((item, index) => (
                                <div className='cartContainer'>
                                    {/* image */}
                                    <div>
                                        <img src={item.image} style={{
                                            width: 100,
                                            height: 100,
                                        }}></img>
                                    </div>
                                    {/* description */}
                                    <div className='cartDescription'>
                                        {/* product title */}
                                        <div style={{ fontWeight: 750 }}>{item.title.length > 60 ? item.title.substr(0, 60) : item.title}</div>
                                        {/* product description */}
                                        <div style={{ fontWeight: 400 }}>{item.description.length > 100 ? item.description.substr(0, 100) : item.description}</div>
                                        {/* product price */}
                                        <div style={{ fontWeight: 550 }}>{item.price}</div>

                                    </div>
                                    {/* button */}
                                    <div className='cartButtonsContainer'>
                                        <div className='cartButtons'>
                                            <div onClick={() => decrementItemQuantity(item)} style={{ cursor: 'pointer' }}>-</div>
                                            <div>{item.quantity}</div>
                                            <div onClick={() => incrementItemQuantity(item)} style={{ cursor: 'pointer' }}>+</div>
                                        </div>
                                        <button onClick={() => removeItem(item)} className='cartRemoveButton'>Remove Item</button>
                                        <h5 style={{ marginTop: 7, textAlign: 'center' }}>{item.price * item.quantity}</h5>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* cart right side */}
                        < div className='rightCart' >
                            {/* location info and button */}
                            <div className='rightCartLocationContainer'>
                                <div className='rightCartLocation'>
                                    <LocationOnIcon style={{ color: 'grey', marginTop: 5 }} />
                                    <div className='rightCartLocationDecription'>
                                        <div>Select Your Location</div>
                                        <div>Please select the location so we can deliver your items!</div>
                                        <button className='cartLocationButton'>Select Location</button>
                                    </div>
                                </div>
                                <div className='rightCartLocation'>
                                    <LocationOnIcon style={{ color: 'grey', marginTop: 5 }} />
                                    <div className='rightCartLocationDecription'>
                                        <div>Choose your saved Location</div>
                                        <button className='cartLocationButton'>Choose Location</button>
                                    </div>
                                </div>
                            </div>
                            {/* coupon info and description */}
                            <div className='rightCartCoupon'>
                                <LocalOfferRoundedIcon style={{ width: 25, height: 20, color: 'grey' }} />
                                <div className='rightCartLocationDecription'>
                                    <div style={{ fontSize: 14, fontWeight: 500 }}>Select/Apply Coupon</div>
                                    <div>Apply Coupons to avail offers on product</div>
                                </div>
                            </div>
                            {/* checkouts and total */}
                            <div className='rightCartCheckoutConatiner'>
                                <div className='rightCartCheckout'>
                                    <div>Total Price</div>
                                    <div>{total.toFixed(2)}</div>
                                </div>
                                <div className='rightCartCheckout'>
                                    <div>Discount</div>
                                    <div>-</div>
                                </div>
                                <div className='rightCartCheckout'>
                                    <div>Charges</div>
                                    <div>{charges}</div>
                                </div>
                                <div style={{ fontSize: 20 }} className='rightCartCheckout'>
                                    <div>Grand Total</div>
                                    <div>{(total + charges).toPrecision(4)}</div>
                                </div>
                                <button onClick={() => placeOrder()} className='cartRemoveButton cartCheckoutButton'>Place Order</button>
                            </div>
                        </div>
                    </div>
                )}
        </>
    )
}

export default Cart