import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import Nav from "react-bootstrap/Nav";

function CategoryCard({ product }) { 

    const { darkMode } = useSelector((state) => state.mode);
    console.log(darkMode);

    return (
        <>
            <Container className="d-flex justify-content-center align-items-center my-3 ">
                    <Nav.Link
                        key={product._id}
                        href={`/productDetails/${product._id}`}
                        className="text-decoration-none">
                            <div className="product-item text-center"
                                >
                                <img src={product?.image} alt={product?.title} style={{
                                    width: "300px",
                                    height: "auto",
                                    objectFit: "cover",
                                    marginBottom: "10px",
                                    maxWidth: "1024px"
                                }}/>
                                <h3
                                    className={darkMode ? "text-black" : "text-white"}
                                    style={{ fontSize: "1rem", marginBottom: "0.5rem", }}>
                                    {product?.title}
                                </h3>
                                <p
                                    className={darkMode ? "text-black" : "text-white price"}
                                    style={{ fontSize: "1rem", }}>
                                    Rs.{product?.price}.00
                                </p>
                            </div>
                    </Nav.Link>
            </Container>
        </>
    );
}

export default CategoryCard;
