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

function Product() {
    const [show, setShow] = useState(false);
    const [viewShow, setViewShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleViewClose = () => setViewShow(false);
    const handleShow = () => setShow(true);
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [images, setImages] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [viewingProduct, setViewingProduct] = useState(null);
    const [price, setPrice] = useState("");
    const [offerPrice, setOfferPrice] = useState("");

    useEffect(() => {
        fetchProducts();
        fetchCategories();
        fetchTags();
    }, []);

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = token;
            const response = await axios.get("http://localhost:8001/signup/productlist");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching Products:", error);
        }
    };

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

    const fetchTags = async () => {
        try {
            const token = localStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = token;
            const response = await axios.get("http://localhost:8001/signup/taglist");
            setTags(response.data);
        } catch (error) {
            console.error("Error fetching Tags:", error);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setName(product.name);
        setSelectedCategory(product.category);
        setSelectedTag(product.tag);
        setPrice(product.price);
        setOfferPrice(product.offerPrice);
        setImages(product.image || []);
        handleShow();
    };

    const handleView = (product) => {
        setViewingProduct(product);
        setViewShow(true);
    };

    const handleAdd = () => {
        setEditingProduct(null);
        setName("");
        setNameError("");
        setImages([]);
        setSelectedCategory(null);
        setSelectedTag(null);
        setPrice("");
        setOfferPrice("");
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

        if (formValid) {
            const formData = new FormData();
            formData.append("name", name);
            images.forEach((image) => {
                formData.append("images", image);
            });
            if (selectedCategory) {
                formData.append("category", selectedCategory);
            }
            if (selectedTag) {
                formData.append("tag", selectedTag);
            }
            formData.append("price", price);
            formData.append("offerPrice", offerPrice);

            try {
                const token = localStorage.getItem("token");
                axios.defaults.headers.common["Authorization"] = token;
                let response;
                if (editingProduct) {
                    response = await axios.put(`http://localhost:8001/signup/updateproduct/${editingProduct._id}`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });
                    if (response.status === 200) {
                        toast.success("Successfully updated", { duration: 4000 });
                        setProducts(products.map(product => (product._id === editingProduct._id ? response.data : product)));
                        handleClose();
                    }
                } else {
                    response = await axios.post("http://localhost:8001/signup/addproduct", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });
                    if (response.status === 200) {
                        toast.success("Successfully added", { duration: 4000 });
                        setProducts([...products, response.data]);
                        handleClose();
                    }
                }
            } catch (error) {
                toast.error("Failed: " + error.response.data.error);
                console.error("Error occurred during form submission:", error.response.data.error);
            }
        }
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category.name);
    };

    const handleTagSelect = (tag) => {
        setSelectedTag(tag.name);
    };

    const confirmDelete = (id) => {
        toast(
            ({ closeToast }) => (
                <div>
                    Are you sure you want to delete this Product?
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
            await axios.delete(`http://localhost:8001/signup/deleteproduct/${id}`);
            toast.success("Product deleted successfully!");
            setProducts(products.filter(product => product._id !== id));
            closeToast();
        } catch (err) {
            toast.error("Failed to delete Product: " + err.message);
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
                                <h3>Product Management</h3>
                            </div>
                        </div>
                        <div className="text-end pt-3">
                            <Button variant="success" onClick={handleAdd}>
                                Add +
                            </Button>
                        </div>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>{editingProduct ? "Edit" : "Add"} Product</Modal.Title>
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
                                <Modal.Title>Product Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="text-center">
                                {viewingProduct && (
                                    <>
                                        <h4>{viewingProduct.name}</h4>
                                        {viewingProduct.image && viewingProduct.image.length > 0 ? (
                                            <Carousel>
                                                {viewingProduct.image.map((image, index) => (
                                                    <Carousel.Item key={index}>
                                                        <img
                                                            src={`http://localhost:8001/images/${viewingProduct.image[index]}`}
                                                            style={{ width: '100px', height: '130px' }}
                                                            alt={`Slide ${index}`}
                                                        />
                                                    </Carousel.Item>
                                                ))}
                                            </Carousel>
                                        ) : (
                                            <p>No images available</p>
                                        )}
                                        <p>Category: {viewingProduct.category}</p>
                                        <p>Tag: {viewingProduct.tag}</p>
                                        <p className="price">Price: ${viewingProduct.price}</p>
                                        <p>Offer Price: ${viewingProduct.offerPrice}</p>
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
                                            <th className="trtext">Image</th>
                                            <th className="trtext">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product, index) => (
                                            <tr key={product._id} className="pt-3 trtext1 ctgry">
                                                <td className="p-3">{index + 1}</td>
                                                <td className="p-3">{product.name}</td>
                                                <td className="p-3">
                                                    <img
                                                        className="imgradius"
                                                        src={`http://localhost:8001/images/${product.image[0]}`}
                                                        style={{ width: '40px', height: '40px' }}
                                                        alt={`Image of ${product.name}`}
                                                    />
                                                </td>
                                                <td>
                                                    <div className="d-flex justify-content-evenly">
                                                        <Button
                                                            variant="warning"
                                                            onClick={() => handleEdit(product)}
                                                            className="btn-sm editbtn"
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            variant="danger"
                                                            onClick={() => confirmDelete(product._id)}
                                                            className="btn-sm dltbtn"
                                                        >
                                                            Delete
                                                        </Button>
                                                        <Button
                                                            variant="success"
                                                            onClick={() => handleView(product)}
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

export default Product;
