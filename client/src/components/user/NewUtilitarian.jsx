import React from 'react'
import { Container, Nav } from 'react-bootstrap'

function NewUtilitarian() {
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
                                src="https://image.hm.com/content/dam/global_campaigns/season_01/men/ms11lh5/MS11LH5-athleisure-teaser-3x2.jpg?imwidth=1536"
                                className="img-fluid" alt="Sample" style={{ width: "100%", height: "auto", }} />
                            <div
                                className="preppy-sec position-absolute text-white"
                                style={{
                                    top: "50%",
                                    transform: "translateY(-70%)",
                                }}>
                                <h2 style={{ fontWeight: "bold", fontSize: "30px" }}>New utilitarian</h2>
                                <div style={{
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                    textAlign: "center",
                                    padding: "10px",
                                }}>
                                    <ul className="preppy-btn" style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                                        <li style={{ cursor: "pointer", color: "white" }}>
                                            <Nav.Link href="/New-utilitarian" >Shop now</Nav.Link>
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

export default NewUtilitarian