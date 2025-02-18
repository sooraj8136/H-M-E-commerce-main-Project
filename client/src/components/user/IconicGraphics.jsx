import React from 'react'
import { Container, Nav } from 'react-bootstrap'

function IconicGraphics() {
    return (
        <>
            <Container>
                <section>
                    <div
                        className="container mt-4 d-flex justify-content-center align-items-center"
                    >
                        <div
                            className="position-relative"
                            style={{
                                maxWidth: "930px",
                                width: "100%",
                            }}
                        >
                            <img
                                src="https://image.hm.com/content/dam/global_campaigns/season_01/men/ms11e7/teaser/MS11E7-season-start-1x1-teaser.jpg?imwidth=1536"
                                className="img-fluid"
                                alt="Sample"
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    maxHeight: "750px", 
                                    objectFit: "cover", // Ensures proper scaling and cropping
                                }}
                            />
                            <div
                                className="preppy-sec position-absolute text-white"
                                style={{
                                    top: "50%",
                                    transform: "translateY(-70%)",
                                }}
                            >
                                <h2 style={{ fontWeight: "bold", fontSize: "30px" }}>Transitional fits</h2>
                                <p>Easy spring looks with crisp textures.</p>
                                <div
                                    style={{
                                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                                        textAlign: "center",
                                        padding: "10px",
                                    }}
                                >
                                    <ul
                                        className="preppy-btn"
                                        style={{ listStyleType: "none", padding: 0, margin: 0 }}
                                    >
                                        <li style={{ cursor: "pointer", color: "white" }}>
                                            <Nav.Link href="/transitional-fits">Shop now</Nav.Link>
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

export default IconicGraphics