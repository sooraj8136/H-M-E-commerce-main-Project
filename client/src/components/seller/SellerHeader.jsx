import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { DarkMode } from '../shared/DarkMode';
import { useSelector } from 'react-redux';

function SellerHeader() {

    const { darkMode } = useSelector((state) => state.mode)

    return (
        <>
            <header>
                <Navbar
                    expand="lg"
                    className={darkMode ? "navbar navbar-expand-lg navbar-light bg-black-200" : "navbar navbar-expand-lg navbar-light bg-black"}>
                    <Container fluid>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav className="navbar-nav me-auto mb-2 mb-lg-0" navbarScroll>
                                <Nav.Link href="" className={darkMode ? "text-black" : "text-white nav-sec-1"}>
                                    Sustainability
                                </Nav.Link>
                                <Nav.Link href="" className={darkMode ? "text-black" : "text-white nav-sec-1"}>
                                    Seller Service
                                </Nav.Link>
                                <Nav.Link href="" className= {darkMode ? "text-black" : "text-white nav-sec-1"}>Newsletter</Nav.Link>
                            </Nav>
                            
                            <ul className="nav justify-content-center">
                                <li className="nav-item ">
                                    <Nav.Link href="/seller/seller-home" className={darkMode ? "text-black" : "text-white nav-link"}>dashboard</Nav.Link>
                                </li>
                                <li className="nav-item ">
                                    <Nav.Link href="/seller/seller-product" className={darkMode ? "text-black" : "text-white nav-link"}>Manage Products</Nav.Link>
                                </li>
                                <li className="nav-item ">
                                    <Nav.Link href="/seller/seller-order-page" className={darkMode ? "text-black" : "text-white nav-link"}>Orders</Nav.Link>
                                </li>
                                <li className="nav-item ">
                                    <Nav.Link href="/seller/profile" className={darkMode ? "text-black" : "text-white nav-link"}>My Account</Nav.Link>
                                </li>
                            </ul>
                            <div className="search">
                                <div className=" search-container ">
                                    <input
                                        className="search-input"
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
                            <span>
                                <DarkMode />
                            </span>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <div className="imageTag text-center">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/1064px-H%26M-Logo.svg.png"
                        width="60px"
                        className="rounded mx-auto d-block "
                        alt="Responsive image"
                    />
                </div>
                <section className="navlinks">
                </section>
            </header>
        </>
    )
}

export default SellerHeader