import React from 'react'
import { Container, Nav } from 'react-bootstrap'

function PreppyUniform() {
    return (
        <>
            <Container>
                <section>
                    <div
                        className="container mt-4 d-flex justify-content-center align-items-center">
                        <div
                            className="position-relative"
                            style={{
                                maxWidth: "930px",
                                width: "100%",
                            }}
                        >
                            <img
                                src="https://media.alshaya.com/adobe/assets/urn:aaid:aem:84eb0ed2-2c2c-4b98-ae44-582719d0d02a/as/DS60F-3x2.jpg?preferwebp=true&width=750&format=jpg"
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
                                    transform: "translateY(-70%)",
                                }}
                            >
                                <h2 style={{ fontWeight: "bold", fontSize: "30px" }}>Preppy update</h2>
                                <div
                                    style={{
                                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                                        textAlign: "center",
                                        padding: "10px",
                                    }}
                                >
                                    <ul className="preppy-btn" style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                                        <li style={{ cursor: "pointer", color: "white" }}>
                                            <Nav.Link href="/Preppy">Shop now</Nav.Link>
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

export default PreppyUniform