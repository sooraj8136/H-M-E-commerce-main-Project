import React from 'react';
import { Container, Nav } from 'react-bootstrap';

function DenimMen() {
    return (
        <>
            <Container 
                className="d-flex justify-content-center align-items-center" 
                style={{ maxWidth: "100%" }}
            >
                <section>
                    <div
                        className="position-relative"
                        style={{
                            maxWidth: "930px",
                            width: "100%",
                            height: "100%",
                            marginTop: '27px',
                        }}
                    >
                        <img
                            src="https://image.hm.com/content/dam/global_campaigns/season_01/men/ms21e1/common-ratios/MS21E1-denim-roundup-3x2-teaser.jpg?imwidth=1536"
                            className="img-fluid"
                            alt="Denim Roundup"
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
                                Denim Roundup
                            </h2>
                            <p
                                style={{
                                    fontSize: "small",
                                    marginBottom: "10px",
                                    fontWeight: '500',
                                }}
                            >
                                Get to know the fit. A quick guide to signature jeans styles.
                            </p>
                            <div>
                                <ul
                                    className="preppy-btn"
                                    style={{
                                        listStyleType: "none",
                                        padding: 0,
                                        margin: 0,
                                        display: "flex",
                                        justifyContent: "center",
                                        gap: "10px",
                                    }}
                                >
                                    <li>
                                        <Nav.Link
                                            href="/denim-roundup"
                                            style={{
                                                textDecoration: "none",
                                                color: "black",
                                                backgroundColor: "white",
                                                border: "1px solid white",
                                                padding: "8px 12px",
                                                fontWeight: "bold",
                                                fontSize: 'small',
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

export default DenimMen;
