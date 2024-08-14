import Header from './header';
import Footer from "./footer";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


function Wishlist() {
    const [cartItems, setCartItems] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);
  const [wishlist, setWishlist] = useState([]);


    useEffect(() => {
        updateCounts();
      }, []);


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

      const updateCounts = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));
        setWishlistCount(wishlist.length);
        setWishlist(wishlist);
      };  
    

    const handleRemove = (wishlistItemId) => {
        const updatedWishlist = wishlistItems.filter((item) => item.wishlistItemId !== wishlistItemId);
        setWishlistItems(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    };

    const getTotal = () => {
        return wishlistItems.reduce((total, item) => total + (Number(item.price) * item.quantity), 0).toFixed(2);
    };

    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProduct = cart.find((item) => item._id === product._id);
    
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          const newProduct = { ...product, cartItemId: uuidv4(), quantity: 1 };
          cart.push(newProduct);
        }
    
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCounts();
        toast.success("Product added to cart!");
      };

    return (
        <>
            <div className='maindiv pb-0'>
                <div className='container-fluid cf1'>
                <Header cartCount={cartCount} wishlistCount={wishlistCount} />
                <div className='container pt-5'>
                        <h1 className='head1 pt-5'>Wishlist</h1>
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
                                    <th>Total</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {wishlistItems.map((item) => (
                                    <tr className="text-center tr2" key={item.wishlistItemId}>
                                        <td><img className="w-50 pt-3 pb-3" src={`http://localhost:8001/images/${item.image[0]}`} alt={item.name} /></td>
                                        <td className="txt0">{item.name}</td>
                                        <td>${Number(item.price).toFixed(2)}</td>
                                        <td>${(Number(item.price) * item.quantity).toFixed(2)}</td>
                                        <td>
                                            <button className='removebutton' onClick={() => handleRemove(item.wishlistItemId)}>x</button><br />
                                            <i className='fa fa-cart-plus' onClick={() => addToCart(item)}></i>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="pt-5">
                <Footer />
            </div>
        </>
    );
}

export default Wishlist;
