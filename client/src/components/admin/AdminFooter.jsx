import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from 'react-redux';
import { FaFacebookSquare, FaInstagram, FaPinterest, FaSpotify, FaYoutube } from 'react-icons/fa';

function AdminFooter() {

    const { darkMode } = useSelector((state) => state.mode)
    console.log(darkMode)


    return (
        <footer className="main-footer">
            <div className="container">
                <section className="footer py-4">
                    <div className="row text-center text-md-start">
                        <div className="col-md-3 mb-4">
                            <ul className="list list-unstyled">
                                <li>
                                    <a href="/ladies-page" className={`footer-link ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: "0.8rem", }}>
                                        HELP
                                    </a>
                                </li>
                                <li>
                                    <a href="/men-page" className={`footer-link ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: "0.8rem", }}>
                                        MY PURCHASES
                                    </a>
                                </li>
                                <li>
                                    <a href="/kids-page" className={`footer-link ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: "0.8rem", }}>
                                        RETURNS
                                    </a>
                                </li>
                                <li>
                                    <a href="/kids-page" className={`footer-link ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: "0.8rem", }}>
                                        ADMIN HELP
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-md-3 mb-4">
                            <ul className="list list-unstyled">
                                <li>
                                    <a href="/" className={`footer-link ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: "0.8rem", }}>
                                        COMPANY
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={`footer-link ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: "0.8rem", }}>
                                        WORK FOR COMPANY
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={`footer-link ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: "0.8rem", }}>
                                        PRESS
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={`footer-link ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: "0.8rem", }}>
                                        YOUR STORE
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-md-3 mb-4">
                            <ul className="list list-unstyled">
                                <li>
                                    <a href="/contact" className={darkMode ? "text-black" : "text-white footer-title footer-text footer-text"} style={{ fontSize: "0.8rem", }}>
                                        CONTACT
                                    </a>
                                </li>
                                <li>
                                    <a href="/about" className={`footer-link ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: "0.8rem", }}>
                                        ABOUT
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={`footer-link ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: "0.8rem", }}>
                                        BRAND OUTLET
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={`footer-link ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: "0.8rem", }}>
                                        SUSTAINABILITY
                                    </a>
                                </li>
                            </ul>
                        </div>


                        <div className="col-md-3 mb-4">
                            <a href="/" className={darkMode ? "text-black" : "text-white read-more-text"} >
                                READ MORE
                            </a>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="logo">
                        <div  >
                            <svg
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                role="img"
                                aria-labelledby="pinterest-logo"
                                height="24">
                                <title id="pinterest-logo">Pinterest</title>
                                <FaPinterest style={{
                                    fontSize: "1.2rem",
                                    marginRight: "4px",
                                    color: darkMode ? "#000" : "#fff"
                                }} />
                            </svg>
                        </div>
                        <div>
                            <svg
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                role="img"
                                aria-labelledby="youtube-logo"
                                height="24"
                            >
                                <title id="youtube-logo">YouTube</title>
                                <FaYoutube style={{
                                    fontSize: "1.2rem",
                                    marginRight: "4px",
                                    color: darkMode ? "#000" : "#fff"
                                }} />
                            </svg>
                        </div>
                        <div>
                            <svg
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                role="img"
                                aria-labelledby="spotify-logo"
                                height="24"
                            >
                                <title id="spotify-logo">Spotify</title>
                                <FaInstagram style={{
                                    fontSize: "1.2rem",
                                    marginRight: "4px",
                                    color: darkMode ? "#000" : "#fff"
                                }} />
                            </svg>
                        </div>
                        <div>
                            <svg
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                role="img"
                                aria-labelledby="instagram-logo"
                                height="24"
                            >
                                <title id="instagram-logo">Instagram</title>
                                <FaSpotify style={{
                                    fontSize: "1.2rem",
                                    marginRight: "4px",
                                    color: darkMode ? "#000" : "#fff"
                                }} />
                            </svg>
                        </div>
                        <div>
                            <svg
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                role="img"
                                aria-labelledby="facebook-logo"
                                height="24"
                            >
                                <title id="facebook-logo">Facebook</title>
                                <FaFacebookSquare style={{
                                    fontSize: "1.2rem",
                                    marginRight: "4px",
                                    color: darkMode ? "#000" : "#fff"
                                }} />
                            </svg>
                        </div>
                    </div>
                    <div className="footer-final-text-1">
                        <p className={darkMode ? "text-black" : "text-white "} style={{ fontSize: "0.7rem" }}>
                            <br />
                            <p>
                                ⚠️ This is a student project. This website is not affiliated with or endorsed by S&J. No real customer data is collected. Built for learning purposes only.
                            </p>
                            Built by Sooraj as a MERN Stack demo Copyright © 2025 All rights reserved.
                        </p>
                    </div>
                    <div className="text-center logo-font mb-3">
                        <a href="/" style={{ textDecoration: "none" }}>
                            <h6
                                style={{
                                    fontSize: '1.1rem',
                                    color: darkMode ? '#000' : '#fff',
                                    fontWeight: "700",
                                    letterSpacing: "1px",
                                    marginBottom: "5px"
                                }}
                                className='logo-font'
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

export default AdminFooter