import React from 'react'
import { Container, Nav } from 'react-bootstrap'

function DenimMen() {
    return (
        <>
            <Container className="d-flex justify-content-center align-items-center"
                style={{ maxWidth: "100%" }}>
                <section>
                    <div
                        className="position-relative"
                        style={{
                            maxWidth: "930px", // Matches the width of the second container
                            width: "100%",
                            height: "100%", // Added height to align with the second container
                            marginTop: '27px',
                        }}>
                        <img
                            src="https://image.hm.com/content/dam/global_campaigns/season_01/men/ms11e6/MS11E6-Denimroundup-3x2-v3.jpg?imwidth=1536"
                            className="img-fluid"
                            alt="Activewear"
                            style={{
                                width: "100%",
                                height: "100%", // Fills the container height
                                objectFit: "cover", // Maintains aspect ratio
                            }} />
                        <div
                            className="preppy-sec position-absolute text-white d-flex flex-column justify-content-end"
                            style={{
                                bottom: "10%", // Aligns content at the bottom
                                left: "0",
                                width: "100%",
                                height: "100%",
                                textAlign: "center", // Centers text and button
                                padding: "0 20px",
                            }}
                        >
                            <h2
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "calc(1.5rem + 1vw)", // Responsive font size
                                    marginBottom: "10px",
                                }}
                            >
                                Denim roundup
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
                                        marginBottom: '30px', // Adjusted spacing for smaller screens
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
                                                padding: "8px 12px", // Scalable padding
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
    )
}

export default DenimMen;
