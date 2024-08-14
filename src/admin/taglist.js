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


function Taglist() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [image, setImage] = useState(null);
    const [tags, setTags] = useState([]);
    const [editingTag, setEditingTag] = useState(null);

    useEffect(() => {
        fetchTags();
    }, []);

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

    const handleEdit = (tag) => {
        setEditingTag(tag);
        setName(tag.name);
        handleShow();
    };



    const handleAdd = () => {
        setEditingTag(null);
        setName("");
        setNameError("");
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

            if (editingTag) {
                axios.put(`http://localhost:8001/signup/updatetags/${editingTag._id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                    .then((response) => {
                        if (response.status === 200) {
                            toast.success("Successfully updated", {
                                duration: 4000
                            });
                            const updatedTags = tags.map(tag => {
                                if (tag._id === editingTag._id) {
                                    return response.data;
                                }
                                return tag;
                            });
                            setTags(updatedTags);
                            handleClose();
                        }
                    })
                    .catch((error) => {
                        toast.error("Failed: " + error.response.data.error);
                        console.error("Error occurred during form submission:", error.response.data.error);
                    });
            } else {
                axios.post("http://localhost:8001/signup/addtag", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                    .then((response) => {
                        if (response.status === 200) {
                            toast.success("Successfully added", {
                                duration: 4000
                            });
                            setTags([...tags, response.data]);
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
                    Are you sure you want to delete this tag?
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
        axios.delete(`http://localhost:8001/signup/deletetags/${id}`)
            .then((response) => {
                toast.success("Tag deleted successfully!");
                setTags(tags.filter(tag => tag._id !== id));
                closeToast();
            })
            .catch(err => {
                toast.error("Failed to delete tag: " + err.message);
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
                                <h3>Tag List</h3>
                            </div>
                        </div>
                        <div className="text-end pt-3">
                            <Button variant="success" onClick={handleAdd}>
                                Add +
                            </Button>
                        </div>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>{editingTag ? "Edit" : "Add"} Tag</Modal.Title>
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
                                {tags.map((tag, index) => (
                                    <tr key={tag._id} className="pt-3 trtext1 ctgry">
                                        <td className="p-3">{index + 1}</td>
                                        <td className="p-3">{tag.name}</td>
                                        <td className="p-3"> {tag.image && (
                                            <img
                                                className="imgradius"
                                                src={`http://localhost:8001/images/${tag.image}`}
                                                style={{ width: '100px', height: '100px' }}
                                                alt={`Image of ${tag.name}`}
                                            />
                                        )}
                                        </td>
                                        <td className="p-3">
                                            <div className="d-flex justify-content-evenly">
                                                <Button variant="warning"
                                                className="btn-sm editbtn"
                                                onClick={() => handleEdit(tag)} 
                                                >
                                                    Edit
                                                </Button>
                                                <Button variant="danger"
                                                className="btn-sm dltbtn"
                                                 onClick={() => confirmDelete(tag._id)}
                                                 >
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

export default Taglist;
