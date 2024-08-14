import axios from "axios";
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Toaster } from "react-hot-toast";
import Header from "./header";
import Footer from "./footer";
import { toast } from "react-toastify";

function Orders() {
    const [orderList, setOrderList] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);
    const profile = JSON.parse(localStorage.getItem("userProfile"));


    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = token;
            const response = await axios.get(`http://localhost:8001/signup/orderlist/${profile.id}`);
            setOrderList(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };
    useEffect(() => {


        fetchOrders();

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));
        setWishlistCount(wishlist.reduce((acc, item) => acc + item.quantity, 0));
    }, []);



    const handleCancelOrder = async (orderid) => {
        try {
            const response = await axios.put(`http://localhost:8001/signup/cancelorder/${orderid}`);
            if (response.status === 200) {
                toast.success("Order cancellation requested!");
                fetchOrders();

            }
        } catch (error) {
            toast.error("Failed to cancel order: " + error.response.data.error);
            console.error("Error cancelling order:", error.response.data.error);
        }
    };

    return (
        <>
            <Toaster />
            <div className="container-fluid cf1 pb-1">
                <Header cartCount={cartCount} wishlistCount={wishlistCount} />
                <div className="container pt-5">
                    <h1 className="head1 pt-5">Orders</h1>
                </div>
            </div>
            <div className="container-fluid maindiv">
                <div className="row pt-3">
                    <table className="w-100 text-center">
                        <thead>
                            <tr className='tblerw1 pt-5'>
                                <th className="thtext">Order ID</th>
                                <th className="thtext">Billing Address</th>
                                <th className="thtext">Shipping Address</th>
                                <th className="thtext">Payment Method</th>
                                <th className="thtext">Products</th>
                                <th className="thtext">Total Amount</th>
                                <th className="thtext">Order Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderList.map((order) => (
                                <tr className="text-center  tr2" key={order._id}>
                                    <td>{order.orderid}</td>
                                    <td>{order.billingAddress}</td>
                                    <td>{order.shippingAddress}</td>
                                    <td>{order.paymentMethod}</td>
                                    <td>
                                        <ul>
                                            {order.orderedProducts.map((product, index) => (
                                                <li className="orderlist" key={index}>
                                                    {product.name} - ${product.offerPrice} x {product.quantity}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>${order.totalAmount}</td>
                                    <td>{order.status}</td>
                                    <td>
                                        {order.status === "Cancelled" || order.status === "Cancellation Requested" ? (
                                            <span className="badge bg-danger">{order.status}</span>
                                        ) : (
                                            <>
                                                <Button variant="danger" className="ms-2" onClick={() => handleCancelOrder(order._id)}>Cancel</Button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="pt-5">
                <Footer />
            </div>
        </>
    );
}

export default Orders;
