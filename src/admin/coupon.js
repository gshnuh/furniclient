import axios from "axios";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import { Toaster } from "react-hot-toast";
import Carousel from 'react-bootstrap/Carousel';
import Footerbar from "./footerbar";

function Coupon() {
    const [show, setShow] = useState(false);
    const [viewShow, setViewShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleViewClose = () => setViewShow(false);
    const handleShow = () => setShow(true);
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [code, setCode] = useState("");
    const [discount, setDiscount] = useState("");
    const [discountError, setDiscountError] = useState("");
    const [coupons, setCoupons] = useState([]);
    const [editingCoupon, setEditingCoupon] = useState(null);
    const [viewingCoupon, setViewingCoupon] = useState(null);

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        try {
            const token = localStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = token;
            const response = await axios.get("http://localhost:8001/signup/couponlist");
            setCoupons(response.data);
        } catch (error) {
            console.error("Error fetching Coupons:", error);
        }
    };

    const handleEdit = (coupon) => {
        setEditingCoupon(coupon);
        setName(coupon.name);
        setCode(coupon.code);
        setDiscount(coupon.discount);
        handleShow();
    };

    const handleView = (coupon) => {
        setViewingCoupon(coupon);
        setViewShow(true);
    };

    const handleAdd = () => {
        setEditingCoupon(null);
        setName("");
        setCode("");
        setDiscount("");
        setNameError("");
        setDiscountError("");
        handleShow();
    };

    const handleSubmit = async () => {
        let formValid = true;

        if (!name) {
            setNameError("Name is required.");
            formValid = false;
        } else {
            setNameError("");
        }
        if (!discount) {
            setDiscountError("Discount is required.");
            formValid = false;
        } else if (Number(discount) > 100) {
            setDiscountError("Discount cannot be more than 100%.");
            formValid = false;
        } else {
            setDiscountError("");
        }

        if (formValid) {
            const formData = {
                name,
                code,
                discount
            };

            try {
                const token = localStorage.getItem("token");
                axios.defaults.headers.common["Authorization"] = token;
                let response;
                if (editingCoupon) {
                    response = await axios.put(`http://localhost:8001/signup/updatecoupon/${editingCoupon._id}`, formData, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    if (response.status === 200) {
                        toast.success("Successfully updated", { duration: 4000 });
                        setCoupons(coupons.map(coupon => (coupon._id === editingCoupon._id ? response.data : coupon)));
                        handleClose();
                    }
                } else {
                    response = await axios.post("http://localhost:8001/signup/addcoupon", formData, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    if (response.status === 200) {
                        toast.success("Successfully added", { duration: 4000 });
                        setCoupons([...coupons, response.data]);
                        handleClose();
                    }
                }
            } catch (error) {
                toast.error("Failed: " + error.response.data.error);
                console.error("Error occurred during form submission:", error.response.data.error);
            }
        }
    };

    const confirmDelete = (id) => {
        toast(
            ({ closeToast }) => (
                <div>
                    Are you sure you want to delete this Coupon?
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

    const handleDelete = async (id, closeToast) => {
        try {
            await axios.delete(`http://localhost:8001/signup/deletecoupon/${id}`);
            toast.success("Coupon deleted successfully!");
            setCoupons(coupons.filter(coupon => coupon._id !== id));
            closeToast();
        } catch (err) {
            toast.error("Failed to delete coupon: " + err.message);
            closeToast();
        }
    };

    return (
        <>
            <Toaster />
            <div className="container-fluid admindiv">
                <Navbar />
                <div className="row adrow">
                    <div className="col-md-2 pbtm nvbr">
                        <Sidebar />
                    </div>
                    <div className="col-md-10 tablecol">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-4 text-center addv pb-3">
                                <h3>Coupon Management</h3>
                            </div>
                        </div>
                        <div className="text-end pt-3">
                            <Button variant="success" onClick={handleAdd}>
                                Add +
                            </Button>
                        </div>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>{editingCoupon ? "Edit" : "Add"} Coupon</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formCouponName">
                                        <Form.Label>Coupon Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            autoFocus
                                        />
                                        {nameError && <div className="text-danger">{nameError}</div>}
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formCouponCode">
                                        <Form.Label>Coupon Code</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formCouponDiscount">
                                        <Form.Label>Discount</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            value={discount}
                                            onChange={(e) => setDiscount(e.target.value)}
                                        />
                                        {discountError && <div className="text-danger">{discountError}</div>}
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="success" onClick={handleSubmit}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <Modal show={viewShow} onHide={handleViewClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Coupon Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="text-center">
                                {viewingCoupon && (
                                    <>
                                        <h4>{viewingCoupon.name}</h4>
                                        {viewingCoupon.image && viewingCoupon.image.length > 0 ? (
                                            <Carousel>
                                                {viewingCoupon.image.map((image, index) => (
                                                    <Carousel.Item key={index}>
                                                        <img
                                                            src={`http://localhost:8001/images/${image}`}
                                                            style={{ width: '100px', height: '130px' }}
                                                            alt={`Slide ${index}`}
                                                        />
                                                    </Carousel.Item>
                                                ))}
                                            </Carousel>
                                        ) : (
                                            <p>No images available</p>
                                        )}
                                        <p>Code: {viewingCoupon.code}</p>
                                        <p>Discount: {viewingCoupon.discount}</p>
                                    </>
                                )}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleViewClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <div className="container-fluid">
                            <div className="row">
                                <table className="w-100 text-center">
                                    <thead>
                                        <tr className='tblerw1 pt-5'>
                                            <th className="trtext">SL.No</th>
                                            <th className="trtext">Name</th>
                                            <th className="trtext">Code</th>
                                            <th className="trtext">Discount</th>
                                            <th className="trtext">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {coupons.map((coupon, index) => (
                                            <tr key={coupon._id} className="pt-3 trtext1 ctgry">
                                                <td className="p-3">{index + 1}</td>
                                                <td className="p-3">{coupon.name}</td>
                                                <td className="p-3">{coupon.code}</td>
                                                <td className="p-3">{coupon.discount}%</td>
                                                <td>
                                                    <div className="d-flex justify-content-evenly">
                                                        <Button
                                                            variant="warning"
                                                            onClick={() => handleEdit(coupon)}
                                                            className="btn-sm editbtn"
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            variant="danger"
                                                            onClick={() => confirmDelete(coupon._id)}
                                                            className="btn-sm dltbtn"
                                                        >
                                                            Delete
                                                        </Button>
                                                        <Button
                                                            variant="success"
                                                            onClick={() => handleView(coupon)}
                                                            className="btn-sm"
                                                        >
                                                            View
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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

export default Coupon;
