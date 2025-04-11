import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { DarkMode } from '../shared/DarkMode';
import { useSelector } from 'react-redux';
import { MdDashboard } from "react-icons/md";
import { VscMenu } from "react-icons/vsc";
import { IoCartOutline } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SellerHeader() {
    const { darkMode } = useSelector((state) => state.mode);
    const [showSearch, setShowSearch] = useState(false);

    return (
        <header>
            <Navbar expand="lg" className={`fixed-top ${darkMode ? "bg-black-200" : "bg-black"}`}>
                <Container fluid className="px-4 p-3">
                    <div className="d-flex justify-content-between align-items-center w-100 flex-wrap flex-lg-nowrap">
                        <div className="d-flex align-items-center gap-3">
                            <a href="/seller/seller-home">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/1064px-H%26M-Logo.svg.png"
                                    width="44px"
                                    className="rounded"
                                    alt="H&M Logo"
                                    style={{ marginTop: '-3px', marginRight: "40px" }}
                                />
                            </a>
                        </div>
                        <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">

                            {showSearch && (
                                <input
                                    className={`search-input ${darkMode ? "text-black" : "text-white"}`}
                                    placeholder="Search"
                                    aria-label="Search"
                                    type="search"
                                    style={{
                                        width: '140px',
                                        fontSize: '0.75rem',
                                        height: '28px',
                                        backgroundColor: darkMode ? "#fff" : "#343a40",
                                        border: 'none'
                                    }}
                                />
                            )}


                            <Nav.Link
                                as={Link}
                                to="/seller/seller-home"
                                className={`d-flex align-items-center ${darkMode ? "text-black" : "text-white"}`}
                                style={{ fontSize: '1rem' }}
                            >
                                <MdDashboard />
                            </Nav.Link>

                            <Dropdown align="end">
                                <Dropdown.Toggle
                                    as="div"
                                    className={`nav-link dropdown-toggle p-0 ${darkMode ? "text-black" : "text-white"}`}
                                    role="button"
                                    style={{ fontSize: '1rem', cursor: 'pointer' }}
                                >
                                    <VscMenu />
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
                                    style={{ fontSize: '1rem', cursor: 'pointer' }}
                                >
                                    <IoCartOutline />
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
                                style={{ fontSize: '1rem' }}
                            >
                                <BsPerson />
                            </Nav.Link>

                            <DarkMode />
                        </div>
                    </div>
                </Container>
            </Navbar>
        </header>
    );
}

export default SellerHeader;
