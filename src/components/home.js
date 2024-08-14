import React from 'react';
import couch from "./images/couch.png";
import product1 from "./images/product1.png";
import product2 from "./images/product2.png";
import product3 from "./images/product3.png";
import why from "./images/why.jpg";
import grid1 from "./images/grid1.jpg";
import grid2 from "./images/grid2.jpg";
import grid3 from "./images/grid3.jpg";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Header from './header';
import Footer from "./footer";
import Crsl from "./crsl";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';


function Home() {
  const [services, setServices] = useState([]);
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
    fetch("services.json")
      .then(response => response.json())
      .then(data => {
        setServices(data);
        console.log(data, "hhhhhhhhhhhhhhhhhhhhhh");
      })
      .catch(error => console.log(error))

    fetch("blog.json")
      .then(response => response.json())
      .then(data => {
        setblog(data);
        console.log(data, "hhhhhhhhhhhh");
      })
      .catch(error => console.log(error))


    // axios.post("http://localhost:8001/signup/addstate")
    //   .then((response) => {
    //     console.log(response.data)
    //   })
    //   .catch(error => console.log(error))


    //   axios.post("http://localhost:8001/signup/addcountry")
    //     .then((response) => {
    //       console.log(response.data)
    //     })
    //     .catch(error => console.log(error))
  }, []);

  return (
    <>
      <div className='maindiv'>
        <div className='container-fluid cf1'>
          <Header cartCount={cartCount} wishlistCount={wishlistCount} />
          <div className='container'>
            <div className='row pt-5'>
              <div className='col-md-5'>
                <h1 className='head1'>Modern Interior Design Studio</h1>
                <p className='pt-3 pop'>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.</p>
                <div className='row pt-3'>
                  <div className='col-md-3'>
                    <Link to="/shop">
                      <Button className='btn7' variant="warning">Shop Now</Button>
                    </Link>
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
        <div className='container cf22 pt-5'>
          <div className='row'>
            <div className='col-md-12 col-lg-3 mb-5 mb-lg-0'>
              <h1>Crafted with excellent material.</h1>
              <p className='pg pt-3'>Donec vitae odio quis nisl dapibus malesuada.Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
              </p>
              <div className='pt-3'>
                <Link to="/shop">
                  <Button className='btn7' variant="dark">Explore</Button>
                </Link>
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
        <div className='container pt-3'>
          <div className='row'>
            <div className='col-lg-6'>
              <h1>Why Choose Us</h1>
              <p className='pg pt-3'>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.</p>
              <div className="row">
                {services.slice(4).map((item, index) => (
                  <div key={index} className='col-6 col-md-6'>
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
            <div className='col-6 col-md-6'>
              <div className="img-wrap img1 ">
                <div className='pt-5'>
                  <img className='whyimg' src={why}></img>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='container-fluid pt-5'>
          <div className='row rw1 p-5'>
            <div className='col-lg-7 mb-5 mb-lg-0'>
              <div className='imgs-grid'>
                <div className="grid grid 1 g1">
                  <img src={grid1} className="img2"></img>
                </div>
                <div className="grid grid 2 g2">
                  <img src={grid2} className="img2"></img>
                </div>
                <div className="grid grid 3 g3">
                  <img src={grid3} className="img2"></img>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <h2>We Help You Make Modern Interior Design</h2>
              <p className='pg'>Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada</p>
              <div className="row">
                <div className='col-md-6'>
                  <ul className="ul1">
                    <li>Donec vitae odio quis nisl dapibus malesuada</li>
                  </ul>
                </div>
                <div className='col-md-6'>
                  <ul className="ul1">
                    <li>Donec vitae odio quis nisl dapibus malesuada</li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className='col-md-6'>
                  <ul className="ul1">
                    <li>Donec vitae odio quis nisl dapibus malesuada</li>
                  </ul>
                </div>
                <div className='col-md-6'>
                  <ul className="ul1">
                    <li>Donec vitae odio quis nisl dapibus malesuada</li>
                  </ul>
                </div>
              </div>
              <div className='p-3'>
                <Button className='btn7' variant="dark">Explore</Button>
              </div>
            </div>
          </div>
        </div>
        <div className='container pt-5'>
          <div className='row'>
            <div className='col-12 col-md-6 col-lg-4 mb-4 mb-lg-0'>
              <div className='d-flex'>
                <img className='img3' src={product1}></img>
                <div className='txt'>
                  <h5>Nordic Chair</h5>
                  <p className='pg0'>Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio</p>
                  <a href='#' className='read'>Read More</a>
                </div>
              </div>
            </div>
            <div className='col-12 col-md-6 col-lg-4 mb-4 mb-lg-0'>
              <div className='d-flex'>
                <img className='img3' src={product2}></img>
                <div className='txt'>
                  <h5>Kruzo Aero Chair</h5>
                  <p className='pg0'>Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio</p>
                  <a href='#' className='read'>Read More</a>
                </div>
              </div>
            </div>
            <div className='col-12 col-md-6 col-lg-4 mb-4 mb-lg-0'>
              <div className='d-flex'>
                <img className='img3' src={product3}></img>
                <div className='txt'>
                  <h5>Ergonomic Chair</h5>
                  <p className='pg0'>Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio</p>
                  <a href='#' className='read'>Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Crsl />
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-md-10'>
              <h1>Recent Blog</h1>
            </div>
            <div className='col-md-2'>
              <a href='#' className='view'>View All Posts</a>
            </div>
          </div>
          <div className='row'>
            {blog.slice(6).map((item, index) => (
              <div key={index} className='col-md-4'>
                <img className='post' src={item.image}></img>
                <p className='posttext'>{item.title}</p>
                <p><div dangerouslySetInnerHTML={{ __html: item.description }}></div></p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>

  );
}

export default Home;
