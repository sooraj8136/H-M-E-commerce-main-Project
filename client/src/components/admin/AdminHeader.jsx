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
                        <div className="d-flex justify-content-center justify-content-lg-start align-items-center gap-3 flex-wrap mb-3 mb-lg-0">
                            <Link
                                to="/admin/admin-dashboard"
                                className={`nav-link ${darkMode ? "text-black" : "text-white"}`}
                                style={{ fontSize: '0.82rem', padding: '0 4px', fontWeight: '600' }}
                            >
                                DASHBOARD
                            </Link>

                            <Link
                                to="/admin/get-all-users"
                                className={`nav-link ${darkMode ? "text-black" : "text-white"}`}
                                style={{ fontSize: '0.82rem', padding: '0 4px' }}
                            >
                                USERS
                            </Link>

                            <Link
                                to="/admin/get-sellers"
                                className={`nav-link ${darkMode ? "text-black" : "text-white"}`}
                                style={{ fontSize: '0.82rem', padding: '0 4px' }}
                            >
                                SELLERS
                            </Link>

                            <Dropdown align="start">
                                <Dropdown.Toggle
                                    as="div"
                                    className={`nav-link dropdown-toggle p-0 ${darkMode ? "text-black" : "text-white"}`}
                                    role="button"
                                    style={{ fontSize: '0.8rem', cursor: 'pointer' }}
                                >
                                    PRODUCTS
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to="/admin/admin-products">All Products</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Dropdown align="start">
                                <Dropdown.Toggle
                                    as="div"
                                    className={`nav-link dropdown-toggle p-0 ${darkMode ? "text-black" : "text-white"}`}
                                    role="button"
                                    style={{ fontSize: '0.8rem', cursor: 'pointer' }}
                                >
                                    ORDERS
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to="/admin/get-all-orders">All Orders</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/admin/pending-requests">Pending Requests</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

                        <div className="d-flex align-items-center gap-2 gap-md-3">
                            <Nav.Link
                                as={Link}
                                to="/admin/admin-profile"
                                className={`d-flex align-items-center ${darkMode ? "text-black" : "text-white"}`}
                                style={{ fontSize: '0.8rem', fontWeight: '600' }}
                            >
                                PROFILE
                            </Nav.Link>

                            <DarkMode />
                        </div>
                    </div>
                </Container>
            </Navbar>
        </header>
    );
}

export default AdminHeader;
