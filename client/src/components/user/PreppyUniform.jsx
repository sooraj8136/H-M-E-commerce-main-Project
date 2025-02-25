import React from 'react'
import { Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { BiSolidLeftArrow } from 'react-icons/bi';

function PreppyUniform() {
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
                            marginTop: '27px'
                        }}>
                        <img
                            src="https://image.hm.com/content/dam/global_campaigns/season_01/women/ds11e/DS11E-3x2-1.jpg?imwidth=1536"
                            className="img-fluid"
                            alt="Sample"
                            style={{
                                width: "100%",
                                height: "100%", // Fills the container height
                                objectFit: "cover", // Maintains aspect ratio
                            }} />
                        <div
                            className="preppy-sec position-absolute text-white d-flex flex-column align-items-start justify-content-center"
                            style={{
                                top: "0", // Ensures it spans the full height
                                left: "0", // Aligns the content to the left
                                width: "100%",
                                height: "100%", // Matches container height
                                textAlign: "left", // Aligns the text to the left
                                paddingLeft: "20px", // Adds some space from the left edge
                            }}>
                            <h2
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "calc(1.5rem + 1vw)", // Responsive font size
                                    marginBottom: "10px",
                                }}
                            >
                                Preppy Updates
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
                                            href="/Preppy luxe"
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

export default PreppyUniform