import React from 'react';
import { Container, Nav } from 'react-bootstrap';

function KidsDenim() {
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
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                zIndex: 1,
                            }}
                        ></div>

                        <img
                            src="https://image.hm.com/content/dam/global_campaigns/season_01/kids/4041b/4041B-3x2-h-m-adorables-spring-2025.jpg?imwidth=1536"
                            className="img-fluid"
                            alt="A new take on denim"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                zIndex: 0,
                            }}
                        />

                        <div
                            className="preppy-sec position-absolute text-white"
                            style={{
                                bottom: "10%",
                                left: "50%",
                                transform: "translate(-50%, 0)",
                                textAlign: "center",
                                zIndex: 2,
                            }}
                        >
                            <h2 className="responsive-heading text" style={{ fontWeight: "bold", marginBottom: "10px" }}>
                                S&J Adorables
                            </h2>
                            <p className="responsive-subheading" style={{ fontSize: "small", marginBottom: "10px", fontWeight: '500' }}>
                                S/S 2025
                            </p>
                            <div
                                style={{
                                    backgroundColor: "rgb(255, 255, 255)",
                                    textAlign: "center",
                                    padding: "5px 10px",
                                    display: "inline-block",
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
                                            href="/Kids2-8y"
                                            style={{
                                                textDecoration: "none",
                                                color: "black",
                                                fontWeight: "bold",
                                                fontSize: "0.9rem",
                                                display: "inline-block",
                                            }}
                                        >
                                            Shop 2-8Y
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

export default KidsDenim;
