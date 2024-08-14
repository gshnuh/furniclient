import axios from "axios";
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Toaster } from "react-hot-toast";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Header from "./header";
import Footer from "./footer";
import { toast } from "react-toastify";

function TrackOrder() {
    const [orderList, setOrderList] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [orderid, setOrderId] = useState("");
    const [orderStatus, setOrderStatus] = useState("");
    const [orderDetails, setOrderDetails] = useState(null);
    const [showModal, setShowModal] = useState(false);
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



    const handleTrackOrder = () => {
        const order = orderList.find(order => order.orderid === orderid);
        if (order) {
            setOrderDetails(order);
            setShowModal(true);
        } else {
            toast.error("Order ID not found.");
        }
    };

    useEffect(() => {
        fetchOrders();
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));
        setWishlistCount(wishlist.reduce((acc, item) => acc + item.quantity, 0));
    }, []);


    return (
        <>
            <Toaster />
            <div className="container-fluid cf1 pb-1">
                <Header cartCount={cartCount} wishlistCount={wishlistCount} />
                <div className="container pt-5">
                    <h2 className="head1 pt-5">Track Order</h2>
                </div>
            </div>
            <div className="container-fluid maindiv">
                <div className="pt-3">
                    <Form.Group className="mb-3">
                        <Form.Label>Enter Order ID</Form.Label>
                        <Form.Control
                            className="w-25"
                            type="text"
                            value={orderid}
                            onChange={(e) => setOrderId(e.target.value)}
                            placeholder="Enter your order ID"
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={handleTrackOrder}>
                        Track Order
                    </Button>
                </div>
            </div>
            <div className="pt-5">
                <Footer />
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {orderDetails ? (
                        <>
                            <p><strong>Order ID:</strong> {orderDetails.orderid}</p>
                            <p><strong>Billing Address:</strong> {orderDetails.billingAddress}</p>
                            <p><strong>Shipping Address:</strong> {orderDetails.shippingAddress}</p>
                            <p><strong>Payment Method:</strong> {orderDetails.paymentMethod}</p>
                            <p><strong>Total Amount:</strong> ${orderDetails.totalAmount}</p>
                            <p><strong>Order Status:</strong> {orderDetails.status}</p>
                            <p><strong>Products:</strong></p>
                            <ul>
                                {orderDetails.orderedProducts && orderDetails.orderedProducts.length > 0 ? (
                                    orderDetails.orderedProducts.map((product, index) => (
                                        <li key={index}>
                                            {product.name} - ${product.offerPrice} x {product.quantity}
                                        </li>
                                    ))
                                ) : (
                                    <p>No products found for this order.</p>
                                )}
                            </ul>
                        </>
                    ) : (
                        <p>Loading order details...</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TrackOrder;
