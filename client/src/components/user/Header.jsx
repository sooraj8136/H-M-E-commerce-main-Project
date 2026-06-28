import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { DarkMode } from '../shared/DarkMode';
import { useSelector } from 'react-redux';
import { AiOutlineUser } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import logo from "../../../public/S&J.png";

function Header() {
    const { darkMode } = useSelector((state) => state.mode);
    const [showSearch, setShowSearch] = useState(false);
    const location = useLocation();

    const navLinks = [
        { path: '/ladies-page', label: 'LADIES' },
        { path: '/men-page', label: 'MEN' },
        { path: '/kids-page', label: 'KIDS' },
        { path: '/about', label: 'ABOUT' },
        { path: '/contact', label: 'CONTACT' },
    ];

return (
    <header>
        <Navbar expand="lg" className={`fixed-top ${darkMode ? "bg-black-200" : "bg-black"}`}>
            <Container fluid className="px-4 p-3">

                <div className="d-flex justify-content-between align-items-center w-100">

                    {/* Mobile Logo */}
                    <div className="d-lg-none">
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <img
                                src="/S&J.png"
                                alt="S&J Logo"
                                style={{
                                    height: "40px",
                                    width: "auto",
                                    objectFit: "contain",
                                }}
                            />
                        </Link>
                    </div>

                    {/* Desktop Logo and Navigation */}
                    <div className="d-none d-lg-flex align-items-center gap-3 flex-grow-1">
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <img
                                src="/S&J.png"
                                alt="S&J Logo"
                                style={{
                                    height: "60px",
                                    width: "auto",
                                    objectFit: "contain",
                                }}
                            />
                        </Link>

                        <ul className="nav gap-3 mb-0">
                            {navLinks.map((link, i) => (
                                <li className="nav-item" key={i}>
                                    <Link
                                        to={link.path}
                                        className={`nav-link nav-link-hover ${darkMode ? "text-black" : "text-white"}`}
                                        style={{
                                            fontSize: "0.78rem",
                                            padding: "0 4px",
                                            textDecoration: "none",
                                            fontWeight: "400",
                                        }}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Icons */}
                    <div className="d-flex align-items-center gap-2 mt-0 mt-lg-0">

                        {showSearch && (
                            <input
                                className={`search-input ${darkMode ? "text-black" : "text-white"}`}
                                placeholder="Search"
                                type="search"
                                style={{
                                    width: "140px",
                                    fontSize: "0.75rem",
                                    height: "28px",
                                    backgroundColor: darkMode ? "#fff" : "#343a40",
                                    border: "none",
                                }}
                            />
                        )}

                        <Nav.Link
                            as={Link}
                            to="/login"
                            className={`d-flex align-items-center ${darkMode ? "text-black" : "text-white"}`}
                            style={{
                                fontSize: "0.75rem",
                                marginLeft: "15px",
                                marginRight: "15px",
                            }}
                        >
                            <AiOutlineUser
                                style={{
                                    fontSize: "1.1rem",
                                    color: darkMode ? "#000" : "#fff",
                                }}
                            />
                        </Nav.Link>

                        <DarkMode />
                    </div>

                </div>

                {/* Mobile Navigation */}
                <div className="d-lg-none mt-3">
                    <ul className="nav d-flex justify-content-start gap-3 ps-3">
                        {navLinks.map((link, i) => (
                            <li className="nav-item" key={i}>
                                <Link
                                    to={link.path}
                                    className={`nav-link p-0 nav-link-hover ${darkMode ? "text-black" : "text-white"}`}
                                    style={{
                                        fontSize: "0.7rem",
                                        textDecoration: "none",
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
