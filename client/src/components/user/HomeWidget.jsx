import React from 'react'
import { Container } from 'react-bootstrap'

function HomeWidget() {
    return (
        <>
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ maxWidth: "100%", height: "100vh" }}
            >
                <div
                    className="widget text-white text-center"
                    style={{
                        maxWidth: "930px",
                        width: "100%",
                        padding: "20px",
                        backgroundColor: "#c9002e",
                    }}
                >
                    <div>
                        <h1
                            className="widget-text-1"
                            style={{
                                fontSize: "calc(2rem + 1vw)", // Responsive font size for heading
                                marginBottom: "10px",
                            }}
                        >
                            Hurry up!
                        </h1>
                        <p
                            className="widget-text-2"
                            style={{
                                fontSize: "calc(1rem + 0.5vw)", // Responsive font size for paragraph
                                marginBottom: "10px",
                            }}
                        >
                            Sale is live. Explore exclusive styles.
                        </p>
                        <p
                            className="text-center"
                            style={{
                                fontSize: "calc(0.9rem + 0.3vw)", // Responsive size for smaller text
                            }}
                        >
                            *T&C Apply. Offers may vary in-store and online.
                        </p>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default HomeWidget