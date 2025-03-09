import React from 'react'
import { Container, Nav } from 'react-bootstrap'

function KidsProducts() {
    return (
        <>
            <Container className="d-flex justify-content-center align-items-center"
                style={{ maxWidth: "100%", }}>
                <div className="widget text-white text-center"
                    style={{
                        maxWidth: "930px",
                        width: "100%",
                        height: "150px",
                        backgroundImage: "url('https://www2.hm.com/content/dam/TOOLBOX/PRE_SEASON/2018_s9/w11/Tck9049-w11-KIDS-SLS-3x1.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        padding: "20px"
                    }}>
                    <div>
                        <p className="widget-text-2 mb-1"
                            style={{
                                fontSize: "0.9rem",
                                fontWeight: "bold",
                                color: 'black',
                                lineHeight: "1.2",
                            }}>
                            Brighten up the little ones' closets
                        </p>
                        <p className="text-center mb-3" style={{
                            fontSize: ".7rem",
                            fontWeight: '500',
                            lineHeight: "1.5",
                            color: 'black',
                        }} >
                            Get ready for the new season with light and bright looks.
                        </p>
                        <ul
                            className="preppy-btn d-flex justify-content-center"
                            style={{
                                listStyleType: "none",
                                padding: 0,
                                margin: 0,
                                gap: "10px",
                                flexWrap: "wrap",
                            }} >
                            <li>
                                <Nav.Link href="/Baby"
                                    style={{
                                        color: "black",
                                        backgroundColor: "transperant",
                                        padding: "5px 10px",
                                        fontSize: '0.9rem',
                                        fontWeight: "bold",
                                        textDecoration: "none",
                                        border: '1px solid black'
                                    }}>
                                    Baby
                                </Nav.Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default KidsProducts