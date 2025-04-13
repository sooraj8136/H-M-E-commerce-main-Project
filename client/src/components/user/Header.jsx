import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { DarkMode } from '../shared/DarkMode';
import { useSelector } from 'react-redux';
import { BsPerson } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi'; // Menu icons

function Header() {
    const { darkMode } = useSelector((state) => state.mode);
    const [showSearch, setShowSearch] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const location = useLocation();

    const navLinks = [
        { path: '/ladies-page', label: 'Women' },
        { path: '/men-page', label: 'Men' },
        { path: '/kids-page', label: 'Kids' },
        { path: '/product', label: 'All Products' }
    ];

    const toggleMenu = () => setShowMobileMenu(!showMobileMenu);

    return (
        <header>
            <Navbar expand="lg" className={`fixed-top ${darkMode ? "bg-black-200" : "bg-black"}`}>
                <Container fluid className="px-4 p-3">
                    <div className="d-flex justify-content-between align-items-center w-100 flex-wrap flex-lg-nowrap">

                        {/* Left Side - Nav Links (Desktop) */}
                        <div className="d-none d-lg-flex align-items-center gap-3 flex-grow-1">
                            <ul className="nav gap-3 mb-0">
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

                        {/* Center - Logo */}
                        <div className="position-absolute top-50 start-50 translate-middle">
                            <a href="/" target="home" rel="toHome">
                                <img
                                    src="https://download.logo.wine/logo/Mango_(retailer)/Mango_(retailer)-Logo.wine.png"
                                    width="130px"
                                    className="rounded"
                                    alt="Site Logo"
                                    style={{ marginTop: '-3px' }}
                                />
                            </a>
                        </div>

                        {/* Right Side - Controls */}
                        <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
                            {/* Toggle Menu Icon (Mobile Only) */}
                            <button
                                className="btn d-lg-none"
                                onClick={toggleMenu}
                                style={{ fontSize: '1.3rem', color: darkMode ? '#000' : '#fff' }}
                            >
                                {showMobileMenu ? <FiX /> : <FiMenu />}
                            </button>

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
                                <BsPerson style={{ fontSize: "1.1rem", color: darkMode ? "#000" : "#fff" }} />
                            </Nav.Link>

                            <DarkMode />
                        </div>
                    </div>

                    {/* Mobile Nav Links (Shown When Toggled) */}
                    {showMobileMenu && (
                        <div className="d-lg-none mt-3">
                            <ul className="nav d-flex flex-column ps-3 gap-2">
                                {navLinks.map((link, i) => (
                                    <li className="nav-item" key={i}>
                                        <Link
                                            to={link.path}
                                            className={`nav-link ${darkMode ? "text-black" : "text-white"}`}
                                            style={{
                                                fontSize: '0.9rem',
                                                textDecoration: 'none',
                                                fontWeight: 'normal'
                                            }}
                                            onClick={() => setShowMobileMenu(false)} // auto-close on nav click
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
