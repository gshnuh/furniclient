import truck from "./images/truck.svg";
import bag from "./images/bag.svg";
import support from "./images/support.svg";
import return1 from "./images/return.svg";
import why from "./images/why.jpg";
import Button from 'react-bootstrap/Button';
import Header from './header';
import Footer from "./footer";
import p1 from "./images/person1.jpg";
import p2 from "./images/person_2.jpg";
import p3 from "./images/person_3.jpg";
import p4 from "./images/person_4.jpg";
import Crsl from "./crsl";
import { useEffect, useState } from "react";




function About() {
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

    return (
        <>
            <div className='maindiv'>
                <div className='container-fluid cf1'>
                <Header cartCount={cartCount} wishlistCount={wishlistCount} />
                    <div className='container pt-5'>
                        <div className='row pt-5'>
                            <div className='col-md-5'>
                                <h1 className='head1'>About Us</h1>
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
                        </div>
                    </div>
                </div>
                <div className='container pt-5'>
                    <div className='row pt-5'>
                        <div className='col-lg-6'>
                            <h1>Why Choose Us</h1>
                            <p className='pg pt-3'>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.</p>
                            <div className='row'>
                                <div className='col-6 col-md-6'>
                                    <div className='bgborder'>
                                        <img src={truck}></img>
                                    </div>
                                    <div className='pt-5'>
                                        <h4>Fast & Free Shipping</h4>
                                        <p className='pg'>Fast & Free Shipping Donec vitae odio quis nisl dapibus malesuada.Nullam ac aliquet velit. Aliquam vulputate.</p>
                                    </div>
                                </div>
                                <div className='col-6 col-md-6'>
                                    <div className='bgborder'>
                                        <img src={bag}></img>
                                    </div>
                                    <div className='pt-5'>
                                        <h4>Easy to Shop </h4>
                                        <p className='pg'>Fast & Free Shipping Donec vitae odio quis nisl dapibus malesuada.Nullam ac aliquet velit. Aliquam vulputate.</p>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6 col-md-6'>
                                    <div className='bgborder'>
                                        <img src={support}></img>
                                    </div>
                                    <div className='pt-5'>
                                        <h4>24/7 Support</h4>
                                        <p className='pg'>Fast & Free Shipping Donec vitae odio quis nisl dapibus malesuada.Nullam ac aliquet velit. Aliquam vulputate.</p>
                                    </div>
                                </div>
                                <div className='col-6 col-md-6'>
                                    <div className='bgborder'>
                                        <img src={return1}></img>
                                    </div>
                                    <div className='pt-5'>
                                        <h4>Hassle Free Returns</h4>
                                        <p className='pg'>Fast & Free Shipping Donec vitae odio quis nisl dapibus malesuada.Nullam ac aliquet velit. Aliquam vulputate.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-5'>
                            <div className="img-wrap img1 ">
                                <div className='pt-5'>
                                    <img className='whyimg' src={why}></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="maindiv pt-5">
                <div className="text-center pt-5">
                    <h2>Our Team</h2>
                </div>
                <div className="container pt-5">
                    <div className="row pt-5">
                        <div className="col-12 col-md-6 col-lg-3 mb-5 mb-md-0">
                            <img className="w-100" src={p1}></img>
                            <h3 className="pt-5"><a className="hd07" href="#">Lawson Arnold</a></h3>
                            <p className="pg">CEO, Founder, Atty.</p>
                            <p className="pg">Separated they live in. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                            <a href="#" className="hd07">Learn More</a>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 mb-5 mb-md-0">
                            <img className="w-100" src={p2}></img>
                            <h3 className="pt-5"><a className="hd07" href="#">Jeremy Walker</a></h3>
                            <p className="pg">CEO, Founder, Atty.</p>
                            <p className="pg">Separated they live in. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                            <a href="#" className="hd07">Learn More</a>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 mb-5 mb-md-0">
                            <img className="w-100" src={p3}></img>
                            <h3 className="pt-5"><a className="hd07" href="#">Patrik White</a></h3>
                            <p className="pg">CEO, Founder, Atty.</p>
                            <p className="pg">Separated they live in. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                            <a href="#" className="hd07">Learn More</a>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 mb-5 mb-md-0">
                            <img className="w-100" src={p4}></img>
                            <h3 className="pt-5"><a className="hd07" href="#">Kathryn Ryan</a></h3>
                            <p className="pg">CEO, Founder, Atty.</p>
                            <p className="pg">Separated they live in. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                            <a href="#" className="hd07">Learn More</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="maindiv pt-5">
                <Crsl />
            </div>
            <div className="container">
                <Footer />
            </div>
        </>
    )
}
export default About;