import axios from "axios";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { toast } from "react-toastify";
import { Toaster } from "react-hot-toast";
import Footerbar from "./footerbar";
import Button from "react-bootstrap/esm/Button";

function Order() {
    const [orderList, setOrderList] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);

    const orderStatusOptions = ["Order Placed", "Packed", "Shipped", "Out for Delivery", "Delivered", "Returned"];

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = token;
            const response = await axios.get("http://localhost:8001/signup/getorders");
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

    const handleStatusChange = async (_id, newStatus) => {
        try {
            const response = await axios.put(`http://localhost:8001/signup/updatestatus/${_id}`, { status: newStatus });
            if (response.status === 200) {
                toast.success("Order status updated successfully!");
                fetchOrders();
            }
        } catch (error) {
            toast.error("Failed to update order status: " + error.response.data.error);
            console.error("Error updating order status:", error.response.data.error);
        }
    };

    const handleApproveCancellation = async (_id) => {
        try {
            const response = await axios.put(`http://localhost:8001/signup/updatestatus/${_id}`, { status: "Cancelled" });
            if (response.status === 200) {
                toast.success("Order cancellation approved!");
                fetchOrders();
            }
        } catch (error) {
            toast.error("Failed to approve order cancellation: " + error.response.data.error);
            console.error("Error approving order cancellation:", error.response.data.error);
        }
    };


    return (
        <>
            <Toaster />
            <div className="container-fluid admindiv">
                <Navbar />
                <div className="row adrow">
                    <div className="col-md-2 pbtm nvbr">
                        <Sidebar />
                    </div>
                    <div className="col-md-10 tablecol">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-4 text-center addv pb-3">
                                <h3>Order Management</h3>
                            </div>
                        </div>
                        <div className="container-fluid">
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
                                            <tr className="text-center tr2" key={order._id}>
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
                                                <td>
                                                {order.status === "Cancelled" ? (
                                                        <span>Cancelled</span>
                                                    ) : (
                                                        <Form.Select
                                                            value={order.status}
                                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                        >
                                                            {orderStatusOptions.map((status, index) => (
                                                                <option key={index} value={status}>
                                                                    {status}
                                                                </option>
                                                            ))}
                                                        </Form.Select>
                                                    )}
                                                </td>
                                                <td>
                                                    {order.status === "Cancellation Requested" && (
                                                        <Button variant="danger" onClick={() => handleApproveCancellation(order._id)}>Approve Cancellation</Button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 footerdv"></div>
                    <div className="col-md-10 footerbar">
                        <Footerbar />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Order;
