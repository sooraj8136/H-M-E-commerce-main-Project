import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';
import { useFetch } from '../../hooks/useFetch';
import toast from "react-hot-toast";
import { axiosInstance } from '../../config/axiosInstance';
import { BsBag } from 'react-icons/bs';
import { Button, Collapse } from 'react-bootstrap';
import { AddReview } from '../../components/user/AddReview';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

function ProductDetailsPage() {
    const { darkMode } = useSelector((state) => state.mode);
    const { productId } = useParams();
    const [product, error] = useFetch(`/product/get-product/${productId}`);
    const [openDescription, setOpenDescription] = useState(false);
    const [openMaterials, setOpenMaterials] = useState(false);
    const [openCareGuide, setOpenCareGuide] = useState(false);
    const navigate = useNavigate();

    const handleAddToCart = async () => {
        try {
            if (product?.stock <= 0) {
                toast.error(`Insufficient stock for ${product.title.trim()}`);
                return;
            }

            const response = await axiosInstance({
                method: "POST",
                url: "/cart/add-to-cart",
                data: { productId },
            });
            toast.success("Product added to cart");
        } catch (error) {
            console.log(error);
            if (error?.response?.status === 401) {
                toast.error('You have to log in to add items to your shopping bag');
                navigate('/login');
            } else {
                toast.error(error?.response?.data?.message || 'Failed to update wishlist');
            }
        }
    };

    return (
        <>
            <Container className="my-5">
                {product ? (
                    <Row className="d-flex justify-content-center align-items-start">
                        <Col xs="12" md="6" className="mb-4 mb-md-0">
                            <img
                                src={product?.image}
                                alt={product?.title}
                                style={{ width: "100%", objectFit: "cover" }}
                            />
                        </Col>
                        <Col xs="12" md="6" className="text-center text-md-start">
                            <h1
                                className={darkMode ? "text-black" : "text-white"}
                                style={{ fontSize: "1.5rem", marginBottom: "1rem" }}
                            >
                                {product?.title}
                            </h1>
                            <p
                                className={darkMode ? "text-black" : "text-white"}
                                style={{ fontSize: "0.9rem", fontWeight: "500" }}
                            >
                                Available: {product?.stock}
                                {product?.stock <= 0 && (
                                    <span style={{ color: "red", marginLeft: "8px", fontWeight: "500" }}>
                                        Insufficient stock
                                    </span>
                                )}
                            </p>
                            <p className="dull-title">MRP inclusive of all taxes</p>
                            <p
                                className={darkMode ? "text-black" : "text-white"}
                                style={{ fontSize: "1.2rem", fontWeight: "600" }}
                            >
                                Rs. {product?.price}.00
                            </p>

                            <button
                                onClick={handleAddToCart}
                                className="mt-3 add-to-cart border-white"
                                style={{
                                    border: "1px solid white",
                                }}
                            >
                                <BsBag style={{ marginRight: "8px" }} />
                                Add
                            </button>
                            <Button
                                variant="link"
                                className={`${darkMode ? "text-black" : "text-white"
                                    } description-btn d-flex w-100 align-items-center`}
                                onClick={() => setOpenDescription(!openDescription)}
                                aria-controls="description-collapse-text"
                                aria-expanded={openDescription}
                                style={{ marginTop: "1rem", fontWeight: "700" }}
                            >
                                <span className={openDescription ? "text-danger" : "description-btn"}>
                                    Description & Fit
                                </span>
                                <span className="ms-auto">
                                    {openDescription ? (
                                        <MdKeyboardArrowUp size={22} />
                                    ) : (
                                        <MdKeyboardArrowDown size={22} />
                                    )}
                                </span>
                            </Button>
                            <Collapse in={openDescription}>
                                <div id="description-collapse-text" className="mt-3">
                                    <p
                                        className={darkMode ? "text-black" : "text-white"}
                                        style={{ fontSize: "1rem", fontWeight: "400" }}
                                    >
                                        {product?.description}
                                    </p>
                                </div>
                            </Collapse>
                            <hr />
                            <Button
                                variant="link"
                                className={`${darkMode ? "text-black" : "text-white"
                                    } materials-btn d-flex w-100 align-items-center`}
                                onClick={() => setOpenMaterials(!openMaterials)}
                                aria-controls="materials-collapse-text"
                                aria-expanded={openMaterials}
                                style={{ marginTop: "1rem", fontWeight: "700" }}
                            >
                                <span className={openMaterials ? "text-danger" : "materials-btn"}>
                                    Materials
                                </span>
                                <span className="ms-auto">
                                    {openMaterials ? (
                                        <MdKeyboardArrowUp size={22} />
                                    ) : (
                                        <MdKeyboardArrowDown size={22} />
                                    )}
                                </span>
                            </Button>
                            <Collapse in={openMaterials}>
                                <div id="materials-collapse-text" className="mt-3">
                                    <p
                                        className={darkMode ? "text-black" : "text-white"}
                                        style={{ fontSize: "1rem", fontWeight: "400" }}
                                    >
                                        {product?.materials}
                                    </p>
                                </div>
                            </Collapse>
                            <hr />
                            <AddReview />
                        </Col>
                    </Row>
                ) : (
                    <p>No product found.</p>
                )}
            </Container>
        </>
    );
}

export default ProductDetailsPage;
