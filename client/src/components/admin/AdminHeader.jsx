import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { DarkMode } from '../shared/DarkMode';
import { useSelector } from 'react-redux';
import { MdDashboard } from "react-icons/md";
import { BsPerson, BsBag } from 'react-icons/bs';
import { IoCartOutline, IoPersonCircleOutline } from "react-icons/io5";
import { BsShopWindow } from "react-icons/bs";
import { VscMenu } from 'react-icons/vsc';
import { Form } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';

function AdminHeader() {
    const { darkMode } = useSelector((state) => state.mode);

    return (
        <>
            <header>
                <Navbar expand="lg" className={darkMode ? "navbar navbar-expand-lg navbar-light bg-black-200" : "navbar navbar-expand-lg navbar-light bg-black"}>
                    <Container fluid>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav className="navbar-nav me-auto mb-2 mb-lg-0" navbarScroll>
                                <Nav.Link href="" className={darkMode ? "text-black" : "text-white nav-sec-1"}>Sustainability</Nav.Link>
                                <Nav.Link href="" className={darkMode ? "text-black" : "text-white nav-sec-1"}>Customer Service</Nav.Link>
                                <Nav.Link href="" className={darkMode ? "text-black" : "text-white nav-sec-1"}>Newsletter</Nav.Link>
                            </Nav>

                            <Form className="d-flex align-items-center">
                                <div className="nav-sec-2">
                                    <div className="d-flex align-items-center">
                                        <Nav.Link href="/admin/admin-dashboard" className={`d-flex align-items-center ${darkMode ? "text-black" : "text-white"}`}>
                                            <MdDashboard className="me-2" />
                                            Dashboard
                                        </Nav.Link>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <Nav.Link href="/admin/get-all-users" className={`d-flex align-items-center ${darkMode ? "text-black" : "text-white"}`}>
                                            <BsPerson className="me-2" style={{ fontSize: "20px" }} />
                                            Users
                                        </Nav.Link>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <Nav.Link href="/admin/get-sellers" className={`d-flex align-items-center ${darkMode ? "text-black" : "text-white"}`}>
                                            <BsShopWindow className="me-2" />
                                            Sellers
                                        </Nav.Link>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <Nav.Link href="/admin/admin-products" className={`d-flex align-items-center ${darkMode ? "text-black" : "text-white"}`}>
                                            <VscMenu className="me-2" />
                                            Products
                                        </Nav.Link>
                                    </div>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="transparent" className={`d-flex align-items-center ${darkMode ? "text-black" : "text-white"}`} style={{ border: 'none', background: 'none' }}>
                                            <IoCartOutline className="me-2" style={{ fontSize: "20px" }} />
                                            Orders
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="/admin/pending-requests">Pending Requests</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <div className="d-flex align-items-center">
                                        <Nav.Link href="/admin/admin-profile" className={`d-flex align-items-center ${darkMode ? "text-black" : "text-white"}`}>
                                            <IoPersonCircleOutline className="me-2" style={{ fontSize: "20px" }} />
                                            My Account
                                        </Nav.Link>
                                    </div>
                                </div>
                            </Form>

                            <div className="search">
                                <div className="search-container d-flex align-items-center">
                                    <input className={`search-input ${darkMode ? "text-black" : "text-white"}`} placeholder="Search" aria-label="Search" type="search" />
                                    <button className="search-button" aria-label="Submit Search">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="search-icon" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85a1.007 1.007 0 0 0-.115-.098zm-5.242 1.1a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <span>
                                <DarkMode />
                            </span>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <div className="imageTag text-center mt-4">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/1064px-H%26M-Logo.svg.png" width="60px" className="rounded mx-auto d-block" alt="Responsive logo" />
                </div>
            </header>
        </>
    );
}

export default AdminHeader;
