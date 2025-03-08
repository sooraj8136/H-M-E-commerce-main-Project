import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function KidsEffortlessBlues() {
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
                                background: "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))",
                                zIndex: 1,
                            }}
                        ></div>

                        <img
                            src="https://image.hm.com/content/dam/global_campaigns/season_01/kids/4031b/4031B-3x2-1-effortless-blues.jpg?imwidth=1536"
                            className="img-fluid"
                            alt="Effortless Blues"
                            style={{
                                width: "100%",
                                height: "100%", 
                                objectFit: "cover", 
                                zIndex: 0,
                            }}
                        />
                        
                        <div
                            className="preppy-sec position-absolute"
                            style={{
                                bottom: "10%",
                                left: "50%",
                                transform: "translate(-50%, 0)",
                                textAlign: "center",
                                zIndex: 2,
                                color: "white",
                            }}
                        >
                            <h2 className="responsive-heading" style={{ fontWeight: "bold", marginBottom: "10px" }}>
                                Effortless blues
                            </h2>
                            <p className="responsive-subheading hide-on-small" style={{ fontSize: "small", marginBottom: "10px", fontWeight: '500' }}>
                                western-inspired denim staples
                            </p>
                            <div
                                style={{
                                    backgroundColor: "rgb(255, 255, 255)",
                                    textAlign: "center",
                                    padding: "5px 10px",
                                    display: "inline-block",
                                }}
                            >
                                <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                                    <li style={{ cursor: "pointer" }}>
                                        <Link
                                            to="/Kids9-14y"
                                            style={{
                                                fontSize: '0.9rem',
                                                textDecoration: "none",
                                                color: "black",
                                                fontWeight: "bold",
                                                display: "inline-block",
                                            }}>
                                            Shop 9-14Y
                                        </Link>
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

export default KidsEffortlessBlues;
