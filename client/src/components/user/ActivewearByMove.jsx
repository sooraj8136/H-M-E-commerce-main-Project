import React from 'react'
import { Container, Nav } from 'react-bootstrap'

function ActivewearByMove() {
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
                                src="https://image.hm.com/content/dam/global_campaigns/season_01/move/6021a/6021A-3x2-1.jpg?imwidth=1536"
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
                                <h2 style={{ fontWeight: "bold", fontSize: "30px", color: 'black' }}>Activewear by Move</h2>
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

export default ActivewearByMove