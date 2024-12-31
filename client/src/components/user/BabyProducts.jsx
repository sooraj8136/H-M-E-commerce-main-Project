import React from 'react'
import { Container, Nav } from 'react-bootstrap'

function BabyProducts() {
    return (
        <>
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ maxWidth: "100%", height: "15%" }}
            >
                <div
                    className="widget text-white text-center"
                    style={{
                        maxWidth: "930px",
                        width: "100%",
                        height: "5%",
                        backgroundColor: "rgb(68, 14, 14)",
                    }}
                >
                    <div>
                        <br />
                        <p className="widget-text-2">Soft sweets and basics</p>
                        <p className="text-center">
                        A playful collection from fuzzy favourites
                        </p>
                        <ul
                            className="preppy-btn"
                            style={{
                                listStyleType: "none",
                                padding: 0,
                                margin: "10px",
                            }}
                        >
                            <div>
                                <li >
                                    <Nav.Link
                                        href="/Babynew"
                                        style={{
                                            color: "black",
                                            backgroundColor: "white",
                                            padding: "10px 20px",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        Shop now
                                    </Nav.Link>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default BabyProducts