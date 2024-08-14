import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Navbar() {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const profile = JSON.parse(localStorage.getItem("adminProfile"));
        if (token && profile) {
            setIsAdminLoggedIn(true);
            if (profile.image) {
                setProfilePicture(`http://localhost:8001/images/${profile.image}`);
            }
        }
    }, []);

    const confirmLogout = () => {
        toast(
            ({ closeToast }) => (
                <div>
                    Are you sure you want to log out?
                    <div>
                        <button className='btn logoutbtn' onClick={() => handleLogout(closeToast)}>Yes</button>
                        <button className='btn logoutbtn1' onClick={closeToast}>No</button>
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
        localStorage.removeItem("token");
        localStorage.removeItem("adminProfile");
        setIsAdminLoggedIn(false);
        closeToast();
        toast.success("Successfully logged out.");
        navigate("/dashboard");
    };

    return (
        <>
            <ToastContainer />
            <nav className="navbar navbar-expand-lg border-body" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand frni" href="/">Furni.</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse navclpse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            {isAdminLoggedIn ? (
                                <>
                                    <li className="nav-item nvtm">
                                        <a href="/adminprofile" className="nav-link">
                                            {profilePicture ? (
                                                <img src={profilePicture} alt="Profile" className="profile-pic-nav" />
                                            ) : (
                                                <FontAwesomeIcon className="adcon" icon={faUser} />
                                            )}
                                        </a>
                                    </li>
                                    <li className="nav-item nvtm">
                                        <button className="btn nav-link" onClick={confirmLogout}>
                                            <FontAwesomeIcon className="adcon" icon={faRightFromBracket} />
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <li className="nav-item nvtm sidebar">
                                    <a href="/adminlogin" className="btn nav-link">Login</a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
