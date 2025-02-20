import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { DarkMode } from '../shared/DarkMode';
import { useSelector } from 'react-redux';
import { CiHeart } from "react-icons/ci";
import { BsBag, BsPerson } from 'react-icons/bs';

function UserHeader() {

    const { darkMode } = useSelector((state) => state.mode)
    console.log(darkMode)

    return (
        <>
            <header>
                <Navbar
                    expand="lg"
                    className={darkMode ? "navbar navbar-expand-lg navbar-light bg-black-200" : "navbar navbar-expand-lg navbar-light bg-black "}>
                    <Container fluid>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav className="navbar-nav me-auto mb-2 mb-lg-0" navbarScroll>
                                <Nav.Link href="" className={darkMode ? "text-black" : "text-white nav-sec-1"}>
                                    Sustainability
                                </Nav.Link>
                                <Nav.Link href="" className={darkMode ? "text-black" : "text-white nav-sec-1"}>
                                    Customer Service
                                </Nav.Link>
                                <Nav.Link href="" className={darkMode ? "text-black" : "text-white nav-sec-1"}>Newsletter</Nav.Link>
                            </Nav>
                            <Form className="d-flex align-items-center">
                                <div className="nav-sec-2">
                                    <div className="d-flex align-items-center">
                                        <Nav.Link
                                            href="/user/profile"
                                            className={`d-flex align-items-center ${darkMode ? "text-black" : "text-white"}`}
                                            aria-label="Profile"
                                            style={{fontWeight: '550'}}>
                                            <BsPerson
                                                style={{
                                                    fontSize: "1.6rem",
                                                    marginRight: "8px",
                                                    color: darkMode ? "#000" : "#fff",
                                                }}
                                            />
                                            My account
                                        </Nav.Link>
                                    </div>
                                    <div className="d-flex align-items-center nav-item-section">
                                        <Nav.Link href="/user/wishlist" className={`d-flex align-items-center ${darkMode ? "text-black" : "text-white"}`} aria-label="Favourites" style={{fontWeight: '550'}}>
                                            <CiHeart
                                                style={{
                                                    fontSize: "1.6rem",
                                                    marginRight: "4px",
                                                    color: darkMode ? "#000" : "#fff"
                                                }}
                                            />
                                            Favourites
                                        </Nav.Link>
                                    </div>
                                    <div className="d-flex align-items-center nav-item-section">
                                        <Nav.Link href="/user/cart" className={`d-flex align-items-center ${darkMode ? "text-black" : "text-white"}`}
                                            aria-label="Shopping bag">
                                            <BsBag
                                                style={{
                                                    fontSize: "1.3rem",
                                                    marginRight: "4px",
                                                    color: darkMode ? "#000" : "#fff"
                                                }}
                                            />
                                            Shopping bag
                                        </Nav.Link>
                                    </div>
                                </div>
                            </Form>

                            <div className="search">
                                <div className=" search-container ">
                                    <input
                                        className={`search-input ${darkMode ? "text-black" : "text-white"}`}
                                        placeholder="Search"
                                        aria-label="Search"
                                        type="search"
                                    />
                                    <button className="search-button" aria-label="Submit Search">
                                        <div className={darkMode ? "text-black" : "text-white"}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="search-icon"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85a1.007 1.007 0 0 0-.115-.098zm-5.242 1.1a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
                                            </svg>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <span>
                                <DarkMode />
                            </span>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <div className="imageTag text-center">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/1064px-H%26M-Logo.svg.png"
                        width="60px"
                        className="rounded mx-auto d-block "
                        alt="Responsive image"
                    />
                </div>
                <section className="navlinks">
                    <div>
                        <ul className="nav justify-content-center">
                            <li className="nav-item ">
                                <Nav.Link href="/sales-page" className={darkMode ? "text-black" : "text-white nav-link"}>Sales</Nav.Link>
                            </li>
                            <li className="nav-item ">
                                <Nav.Link href="/ladies-page" className={darkMode ? "text-black" : "text-white nav-link"}>Ladies</Nav.Link>
                            </li>
                            <li className="nav-item">
                                <Nav.Link href="/men-page" className={darkMode ? "text-black" : "text-white nav-link"}>Men</Nav.Link>
                            </li>
                            <li className="nav-item">
                                <Nav.Link href="/kids-page" className={darkMode ? "text-black" : "text-white nav-link"}>Kids</Nav.Link>
                            </li>
                            <li className="nav-item">
                                <Nav.Link href="/" className={darkMode ? "text-black" : "text-white nav-link"}>Home</Nav.Link>
                            </li>
                            <li className="nav-item">
                                <Nav.Link href="/contact" className={darkMode ? "text-black" : "text-white nav-link"}>Contact</Nav.Link>
                            </li>
                            <li className="nav-item">
                                <Nav.Link href="/product" className={darkMode ? "text-black" : "text-white nav-link"}>Products</Nav.Link>
                            </li>
                        </ul>
                    </div>
                </section>
            </header>
        </>
    )
}

export default UserHeader