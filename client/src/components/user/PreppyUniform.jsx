import React from "react";
import { Link } from 'react-router-dom';
import { BiSolidLeftArrow } from 'react-icons/bi';
import { Container, Nav } from "react-bootstrap";

function PreppyUniform() {
    return (
        <>
            <Container className="d-flex justify-content-center align-items-center" style={{ maxWidth: "100%" }}>
                <section>
                    <div
                        className="position-relative"
                        style={{
                            maxWidth: "930px",
                            width: "100%",
                            height: "100%",
                            marginTop: "27px",
                        }}
                    >
                        <img
                            src="https://image.hm.com/content/dam/global_campaigns/season_01/women/ds21aa/DS21AA-3x2-1.jpg?imwidth=1536"
                            className="img-fluid"
                            alt="Preppy Updates"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                        <div
                            className="preppy-sec position-absolute text-white d-flex flex-column justify-content-end"
                            style={{
                                bottom: "10%",
                                left: "0",
                                width: "100%",
                                height: "100%",
                                textAlign: "center",
                                padding: "0 20px",
                            }}
                        >
                            <h2
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "calc(1.5rem + 1vw)",
                                    marginBottom: "10px",
                                }}
                            >
                                Preppy edit
                            </h2>
                            <Link to="/productDetails/67ccba50f468ca2aeaf0341c" className="position-absolute" style={{ top: '45%', left: '80%', transform: 'translate(-50%, -50%)', textDecoration: 'none' }}>
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
                            <div>
                                <ul
                                    className="preppy-btn"
                                    style={{
                                        listStyleType: "none",
                                        padding: 0,
                                        margin: 0,
                                        marginBottom: "30px",
                                    }}
                                >
                                    <li>
                                        <Nav.Link
                                            href="/Preppy luxe"
                                            style={{
                                                textDecoration: "none",
                                                color: "black",
                                                backgroundColor: "white",
                                                border: "1px solid white",
                                                padding: "8px 12px",
                                                fontWeight: "bold",
                                                fontSize: "small",
                                                display: "inline-block",
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
    );
}

export default PreppyUniform;
