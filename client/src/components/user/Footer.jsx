import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from 'react-redux';
import { FaPinterest, FaYoutube, FaInstagram, FaSpotify, FaFacebookSquare } from "react-icons/fa";

function Footer() {

    const { darkMode } = useSelector((state) => state.mode)

    return (
        <footer className="main-footer">
            <div className="container">
                <section className="footer py-4">
                    <div className="row text-center text-md-start">
                        <div className="col-md-3 mb-4">
                            <h6 className={darkMode ? "text-black" : "text-white footer-title"}>Shop</h6>
                            <ul className="list list-unstyled">
                                <li>
                                    <a href="/ladies-page" className={darkMode ? "text-black" : "text-white footer-title footer-text"}>
                                        Ladies
                                    </a>
                                </li>
                                <li>
                                    <a href="/men-page" className={darkMode ? "text-black" : "text-white footer-title footer-text"}>
                                        Men
                                    </a>
                                </li>
                                <li>
                                    <a href="/kids-page" className={darkMode ? "text-black" : "text-white footer-title footer-text"}>
                                        Kids
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={darkMode ? "text-black" : "text-white footer-title footer-text"}>
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={darkMode ? "text-black" : "text-white footer-title footer-text"}>
                                        Magazine
                                    </a>
                                </li>
                                <li>
                                    <a href="/seller/login" className={darkMode ? "text-black" : "text-white footer-title footer-text"}>
                                        Seller login
                                    </a>
                                </li>
                                <li>
                                    <a href="/admin/login" className={darkMode ? "text-black" : "text-white footer-title footer-text"}>
                                        Admin login
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-md-3 mb-4">
                            <h6 className={darkMode ? "text-black" : "text-white footer-title footer-text footer-title"}>Corporate Info</h6>
                            <ul className="list list-unstyled">
                                <li>
                                    <a href="/" className={darkMode ? "text-black" : "text-white footer-title footer-text footer-text"}>
                                        Career at H&M
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={darkMode ? "text-black" : "text-white footer-title footer-text footer-text"}>
                                        Sustainability H&M Group
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={darkMode ? "text-black" : "text-white footer-title footer-text footer-text"}>
                                        Press
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={darkMode ? "text-black" : "text-white footer-title footer-text footer-text"}>
                                        Investor relations
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={darkMode ? "text-black" : "text-white footer-title footer-text footer-text"}>
                                        Corporate governance
                                    </a>
                                </li>
                                <li>
                                    <a href="/contact" className={darkMode ? "text-black" : "text-white footer-title footer-text footer-text"}>
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-md-3 mb-4">
                            <h6 className={darkMode ? "text-black" : "text-white footer-title footer-text footer-title"}>Help</h6>
                            <ul className="list list-unstyled">
                                <li>
                                    <a href="/" className={darkMode ? "text-black" : "text-white footer-title footer-text"}>
                                        Customer Service
                                    </a>
                                </li>
                                <li>
                                    <a href="/about" className={darkMode ? "text-black" : "text-white footer-title footer-text"}>
                                        About H&M group
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={darkMode ? "text-black" : "text-white footer-title footer-text"}>
                                        Find a store
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={darkMode ? "text-black" : "text-white footer-title footer-text"}>
                                        Legal & privacy
                                    </a>
                                </li>
                                <li>
                                    <a href="/contact" className={darkMode ? "text-black" : "text-white footer-title footer-text"}>
                                        Contact
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={darkMode ? "text-black" : "text-white footer-title footer-text"}>
                                        Secure shopping
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-md-3 mb-4">
                            <p className={darkMode ? "text-black" : "text-white"}>
                                Sign up now and be the first to know about exclusive offers,
                                <br /> latest fashion news & style tips!
                            </p>
                            <a href="/read-more" className={darkMode ? "text-black" : "text-white read-more-text"}>
                                Read More
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
                        <p className={darkMode ? "text-black" : "text-white "}>
                            The content of this site is copyright-protected and is the
                            property of H & M Hennes & Mauritz AB.
                        </p>
                    </div>
                    <div>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/1064px-H%26M-Logo.svg.png"
                            width="35px"
                            className="footer-img rounded mx-auto d-block "
                            alt="Responsive image"
                        />
                    </div>
                    <div className="footer-final-text-2">
                        <h5 className={darkMode ? "text-black" : "text-white "}>INDIA | Rs.</h5>
                    </div>
                </section>
            </div>
        </footer>
    )
}

export default Footer