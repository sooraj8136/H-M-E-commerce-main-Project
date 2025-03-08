import React from 'react'
import { Container, Nav } from 'react-bootstrap'


function Office() {
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
                        }}>
                            <img
                                src="https://image.hm.com/content/dam/global_campaigns/season_01/women/ws11j/WS11J-3x2-1.jpg?imwidth=1536"
                                className="img-fluid"
                                alt="Sample"
                                style={{
                                    width: "100%",
                                    height: "100%", 
                                    objectFit: "cover", 
                                }}
                            />
                        <div
                            className="preppy-sec position-absolute text-white d-flex flex-column align-items-start justify-content-center"
                            style={{
                                top: "0", 
                                left: "0", 
                                width: "100%",
                                height: "100%", 
                                textAlign: "left", 
                                paddingLeft: "20px", 
                            }}>
                            <h2
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "calc(1.5rem + 1vw)", 
                                    marginBottom: "10px",
                                }}
                            >
                                New neutrals
                            </h2>
                            <div>
                                <ul
                                    className="preppy-btn d-flex justify-content-start flex-wrap"
                                    style={{
                                        listStyleType: "none",
                                        padding: 0,
                                        margin: 0,
                                        gap: "10px",
                                    }}
                                >
                                    <li>
                                        <Nav.Link
                                            href="/New neutrals"
                                            style={{
                                                textDecoration: "none",
                                                color: "black",
                                                backgroundColor: "white",
                                                border: "1px solid white",
                                                padding: "6px 8px",
                                                fontWeight: "bold",
                                                fontSize: 'small'
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

export default Office