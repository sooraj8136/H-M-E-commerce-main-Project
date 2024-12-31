import React from 'react'
import { Container, Nav } from 'react-bootstrap'

function Accessories() {
    return (
        <>
            <Container>
                <section>
                    <div className="container mt-4 d-flex justify-content-center align-items-center">
                        <div
                            className="position-relative"
                            style={{
                                maxWidth: "930px",
                                width: "100%",
                            }}
                        >
                            <img
                                src="https://www2.hm.com/content/dam/global_campaigns/season_00/ladies/ws60i/WS60i-3x2-1.jpg"
                                className="img-fluid"
                                alt="Sample"
                                style={{
                                    width: "100%",
                                    height: "auto",
                                }}
                            />
                            <div
                                className="preppy-sec position-absolute text-white"
                                style={{
                                    top: "50%",
                                    left: "4%",
                                    transform: "translateY(-10%)",
                                }}
                            >
                                <h2
                                    style={{
                                        fontWeight: "bold",
                                    }}
                                >
                                    New Season Accessories
                                </h2>
                                <div
                                    style={{
                                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                                        textAlign: "center",
                                    }}
                                >
                                    <ul
                                        className="preppy-btn"
                                        style={{
                                            listStyleType: "none",
                                            padding: 0,
                                            margin: 0,
                                        }}
                                    >
                                        <li style={{ cursor: "pointer" }}>
                                            <Nav.Link
                                                href="/accessories"
                                                style={{
                                                    color: "white",
                                                    textDecoration: "none",
                                                    fontSize: "calc(1rem + 0.5vw)", // Responsive link size
                                                }}
                                            >
                                                Shop Now
                                            </Nav.Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </Container>
        </>
    )
}

export default Accessories