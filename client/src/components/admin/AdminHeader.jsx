import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { DarkMode } from '../shared/DarkMode';
import { useSelector } from 'react-redux';
import { MdDashboard } from "react-icons/md";
import { BsPerson, BsShopWindow } from 'react-icons/bs';
import { IoCartOutline, IoPersonCircleOutline } from "react-icons/io5";
import { VscMenu } from 'react-icons/vsc';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AdminHeader() {
    const { darkMode } = useSelector((state) => state.mode);

    return (
        <header>
            <Navbar expand="lg" className={`fixed-top ${darkMode ? "bg-black-200" : "bg-black"}`}>
                <Container fluid className="px-4 p-3">
                    <div className="d-flex justify-content-between align-items-center w-100 flex-wrap flex-lg-nowrap">
                        <div className="d-flex align-items-center gap-3">
                            <a href="/admin/admin-dashboard">
                                <img
                                    src="https://i.pinimg.com/736x/03/27/64/032764fb3dc829bcf1e969ea7c67f44b.jpg"
                                    width="44px"
                                    className="rounded"
                                    alt="H&M Logo"
                                    style={{ marginTop: '-3px', marginRight: "40px" }}
                                />
                            </a>
                        </div>

                        <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
                            <Nav.Link
                                as={Link}
                                to="/admin/admin-dashboard"
                                className={`d-flex align-items-center ${darkMode ? "text-black" : "text-white"}`}
                                style={{ fontSize: '1rem' }}
                            >
                                <MdDashboard />
                            </Nav.Link>

                            <Nav.Link
                                as={Link}
                                to="/admin/get-all-users"
                                className={`d-flex align-items-center ${darkMode ? "text-black" : "text-white"}`}
                                style={{ fontSize: '1rem' }}
                            >
                                <BsPerson />
                            </Nav.Link>

                            <Nav.Link
                                as={Link}
                                to="/admin/get-sellers"
                                className={`d-flex align-items-center ${darkMode ? "text-black" : "text-white"}`}
                                style={{ fontSize: '1rem' }}
                            >
                                <BsShopWindow />
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
                                    <Dropdown.Item as={Link} to="/admin/admin-products">Products</Dropdown.Item>
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
                                    <Dropdown.Item as={Link} to="/admin/get-all-orders">All Orders</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/admin/pending-requests">Pending Requests</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Nav.Link
                                as={Link}
                                to="/admin/admin-profile"
                                className={`d-flex align-items-center ${darkMode ? "text-black" : "text-white"}`}
                                style={{ fontSize: '1rem' }}
                            >
                                <IoPersonCircleOutline />
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
