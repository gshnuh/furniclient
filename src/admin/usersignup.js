import { Link, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function UserSignup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [zip, setZip] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [nameerror, setNameError] = useState("");
    const [emailerror, setEmailError] = useState("");
    const [phoneerror, setPhoneError] = useState("");
    const [passworderror, setPasswordError] = useState("");
    const [cpassworderror, setCpasswordError] = useState("");
    const [zipError, setZipError] = useState("");
    const navigate = useNavigate();

    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            setEmailError("");
            return true;
        }
        setEmailError("You have entered an invalid email address!");
        return false;
    }

    const ChangeEmail = (e) => {
        const currentemail = e.target.value;
        ValidateEmail(currentemail);
        setEmail(currentemail);
    };

    function ValidatePhone(phone) {
        if (/^\d{10}$/.test(phone)) {
            setPhoneError("");
            return true;
        }
        setPhoneError("You have entered an invalid phone number!");
        return false;
    }

    const ChangePhone = (e) => {
        const currentphone = e.target.value;
        ValidatePhone(currentphone);
        setPhone(currentphone);
    };

    const validateZip = (zip) => {
        const zipRegex = /^[1-9][0-9]{5}$|^[1-9][0-9]{3}\s[0-9]{3}$/;
        if (!zipRegex.test(zip)) {
            setZipError("Invalid zip code");
            return false;
        }
        setZipError("");
        return true;
    };

    const handleSubmit = () => {
        let formValid = true;

        if (!name) {
            setNameError("Name is required.");
            formValid = false;
        } else {
            setNameError("");
        }

        if (!email) {
            setEmailError("Email is required.");
            formValid = false;
        } else if (!ValidateEmail(email)) {
            formValid = false;
        }

        if (!phone) {
            setPhoneError("Phone is required.");
            formValid = false;
        } else if (!ValidatePhone(phone)) {
            formValid = false;
        }

        if (!zip) {
            setZipError("Zip code is required.");
            formValid = false;
        } else if (!validateZip(zip)) {
            formValid = false;
        }

        if (!address) {
            setAddress("Address is required.");
            formValid = false;
        }

        if (!password) {
            setPasswordError("Password is required.");
            formValid = false;
        } else {
            setPasswordError("");
        }

        if (!cpassword) {
            setCpasswordError("Confirm password is required.");
            formValid = false;
        } else if (password !== cpassword) {
            setCpasswordError("Passwords do not match.");
            formValid = false;
        } else {
            setCpasswordError("");
        }

        if (formValid) {
            const formData = {
                name,
                email,
                phone,
                zip,
                address,
                password,
            };
            axios.post("http://localhost:8001/signup/addform", formData)
                .then((response) => {
                    if (response.status === 200) {
                        toast.success("Signup successful", {
                            duration: 4000
                        })
                        setTimeout(() => {
                            navigate("/userlist");
                        }, 1000);

                    }
                })
                .catch((error) => {
                    toast.error("Signup failed: " + error.response.data.error);
                    console.error("Error occurred during form submission:", error.response.data.error);
                });
        }
    };

    return (
        <>
            <div className="container-fluid admindiv">
                <Navbar />
                <div className="row adrow">
                    <div className="col-md-2 nvbr">
                        <Sidebar />
                    </div>
                    <div className="col-lg-8 col-md-10 pb-5 tablecol1">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-4 text-center addv">
                                <h3>Add User</h3>
                                <p>Enter user details</p>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center pt-5">
                            <div className="col-md-6 col-lg-5">
                                <label className="text-black label1">Name</label>
                                <input
                                    type="text"
                                    className="form-control admininput"
                                    id="fname"
                                    name="fname"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></input>
                                {nameerror && <p className='err'>{nameerror}</p>}
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center pt-3">
                            <div className="col-md-6 col-lg-5">
                                <label className="text-black label1">Email</label>
                                <input type="text" className="form-control admininput" name="email" id="email"
                                    value={email}
                                    onChange={ChangeEmail}
                                ></input>
                                {emailerror && <p className='err'>{emailerror}</p>}
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center pt-3">
                            <div className="col-md-6 col-lg-5">
                                <label className="text-black label1">Address</label>
                                <input
                                    type="text"
                                    className="form-control admininput"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                ></input>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center pt-3">
                            <div className="col-md-6 col-lg-5">
                                <label className="text-black label1">Postal / Zip Code</label>
                                <input
                                    type="text"
                                    className="form-control admininput"
                                    value={zip}
                                    onChange={(e) => setZip(e.target.value)}
                                />
                                {zipError && <p className="err">{zipError}</p>}
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center pt-3">
                            <div className="col-md-6 col-lg-5">
                                <label className="text-black label1">Phone</label>
                                <input type="text" className="form-control admininput" id="phone"
                                    value={phone}
                                    onChange={ChangePhone}
                                ></input>
                                {phoneerror && <p className='err'>{phoneerror}</p>}
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center pt-3">
                            <div className="col-md-6 col-lg-5">
                                <label className="text-black label1">Profile Picture</label>
                                <input type="file" className="form-control admininput"></input>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center pt-3">
                            <div className="col-md-6 col-lg-5">
                                <label className="text-black label1">Password</label>
                                <input type="password" className="form-control admininput" id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                ></input>
                                {passworderror && <p className='err'>{passworderror}</p>}
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center pt-3">
                            <div className="col-md-6 col-lg-5">
                                <label className="text-black label1">Confirm Password</label>
                                <input type="password" className="form-control admininput" id="password"
                                    value={cpassword}
                                    onChange={(e) => setCpassword(e.target.value)}
                                ></input>
                                {cpassworderror && <p className='err'>{cpassworderror}</p>}
                            </div>
                        </div>
                        <div className="text-center pt-5">
                            <div className="">
                                <button type="button" className="btn btn-success" onClick={handleSubmit}>Add</button>
                                <Link to={"/dashboard"} className="dashlink">
                                    <button type="button" className="btn btn-danger">Cancel</button>
                                </Link>
                            </div>
                        </div>
                        <div>
                            <p className="text-center pt-3">If you already have an account <a className="aaa" href="/userlogin">Login</a> </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserSignup;
