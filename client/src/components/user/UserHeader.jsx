import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { DarkMode } from '../shared/DarkMode';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineHeart, AiOutlineUser } from 'react-icons/ai';
import { FiShoppingBag } from 'react-icons/fi'; // New shopping bag icon

function UserHeader() {
    const { darkMode } = useSelector((state) => state.mode);
    const [showSearch, setShowSearch] = useState(false);
    const location = useLocation();

    const navLinks = [
        { path: '/ladies-page', label: 'WOMEN' },
        { path: '/men-page', label: 'MEN' },
        { path: '/kids-page', label: 'KIDS' },
        { path: '/product', label: 'PRODUCTS' }
    ];

    const iconStyle = {
        fontSize: '1.2rem',
        color: darkMode ? 'black' : 'white',
        cursor: 'pointer'
    };

    return (
        <header>
            <Navbar expand="lg" className={`fixed-top ${darkMode ? "bg-black-200" : "bg-black"}`}>
                <Container fluid className="px-4 p-3">
                    <div className="d-flex justify-content-between align-items-center w-100 flex-wrap flex-lg-nowrap">

                        {/* Left Side - Nav Links */}
                        <div className="d-flex align-items-center gap-3 flex-grow-1">
                            <ul className="nav gap-3 mb-0 d-none d-lg-flex">
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

                        {/* Right Side - Icons + DarkMode */}
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

                            <Nav.Link href="/user/wishlist" aria-label="Wishlist">
                                <AiOutlineHeart style={iconStyle} />
                            </Nav.Link>

                            <Nav.Link href="/user/cart" aria-label="Shopping Bag">
                                <FiShoppingBag style={{ ...iconStyle, fontSize: '1.05rem' }} />
                            </Nav.Link>

                            <Nav.Link href="/user/profile" aria-label="User Profile">
                                <AiOutlineUser style={iconStyle} />
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
                                        className={`nav-link p-0 ${darkMode ? "text-black" : "text-white"}`}
                                        style={{
                                            fontSize: '0.9rem',
                                            textDecoration: 'none',
                                            fontWeight: 'normal'
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

export default UserHeader;
