import prfle from '../components/images/prfle.png';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import Navbar from './navbar';
import Footerbar from './footerbar';

function Userlogin() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
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
        const currentEmail = e.target.value;
        ValidateEmail(currentEmail);
        setEmail(currentEmail);
    }

    const handleSubmit = () => {
        let formValid = true;

        if (!email) {
            setEmailError("Email is Required.");
            formValid = false;
        } else if (!ValidateEmail(email)) {
            formValid = false;
        }

        if (!password) {
            setPasswordError("Password is Required.");
            formValid = false;
        } else {
            setPasswordError("");
        }

        if (formValid) {
            const formData = {
                email,
                password,
            };

            axios.post("http://localhost:8001/signup/log", formData)
                .then((response) => {
                    if (response.status === 200) {
                        localStorage.setItem("userProfile", JSON.stringify(response.data));
                        localStorage.setItem("token", response.data.token);
                        toast.success("Login successful", {
                            duration: 4000
                        });
                        setTimeout(() => {
                            navigate("/userlist");
                        }, 1000);
                    }
                })
                .catch((error) => {
                    toast.error("Login failed: " + error.response.data.error);
                    console.error("Error occurred during form submission:", error.response.data.error);
                });
        }
    }

    return (
        <>
            <Toaster />
            <div className='maindiv'>
                <div className='container-fluid cf1 pb-0'>
                    <Navbar />
                    <div className='container pt-5'>
                        <h1 className='head1 pt-5'></h1>
                    </div>
                </div>
            </div>
            <div className="container-fluid pt-5 maindiv">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-4 col-lg-4 pb-4">
                            <div className="text-center">
                                <img className="img03 w-50" src={prfle} alt="Profile" />
                            </div>
                            <form>
                                <div className="form-group pt-2">
                                    <label className="text-black">Email address</label>
                                    <input type="text" className="form-control" name="email" id="email"
                                        value={email}
                                        onChange={ChangeEmail}
                                    />
                                    {emailError && <p className='err'>{emailError}</p>}
                                </div>
                                <div className="form-group pt-2">
                                    <label className="text-black">Password</label>
                                    <input type="password" className="form-control" id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {passwordError && <p className='err'>{passwordError}</p>}
                                </div>
                                <div className="pt-5 text-center">
                                    <button type='button' className="prbtn w-25" onClick={handleSubmit}>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid pt-5">
                <div className="row">
                    <div className="footerbar">
                        <Footerbar />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Userlogin;
