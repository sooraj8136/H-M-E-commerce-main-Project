import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { DarkMode } from '../shared/DarkMode';
import { useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AdminHeader() {
    const { darkMode } = useSelector((state) => state.mode);

    return (
        <header>
            <Navbar expand="lg" className={`fixed-top ${darkMode ? "bg-black-200" : "bg-black"}`} collapseOnSelect>
                <Container fluid className="px-4 p-3">
                    <Navbar.Toggle aria-controls="admin-navbar-nav" className="border-0" />
                    <Navbar.Collapse id="admin-navbar-nav">
                        <div className="d-flex justify-content-between align-items-center w-100">

                            {/* Left Side: Navigation Links */}
                            <div className="d-flex flex-wrap gap-3">
                                <ul className="nav mb-0">
                                    <li className="nav-item">
                                        <Link
                                            to="/admin/admin-dashboard"
                                            className={`nav-link ${darkMode ? "text-black" : "text-white"}`}
                                            style={{ fontSize: '0.82rem', padding: '0 4px', fontWeight: '400' }}
                                        >
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            to="/admin/get-all-users"
                                            className={`nav-link ${darkMode ? "text-black" : "text-white"}`}
                                            style={{ fontSize: '0.82rem', padding: '0 4px', fontWeight: '400' }}
                                        >
                                            Users
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            to="/admin/get-sellers"
                                            className={`nav-link ${darkMode ? "text-black" : "text-white"}`}
                                            style={{ fontSize: '0.82rem', padding: '0 4px', fontWeight: '400' }}
                                        >
                                            Sellers
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Right Side: Dropdowns + Profile + DarkMode */}
                            <div className="d-flex align-items-center gap-2 gap-md-3 mt-3 mt-lg-0">

                                {/* Products Dropdown */}
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
                                        <Dropdown.Item as={Link} to="/admin/admin-products">All Products</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                                {/* Orders Dropdown */}
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
                                        <Dropdown.Item as={Link} to="/admin/get-all-orders">All Orders</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/admin/pending-requests">Pending Requests</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                                {/* Profile Link */}
                                <Nav.Link
                                    as={Link}
                                    to="/admin/admin-profile"
                                    className={`d-flex align-items-center ${darkMode ? "text-black" : "text-white"}`}
                                    style={{ fontSize: '0.8rem' }}
                                >
                                    Profile
                                </Nav.Link>

                                {/* Dark Mode Toggle */}
                                <DarkMode />
                            </div>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default AdminHeader;
