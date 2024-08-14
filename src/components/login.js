import prfle from './images/prfle.png';
import Header from './header';
import Footer from "./footer";
import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';



function Login() {
    const [mail, setMail] = useState("");
    const [email, setEmail] = useState("");
    const [emailerror, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passworderror, setPasswordError] = useState("");
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

    const handleSubmit = () => {
        var formvalid = true;

        if (!email) {
            setEmailError("Email is Required.");
            formvalid = false;
        } else {
            setEmailError("")
        }
        if (!password) {
            setPasswordError("Password is Required.");
            formvalid = false;
        }
        if (formvalid) {
            const formData = {
                email,
                password,
            };
            axios.post("http://localhost:8001/signup/log", formData)
                .then((response) => {
                    if (response.status === 200) {
                        localStorage.setItem("userProfile",JSON.stringify(response.data.form))
                        localStorage.setItem("token",(response.data.token))
                        toast.success("Login successful", {
                            duration: 4000
                        })
                        setTimeout(() => {
                            navigate("/");
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
                                <img className="img03 w-50" src={prfle}></img>                            </div>
                            <form>
                                <div className="form-group pt-2">
                                    <label class="text-black">Email address</label>
                                    <input type="text" className="form-control" name="email" id="email"
                                        value={email}
                                        onChange={ChangeEmail}
                                    ></input>
                                    {emailerror && <p className='err'>{emailerror}</p>}
                                </div>
                                <div className="form-group pt-2">
                                    <label class="text-black">Password</label>
                                    <input type="password" className="form-control" id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    ></input>
                                </div>
                                <div className="pt-5 text-center">
                                    <button type='button' className="prbtn w-25" onClick={() => handleSubmit()}>Login</button>
                                </div>
                            </form>
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

export default Login;