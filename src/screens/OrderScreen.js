import React from 'react'
import './OrderScreen.css'
import { useLocation } from 'react-router-dom'

function OrderScreen() {
    const location = useLocation();
    console.log(location.state)
    return (
        <div className='orders'>
            <div>
                <h3>Your Orders</h3>
                {location.state.orders.map((order) => (
                    <div>
                        <div className='orderContainer'>
                            <img style={{ width: 130, height: 130 }} src={order.image}></img>
                            <div className='orderDescription'>
                                <div> {order.title}</div>
                                <div>{order.price * order.quantity}</div>
                            </div>
                            <div className='orderContainerButton'>
                                <button className='orderButtons'>Return</button>
                                <button className='orderButtons'>Download Invoice</button>
                                <button className='orderButtons'>Rate Product</button>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default OrderScreen