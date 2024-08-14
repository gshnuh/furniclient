import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import envelope from "./images/envelope.svg";
import sofa from "./images/sofa.png";




function Footer() {
    return (
        <>
            <div className='container'>
                <div className="sofaimg">
                    <img className='sofa' src={sofa}></img>
                </div>
                <div className='row'>
                    <div className='col-lg-8'>
                        <div className="d-flex">
                            <div>
                                <img src={envelope}></img>
                            </div>
                            <div>
                                <p className='envlpe'>Subscribe to Newsletter</p>
                            </div>
                        </div>
                        <div className="d-flex w-100">
                            <div className='rtr'>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="Enter your name"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                            </div>
                            <div className='rtr'>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="Enter your email"
                                        aria-label="email"
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup>              </div>
                            <div className='rtr'>
                                <button className="butn">
                                    <i className="fa fa-send"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container pt-5'>
                <div className='row p-3'>
                    <div className='col-lg-4'>
                        <div>
                            <h2 className='furni1'>Furni.</h2>
                            <p className='pg pt-3'>Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant</p>
                        </div>
                        <div className='d-flex pt-3'>
                            <button className="btnn">
                                <i className="fa fa-facebook media"></i>
                            </button>
                            <button className="btnn">
                                <i className="fa fa-twitter media"></i>
                            </button>
                            <button className="btnn">
                                <i className="fa fa-instagram media"></i>
                            </button>
                            <button className="btnn">
                                <i className="fa fa-linkedin media"></i>
                            </button>
                        </div>
                    </div>
                    <div className='col-lg-8'>
                        <div className='row links-wrap'>
                            <div className='col-6 col-sm-6 col-md-3'>
                                <ul className='ul01'>
                                    <li><a className='aa' href='/about'>About Us</a></li>
                                    <li><a className='aa' href='/services'>Services</a></li>
                                    <li><a className='aa' href='/blog'>Blog</a></li>
                                    <li><a className='aa' href='/contact'>Contact Us</a></li>
                                </ul>
                            </div>
                            <div className='col-6 col-sm-6 col-md-3'>
                                <ul className='ul01'>
                                    <li><a className='aa' href='/'>Support</a></li>
                                    <li><a className='aa' href='/'>Knowledge Base</a></li>
                                    <li><a className='aa' href='/'>Live Chat</a></li>
                                </ul>
                            </div>
                            <div className='col-6 col-sm-6 col-md-3'>
                                <ul className='ul01'>
                                    <li><a className='aa' href='/'>Jobs</a></li>
                                    <li><a className='aa' href='/'>Our Team</a></li>
                                    <li><a className='aa' href='/'>Leadership</a></li>
                                    <li><a className='aa' href='/'>Privacy Policy</a></li>
                                </ul>
                            </div>
                            <div className='col-6 col-sm-6 col-md-3'>
                                <ul className='ul01'>
                                    <li><a className='aa' href='/'>Nordic Chair</a></li>
                                    <li><a className='aa' href='/'>Kruzo Aero</a></li>
                                    <li><a className='aa' href='/'>Ergonomic Chair</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container pt-1 cf07'>
                <div className='row p-3'>
                    <div className='col-lg-6 text-center'>
                        <p className='pg'>Copyright ©2024. All Rights Reserved. — Designed with love by <a className='aa' href='https://untree.co'>Untree.co</a></p>
                    </div>
                    <div className='col-lg-4 text-center text-lg-end'>
                        <a className='aa' href='#'>Terms & Conditions</a>
                    </div>
                    <div className='col-lg-2 text-center text-lg-end'>
                        <a className='aa' href='#'>Privacy Policy</a>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Footer;