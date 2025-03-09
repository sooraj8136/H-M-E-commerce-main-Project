import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { DarkMode } from '../shared/DarkMode';
import { useSelector } from 'react-redux';
import { Dropdown } from "react-bootstrap";
import { MdDashboard } from "react-icons/md";
import { VscMenu } from "react-icons/vsc";
import { IoCartOutline } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import Form from "react-bootstrap/Form";

function SellerHeader() {

    const { darkMode } = useSelector((state) => state.mode)

    return (
        <>
            <header>
                <Navbar expand="lg" className={darkMode ? "navbar navbar-expand-lg navbar-light bg-black-200" : "navbar navbar-expand-lg navbar-light bg-black"}
                    style={{ paddingBottom: '40px', marginTop: '20px' }}>
                    <Container fluid>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav className="navbar-nav me-auto mb-2 mb-lg-0" navbarScroll>
                                <Nav.Link href="" className={darkMode ? "text-black" : "text-white nav-sec-1"} style={{ fontSize: '0.8rem' }}>
                                    Sustainability
                                </Nav.Link>
                                <Nav.Link href="" className={darkMode ? "text-black" : "text-white nav-sec-1"} style={{ fontSize: '0.8rem' }}>
                                    Seller Service
                                </Nav.Link>
                                <Nav.Link href="" className={darkMode ? "text-black" : "text-white nav-sec-1"} style={{ fontSize: '0.8rem' }}>
                                    Newsletter</Nav.Link>
                            </Nav>

                            <Form className="d-flex align-items-center flex-column flex-lg-row">
                                <div className="nav-sec-2 d-flex flex-column flex-lg-row">
                                    <Nav.Link
                                        href="/seller/seller-home"
                                        className={`d-flex align-items-center ${darkMode ? "text-black" : "text-white"} mb-2 mb-lg-0`}
                                        style={{ fontSize: '0.8rem' }}>
                                        <MdDashboard className="me-2" />
                                        Dashboard
                                    </Nav.Link>
                                    <Dropdown className="mb-2 mb-lg-0">
                                        <Dropdown.Toggle
                                            id=""
                                            className={`btn-sm d-flex align-items-center ${darkMode ? "text-black" : "text-white"} border-0`}
                                            style={{
                                                backgroundColor: "transparent",
                                                boxShadow: "none",
                                                color: darkMode ? "black" : "white",
                                                fontSize: "0.8rem",
                                                fontWeight: "500",
                                            }}
                                        >
                                            <VscMenu className="me-2" />
                                            Products
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item href="/seller/seller-product" style={{ fontSize: '0.8rem' }}>Manage Products</Dropdown.Item>
                                            <Dropdown.Item href="/seller/create-product" style={{ fontSize: '0.8rem' }}>Create Product</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            variant="link"
                                            className={`d-flex align-items-center ${darkMode ? "text-black" : "text-white"} mb-2 mb-lg-0`}
                                            style={{
                                                textDecoration: "none",
                                                border: "none",
                                                padding: "0",
                                                fontSize:'0.8rem',
                                                fontWeight: "500",
                                            }}
                                        >
                                            <IoCartOutline className="me-2" style={{ fontSize: "20px" }} />
                                            Orders
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu >
                                            <Dropdown.Item href="/seller/get-orders-seller" className={darkMode ? "text-black" : "text-black"} 
                                            style={{ fontSize: '0.8rem' }}>
                                                View Orders
                                            </Dropdown.Item>
                                            <Dropdown.Item href="/seller/update-order-status" className={darkMode ? "text-black" : "text-black"} 
                                            style={{ fontSize: '0.8rem' }}>
                                                Update Orders
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Nav.Link
                                        href="/seller/profile"
                                        className={`d-flex align-items-center ${darkMode ? "text-black" : "text-white"} mb-2 mb-lg-0`}
                                        style={{ fontSize: '0.8rem' }}>
                                        <BsPerson className="me-2" style={{ fontSize: "1.3rem" }} />
                                        My Account
                                    </Nav.Link>
                                </div>
                            </Form>

                            <div className="search mt-3 mt-lg-0">
                                <div className="search-container d-flex align-items-center">
                                    <input
                                        className={`search-input ${darkMode ? "text-black" : "text-white"}`}
                                        placeholder="Search"
                                        aria-label="Search"
                                        type="search"
                                    />
                                    <button className="search-button" aria-label="Submit Search">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="search-icon"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85a1.007 1.007 0 0 0-.115-.098zm-5.242 1.1a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <span className="mt-3 mt-lg-0">
                                <DarkMode />
                            </span>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <div className="imageTag text-center">
                    <a href="/seller/seller-home" target="home" rel="toHome">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/1064px-H%26M-Logo.svg.png"
                            width="60px"
                            className="rounded mx-auto d-block"
                            alt="H&M Logo"
                        />
                    </a>
                </div>
                <section className="navlinks">
                </section>
            </header>
        </>
    )
}

export default SellerHeader