import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import Select from "react-select";


function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [countryList, setCountryList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [image, setImage] = useState(null);
    const [imagepreview, setImagePreview] = useState(null);
    const [isMatch, setIsMatch] = useState();
    const profile = JSON.parse(localStorage.getItem("userProfile"));
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const token = localStorage.getItem("token");
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
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        axios
            .get(`http://localhost:8001/signup/getdata/${profile.id}`)
            .then((response) => {
                setFormData(response.data);
            })
            .catch((error) => console.error("Error fetching profile data:", error));
    }, [profile.id]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        axios
            .get("http://localhost:8001/signup/allcountry")
            .then((response) => {
                setCountryList(response.data);
            })
            .catch((error) => console.error("Error fetching country list:", error));
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        axios
            .get("http://localhost:8001/signup/allstate")
            .then((response) => {
                setStateList(response.data);
            })
            .catch((error) => console.error("Error fetching state list:", error));
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setImage(selectedFile);
        setImagePreview(URL.createObjectURL(selectedFile))
    };

    const handleCountryChange = (selectedOption) => {
        setFormData((prev) => ({
            ...prev,
            country: selectedOption ? selectedOption.value : "",
            state: "",
        }));
    };

    const handleStateChange = (selectedOption) => {
        setFormData((prev) => ({
            ...prev,
            state: selectedOption ? selectedOption.value : "",
        }));
    };

    const validateEmail = (email) => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            setErrors((prev) => ({ ...prev, email: 'Invalid email address' }));
            return false;
        } else {
            setErrors((prev) => ({ ...prev, email: '' }));
            return true;
        }
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            setErrors((prev) => ({ ...prev, phone: 'Invalid phone number' }));
            return false;
        } else {
            setErrors((prev) => ({ ...prev, phone: '' }));
            return true;
        }
    };

    const validateZip = (zip) => {
        const zipRegex = /^[1-9][0-9]{5}$|^[1-9][0-9]{3}\s[0-9]{3}$/;
        if (!zipRegex.test(zip)) {
            setErrors((prev) => ({
                ...prev,
                zip: "Invalid zip code",
            }));
            return false;
        }
        setErrors((prev) => ({
            ...prev,
            zip: "",
        }));
        return true;
    };

    const handleSave = () => {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        if (!validateZip(formData.zip)) {
            return;
        }
        if (!validatePhone(formData.phone)) {
            return;
        }
        if (!validateEmail(formData.email)) {
            return;
        }

        const updatedData = new FormData();


        updatedData.append("name", formData.name);
        updatedData.append("email", formData.email);
        updatedData.append("phone", formData.phone);
        updatedData.append("zip", formData.zip);
        updatedData.append("address", formData.address);
        updatedData.append("address1", formData.address1);
        updatedData.append("country", formData.country);
        updatedData.append("state", formData.state);

        updatedData.append("image", image);

        axios
            .put(`http://localhost:8001/signup/update/${profile.id}`, updatedData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(() => {
                setIsEditing(false);
                navigate("/profile");
            })
            .catch((error) => console.error("Error updating profile:", error));
    };

    const findCountryName = (countryCode) => {
        const foundCountry = countryList.find((c) => c.code === countryCode);
        return foundCountry ? foundCountry.name : "Unknown Country";
    };

    const findStateName = (stateCode) => {
        const foundState = stateList.find((s) => s.name === stateCode);
        return foundState ? foundState.name : "Unknown State";
    };

    const filteredStates = stateList.filter(
        (state) => state.country_code === formData.country
    );


    axios.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );


    return (
        <>
            <div className="container-fluid cf1 pb-1">
                <Header cartCount={cartCount} wishlistCount={wishlistCount} />
                <div className="container pt-5">
                    <h1 className="head1 pt-5">Profile</h1>
                </div>
            </div>
            <div className="container-fluid maindiv">
                <div className="row justify-content-center">
                    <div className="col-md-12 col-lg-7">
                        <div className="row">
                            <div className="col-lg-4 col-sm-12 propic">
                                {imagepreview ?
                                    (
                                        <img className="profile-pic w-100" src={imagepreview} alt="Profile" />
                                    ) : (
                                        <img className="profile-pic w-100" src={`http://localhost:8001/images/${formData.image}`} alt="Profile" />
                                    )
                                }                            </div>
                            <div className="col-lg-8 col-sm-12 pt-5">
                                {isEditing ? (
                                    <>
                                        <div className="row">
                                            <div className="form-group fg">
                                                <label className="text-black label1">Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="name"
                                                    value={formData.name || ""}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="row pt-3">
                                            <div className="form-group fg">
                                                <label className="text-black label1">Email</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    name="email"
                                                    value={formData.email || ""}
                                                    onChange={handleInputChange}
                                                />
                                                {errors.email && <p className="errortext">{errors.email}</p>}
                                            </div>
                                        </div>
                                        <div className="row pt-3">
                                            <div className="col-md-6">
                                                <div className="form-group fg">
                                                    <label className="text-black label1">Phone Number</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="phone"
                                                        value={formData.phone || ""}
                                                        onChange={handleInputChange}
                                                    />
                                                    {errors.phone && <p className="errortext">{errors.phone}</p>}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group fg">
                                                    <label className="text-black label1">Postal / Zip Code</label>
                                                    <input
                                                        type="number"
                                                        class="form-control"
                                                        name="zip"
                                                        value={formData.zip || ""}
                                                        onChange={handleInputChange}
                                                    />
                                                    {errors.zip && <p className="errortext">{errors.zip}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row pt-3">
                                            <div class="form-group fg">
                                                <label className="text-black label1">Address</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="address"
                                                    value={formData.address || ""}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="row pt-3">
                                            <div class="form-group fg">
                                                <label class="text-black label1">Address Line 2</label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    name="address1"
                                                    value={formData.address1 || ""}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="row pt-3">
                                            <div className="col-md-6">
                                                <div class="form-group fg">
                                                    <label className="text-black label1">Country</label>
                                                    <Select
                                                        options={countryList.map((c) => ({
                                                            value: c.code,
                                                            label: c.name,
                                                        }))}
                                                        value={countryList ?
                                                            { value: formData.country, label: findCountryName(formData.country) }
                                                            : null
                                                        }
                                                        onChange={handleCountryChange}
                                                        isClearable
                                                        placeholder="Select a Country"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div class="form-group fg">
                                                    <label className="text-black label1">State</label>
                                                    <Select
                                                        options={filteredStates.map((s) => ({
                                                            value: s.name,
                                                            label: s.name,
                                                        }))}
                                                        value={filteredStates ?
                                                            { value: formData.state, label: findStateName(formData.state) }
                                                            : null
                                                        }
                                                        onChange={handleStateChange}
                                                        isClearable
                                                        placeholder="Select a State"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row pt-3">
                                            <div className="col-md-6">
                                                <div className="form-group fg">
                                                    <label className="text-black">Profie Picture (File)</label>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        onChange={handleFileChange}
                                                        accept="image/*"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center pt-5">
                                            <button
                                                type="button"
                                                className="btn btn-success"
                                                onClick={handleSave}
                                            >
                                                Save Profile
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="row">
                                            <div class="form-group fg">
                                                <label class="text-black label1">Name</label>
                                                <div class="data1">{formData.name}</div>
                                            </div>
                                        </div>
                                        <div className="row pt-5">
                                            <div class="form-group fg">
                                                <label class="text-black label1">Email</label>
                                                <div class="data1">{formData.email}</div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6 pt-5">
                                                <div class="form-group fg">
                                                    <label class="text-black label1">Phone Number</label>
                                                    <div class="data1">{formData.phone}</div>
                                                </div>
                                            </div>
                                            <div class="col-md-6 pt-5">
                                                <div class="form-group fg">
                                                    <label class="text-black label1">Postal / Zip Code</label>
                                                    <div class="data1">{formData.zip}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row pt-5">
                                            <div class="form-group fg">
                                                <label class="text-black label1">Address</label>
                                                <div class="data1">{formData.address}</div>
                                            </div>
                                        </div>
                                        <div class="row pt-5">
                                            <div class="form-group fg">
                                                <label class="text-black label1">Address Line 2</label>
                                                <div class="data1">{formData.address1}</div>
                                            </div>
                                        </div>
                                        <div class="row pt-5">
                                            <div class="form-group fg">
                                                <Link to="/orders">
                                                    <label class="text-black label1">Orders</label>
                                                </Link>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6 pt-5">
                                                <div class="form-group fg">
                                                    <label class="text-black label1">Country</label>
                                                    <div class="data1">{findCountryName(formData.country)}</div>
                                                </div>
                                            </div>
                                            <div class="col-md-6 pt-5">
                                                <div class="form-group fg">
                                                    <label class="text-black label1">State</label>
                                                    <div class="data1">{findStateName(formData.state)}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="text-center pt-5">
                                            <button
                                                type="button"
                                                class="btn btn-success"
                                                onClick={handleEditClick}
                                            >
                                                Edit Profile
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Profile;
