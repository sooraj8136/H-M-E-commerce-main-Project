import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from 'react-redux';
import { FaPinterest, FaYoutube, FaInstagram, FaSpotify, FaFacebookSquare } from "react-icons/fa";

function Footer() {
    const { darkMode } = useSelector((state) => state.mode);

    return (
        <footer className="main-footer position-relative">
            <div className="container">
                <section className="footer py-4">
                    <div className="row text-center text-md-start">
                        <div className="col-md-3 mb-4">
                            <ul className="list list-unstyled">
                                <li><a href="/ladies-page" className={`footer-link ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: "0.8rem" }}>HELP</a></li>
                                <li><a href="/men-page" className={`footer-link ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: "0.8rem" }}>MY PURCHASES</a></li>
                                <li><a href="/kids-page" className={`footer-link ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: "0.8rem" }}>RETURNS</a></li>
                                <li><a href="/seller/login" className={`footer-link ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: "0.8rem" }}>SELLER LOGIN</a></li>
                            </ul>
                        </div>

                        <div className="col-md-3 mb-4">
                            <ul className="list list-unstyled">
                                <li><a href="/" className={`footer-link ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: "0.8rem" }}>COMPANY</a></li>
                                <li><a href="/" className={`footer-link ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: "0.8rem" }}>WORK FOR COMPANY</a></li>
                                <li><a href="/" className={`footer-link ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: "0.8rem" }}>PRESS</a></li>
                                <li><a href="/admin/login" className={`footer-link ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: "0.8rem" }}>ADMIN LOGIN</a></li>
                            </ul>
                        </div>

                        <div className="col-md-3 mb-4">
                            <ul className="list list-unstyled">
                                <li><a href="/contact" className={`footer-link ${darkMode ? "text-black" : "text-white"}`}>CONTACT</a></li>
                                <li><a href="/about" className={`footer-link ${darkMode ? "text-black" : "text-white"}`}>ABOUT</a></li>
                                <li><a href="/" className={`footer-link ${darkMode ? "text-black" : "text-white"}`}>BRAND OUTLET</a></li>
                                <li><a href="/" className={`footer-link ${darkMode ? "text-black" : "text-white"}`}>SUSTAINABILITY</a></li>
                            </ul>
                        </div>

                        <div className="col-md-3 mb-4">
                            <a href="/" className={darkMode ? "text-black" : "text-white read-more-text"}>READ MORE</a>
                        </div>
                    </div>
                </section>

                <section className="text-center">
                    <div className="d-flex justify-content-center gap-3 mb-3">
                        <FaPinterest style={{ fontSize: "1.2rem", color: darkMode ? "#000" : "#fff" }} />
                        <FaYoutube style={{ fontSize: "1.2rem", color: darkMode ? "#000" : "#fff" }} />
                        <FaInstagram style={{ fontSize: "1.2rem", color: darkMode ? "#000" : "#fff" }} />
                        <FaSpotify style={{ fontSize: "1.2rem", color: darkMode ? "#000" : "#fff" }} />
                        <FaFacebookSquare style={{ fontSize: "1.2rem", color: darkMode ? "#000" : "#fff" }} />
                    </div>

                    <div className="footer-final-text-1">
                        <p className={darkMode ? "text-black" : "text-white"} style={{ fontSize: "0.7rem" }}>
                            ⚠️ This is a student project. This website is not affiliated with or endorsed by S&J. No real customer data is collected. Built for learning purposes only.<br />
                            Built by Sooraj as a MERN Stack demo. Copyright © 2025
                        </p>
                    </div>
                    <div className="logo-font mb-3">
                        <a href="/" style={{ textDecoration: "none" }}>
                            <h6
                                style={{
                                    fontSize: '1.1rem',
                                    color: darkMode ? '#000' : '#fff',
                                    fontWeight: "700",
                                    letterSpacing: "1px",
                                    marginBottom:"5px"
                                }}
                            >
                                S&J
                            </h6>
                        </a>
                    </div>
                </section>
            </div>
        </footer>
    )
}

export default Footer;
