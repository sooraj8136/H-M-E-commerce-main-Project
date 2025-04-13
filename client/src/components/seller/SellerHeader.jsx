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
            <Navbar expand="lg" className={`fixed-top ${darkMode ? "bg-black-200" : "bg-black"}`} collapseOnSelect>
                <Container fluid className="px-4 p-3">
                    <Navbar.Toggle aria-controls="seller-navbar-nav" className="border-0" />
                    <Navbar.Collapse id="seller-navbar-nav">
                        <div className="d-flex justify-content-between align-items-center w-100">

                            {/* Left Side: Logo & Dashboard */}
                            <div className="d-flex align-items-center gap-4 flex-wrap">
                                <ul className="nav mb-0">
                                    <li className="nav-item">
                                        <Link
                                            to="/seller/seller-home"
                                            className={`nav-link ${darkMode ? "text-black" : "text-white"}`}
                                            style={{ fontSize: '0.82rem', padding: '0 4px', fontWeight: '400' }}
                                        >
                                            Dashboard
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Right Side: Dropdowns, Profile, DarkMode */}
                            <div className="d-flex align-items-center gap-2 gap-md-3 mt-3 mt-lg-0">

                                <Dropdown align="end">
                                    <Dropdown.Toggle
                                        as="div"
                                        className={`nav-link dropdown-toggle p-0 ${darkMode ? "text-black" : "text-white"}`}
                                        role="button"
                                        style={{ fontSize: '0.8rem', cursor: 'pointer' }}
                                    >
                                        Products
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to="/seller/seller-product">Manage Products</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/seller/create-product">Create Product</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Dropdown align="end">
                                    <Dropdown.Toggle
                                        as="div"
                                        className={`nav-link dropdown-toggle p-0 ${darkMode ? "text-black" : "text-white"}`}
                                        role="button"
                                        style={{ fontSize: '0.8rem', cursor: 'pointer' }}
                                    >
                                        Orders
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to="/seller/get-orders-seller">View Orders</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/seller/update-order-status">Update Orders</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Nav.Link
                                    as={Link}
                                    to="/seller/profile"
                                    className={`d-flex align-items-center ${darkMode ? "text-black" : "text-white"}`}
                                    style={{ fontSize: '0.8rem' }}
                                >
                                    Profile
                                </Nav.Link>

                                <DarkMode />
                            </div>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default SellerHeader;
