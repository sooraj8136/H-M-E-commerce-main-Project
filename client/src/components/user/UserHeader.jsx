import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Form } from "react-bootstrap";
import { DarkMode } from '../shared/DarkMode';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

function Header() {
    const { darkMode } = useSelector((state) => state.mode);
    const [showSearch, setShowSearch] = useState(false);
    const location = useLocation();

    const navLinks = [
        { path: '/ladies-page', label: 'Women' },
        { path: '/men-page', label: 'Men' },
        { path: '/kids-page', label: 'Kids' },
        { path: '/product', label: 'All Products' }
    ];

    return (
        <header>
            <Navbar expand="lg" className={`fixed-top ${darkMode ? "bg-black-200" : "bg-black"}`} collapseOnSelect>
                <Container fluid className="px-4 p-3">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <div className="d-flex justify-content-between align-items-center w-100">
                            {/* Left: Nav Links */}
                            <div className="d-flex flex-wrap gap-3">
                                <ul className="nav mb-0">
                                    {navLinks.map((link, i) => (
                                        <li className="nav-item" key={i}>
                                            <Link
                                                to={link.path}
                                                className={`nav-link ${darkMode ? "text-black" : "text-white"}`}
                                                style={{
                                                    fontSize: '0.82rem',
                                                    padding: '0 4px',
                                                    textDecoration: 'none',
                                                    fontWeight: '400'
                                                }}
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Right: Text Links + DarkMode */}
                            <div className="d-flex align-items-center gap-2 gap-md-3 mt-3 mt-lg-0">
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

                                <Form className="d-flex align-items-center">
                                    <div className="d-flex">
                                        <Nav.Link
                                            href="/user/wishlist"
                                            className={`d-flex align-items-center ${darkMode ? "text-black" : "text-white"}`}
                                            aria-label="Favourites"
                                            style={{ fontSize: '0.8rem', marginRight:"10px" }}
                                        >
                                            Favourites
                                        </Nav.Link>

                                        <Nav.Link
                                            href="/user/cart"
                                            className={`d-flex align-items-center ${darkMode ? "text-black" : "text-white"}`}
                                            aria-label="Shopping bag"
                                            style={{ fontSize: '0.8rem', marginRight:"10px" }}
                                        >
                                            Bag
                                        </Nav.Link>

                                        <Nav.Link
                                            href="/user/profile"
                                            className={`d-flex align-items-center ${darkMode ? "text-black" : "text-white"}`}
                                            aria-label="Profile"
                                            style={{ fontSize: '0.8rem' }}
                                        >
                                            Profile
                                        </Nav.Link>
                                    </div>
                                </Form>

                                <DarkMode />
                            </div>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
