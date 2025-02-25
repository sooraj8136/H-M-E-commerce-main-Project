import React from 'react'
import { Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { BiSolidLeftArrow } from 'react-icons/bi';

function ModernRomance() {
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
                        }}
                    >
                        <img
                            src="https://image.hm.com/content/dam/global_campaigns/season_01/women/ds11f/DS11F-3x2.jpg?imwidth=1536"
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
                                Modern romance
                            </h2>
                            <Link to="/productDetails/67bd57a4633cb6e3d51574bb" className="position-absolute" style={{ top: '45%', left: '57%', transform: 'translate(-50%, -50%)', textDecoration: 'none' }}>
                                <button
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: 'rgb(0, 0, 0)',
                                        fontSize: '16px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <BiSolidLeftArrow style={{ marginRight: '10px', color: 'white', marginLeft: '-28px', color: 'black' }} />
                                    <div style={{ color: 'white', fontSize: 'x-small', fontWeight: '600', textAlign: 'left' }}>
                                        Rs.1,499.00
                                        <br />
                                    </div>
                                </button>
                            </Link>
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
                                            href="/Modern romance"
                                            style={{
                                                textDecoration: "none",
                                                color: "white",
                                                backgroundColor: "black",
                                                border: "1px solid black",
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

export default ModernRomance