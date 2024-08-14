import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Header({ cartCount,  wishlistCount }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const [LoggedIn, setLoggedIn] = useState(false);
  const profile = JSON.parse(localStorage.getItem("userProfile") ? localStorage.getItem("userProfile") : null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    if (profile) {
      setLoggedIn(true);
      axios
        .get(`http://localhost:8001/signup/getdata/${profile.id}`)
        .then((response) => {
          setFormData(response.data);
          if (response.data.image) {
            setImagePreview(`http://localhost:8001/images/${response.data.image}`);
          }
        })
        .catch((error) => console.error("Error fetching profile data:", error));
    } else {
      setLoggedIn(false);
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
  };

  const updatedData = new FormData();
  updatedData.append("image", image);

  const updateProfile = () => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    axios
      .put(`http://localhost:8001/signup/update/${profile.id}`, updatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setIsEditing(false);
        setImagePreview(URL.createObjectURL(image));
      })
      .catch((error) => console.error("Error updating profile:", error));
  };

  const confirmLogout = () => {
    toast(
      ({ closeToast }) => (
        <div>
          Are you sure you want to log out?
          <div>
            <button className='logoutbtn' onClick={() => handleLogout(closeToast)}>Yes</button>
            <button className='logoutbtn1' onClick={closeToast}>No</button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        hideProgressBar: true,
      }
    );
  };

  const handleLogout = (closeToast) => {
    localStorage.removeItem("userProfile");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");
    setLoggedIn(false);
    closeToast();
    toast.success("Successfully logged out.");
  };

  return (
    <>
      <div className='container'>
        <div className='row'>
          <Navbar expand="lg" className="bg-body-transparent">
            <Container>
              <div className='col-md-6'>
                <Navbar.Brand className='navbrand' href="#home">Furni.</Navbar.Brand>
              </div>
              <div className='col-md-6'>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto d-flex justify-content-between w-100">
                    <Nav.Link className='navitem' href="/">Home</Nav.Link>
                    <Nav.Link className='navitem' href="/shop">Shop</Nav.Link>
                    <Nav.Link className='navitem' href="/about">About Us</Nav.Link>
                    <Nav.Link className='navitem' href="/services">Services</Nav.Link>
                    <Nav.Link className='navitem' href="/blog">Blog</Nav.Link>
                    <Nav.Link className='navitem' href="/contact">Contact Us</Nav.Link>
                    {LoggedIn && (
                      <Nav.Link className='navitem icondv' href="/profile">
                        {profile.image ? (
                          <img className="iconimage" src={`http://localhost:8001/images/${profile.image}`} alt="Profile" />
                        ) : (
                          <i className='fa fa-user'></i>
                        )}
                      </Nav.Link>
                    )}
                    {!LoggedIn && <Nav.Link className='navitem' href="/signup">Sign Up</Nav.Link>}
                    <Nav.Link className='navitem carticon' href="/cart">
                      <i className='fa fa-cart-plus'></i>
                      {cartCount > 0 && <span className="badge">{cartCount}</span>}
                    </Nav.Link>
                    <Nav.Link className='navitem' href="/wishlist">
                      <i><span className="material-symbols-outlined">
                        favorite
                      </span></i>
                      {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
                    </Nav.Link>
                    <Nav.Link className='navitem carticon' href="/trackorder">
                      <i className='fa fa-truck'></i>
                    </Nav.Link>
                    {LoggedIn && (
                      <Nav.Link className='navitem' href="#" onClick={confirmLogout}>
                        <i><span className="material-symbols-outlined">
                          Logout
                        </span></i>
                      </Nav.Link>
                    )}
                  </Nav>
                </Navbar.Collapse>
              </div>
            </Container>
          </Navbar>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Header;
