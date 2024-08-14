import Header from './header';
import Footer from "./footer";
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { v4 as uuidv4 } from 'uuid';

function Shop() {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchProducts();
    updateCounts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get("http://localhost:8001/signup/productlist");
      setProducts(response.data);
    } catch (error) {
      toast.error("Error fetching Products: " + error.message);
      console.error("Error fetching Products:", error);
    }
  };

  const updateCounts = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));
    setWishlistCount(wishlist.length);
    setWishlist(wishlist);
  };  

  const handleShow = (product) => {
    setSelectedProduct(product);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const getProductImages = () => {
    if (!selectedProduct || !selectedProduct.image) return [];

    return selectedProduct.image.map((image) => ({
      original: `http://localhost:8001/images/${image}`,
      thumbnail: `http://localhost:8001/images/${image}`,
    }));
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

  const addToWishlist = (product) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const existingProduct = wishlist.find((item) => item._id === product._id);

    if (existingProduct) {
      wishlist = wishlist.filter((item) => item._id !== product._id);
      toast.success("Product removed from wishlist!");
    } else {
      const newProduct = { ...product, wishlistItemId: uuidv4(), quantity: 1 };
      wishlist.push(newProduct);
      toast.success("Product added to wishlist!");
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    setWishlist(wishlist);
    updateCounts();
  };

  const isProductInWishlist = (productId) => {
    return wishlist.some((item) => item._id === productId);
  };

  return (
    <>
      <div className='maindiv'>
        <div className='container-fluid cf1'>
          <Header cartCount={cartCount} wishlistCount={wishlistCount} />
          <div className='container pt-5'>
            <h1 className='head2 pt-5'>Shop</h1>
          </div>
        </div>
        <div className='container pt-5'>
          <div className='row'>
            {products.map((product, index) => (
              <div className='col-12 col-md-4 col-lg-3 mb-5 mb-md-0 pt-3' key={index}>
                <Card className='card' onClick={() => handleShow(product)}>
                  <Card.Img variant="top" style={{ width: '100%', height: '300px' }} src={`http://localhost:8001/images/${product.image[0]}`} />
                  <Card.Body className='text-center'>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text className='cardtext'>
                      <div className="d-flex justify-content-evenly">
                        <p className="price">${product.price}</p>
                        <p>${product.offerPrice}</p>
                      </div>
                    </Card.Text>
                    <div className='overlay'>
                    </div>
                    <div className='hover-icons'>
                      <i className='fa fa-cart-plus'
                        onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                      > 
                      </i>
                      <i
                        className="material-symbols-outlined"
                        style={{ color: isProductInWishlist(product._id) ? 'red' : 'black' }}
                        onClick={(e) => { e.stopPropagation(); addToWishlist(product); }}
                      >
                        favorite
                      </i>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container">
        <Footer />
      </div>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct ? selectedProduct.name : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <>
              {selectedProduct.image && selectedProduct.image.length > 0 ? (
                <div className="image-gallery-container">
                  <ImageGallery items={getProductImages()} />
                </div>
              ) : (
                <p>No images available</p>
              )}
              <div className="mt-3 text-center">
                <p>Category: {selectedProduct.category}</p>
                <p>Tag: {selectedProduct.tag}</p>
                <p className="price">Price: ${selectedProduct.price}</p>
                <p>Offer Price: ${selectedProduct.offerPrice}</p>
              </div> 
              <div className='text-center'>
                <Button
                  variant="dark"
                  className="btn-sm"
                  onClick={() => addToCart(selectedProduct)}
                >
                  Add to cart
                </Button>
              </div>
              <div className='text-center pt-3'>
                <Button
                  variant="info"
                  className="btn-sm"
                  onClick={() => addToWishlist(selectedProduct)}
                >
                  Add to wishlist
                </Button>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Shop;
