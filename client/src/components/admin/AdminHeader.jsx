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
            <Navbar expand="lg" className={`fixed-top ${darkMode ? "bg-black-200" : "bg-black"}`}>
                <Container fluid className="px-4 p-3">
                    <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center w-100">

                        {/* mobile logo left  */}
                        <div className="d-flex d-lg-none align-items-center mb-2 w-100">
                            <a href="/admin/admin-dashboard" style={{ textDecoration: "none" }}>
                                <h6
                                    className="logo-font rounded"
                                    style={{
                                        fontSize: '1.5rem',
                                        color: darkMode ? 'black' : 'white',
                                        fontWeight: "700",
                                        letterSpacing: "2px",
                                        marginBottom: 0,
                                    }}
                                >
                                    S&J
                                </h6>
                            </a>
                        </div>

                        {/* ledt side nav links */}
                        <div className="d-flex justify-content-center justify-content-lg-start align-items-center gap-3 flex-wrap mb-3 mb-lg-0">
                            <Link
                                to="/admin/admin-dashboard"
                                className={`d-flex align-items-center custom-nav-link ${darkMode ? "text-black" : "text-white"}`}
                                style={{ fontSize: '0.82rem', padding: '0 4px', fontWeight: '600' }}
                            >
                                DASHBOARD
                            </Link>

                            {/* <Link
                                to="/admin/get-all-users"
                                className={`d-flex align-items-center custom-nav-link ${darkMode ? "text-black" : "text-white"}`}
                                style={{ fontSize: '0.82rem', padding: '0 4px' }}
                            >
                                USERS
                            </Link> */}

                            {/* <Link
                                to="/admin/get-sellers"
                                className={`d-flex align-items-center custom-nav-link ${darkMode ? "text-black" : "text-white"}`}
                                style={{ fontSize: '0.82rem', padding: '0 4px' }}
                            >
                                SELLERS
                            </Link> */}

                            {/* <Dropdown align="start">
                                <Dropdown.Toggle
                                    as="div"
                                    className={`d-flex align-items-center custom-nav-link ${darkMode ? "text-black" : "text-white"}`}
                                    role="button"
                                    style={{ fontSize: '0.8rem', cursor: 'pointer' }}
                                >
                                    PRODUCTS
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to="/admin/admin-products">All Products</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> */}

                            {/* <Dropdown align="start">
                                <Dropdown.Toggle
                                    as="div"
                                    className={`d-flex align-items-center custom-nav-link ${darkMode ? "text-black" : "text-white"}`}
                                    role="button"
                                    style={{ fontSize: '0.8rem', cursor: 'pointer' }}
                                >
                                    ORDERS
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to="/admin/get-all-orders">All Orders</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/admin/pending-requests">Pending Requests</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> */}
                        </div>

                        {/* right side account and darkmode */}
                        <div className="d-flex align-items-center gap-2 gap-md-3">
                            <Nav.Link
                                as={Link}
                                to="/admin/admin-contact"
                                className={`d-flex align-items-center custom-nav-link ${darkMode ? "text-black" : "text-white"}`}
                                style={{ fontSize: '0.8rem', fontWeight: '600' }}
                            >
                                CONTACT
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/admin/admin-about"
                                className={`d-flex align-items-center custom-nav-link ${darkMode ? "text-black" : "text-white"}`}
                                style={{ fontSize: '0.8rem', fontWeight: '600' }}
                            >
                                ABOUT
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/admin/admin-profile"
                                className={`d-flex align-items-center custom-nav-link ${darkMode ? "text-black" : "text-white"}`}
                                style={{ fontSize: '0.8rem', fontWeight: '600' }}
                            >
                                ACCOUNT
                            </Nav.Link>

                            <DarkMode />
                        </div>
                    </div>

                    {/* desktop logo center */}
                    <div className="d-none d-lg-block position-absolute top-50 start-50 translate-middle">
                        <a href="/admin/admin-dashboard" style={{ textDecoration: "none" }}>
                            <h6
                                className="logo-font rounded"
                                style={{
                                    fontSize: '1.8rem',
                                    color: darkMode ? 'black' : 'white',
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

export default AdminHeader;
