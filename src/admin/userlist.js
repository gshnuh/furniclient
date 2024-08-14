import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Footerbar from "./footerbar";
function Userlist() {
    const [formData, setFormData] = useState({});
    const profile = JSON.parse((localStorage.getItem("userProfile") ? localStorage.getItem("userProfile") : null));
    const [countryList, setCountryList] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.defaults.headers.common["Authorization"] = token;
        }

        if (profile.id) {
            axios
                .get(`http://localhost:8001/signup/getdata/${profile.id}`)
                .then((response) => {
                    setFormData(response.data);
                })
                .catch((error) => console.error("Error fetching profile data:", error));
        }
    }, [profile.id]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.defaults.headers.common["Authorization"] = token;
        }

        axios
            .get("http://localhost:8001/signup/allcountry")
            .then((response) => {
                setCountryList(response.data);
            })
            .catch((error) => console.error("Error fetching country list:", error));
    }, []);

    const findCountryName = (countryCode) => {
        const foundCountry = countryList.find((c) => c.code === countryCode);
        return foundCountry ? foundCountry.name : "";
    };

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
        axios.delete(`http://localhost:8001/signup/deleteuser/${id}`)
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
                <div className="row adrow">
                    <div className="col-md-2 col-sm-6 pbtm nvbr">
                        <Sidebar />
                    </div>
                    <div className="col-md-10 col-sm-6 tablecol">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-4 text-center addv pb-3">
                                <h3>User List</h3>
                            </div>
                        </div>
                        <div className="row text-end pt-3">
                            <Link to="/usersignup">
                                <button type="button" className="btn btn-success">Add +</button>
                            </Link>
                        </div>
                        <div className="row p-3">
                            <table className="text-center">
                                <thead>
                                    <tr className="tblerw1">
                                        <th className="trtext">Name</th>
                                        <th className="trtext">Email</th>
                                        <th className="trtext">Phone</th>
                                        <th className="trtext">Address</th>
                                        <th className="trtext">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="trtext1">
                                        <td>
                                            {formData.name}<br />
                                            {formData.image && (
                                                <img
                                                    src={`http://localhost:8001/images/${formData.image}`}
                                                    alt={formData.name}
                                                    style={{ width: '100px', height: '100px' }}
                                                />
                                            )}
                                        </td>
                                        <td>{formData.email}</td>
                                        <td>{formData.phone}</td>
                                        <td className="pt-3">
                                            {formData.address}<br />
                                            {formData.address1}<br />
                                            {formData.zip}<br />
                                            {formData.state}<br />
                                            {findCountryName(formData.country)}
                                        </td>
                                        <td>
                                            <div className="d-flex justify-content-evenly">
                                                <Link to="/profile">
                                                    <i><span class="material-symbols-outlined trash">
                                                        edit
                                                    </span></i>
                                                </Link>
                                                <i className='fa fa-trash trash'
                                                    onClick={() => confirmDelete(formData._id)}
                                                >
                                                </i>
                                                {/* <Button type="button" variant="danger"
                                                    className="btn-sm dltbtn" onClick={() => confirmDelete(formData._id)}>Delete</Button> */}
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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

export default Userlist;
