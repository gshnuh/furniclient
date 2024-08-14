
import couch from "./images/couch.png";
import Button from 'react-bootstrap/Button';
import Header from './header';
import Footer from "./footer";
import Crsl from "./crsl";
import { useEffect, useState } from "react";

function Blog() {
    const [blog, setblog] = useState([]);
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
        fetch("blog.json")
            .then(response => response.json())
            .then(data => {
                setblog(data);
                console.log(data, "hhhhhhhhhhhh");
            })
            .catch(error => console.log(error))
    }, []);
    return (
        <>
            <div className='maindiv'>
                <div className='container-fluid cfd'>
                    <Header cartCount={cartCount} wishlistCount={wishlistCount} />
                    <div className='container'>
                        <div className='row pt-5'>
                            <div className='col-md-5'>
                                <h1 className='head1'>Blog</h1>
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
                <div className='container pt-5'>
                    <div className='row pt-5'>
                        {blog.map((item, index) => (
                            <div key={index} className='col-md-4'>
                                <img className='post' src={item.image}></img>
                                <p className='posttext'>{item.title}</p>
                                <p><div dangerouslySetInnerHTML={{ __html: item.description }}></div></p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="maindiv">
                <div className="pt-5">
                    <Crsl />
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}

export default Blog;