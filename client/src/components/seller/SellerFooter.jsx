import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from 'react-redux';
import { FaFacebookSquare, FaInstagram, FaPinterest, FaSpotify, FaYoutube } from 'react-icons/fa';

function SellerFooter() {

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
                                    <a href="/ladies-page" className={darkMode ? "text-black" : "text-white footer-title footer-text"} style={{ textDecoration: "none", fontSize: "0.8rem", fontWeight: "bold" }}>
                                        HELP
                                    </a>
                                </li>
                                <li>
                                    <a href="/men-page" className={darkMode ? "text-black" : "text-white footer-title footer-text"} style={{ textDecoration: "none", fontSize: "0.8rem", fontWeight: "bold" }}>
                                        MY PURCHASES
                                    </a>
                                </li>
                                <li>
                                    <a href="/kids-page" className={darkMode ? "text-black" : "text-white footer-title footer-text"} style={{ textDecoration: "none", fontSize: "0.8rem", fontWeight: "bold" }}>
                                        RETURNS
                                    </a>
                                </li>
                                <li>
                                    <a href="/kids-page" className={darkMode ? "text-black" : "text-white footer-title footer-text"} style={{ textDecoration: "none", fontSize: "0.8rem", fontWeight: "bold" }}>
                                        SELLER HELP
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-md-3 mb-4">
                            <ul className="list list-unstyled">
                                <li>
                                    <a href="/" className={darkMode ? "text-black" : "text-white footer-title footer-text footer-text"} style={{ textDecoration: "none", fontSize: "0.8rem", fontWeight: "bold" }}>
                                        COMPANY
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={darkMode ? "text-black" : "text-white footer-title footer-text footer-text"} style={{ textDecoration: "none", fontSize: "0.8rem", fontWeight: "bold" }}>
                                        WORK FOR COMPANY
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={darkMode ? "text-black" : "text-white footer-title footer-text footer-text"} style={{ textDecoration: "none", fontSize: "0.8rem", fontWeight: "bold" }}>
                                        PRESS
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={darkMode ? "text-black" : "text-white footer-title footer-text footer-text"} style={{ textDecoration: "none", fontSize: "0.8rem", fontWeight: "bold" }}>
                                        YOUR STORE
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-md-3 mb-4">
                            <ul className="list list-unstyled">
                                <li>
                                    <a href="/contact" className={darkMode ? "text-black" : "text-white footer-title footer-text footer-text"} style={{ textDecoration: "none", fontSize: "0.8rem", fontWeight: "bold" }}>
                                        CONTACT
                                    </a>
                                </li>
                                <li>
                                    <a href="/about" className={darkMode ? "text-black" : "text-white footer-title footer-text"} style={{ textDecoration: "none", fontSize: "0.8rem", fontWeight: "bold" }}>
                                        ABOUT
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={darkMode ? "text-black" : "text-white footer-title footer-text"} style={{ textDecoration: "none", fontSize: "0.8rem", fontWeight: "bold" }}>
                                        BRAND OUTLET
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={darkMode ? "text-black" : "text-white footer-title footer-text"} style={{ textDecoration: "none", fontSize: "0.8rem", fontWeight: "bold" }}>
                                        SUSTAINABILITY
                                    </a>
                                </li>
                            </ul>
                        </div>


                        <div className="col-md-3 mb-4">
                            <a href="/read-more" className={darkMode ? "text-black" : "text-white read-more-text"} >
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
                                ⚠️ This is a student project. This website is not affiliated with or endorsed by S&M. No real customer data is collected. Built for learning purposes only.
                            </p>
                            Built by Sooraj as a MERN Stack demo Copyright © 2025 All rights reserved.
                        </p>
                    </div>
                </section>
            </div>
        </footer>
    )
}

export default SellerFooter