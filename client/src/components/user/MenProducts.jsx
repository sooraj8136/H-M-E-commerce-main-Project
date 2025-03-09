import React from 'react'
import { Container, Nav } from 'react-bootstrap'

function MenProducts() {
    return (
        <>
            <Container className="d-flex justify-content-center align-items-center"
                style={{ maxWidth: "100%", }}>
                <div className="widget text-white text-center"
                    style={{
                        maxWidth: "930px",
                        width: "100%",
                        height: "150px",
                        backgroundImage: "url('https://www2.hm.com/content/dam/men_s06/september_2022/3066-teasers---banners/3066-Banner-3x1-2-the-essentials.jpg')",
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
                                color: 'white',
                                lineHeight: "1.2",
                            }}>
                            Most-loved styles starting at ₹399
                        </p>
                        <p className="text-center mb-3" style={{
                            fontSize: ".7rem",
                            fontWeight: '500',
                            lineHeight: "1.5",
                            color: 'white',
                        }} >
                            Explore the hot-sellers
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
                                <Nav.Link href="/Hot-sellers"
                                    style={{
                                        color: "black",
                                        backgroundColor: "white",
                                        padding: "5px 10px",
                                        fontSize: '0.9rem',
                                        fontWeight: "bold",
                                        textDecoration: "none",
                                    }}>
                                    Shop now
                                </Nav.Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default MenProducts