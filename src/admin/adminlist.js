import { Link } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footerbar from "./footerbar";

function Adminlist() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const profile = JSON.parse(localStorage.getItem("adminProfile") || "{}");
        if (profile && profile.id) {
            const token = localStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = token;

            axios.get(`http://localhost:8001/signup/admindata/${profile.id}`)
                .then((response) => {
                    setFormData(response.data);
                    if (response.data.image) {
                        setImagePreview(`http://localhost:8001/images/${response.data.image}`);
                    }
                    setLoggedIn(true);
                })
                .catch((error) => {
                    console.error("Error fetching profile data:", error);
                    setLoggedIn(false);
                });
        } else {
            setLoggedIn(false);
        }
    }, []);

    const confirmDelete = (id) => {
        toast(
            ({ closeToast }) => (
                <div>
                    Are you sure you want to delete this profile?
                    <div>
                        <button className='btn btn-danger logoutbtn' onClick={() => handleDelete(id, closeToast)}>Yes</button>
                        <button className='btn btn-secondary logoutbtn1' onClick={closeToast}>No</button>
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

    const handleDelete = (id, closeToast) => {
        axios.delete(`http://localhost:8001/signup/deleteprofile/${id}`)
            .then((response) => {
                toast.success("Profile deleted successfully!");
                setFormData(null);
                setLoggedIn(false);
                closeToast();
            })
            .catch(err => {
                toast.error("Failed to delete profile: " + err.message);
                closeToast();
            });
    };

    return (
        <>
            <ToastContainer />
            <div className="container-fluid admindiv">
                <Navbar />
                <div className="row">
                    <div className="col-md-2 pbtm nvbr">
                        <Sidebar />
                    </div>
                    <div className="col-md-10 tablecol">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-4 text-center addv pb-3">
                                <h3>Admin List</h3>
                            </div>
                        </div>
                        <div className="row text-end pt-3">
                            <Link to="/adminsignup">
                                <button type="button" className="btn btn-success">Add +</button>
                            </Link>
                        </div>
                        <table className="w-100 text-center">
                            <thead>
                                <tr className='tblerw1 pt-5'>
                                    <th className="trtext">Name</th>
                                    <th className="trtext">Email</th>
                                    <th className="trtext">Phone</th>
                                    <th className="trtext">Address</th>
                                    <th className="trtext">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loggedIn && formData.name && (
                                    <tr className="trtext1">
                                        <td>
                                            {formData.name}<br />
                                            {imagePreview && (
                                                <img
                                                    src={imagePreview}
                                                    alt={formData.name}
                                                    style={{ width: '100px', height: '100px' }}
                                                />
                                            )}
                                        </td>
                                        <td>{formData.email}</td>
                                        <td>{formData.phone}</td>
                                        <td className="pt-3">
                                            {formData.address}<br />
                                            {formData.zip}<br />
                                            {formData.state}<br />
                                        </td>
                                        <td>
                                            <div className="d-flex justify-content-evenly">
                                                <Link to="/adminprofile">
                                                    <i><span class="material-symbols-outlined trash">
                                                        edit
                                                    </span></i>
                                                </Link>
                                                <i className='fa fa-trash trash'
                                                    onClick={() => confirmDelete(formData._id)}
                                                >
                                                </i>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
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

export default Adminlist;
