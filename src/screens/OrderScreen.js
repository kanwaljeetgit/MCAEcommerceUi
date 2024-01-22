import React, { useEffect, useState } from 'react'
import './OrderScreen.css'
import apiService from '../utils/ApiService';
import Header from '../components/Header';
import { defaultDateFormatter } from '../utils/DateFormatter';
import { alertError, alertSuccess } from '../utils/FormValidation';

function OrderScreen() {

    const [orders, setOrders] = useState([]);

    const [reload, setReload] = useState(false);

    const [order, setOrder] = useState({});

    const [orderDetails, setOrderDetails] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiService.get('/order'); // Use the API service for requests
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
        setReload(false);
    },[reload]);

    const reset = () => {
        setOrderDetails(false);
    }

    const statusUpdate = (id,status) => {
        apiService.patch(`/order/update/${id}/status/${status}`)
        .then(response => {
            if(response.status===200){
               alertSuccess(`Order status ${status} updated successfully for id ${id}`);
               setReload(true);
            }else{
               alertError(`${response.statusText}`); 
            }
        })
    }

    const getStatus = (status) => {
        switch (status) {
            case 'PENDING':
                return <button style={{background:'#FEBE10'}}>Pending</button>
            case 'ACCEPT':
                return <button style={{background:'#5cd65c'}}>Accept</button>
            case 'REJECTED':
                return <button style={{background:'#ff3333'}}>Rejected</button>
            default:
                break;
        }
    };

    const getStatusActions = (id,status) => {
        switch (status) {
            case 'PENDING':
                return <button onClick={()=>statusUpdate(id,'REJECTED')} style={{background:'#ff3333'}}>Reject</button>
            default:
                return <button style={{background:'grey'}}>No Action</button>;
        }
    };

    const showOrderDetails = (order) => {
        if (!orderDetails) {
            setOrderDetails(true);
            setOrder(order);
        }
        return (
            <><section class="table__header">
                <h1>Order Id #{order.id}</h1>
                <button onClick={() => reset()}>Back</button>
            </section><table>
                    <thead>
                        <tr style={{ textAlign: 'center' }}>
                            <th> Item Image </th>
                            <th> Item decription </th>
                            <th> Quantity </th>
                            <th> Total Amount </th>
                            <th> Order Date </th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items && order.items.map((item) => (
                            <tr>
                                <td><img src={item.product.image}></img></td>
                                <td className="hoverable-cell">{item.product.description}</td>
                                <td>{item.quantity}</td>
                                <td><strong>{item.amount.toFixed(2)}</strong></td>
                                <td>{defaultDateFormatter(order.createdTime)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table></>)
    };

    const showOrderSummary = () => {
        return (<table>
            <thead>
                <tr style={{ textAlign: 'center' }}>
                    <th> Order Id </th>
                    <th> Total Quantity </th>
                    <th> Total Amount </th>
                    <th> Order Date </th>
                    <th> Item Count </th>
                    <th> Order Status </th>
                    <th> Order Actions</th>
                    <th> View </th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order) => (
                    <tr>
                        <td>{order.id}</td>
                        <td>{order.totalQuantity}</td>
                        <td><strong>{order.totalAmount.toFixed(2)}</strong></td>
                        <td>{defaultDateFormatter(order.createdTime)}</td>
                        <td> {order.totalItemCount} </td>
                        <td>{getStatus(order.status)}</td>
                        <td>{getStatusActions(order.id,order.status)}</td>
                        <td><button onClick={() => showOrderDetails(order)} style={{ background: '#FEBE10' }}>View Details</button></td>
                    </tr>
                ))}
            </tbody>
        </table>)
    }

    return (
        <>
            <Header />
            <div className='body'>
                <main class="table" id="customers_table">
                    <section class="table__header">
                        <h1>Your Orders</h1>
                    </section>
                    <section class="table__body">
                        {!orderDetails ? showOrderSummary() : showOrderDetails(order)}
                    </section>
                </main>
            </div>
        </>
    )
}

export default OrderScreen