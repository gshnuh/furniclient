import React, { useState, } from 'react';
import prfle from './images/prfle.png';
import Header from './header';
import Footer from "./footer";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';



function Signup() {
    const [name, setName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mail, setMail] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [phne, setPhne] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [firstnameerror, setFirstNameError] = useState("");
    const [lastnameerror, setLastNameError] = useState("");
    const [emailerror, setEmailError] = useState("");
    const [phoneerror, setPhoneError] = useState("");
    const [passworderror, setPasswordError] = useState("");
    const [cpassworderror, setCpasswordError] = useState("");
    const navigate = useNavigate("");



    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            setEmailError("")
            return (true)
        }
        setEmailError("You have entered an invalid email address!")
        return (false)
    }

    const ChangeEmail = (e) => {
        const currentemail = e.target.value;
        ValidateEmail(currentemail);
        setEmail(currentemail);
    }



    function ValidatePhone(phone) {
        if (/^\d{10}$/.test(phone)) {
            setPhoneError("")
            return (true)
        }
        setPhoneError("You have entered an invalid phone number!")
        return (false)
    }

    const ChangePhone = (e) => {
        const currentphone = e.target.value;
        ValidatePhone(currentphone);
        setPhone(currentphone);
    }


    const handleSubmit = () => {
        var formvalid = true;

        if (!firstName) {
            setFirstNameError("Name is Required.");
            formvalid = false;
        } else {
            setFirstNameError("")
        }
        if (!lastName) {
            setLastNameError("Name is Required.");
            formvalid = false;
        } else {
            setLastNameError("")
        }
        if (!email) {
            setEmailError("Email is Required.");
            formvalid = false;
        } else {
            setEmailError("")
        }
        if (!phone) {
            setPhoneError("Phone is Required.");
            formvalid = false;
        } else {
            setPhoneError("")
        }
        if (!password) {
            setPasswordError("Password is Required.");
            formvalid = false;
        } else {
            setPasswordError("")
        }
        if (!cpassword) {
            setCpasswordError("Password is Required.");
            formvalid = false;
        } else {
            setCpasswordError("")
        }
        if (password !== cpassword) {
            setCpasswordError("Password doesn't Match");
            formvalid = false;
        }
        // if (formvalid == true) {
        //     window.location.href = "/login";
        // }


        // setName(`${firstName} ${lastName}`);
        // setMail(`${email}`);
        // setPhne(`${phone}`)
        // setPassword(`${pswrd}`)
        // setCpassword(`${cpswrd}`)


        if (formvalid) {
            const formData = {
                name: `${firstName} ${lastName}`,
                email,
                phone,
                password,
            };
            axios.post("http://localhost:8001/signup/addform", formData)
                .then((response) => {
                    if (response.status === 200) {
                        toast.success("Signup successful", {
                            duration: 4000
                        })
                        setTimeout(() => {
                            navigate("/login");
                        }, 1000);

                    }
                })
                .catch((error) => {
                    toast.error("Signup failed: " + error.response.data.error);
                    console.error("Error occurred during form submission:", error.response.data.error);
                });
        }
    }

    return (
        <>
            <Toaster />
            <div className='maindiv'>
                <div className='container-fluid cf1 pb-0'>
                    <Header />
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
                                <img className="img03 w-50" src={prfle}></img>
                            </div>
                            <div>
                                <div className="row pt-5">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label class="text-black">First name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fname"
                                                name="fname"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            ></input>
                                            {firstnameerror && <p className='err'>{firstnameerror}</p>}
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label class="text-black">Last name</label>
                                            <input type="text" className="form-control" name="lname" id="lname"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                            ></input>
                                            {lastnameerror && <p className='err'>{lastnameerror}</p>}                                        </div>
                                    </div>
                                </div>
                                <div className="form-group pt-2">
                                    <label class="text-black">Email address</label>
                                    <input type="text" className="form-control" name="email" id="email"
                                        value={email}
                                        onChange={ChangeEmail}
                                    ></input>
                                    {emailerror && <p className='err'>{emailerror}</p>}
                                </div>
                                <div className="form-group pt-2">
                                    <label class="text-black">Phone</label>
                                    <input type="number" className="form-control" id="phone"
                                        value={phone}
                                        onChange={ChangePhone}
                                    ></input>
                                    {phoneerror && <p className='err'>{phoneerror}</p>}
                                </div>
                                <div className="form-group pt-2">
                                    <label class="text-black">Password</label>
                                    <input type="password" className="form-control" id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    ></input>
                                    {passworderror && <p className='err'>{passworderror}</p>}
                                </div>
                                <div className="form-group pt-2">
                                    <label class="text-black">Confirm Password</label>
                                    <input type="password" className="form-control" id="password"
                                        value={cpassword}
                                        onChange={(e) => setCpassword(e.target.value)}
                                    ></input>
                                    {cpassworderror && <p className='err'>{cpassworderror}</p>}                                </div>
                                <div className="pt-5 text-center">
                                    <button type='submit' className="prbtn w-25" onClick={handleSubmit}>Sign Up</button>
                                </div>
                                <p className="text-center pt-3">If you already have an account <a className="aaa" href="/login">Login</a> </p>
                            </div>
                            <h2>{name}</h2>
                            <h2>{mail}</h2>
                            <h2>{phne}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>

    );
}

export default Signup;