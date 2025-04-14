import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { DarkMode } from '../shared/DarkMode';
import { useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SellerHeader() {
    const { darkMode } = useSelector((state) => state.mode);

    return (
        <header>
            <Navbar expand="lg" className={`fixed-top ${darkMode ? "bg-black-200" : "bg-black"}`}>
                <Container fluid className="px-4 p-3">
                    <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center w-100">

                        {/* Mobile logo  left side */}
                        <div className="d-flex d-lg-none align-items-center mb-2 w-100">
                            <a href="/" style={{ textDecoration: "none" }}>
                                <h6
                                    className="logo-font logo-font rounded"
                                    style={{
                                        fontSize: '1.5rem',
                                        // color: darkMode ? 'black' : 'white',
                                        fontWeight: "700",
                                        letterSpacing: "2px",
                                        marginBottom: 0,
                                    }}
                                >
                                    S&J
                                </h6>
                            </a>
                        </div>

                        {/* Left Side: Dashboard, Products, and other */}
                        <div className="d-flex justify-content-center justify-content-lg-start align-items-center gap-3 flex-wrap mb-3 mb-lg-0">
                            <Link
                                to="/seller/seller-home"
                                className={`nav-link custom-nav-link ${darkMode ? "text-black" : "text-white"}`}
                                style={{ fontSize: '0.82rem', padding: '0 4px', fontWeight: '600' }}
                            >
                                DASHBOARD
                            </Link>

                            <Dropdown align="start">
                                <Dropdown.Toggle
                                    as="div"
                                    className={`nav-link custom-nav-link ${darkMode ? "text-black" : "text-white"}`}
                                    role="button"
                                    style={{ fontSize: '0.8rem', cursor: 'pointer' }}
                                >
                                    PRODUCTS
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to="/seller/seller-product">Manage Products</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/seller/create-product">Create Product</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Dropdown align="start">
                                <Dropdown.Toggle
                                    as="div"
                                    className={`nav-link custom-nav-link dropdown-toggle p-0 ${darkMode ? "text-black" : "text-white"}`}
                                    role="button"
                                    style={{ fontSize: '0.8rem', cursor: 'pointer' }}
                                >
                                    ORDERS
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to="/seller/get-orders-seller">View Orders</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/seller/update-order-status">Update Orders</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

                        {/* Right Side Account and Dark Mode */}
                        <div className="d-flex align-items-center gap-2 gap-md-3">
                            <Nav.Link
                                as={Link}
                                to="/seller/profile"
                                className={`d-flex align-items-center custom-nav-link ${darkMode ? "text-black" : "text-white"}`}
                                style={{ fontSize: '0.8rem', fontWeight: "600" }}
                            >
                                ACCOUNT
                            </Nav.Link>

                            <DarkMode />
                        </div>
                    </div>

                    {/* Desktop logo  centered */}
                    <div className="d-none d-lg-block position-absolute top-50 start-50 translate-middle">
                        <a href="/" style={{ textDecoration: "none" }}>
                            <h6
                                className="logo-font rounded"
                                style={{
                                    fontSize: '1.5rem',
                                    // color: darkMode ? 'black' : 'white',
                                    fontWeight: "700",
                                    letterSpacing: "2px",
                                    marginBottom: 0,
                                }}
                            >
                                S&J
                            </h6>
                        </a>
                    </div>
                </Container>
            </Navbar>
        </header>
    );
}

export default SellerHeader;
