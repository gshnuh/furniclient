import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import Select from "react-select";
import Footerbar from "./footerbar";

function AdminProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [countryList, setCountryList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [errors, setErrors] = useState({});
    const profile = JSON.parse(localStorage.getItem("adminProfile") || "{}");
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    axios.interceptors.request.use(
        (config) => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    useEffect(() => {
        if (profile && profile.id) {
            axios
                .get(`http://localhost:8001/signup/admindata/${profile.id}`)
                .then((response) => {
                    setFormData(response.data);
                    setImagePreview(`http://localhost:8001/images/${response.data.image}`);
                })
                .catch((error) => console.error("Error fetching profile data:", error));
        }
    }, [profile.id]);

    useEffect(() => {
        axios
            .get("http://localhost:8001/signup/allcountry")
            .then((response) => {
                setCountryList(response.data);
            })
            .catch((error) => console.error("Error fetching country list:", error));
    }, []);

    useEffect(() => {
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
        setImagePreview(URL.createObjectURL(selectedFile));
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
            setErrors((prev) => ({ ...prev, zip: "Invalid zip code" }));
            return false;
        }
        setErrors((prev) => ({ ...prev, zip: "" }));
        return true;
    };

    const handleSave = () => {
        if (!validateZip(formData.zip) || !validatePhone(formData.phone) || !validateEmail(formData.email)) {
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
        if (image) {
            updatedData.append("image", image);
        }

        axios
            .put(`http://localhost:8001/signup/updateadmin/${profile.id}`, updatedData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(() => {
                setIsEditing(false);
                navigate("/adminlist");
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

    return (
        <>
            <div className="container-fluid admindiv">
                <Navbar />
                <div className="row">
                    <div className="col-md-2 nvbr">
                        <Sidebar />
                    </div>
                    <div className="col-md-10 tablecol pb-5">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-4 text-center addv">
                                <h3>Admin Profile</h3>
                                <p>Update admin details</p>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center pt-5">
                            <div className="col-lg-6 col-md-8 col-sm-8">
                                <div className="text-center">
                                    {imagePreview ? (
                                        <img className="profile-pic w-25" src={imagePreview} alt="Profile" />
                                    ) : (
                                        <img className="profile-pic w-25" src={`http://localhost:8001/images/${formData.image}`} alt="Profile" />
                                    )}
                                </div>
                                {isEditing ? (
                                    <>
                                        <div className="row pt-3">
                                            <div className="form-group">
                                                <label className="text-black label1">Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control admininput"
                                                    name="name"
                                                    value={formData.name || ""}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="row pt-3">
                                            <div className="form-group">
                                                <label className="text-black label1">Email</label>
                                                <input
                                                    type="email"
                                                    className="form-control admininput"
                                                    name="email"
                                                    value={formData.email || ""}
                                                    onChange={handleInputChange}
                                                />
                                                {errors.email && <p className="errortext">{errors.email}</p>}
                                            </div>
                                        </div>
                                        <div className="row pt-3">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="text-black label1">Phone Number</label>
                                                    <input
                                                        type="text"
                                                        className="form-control admininput"
                                                        name="phone"
                                                        value={formData.phone || ""}
                                                        onChange={handleInputChange}
                                                    />
                                                    {errors.phone && <p className="errortext">{errors.phone}</p>}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="text-black label1">Postal / Zip Code</label>
                                                    <input
                                                        type="number"
                                                        className="form-control admininput"
                                                        name="zip"
                                                        value={formData.zip || ""}
                                                        onChange={handleInputChange}
                                                    />
                                                    {errors.zip && <p className="errortext">{errors.zip}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row pt-3">
                                            <div className="form-group">
                                                <label className="text-black label1">Address</label>
                                                <input
                                                    type="text"
                                                    className="form-control admininput"
                                                    name="address"
                                                    value={formData.address || ""}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="row pt-3">
                                            <div className="form-group">
                                                <label className="text-black label1">Address Line 1</label>
                                                <input
                                                    type="text"
                                                    className="form-control admininput"
                                                    name="address1"
                                                    value={formData.address1 || ""}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="row pt-3">
                                            <div className="form-group">
                                                <label className="text-black label1">Country</label>
                                                <Select
                                                    className="form-control admininput"
                                                    options={countryList.map((country) => ({
                                                        value: country.code,
                                                        label: country.name,
                                                    }))}
                                                    value={
                                                        formData.country
                                                            ? {
                                                                value: formData.country,
                                                                label: findCountryName(formData.country),
                                                            }
                                                            : null
                                                    }
                                                    onChange={handleCountryChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="row pt-3">
                                            <div className="form-group">
                                                <label className="text-black label1">State</label>
                                                <Select
                                                    className="form-control admininput"
                                                    options={filteredStates.map((state) => ({
                                                        value: state.name,
                                                        label: state.name,
                                                    }))}
                                                    value={
                                                        formData.state
                                                            ? {
                                                                value: formData.state,
                                                                label: findStateName(formData.state),
                                                            }
                                                            : null
                                                    }
                                                    onChange={handleStateChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="row pt-3">
                                            <div className="form-group">
                                                <label className="text-black label1">Profile Image</label>
                                                <input
                                                    type="file"
                                                    className="form-control admininput"
                                                    onChange={handleFileChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="row d-flex justify-content-center pt-3">
                                            <button
                                                className="btn btn-success w-25"
                                                onClick={handleSave}
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="row pt-3">
                                            <div className="form-group formdiv">
                                                <label className="text-black label1">Name</label>
                                                <p className="adminlabel">{formData.name}</p>
                                            </div>
                                        </div>
                                        <div className="row pt-3">
                                            <div className="form-group formdiv">
                                                <label className="text-black label1">Email</label>
                                                <p className="adminlabel">{formData.email}</p>
                                            </div>
                                        </div>
                                        <div className="row pt-3">
                                            <div className="form-group formdiv">
                                                <label className="text-black label1">Phone Number</label>
                                                <p className="adminlabel">{formData.phone}</p>
                                            </div>
                                        </div>
                                        <div className="row pt-3">
                                            <div className="form-group formdiv">
                                                <label className="text-black label1">Postal / Zip Code</label>
                                                <p className="adminlabel">{formData.zip}</p>
                                            </div>
                                        </div>
                                        <div className="row pt-3">
                                            <div className="form-group formdiv">
                                                <label className="text-black label1">Address</label>
                                                <p className="adminlabel">{formData.address}</p>
                                            </div>
                                        </div>
                                        <div className="row pt-3">
                                            <div className="form-group formdiv">
                                                <label className="text-black label1">Address Line 1</label>
                                                <p className="adminlabel">{formData.address1}</p>
                                            </div>
                                        </div>
                                        <div className="row pt-3">
                                            <div className="form-group formdiv">
                                                <label className="text-black label1">Country</label>
                                                <p className="adminlabel">{findCountryName(formData.country)}</p>
                                            </div>
                                        </div>
                                        <div className="row pt-3">
                                            <div className="form-group formdiv">
                                                <label className="text-black label1">State</label>
                                                <p className="adminlabel">{findStateName(formData.state)}</p>
                                            </div>
                                        </div>
                                        <div className="row d-flex justify-content-center pt-3">
                                            <div className="iconprfle">
                                                <button
                                                    type="button"
                                                    className="btn btn-warning"
                                                    onClick={handleEditClick}
                                                >
                                                    Edit Profile
                                                </button>
                                                <Link to="/adminlist" className="iconprfle1">
                                                    <button type="button" className="btn btn-danger">Cancel</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 footerdv"></div>
                    <div className="col-md-10 footerbar">
                        <Footerbar />
                    </div>
                </div>
            </div>
        </>
    );

}

export default AdminProfile;
