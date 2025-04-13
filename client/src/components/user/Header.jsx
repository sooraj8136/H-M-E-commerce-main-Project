import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
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
                        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center w-100">
                            
                            {/* Nav Links */}
                            <ul className="nav gap-3 mb-3 mb-lg-0">
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

                            {/* Right Controls */}
                            <div className="d-flex align-items-center gap-2 gap-md-3 mt-2 mt-lg-0">
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

                                {/* Sign In Link */}
                                <Nav.Link as={Link} to="/login" className={`d-flex align-items-center ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: '0.75rem', padding: '5px 15px' }}>
                                    Sign In
                                </Nav.Link>

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
