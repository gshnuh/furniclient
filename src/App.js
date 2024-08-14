import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Home from "./components/home";
import Shop from "./components/shop";
import About from "./components/about";
import Services from "./components/services";
import Blog from "./components/blog";
import Contact from "./components/contact";
import Cart from "./components/cart";
import Signup from "./components/signup";
import Login from "./components/login";
import Profile from './components/profile';
import Userlist from './admin/userlist';
import Dashboard from './admin/dashboard';
import Adminlist from './admin/adminlist';
import Adminsignup from './admin/adminsignup';
import Adminlogin from './admin/adminlogin';
import Adminprofile from './admin/adminprofile';
import UserSignup from './admin/usersignup';
import Userlogin from './admin/userlogin';
import Category from './admin/category';
import Taglist from './admin/taglist';
import Product from './admin/productmanagement';
import Footerbar from './admin/footerbar';
import Wishlist from './components/wishlist';
import Coupon from './admin/coupon';
import Order from './admin/ordermanagement';
import Orders from './components/orders';
import TrackOrder from './components/trackorder';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/about' element={<About />} />
          <Route path='/services' element={<Services />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/userlist' element={<Userlist />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/adminlist' element={<Adminlist />} />
          <Route path='/adminsignup' element={<Adminsignup />} />
          <Route path='/adminlogin' element={<Adminlogin />} />
          <Route path='/adminprofile' element={<Adminprofile />} />
          <Route path='/usersignup' element={<UserSignup />} />
          <Route path='/userlogin' element={<Userlogin />} />
          <Route path='/category' element={<Category />} />
          <Route path='/taglist' element={<Taglist />} />
          <Route path='/product' element={<Product />} />
          <Route path='/footerbar' element={<Footerbar />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/coupon' element={<Coupon />} />
          <Route path='/order' element={<Order />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/trackorder' element={<TrackOrder />} />
          </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
