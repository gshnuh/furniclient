import React, { useEffect, useState } from 'react';
import couch from "./images/couch.png";
import Button from 'react-bootstrap/Button';
import Header from './header';
import Footer from "./footer";

function Contact() {
    const [name, setName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mail, setMail] = useState("");
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");
    const [message, setMessage] = useState("");
    const [firstnameerror, setFirstNameError] = useState("");
    const [lastnameerror, setLastNameError] = useState("");
    const [emailerror, setEmailError] = useState("");
    const [cartItems, setCartItems] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);




    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(cart);
        setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));
    }, []);

    useEffect(() => {
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlistItems(wishlist);
        setWishlistCount(wishlist.reduce((acc, item) => acc + item.quantity, 0));
    }, []);


    const handleSubmit = () => {
        if (!firstName) {
            setFirstNameError("First Name is Required.");
        } else {
            setFirstNameError("")
        }
        if (!lastName) {
            setLastNameError("Last Name is Required.");
        } else {
            setLastNameError("")
        }
        if (!email) {
            setEmailError("Email is Required.");
        } else {
            setEmailError("")
        }
        setName(`${firstName} ${lastName}`);
        setMail(`${email}`);
        setMsg(`${message}`);
    }

    return (
        <>
            <div className='maindiv'>
                <div className='container-fluid cfd'>
                    <Header cartCount={cartCount} wishlistCount={wishlistCount} />
                    <div className='container'>
                        <div className='row pt-5'>
                            <div className='col-md-5'>
                                <h1 className='head1'>Contact</h1>
                                <p className='pt-3 pop'>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.</p>
                                <div className='row pt-3'>
                                    <div className='col-md-3'>
                                        <Button className='btn7' variant="warning">Shop Now</Button>
                                    </div>
                                    <div className='col-md-3 btndiv'>
                                        <Button className='btn7' variant="outline-dark">Explore</Button>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-7'>
                                <div className="img-wrap couch">
                                    <div className='pt-5'>
                                        <img className='couchimg' src={couch}></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container pt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-8 pb-4">
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <button className="bt1">
                                                <i><span class="material-symbols-outlined">
                                                    location_on
                                                </span></i>
                                            </button>
                                        </div>
                                        <div className="col-md-10">
                                            <p className="text1">43 Raymouth Rd. Baltemoer, London 3910</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <button className="bt1">
                                                <i class="fa fa-envelope"></i>
                                            </button>
                                        </div>
                                        <div className="col-md-10">
                                            <p className="text1 pt-3">info@yourdomain.com</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <button className="bt1">
                                                <i class="fa fa-phone"></i>
                                            </button>
                                        </div>
                                        <div className="col-md-10">
                                            <p className="text1 pt-3">+1 294 3925 3939</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="f1">
                                <div className="row pt-5">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label class="text-black">First name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fname"
                                                name="fname"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            ></input>
                                            {firstnameerror && <p className='err'>{firstnameerror}</p>}
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label class="text-black">Last name</label>
                                            <input type="text" className="form-control" name="lname" id="lname"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                            ></input>
                                            {lastnameerror && <p className='err'>{lastnameerror}</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group pt-2">
                                    <label class="text-black">Email address</label>
                                    <input type="text" className="form-control" name="email" id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    ></input>
                                    {emailerror && <p className='err'>{emailerror}</p>}
                                </div>
                                <div className="form-group pt-2">
                                    <label class="text-black">Message</label>
                                    <textarea type="text" className="form-control tarea" name="msg" id="message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}></textarea>
                                </div>
                                <div className="pt-5">
                                    <button className="btn0" onClick={handleSubmit}>Send Message</button>
                                </div>
                            </div>
                            <h2>{name}</h2>
                            <h2>{mail}</h2>
                            <h2>{msg}</h2>
                        </div>
                    </div>

                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>

    );
}

export default Contact;
