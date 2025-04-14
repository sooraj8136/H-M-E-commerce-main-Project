import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { DarkMode } from '../shared/DarkMode';
import { useSelector } from 'react-redux';
import { AiOutlineUser } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';

function Header() {
    const { darkMode } = useSelector((state) => state.mode);
    const [showSearch, setShowSearch] = useState(false);
    const location = useLocation();

    const navLinks = [
        { path: '/ladies-page', label: 'WOMEN' },
        { path: '/men-page', label: 'MEN' },
        { path: '/kids-page', label: 'KIDS' },
        { path: '/about', label: 'ABOUT' },
        { path: '/contact', label: 'CONTACT' },
    ];

    return (
        <header>
            <Navbar expand="lg" className={`fixed-top ${darkMode ? "bg-black-200" : "bg-black"}`}>
                <Container fluid className="px-4 p-3">
                    <div className="d-flex justify-content-between align-items-center w-100 flex-wrap flex-lg-nowrap">

                        {/* Mobile logo left */}
                        <div className="d-flex d-lg-none align-items-center">
                            <a href="/" style={{ textDecoration: "none" }}>
                                <h6
                                    className="logo-font rounded "
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

                        {/* Desktop Nav Links */}
                        <div className="d-flex align-items-center gap-3 flex-grow-1">
                            <ul className="nav gap-3 mb-0 d-none d-lg-flex">
                                {navLinks.map((link, i) => (
                                    <li className="nav-item" key={i}>
                                        <Link
                                            to={link.path}
                                            className={`nav-link nav-link-hover ${darkMode ? "text-black" : "text-white"}`}
                                            style={{
                                                fontSize: '0.78rem',
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

                        {/* Desktop logo  */}
                        <div className="d-none d-lg-block position-absolute top-50 start-50 translate-middle">
                            <a href="/" style={{ textDecoration: "none" }}>
                                <h6
                                    className="logo-font rounded logo-font"
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

                        {/* Right Side Icons */}
                        <div className="d-flex align-items-center gap-2 gap-md-2 mt-3 mt-lg-0">
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
                                href="/login"
                                className={`d-flex align-items-center ${darkMode ? "text-black" : "text-white"}`}
                                style={{ fontSize: '0.75rem', marginLeft: "15px", marginRight: "15px" }}
                            >
                                <AiOutlineUser style={{ fontSize: "1.1rem", color: darkMode ? "#000" : "#fff" }} />
                            </Nav.Link>

                            <DarkMode />
                        </div>
                    </div>

                    {/* Mobile Nav Links */}
                    <div className="d-lg-none mt-3">
                        <ul className="nav d-flex justify-content-start gap-3 ps-3">
                            {navLinks.map((link, i) => (
                                <li className="nav-item" key={i}>
                                    <Link
                                        to={link.path}
                                        className={`nav-link p-0 nav-link-hover ${darkMode ? "text-black" : "text-white"}`}
                                        style={{
                                            fontSize: '0.7rem',
                                            textDecoration: 'none',
                                            fontWeight: 'normal',
                                        }}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
