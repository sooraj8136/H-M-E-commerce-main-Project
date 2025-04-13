import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { DarkMode } from '../shared/DarkMode';
import { useSelector } from 'react-redux';
import { BsPerson } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';

function Header() {
    const { darkMode } = useSelector((state) => state.mode);
    const [showSearch, setShowSearch] = useState(false);
    const location = useLocation();

    const navLinks = ['ladies-page', 'men-page', 'kids-page', 'product'];

    return (
        <>
            <header>
                <Navbar expand="lg" className={`fixed-top ${darkMode ? "bg-black-200" : "bg-black"}`}>
                    <Container fluid className="px-4 p-3 position-relative">
                        <div className="d-flex justify-content-between align-items-center w-100 flex-wrap flex-lg-nowrap">

                            {/* Logo (Left side) */}
                            <div className="d-flex align-items-center gap-3">
                                <a href="/" target="home" rel="toHome">
                                    <img
                                        src="https://i.pinimg.com/736x/03/27/64/032764fb3dc829bcf1e969ea7c67f44b.jpg"
                                        width="44px"
                                        className="rounded"
                                        alt="H&M Logo"
                                        style={{ marginTop: '-3px', marginRight: "40px" }}
                                    />
                                </a>
                            </div>

                            {/* Centered Nav Links */}
                            <div className="position-absolute start-50 translate-middle-x d-none d-lg-block">
                                <ul className="nav gap-3 mb-0">
                                    {navLinks.map((link, i) => {
                                        const path = `/${link}`;
                                        const linkClasses = `nav-link ${darkMode ? "text-black" : "text-white"}`;

                                        return (
                                            <li className="nav-item" key={i}>
                                                <Link
                                                    to={path}
                                                    className={linkClasses}
                                                    style={{
                                                        fontSize: '0.82rem',
                                                        padding: '0 4px',
                                                        textDecoration: 'none',
                                                        fontWeight: '400'
                                                    }}
                                                >
                                                    {link.replace('-page', '').toUpperCase()}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            {/* Right Controls */}
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
                                {/* <button
                                    className="btn d-flex align-items-center justify-content-center p-1"
                                    onClick={() => setShowSearch(!showSearch)}
                                    aria-label="Toggle Search"
                                    style={{
                                        borderRadius: '0%',
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        outline: 'none',
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        fill={darkMode ? "#000" : "#fff"}
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 
                                        1.398h-.001l3.85 3.85a1 1 0 0 0 
                                        1.415-1.415l-3.85-3.85zm-5.242 
                                        1.1a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
                                    </svg>
                                </button> */}

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

                        {/* Mobile Nav Links */}
                        <div className="d-lg-none mt-3">
                            <ul className="nav d-flex justify-content-start gap-3 ps-3">
                                {navLinks.map((link, i) => {
                                    const path = `/${link}`;
                                    const linkClasses = `nav-link p-0 ${darkMode ? "text-black" : "text-white"}`;

                                    return (
                                        <li className="nav-item" key={i}>
                                            <Link
                                                to={path}
                                                className={linkClasses}
                                                style={{
                                                    fontSize: '0.9rem',
                                                    textDecoration: 'none',
                                                    fontWeight: 'normal'
                                                }}
                                            >
                                                {link.replace('-page', '').toUpperCase()}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </Container>
                </Navbar>
            </header>
        </>
    );
}

export default Header;
