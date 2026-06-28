import React from 'react'
import { Container, Nav } from 'react-bootstrap'

function LadiesProducts() {
    return (
        <>
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{
                    maxWidth: "100%", 
                }}
            >
                <div
                    className="widget text-white text-center"
                    style={{
                        maxWidth: "930px", 
                        width: "100%",
                        height: "150px", 
                        backgroundImage: "url('https://image.hm.com/content/dam/global_campaigns/season_01/kids/9111f/9111F-3x2-limited-edition-2025.jpg?imwidth=1536')",
                        backgroundSize: "cover",
                        backgroundPosition: "center", 
                        backgroundRepeat: "no-repeat", 
                        padding: "20px"
                    }}
                >
                    <div>
                        <p
                            className="widget-text-2 mb-2"
                            style={{
                                fontSize: "1rem",
                                fontWeight: "bold",
                                color: 'black',
                                lineHeight: "1.2",
                            }}
                        >
                            Dive into printed tees and sweatshirts
                        </p>
                        <p
                            className="text-center mb-4"
                            style={{
                                fontSize: ".8rem",
                                fontWeight: '500',
                                lineHeight: "1.5",
                                color: 'black',
                            }}
                        >
                            Explore the essential collection
                        </p>
                        <ul
                            className="preppy-btn d-flex justify-content-center"
                            style={{
                                listStyleType: "none",
                                padding: 0,
                                margin: 0,
                                gap: "10px",
                                flexWrap: "wrap", 
                            }}
                        >
                            <li>
                                <Nav.Link
                                    href="/Ladies"
                                    style={{
                                        color: "black",
                                        backgroundColor: "transperant",
                                        padding: "10px 20px",
                                        fontWeight: "bold",
                                        textDecoration: "none",
                                        border: '1px solid black'
                                    }}
                                >
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

export default LadiesProducts
