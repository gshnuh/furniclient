import Header from './header';
import Footer from "./footer";
import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [coupons, setCoupons] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [orderid, setOrderId] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [sameAddress, setSameAddress] = useState(true);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailerror, setEmailError] = useState("");
  const [phoneerror, setPhoneError] = useState("");
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [isResendVisible, setIsResendVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    setCartItems(cart);
    setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));
    setWishlistItems(wishlist);
    setWishlistCount(wishlist.reduce((acc, item) => acc + item.quantity, 0));
  }, []);

  useEffect(() => {
    if (showOtpModal) {
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(countdown);
            setIsResendVisible(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [showOtpModal]);

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      setEmailError("")
      return (true)
    }
    setEmailError("Enter a valid email address!")
    return (false)
  }

  const handleEmailChange = (e) => {
    const currentEmail = e.target.value;
    ValidateEmail(currentEmail);
    setEmail(currentEmail);
  };




  function ValidatePhone(phone) {
    if (/^\d{10}$/.test(phone)) {
      setPhoneError("")
      return (true)
    }
    setPhoneError("Enter a valid phone number!")
    return (false)
  }

  const handlePhoneChange = (e) => {
    const currentPhone = e.target.value;
    ValidatePhone(currentPhone);
    setPhone(currentPhone);
  };

  const handleSubmit = () => {
    var formvalid = true;

    if (!email) {
      setEmailError("Email is Required.");
      formvalid = false;
    } else {
      setEmailError("")
    }
    if (!phone) {
      setPhoneError("Phone is Required.");
      formvalid = false;
    } else {
      setPhoneError("")
    }
  }


  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post("http://localhost:8001/payment/orders");

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_4mW5rt6e1m49pr",
      amount: amount.toString(),
      currency: currency,
      name: "Gshnuh",
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post("http://localhost:8001/payment/success", data);

        alert(result.data.msg);
      },
      prefill: {
        name: "Jishnu",
        email: "gshnuh@gmail.com",
        contact: "8891074774",
      },
      notes: {
        address: "Furni. pvt ltd",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get("http://localhost:8001/signup/couponlist");
      setCoupons(response.data);
    } catch (error) {
      console.error("Error fetching Coupons:", error);
    }
  };


  const handleQuantityChange = (cartItemId, delta) => {
    const updatedCart = cartItems.map((item) => {
      if (item.cartItemId === cartItemId) {
        item.quantity = Math.max(1, item.quantity + delta);
      }
      return item;
    });

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemove = (cartItemId) => {
    const updatedCart = cartItems.filter((item) => item.cartItemId !== cartItemId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getTotal = () => {
    const total = cartItems.reduce((total, item) => total + (Number(item.offerPrice) * item.quantity), 0);
    if (appliedCoupon) {
      return (total * (1 - appliedCoupon.discount / 100)).toFixed(2);
    }
    return total.toFixed(2);
  };

  const getDiscount = () => {
    const total = cartItems.reduce((total, item) => total + (Number(item.offerPrice) * item.quantity), 0);
    if (appliedCoupon) {
      return (total * (appliedCoupon.discount / 100)).toFixed(2);
    }
    return "0.00";
  };

  const handleApplyCoupon = () => {
    const foundCoupon = coupons.find(coupon => coupon.code === couponCode);
    if (foundCoupon) {
      setAppliedCoupon(foundCoupon);
      toast.success("Coupon applied successfully!");
    } else {
      toast.error("Invalid coupon code.");
    }
  };

  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8001/signup/sendotp", { email });
      if (response.status === 200) {
        setShowOtpModal(true);
        setShowCheckoutModal(false);
        setTimer(30);
        setIsResendVisible(false);
      }
      toast.success("OTP sent successfully!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Error sending OTP");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const verifyOtp = async () => {
    try {
      await axios.post("http://localhost:8001/signup/verifyotp", { email, otp });
      setShowOtpModal(false);
      handleConfirmOrder();
      toast.success("OTP verified successfully!");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Error verifying OTP");
    }
  };

  const handleProceedToCheckout = () => {
    setShowCheckoutModal(true);
  };

  const handleCloseCheckoutModal = () => {
    setShowCheckoutModal(false);
  };


  const handleConfirmOrder = async () => {
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));
    const userId = userProfile.id;
    const billingDetails = billingAddress.split(',').map(item => item.trim());
    console.log(userId, "hhhhhhh")
    const orderedProducts = cartItems.map(item => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const orderDetails = {
      userId,
      orderid,
      billingAddress,
      shippingAddress: sameAddress ? billingAddress : shippingAddress,
      phone,
      email,
      paymentMethod,
      cardDetails: paymentMethod === 'credit-card' ? { cardNumber, cardExpiry, cardCvc } : null,
      orderedProducts,
      totalAmount: getTotal(),
    };

    try {
      const response = await axios.post("http://localhost:8001/signup/addorderdetails", orderDetails);
      if (response.status === 200) {
        setConfirmedOrder(response.data);
        toast.success("Order confirmed!");
        setShowCheckoutModal(false);
        setShowInvoiceModal(true);
        setCartItems([]);
        localStorage.removeItem("cart");
        setTimeout(() => {
          navigate("/cart");
        }, 1000);
      }
    } catch (error) {
      toast.error("Failed to place order: " + error.response.data.error);
      console.error("Error occurred during order submission:", error.response.data.error);
    }
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleResendOtp = () => {
    sendOtp();
  };


  const handleCloseInvoiceModal = () => {
    setShowInvoiceModal(false);
    navigate("/");
  };


  return (
    <>
      <div className='maindiv'>
        <div className='container-fluid cf1'>
          <Header cartCount={cartCount} wishlistCount={wishlistCount} />
          <div className='container pt-5'>
            <h1 className='head1 pt-5'>Cart</h1>
          </div>
        </div>
      </div>
      <div className="container-fluid maindiv">
        <div className="container pt-5">
          <div className="row">
            <table className="tble1">
              <thead>
                <tr className="text-center tr1">
                  <th className="w-25">Image</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr className="text-center tr2" key={item.cartItemId}>
                    <td><img className="w-50 pt-3 pb-3" src={`http://localhost:8001/images/${item.image[0]}`} alt={item.name} /></td>
                    <td className="txt0">{item.name}</td>
                    <td>
                      <p className='price'>${item.price}</p>
                      <p>${Number(item.offerPrice).toFixed(2)}</p>
                    </td>
                    <td>
                      <button className="qq" onClick={() => handleQuantityChange(item.cartItemId, -1)}>-</button>
                      <input className="ip1" value={item.quantity} readOnly />
                      <button className="qq" onClick={() => handleQuantityChange(item.cartItemId, 1)}>+</button>
                    </td>
                    <td>${(Number(item.offerPrice) * item.quantity).toFixed(2)}</td>
                    <td><button className='removebutton' onClick={() => handleRemove(item.cartItemId)}>x</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="col-md-9">
              <div className="row pt-5">
                <div className="col-md-6">
                  <Link to="/cart">
                    <button className="btn1">Update Cart</button>
                  </Link>
                </div>
                <div className="col-md-6">
                  <Link to="/shop">
                    <button className="btn1">Continue Shopping</button>
                  </Link>
                </div>
              </div>
              <div className="row pt-5">
                <div>
                  <h3>Coupon</h3>
                  <p className="pgg">Enter your coupon code if you have one.</p>
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        className="cpn"
                        type="text"
                        placeholder="Coupon Code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 btndiv">
                      <button className="btn1" onClick={handleApplyCoupon}>Apply Coupon</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 pt-5">
              <h4 className="hd00">CART TOTALS</h4>
              <div className="row pt-3">
                <div className="col-md-6">
                  <p>Subtotal</p>
                </div>
                <div className="col-md-6">
                  <p>${cartItems.reduce((total, item) => total + (Number(item.offerPrice) * item.quantity), 0).toFixed(2)}</p>
                </div>
              </div>
              {appliedCoupon && (
                <div className="row pt-1">
                  <div className="col-md-6">
                    <p>Discount</p>
                  </div>
                  <div className="col-md-6">
                    <p>-${getDiscount()}</p>
                  </div>
                </div>
              )}
              <div className="row pt-1">
                <div className="col-md-6">
                  <p>Total</p>
                </div>
                <div className="col-md-6">
                  <p>${getTotal()}</p>
                </div>
              </div>
              <div className="pt-5">
                <button className="btn10" onClick={handleProceedToCheckout}>Proceed To Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-5">
        <Footer />
      </div>

      <Modal show={showCheckoutModal} onHide={handleCloseCheckoutModal}>
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Order Summary</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Offer Price</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.cartItemId}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${Number(item.offerPrice).toFixed(2)}</td>
                  <td>${(Number(item.offerPrice) * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            {appliedCoupon && <p className='pt-3'>Discount: -${getDiscount()}</p>}
            <p>Total: ${getTotal()}</p>
          </div>
          <Form>
            <h3>Billing Address</h3>
            <Form.Group controlId="billingAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your billing address"
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                isInvalid={!!phoneerror}
              />
              <Form.Control.Feedback type="invalid">{phoneerror}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={handleEmailChange}
                isInvalid={!!emailerror}
              />
              <Form.Control.Feedback type="invalid">{emailerror}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="sameAddress">
              <Form.Check
                type="checkbox"
                label="Shipping address same as billing"
                checked={sameAddress}
                onChange={(e) => setSameAddress(e.target.checked)}
              />
            </Form.Group>
            {!sameAddress && (
              <div>
                <h3>Shipping Address</h3>
                <Form.Group controlId="shippingAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your shipping address"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                  />
                </Form.Group>
              </div>
            )}
            <h3>Payment Method</h3>
            <Form.Group controlId="paymentMethod">
              <Form.Check
                type="radio"
                label="PayPal"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="UPI"
                name="paymentMethod"
                value="upi"
                checked={paymentMethod === "upi"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </Form.Group>
            <Button className="App-link" onClick={displayRazorpay}>
              Razorpay
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCheckoutModal}>
            Close
          </Button>
          <Button variant='primary' onClick={sendOtp}>
            {loading ? 'Sending OTP...' : 'Place Order'} {/* Show loading text */}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showOtpModal} onHide={() => setShowOtpModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>OTP Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId='formOtp'>
            <Form.Label>Enter OTP</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter OTP'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </Form.Group>
          <div className='pt-3'>
            <Button variant="primary" onClick={verifyOtp}>Place Order</Button>
            {isResendVisible &&
              <div className='pt-3'>
                <Button variant="secondary" onClick={handleResendOtp}>    {loading ? 'Sending OTP...' : 'Resend OTP'} {/* Show loading text */}
                </Button>
              </div>}
            {!isResendVisible && <p>Resend OTP in {timer}s</p>}
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showInvoiceModal} onHide={handleCloseInvoiceModal}>
        <Modal.Header closeButton>
          <Modal.Title>Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Invoice Details</h3>
          {confirmedOrder && (
            <div>
              <p><strong>Order ID:</strong> {confirmedOrder.orderid}</p>
              <p><strong>Billing Address:</strong> {confirmedOrder.billingAddress}</p>
              <p><strong>Shipping Address:</strong> {confirmedOrder.shippingAddress}</p>
              <p><strong>mobile:</strong> {confirmedOrder.phone}</p>
              <p><strong>Email:</strong> {confirmedOrder.email}</p>
              <h4>Ordered Products:</h4>
              <ul>
                {confirmedOrder.orderedProducts.map((product, index) => (
                  <li key={index}>{product.name} - {product.quantity} x ${Number(product.price).toFixed(2)} = ${(Number(product.price) * product.quantity).toFixed(2)}</li>
                ))}
              </ul>
              <p><strong>Total Amount:</strong> ${confirmedOrder.totalAmount}
                {confirmedOrder.discount}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseInvoiceModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Cart;
