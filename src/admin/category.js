import axios from "axios";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import { Toaster } from "react-hot-toast";
import Footerbar from "./footerbar";

function Category() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = token;
            const response = await axios.get("http://localhost:8001/signup/categorylist");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setName(category.name);
        handleShow();
    };

    const handleAdd = () => {
        setEditingCategory(null);
        setName("");
        setImage(null);
        handleShow();
    };

    const handleSubmit = () => {
        let formValid = true;

        if (!name) {
            setNameError("Name is required.");
            formValid = false;
        } else {
            setNameError("");
        }

        if (formValid) {
            const formData = new FormData();
            formData.append("name", name);
            if (image) {
                formData.append("image", image);
            }
            if (editingCategory) {
                formData.append("categoryId", editingCategory._id);
            }

            if (editingCategory) {
                axios.put(`http://localhost:8001/signup/updatecategory/${editingCategory._id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                    .then((response) => {
                        if (response.status === 200) {
                            toast.success("Successfully updated", {
                                duration: 4000
                            });
                            const updatedCategories = categories.map(cat => {
                                if (cat._id === editingCategory._id) {
                                    return response.data;
                                }
                                return cat;
                            });
                            setCategories(updatedCategories);
                            handleClose();
                        }
                    })
                    .catch((error) => {
                        toast.error("Failed: " + error.response.data.error);
                        console.error("Error occurred during form submission:", error.response.data.error);
                    });
            } else {
                axios.post("http://localhost:8001/signup/addcategory", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                    .then((response) => {
                        if (response.status === 200) {
                            toast.success("Successfully added", {
                                duration: 4000
                            });
                            setCategories([...categories, response.data]);
                            handleClose();
                        }
                    })
                    .catch((error) => {
                        toast.error("Failed: " + error.response.data.error);
                        console.error("Error occurred during form submission:", error.response.data.error);
                    });
            }
        }
    };

    const confirmDelete = (id) => {
        toast(
            ({ closeToast }) => (
                <div>
                    Are you sure you want to delete this category?
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
        axios.delete(`http://localhost:8001/signup/deletecategory/${id}`)
            .then((response) => {
                toast.success("Category deleted successfully!");
                setCategories(categories.filter(category => category._id !== id));
                closeToast();
            })
            .catch(err => {
                toast.error("Failed to delete category: " + err.message);
                closeToast();
            });
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
                                <h3>Category List</h3>
                            </div>
                        </div>
                        <div className="text-end pt-3">
                            <Button variant="success" onClick={handleAdd}>
                                Add +
                            </Button>
                        </div>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>{editingCategory ? "Edit" : "Add"} Category</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formCategoryName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            autoFocus
                                        />
                                        {nameError && <div className="text-danger">{nameError}</div>}
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formCategoryImage">
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control
                                            type="file"
                                            onChange={(e) => setImage(e.target.files[0])}
                                        />
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
                        <table className="w-100 text-center">
                            <thead>
                                <tr className='tblerw1 pt-5'>
                                    <th className="trtext">SL.No</th>
                                    <th className="trtext">Name</th>
                                    <th className="trtext">Image</th>
                                    <th className="trtext">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category, index) => (
                                    <tr key={category._id} className="pt-3 trtext1 ctgry">
                                        <td className="p-3">{index + 1}</td>
                                        <td className="p-3">{category.name}</td>
                                        <td className="p-3"> {category.image && (
                                            <img
                                                src={`http://localhost:8001/images/${category.image}`}
                                                style={{ width: '100px', height: '100px' }}
                                                alt={`Image of ${category.name}`}
                                            />
                                        )}
                                        </td>
                                        <td className="p-3">
                                            <div className="d-flex justify-content-evenly">
                                                <Button variant="warning"
                                                    className="btn-sm editbtn"
                                                    onClick={() => handleEdit(category)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button variant="danger"
                                                    className="btn-sm dltbtn"
                                                    onClick={() => confirmDelete(category._id)}>
                                                    Delete
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

export default Category;
