import React from 'react'
import { Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { BiSolidLeftArrow } from 'react-icons/bi';

function NewUtilitarian() {
    return (
        <>
            <Container className="d-flex justify-content-center align-items-center"
                style={{ maxWidth: "100%" }}>
                <section>
                    <div
                        className="position-relative"
                        style={{
                            maxWidth: "930px",
                            width: "100%",
                            height: "100%",
                            marginTop: '27px'
                        }}>
                        <img
                            src="https://image.hm.com/content/dam/hm/TOOLBOX/Local%20Activities/2024_s09/febraury_2025/W11-EAS-MS21C1-3x2.jpg?imwidth=1536"
                            className="img-fluid"
                            alt="Sample"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />

                        <div
                            className="preppy-sec position-absolute text-white d-flex flex-column align-items-start justify-content-center"
                            style={{
                                top: "0",
                                left: "0",
                                width: "100%",
                                height: "100%",
                                textAlign: "left",
                                paddingLeft: "20px",
                            }}>
                            <h2
                                style={{
                                    color:"black",
                                    fontWeight: "bold",
                                    fontSize: "calc(1.5rem + 1vw)",
                                    marginBottom: "10px",
                                }}
                            >
                                New utilitarian
                            </h2>
                            <Link to="/productDetails/67b3c127f569ac154c4214d9" className="position-absolute" style={{ top: '65%', left: '68%', transform: 'translate(-50%, -50%)', textDecoration: 'none' }}>
                                <button
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: 'rgb(0, 0, 0)',
                                        fontSize: '16px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <BiSolidLeftArrow style={{ marginRight: '10px', marginLeft: '-28px', color: 'black' }} />
                                    <div style={{ color: 'white', fontSize: 'x-small', fontWeight: '600', textAlign: 'left' }}>
                                        Rs.2,299.00
                                        <br />
                                    </div>
                                </button>
                            </Link>
                            <p style={{ fontSize: "small", marginBottom: "6px", fontWeight: '500', color:"black" }}>Fresh staples with functional details and sporty appeal.</p>
                            <div>
                                <ul
                                    className="preppy-btn d-flex justify-content-start flex-wrap"
                                    style={{
                                        listStyleType: "none",
                                        padding: 0,
                                        margin: 0,
                                        gap: "10px",
                                    }}
                                >
                                    <li>
                                        <Nav.Link
                                            href="/New-utilitarian"
                                            style={{
                                                textDecoration: "none",
                                                color: "white",
                                                backgroundColor: "black",
                                                border: "1px solid black",
                                                padding: "6px 8px",
                                                fontWeight: "bold",
                                                fontSize: 'small'
                                            }}
                                        >
                                            Shop now
                                        </Nav.Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </Container>
        </>
    )
}

export default NewUtilitarian