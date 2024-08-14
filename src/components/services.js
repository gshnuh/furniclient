import product1 from "./images/product1.png";
import product2 from "./images/product2.png";
import product3 from "./images/product3.png";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Header from './header';
import Footer from "./footer";
import Crsl from "./crsl";
import { useEffect, useState } from "react";

function Services() {
    const [services, setServices] = useState([]);
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


    useEffect(() => {
        fetch("services.json")
            .then(response => response.json())
            .then(data => {
                setServices(data);
                console.log(data, "hhhhhhhhhhhhhhhhhhhhhh");
            })
            .catch(error => console.log(error))
    }, []);

    return (
        <>
            <div className='maindiv'>
                <div className='container-fluid cf1'>
                    <Header cartCount={cartCount} wishlistCount={wishlistCount} />
                    <div className='container pt-5'>
                        <div className='row pt-5'>
                            <div className='col-md-5'>
                                <h1 className='head1'>Services</h1>
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
                <div className="container pt-5">
                    <div className="row pt-5">
                        {services.map((item, index) => (
                            <div key={index} className='col-6 col-md-6 col-lg-3 mb-4'>
                                <div className='bgborder'>
                                    <img src={item.image}></img>
                                </div>
                                <div className='pt-5'>
                                    <h6>{item.title}</h6>
                                    <p className='pgg'>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="maindiv pt-5">
                <div className='container cf22 pt-5'>
                    <div className='row pt-5'>
                        <div className='col-md-12 col-lg-3 mb-5 mb-lg-0'>
                            <h1>Crafted with excellent material.</h1>
                            <p className='pg pt-3'>Donec vitae odio quis nisl dapibus malesuada.Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
                            </p>
                            <div className='pt-3'>
                                <Button className='btn7' variant="dark">Explore</Button>
                            </div>
                        </div>
                        <div className='col-12 col-md-4 col-lg-3 mb-5 mb-md-0'>
                            <Card className='card'>
                                <Card.Img variant="top" src={product1} />
                                <Card.Body className='text-center'>
                                    <Card.Title>Nordic Chair</Card.Title>
                                    <Card.Text className='cardtext'>
                                        $50.00
                                    </Card.Text>
                                    <div className='overlay'>
                                        <i className='fa fa-plus'></i>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className='col-12 col-md-4 col-lg-3 mb-5 mb-md-0'>
                            <Card className='card'>
                                <Card.Img variant="top" src={product2} />
                                <Card.Body className='text-center'>
                                    <Card.Title>Kruzo Aero Chair</Card.Title>
                                    <Card.Text className='cardtext'>
                                        $78.00
                                    </Card.Text>
                                    <div className='overlay'>
                                        <i className='fa fa-plus'></i>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className='col-12 col-md-4 col-lg-3 mb-5 mb-md-0'>
                            <Card className='card'>
                                <Card.Img variant="top" src={product3} />
                                <Card.Body className='text-center'>
                                    <Card.Title>Ergonomic Chair</Card.Title>
                                    <Card.Text className='cardtext'>
                                        $43.00
                                    </Card.Text>
                                    <div className='overlay'>
                                        <i className='fa fa-plus'></i>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div >
                </div >
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
export default Services;