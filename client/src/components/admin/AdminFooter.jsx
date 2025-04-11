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
                            <h6 className={darkMode ? "text-black" : "text-white footer-title"} style={{ fontSize: "0.8rem", fontWeight: "700" }}>Shop</h6>
                            <ul className="list list-unstyled">
                                <li>
                                    <a href="/admin/admin-dashboard" className={darkMode ? "text-black" : "text-white footer-title footer-text"} style={{ textDecoration: "none" }}>
                                        LADIES
                                    </a>
                                </li>
                                <li>
                                    <a href="/admin/admin-dashboard" className={darkMode ? "text-black" : "text-white footer-title footer-text"} style={{ textDecoration: "none" }}>
                                        MEN
                                    </a>
                                </li>
                                <li>
                                    <a href="/admin/admin-dashboard" className={darkMode ? "text-black" : "text-white footer-title footer-text"} style={{ textDecoration: "none" }}>
                                        KIDS
                                    </a>
                                </li>
                                <li>
                                    <a href="/admin/admin-dashboard" className={darkMode ? "text-black" : "text-white footer-title footer-text"} style={{ textDecoration: "none" }}>
                                        HOME
                                    </a>
                                </li>
                                <li>
                                    <a href="/admin/admin-dashboard" className={darkMode ? "text-black" : "text-white footer-title footer-text"} style={{ textDecoration: "none" }}>
                                        MAGAZINE
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-md-3 mb-4">
                            <h6 className={darkMode ? "text-black" : "text-white footer-title footer-text footer-title"} style={{ fontSize: "0.8rem", fontWeight: "700" }}>Corporate Info</h6>
                            <ul className="list list-unstyled">
                                <li>
                                    <a href="/admin/admin-dashboard" className={darkMode ? "text-black" : "text-white footer-title footer-text footer-text"} style={{ textDecoration: "none" }}>
                                        CAREER AT H&M
                                    </a>
                                </li>
                                <li>
                                    <a href="/admin/admin-dashboard" className={darkMode ? "text-black" : "text-white footer-title footer-text footer-text"} style={{ textDecoration: "none" }}>
                                        SUSTAINABILITY
                                    </a>
                                </li>
                                <li>
                                    <a href="/admin/admin-dashboard" className={darkMode ? "text-black" : "text-white footer-title footer-text footer-text"} style={{ textDecoration: "none" }}>
                                        PRESS
                                    </a>
                                </li>
                                <li>
                                    <a href="/admin/admin-dashboard" className={darkMode ? "text-black" : "text-white footer-title footer-text footer-text"} style={{ textDecoration: "none" }}>
                                        INVESTOR RELATIONS
                                    </a>
                                </li>
                                <li>
                                    <a href="/admin/admin-dashboard" className={darkMode ? "text-black" : "text-white footer-title footer-text footer-text"} style={{ textDecoration: "none" }}>
                                        CORPORATE GOVERNACE
                                    </a>
                                </li>
                                <li>
                                    <a href="/admin/admin-dashboard" className={darkMode ? "text-black" : "text-white footer-title footer-text footer-text"} style={{ textDecoration: "none" }}>
                                        CONTACT
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-md-3 mb-4">
                            <h6 className={darkMode ? "text-black" : "text-white footer-title footer-text footer-title"} style={{ fontSize: "0.8rem", fontWeight: "700" }}>Help</h6>
                            <ul className="list list-unstyled">
                                <li>
                                    <a href="/admin/admin-dashboard" className={darkMode ? "text-black" : "text-white footer-title footer-text"} style={{ textDecoration: "none" }}>
                                        CUSTOMER SERVICES
                                    </a>
                                </li>
                                <li>
                                    <a href="/about" className={darkMode ? "text-black" : "text-white footer-title footer-text"} style={{ textDecoration: "none" }}>
                                        ABOUT H&M GROUP
                                    </a>
                                </li>
                                <li>
                                    <a href="/admin/admin-dashboard" className={darkMode ? "text-black" : "text-white footer-title footer-text"} style={{ textDecoration: "none" }}>
                                        FIND A STORE
                                    </a>
                                </li>
                                <li>
                                    <a href="/admin/admin-dashboard" className={darkMode ? "text-black" : "text-white footer-title footer-text"} style={{ textDecoration: "none" }}>
                                        LEGAL AND PRIVACY
                                    </a>
                                </li>
                                <li>
                                    <a href="/contact" className={darkMode ? "text-black" : "text-white footer-title footer-text"} style={{ textDecoration: "none" }}>
                                        CONTACT
                                    </a>
                                </li>
                                <li>
                                    <a href="/admin/admin-dashboard" className={darkMode ? "text-black" : "text-white footer-title footer-text"} style={{ textDecoration: "none" }}>
                                        SECURE SHOPING
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-md-3 mb-4">
                            <p className={darkMode ? "text-black" : "text-white"}>
                                Sign up now and be the first to know about exclusive offers,
                                <br /> latest fashion news & style tips!
                            </p>
                            <a href="/admin/admin-dashboard" className={darkMode ? "text-black" : "text-white read-more-text"} >
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
                        <h5 className={darkMode ? "text-black" : "text-white "} style={{ fontSize: "0.9rem", fontWeight: "600" }}>INDIA (Rs.)</h5>
                    </div>
                </section>
            </div>
        </footer>
    )
}

export default AdminFooter