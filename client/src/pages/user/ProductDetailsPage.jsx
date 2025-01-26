import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';
import { useFetch } from '../../hooks/useFetch';
import toast from "react-hot-toast";
import { axiosInstance } from '../../config/axiosInstance';
import { AddReview } from '../../components/user/AddReview';
import { BsBag } from 'react-icons/bs';
import { Button, Collapse } from 'react-bootstrap';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

function ProductDetailsPage() {
    const { darkMode } = useSelector((state) => state.mode);
    const { productId } = useParams();
    const [product, error] = useFetch(`/product/get-product/${productId}`);
    const [selectedSize, setSelectedSize] = useState('');
    const [openDescription, setOpenDescription] = useState(false);
    const [openMaterials, setOpenMaterials] = useState(false);
    const [openCareGuide, setOpenCareGuide] = useState(false); // State for toggling care guide visibility

    const sizesByCategory = {
        Kids: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    };

    const category = product?.category;
    const sizes = sizesByCategory[category] || [];

    const handleAddToCart = async () => {
        try {
            if (!selectedSize) {
                toast.error("Please select a size before adding to cart.");
                return;
            }

            const response = await axiosInstance({
                method: "POST",
                url: "/cart/add-to-cart",
                data: { productId, size: selectedSize },
            });
            toast.success("Product added to cart");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to add to cart");
        }
    };

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    return (
        <>
            <Container className="my-5">
                {product ? (
                    <Row className="d-flex justify-content-center align-items-center">
                        <Col xs="12" md="6">
                            <img
                                src={product?.image}
                                alt={product?.title}
                                style={{ width: '100%' }}
                            />
                        </Col>
                        <Col xs="12" md="6" className="text-center text-md-start">
                            <h1
                                className={darkMode ? 'text-black' : 'text-white'}
                                style={{ fontSize: '1.5rem', marginBottom: '1rem' }}
                            >
                                {product?.title}
                            </h1>
                            <p className='dull-title'>MRP inclusive of all taxes</p>
                            <p
                                className={darkMode ? 'text-black' : 'text-white'}
                                style={{ fontSize: '1rem', fontWeight: 'bold' }}
                            >
                                Rs. {product?.price}.00
                            </p>

                            <div className="size-selection">
                                <p>Sizes</p>
                                <div className="size-sec">
                                    {sizes.map((size) => (
                                        <button
                                            key={size}
                                            className={`size text-center ${selectedSize === size ? 'selected' : ''}`}
                                            onClick={() => handleSizeSelect(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                                <p>Delivery Time : 2-7 days</p>
                            </div>
                            <button onClick={handleAddToCart} className="mt-3 add-to-cart">
                                <BsBag style={{ marginLeft: '8px' }} />
                                Add
                            </button>
                            <AddReview />

                            <hr />
                            <Button
                                variant="link"
                                className={`${darkMode ? 'text-black' : 'text-white'} description-btn d-flex justify-content-between align-items-center`}
                                onClick={() => setOpenDescription(!openDescription)}
                                aria-controls="description-collapse-text"
                                aria-expanded={openDescription}
                                style={{ marginTop: '1rem' }}
                            >
                                <span>
                                    {openDescription ? (
                                        <span className="text-danger">Description & Fit</span>
                                    ) : (
                                        <span className="description-btn">Description & Fit</span>
                                    )}
                                </span>
                                <span>
                                    {openDescription ? <FaChevronUp /> : <FaChevronDown />}
                                </span>
                            </Button>
                            <Collapse in={openDescription}>
                                <div id="description-collapse-text" className="mt-3">
                                    <p style={{ fontSize: '1rem', fontWeight: '500' }}>{product?.description}</p>
                                </div>
                            </Collapse>

                            <hr />
                            <Button
                                variant="link"
                                className={`${darkMode ? 'text-black' : 'text-white'} materials-btn d-flex justify-content-between align-items-center`}
                                onClick={() => setOpenMaterials(!openMaterials)}
                                aria-controls="materials-collapse-text"
                                aria-expanded={openMaterials}
                                style={{ marginTop: '1rem' }}
                            >
                                <span>
                                    {openMaterials ? (
                                        <span className="text-danger">Materials</span>
                                    ) : (
                                        <span className="materials-btn">Materials</span>
                                    )}
                                </span>
                                <span>
                                    {openMaterials ? <FaChevronUp /> : <FaChevronDown />}
                                </span>
                            </Button>
                            <Collapse in={openMaterials}>
                                <div id="materials-collapse-text" className="mt-3">
                                    <p style={{ fontSize: '1rem', fontWeight: '500' }}>{product?.materials}</p>
                                </div>
                            </Collapse>

                            <hr />
                            <Button
                                variant="link"
                                className={`${darkMode ? 'text-black' : 'text-white'} care-guid-btn d-flex justify-content-between align-items-center`}
                                onClick={() => setOpenCareGuide(!openCareGuide)}
                                aria-controls="careguide-collapse-text"
                                aria-expanded={openCareGuide}
                                style={{ marginTop: '1rem' }}
                            >
                                <span>
                                    {openCareGuide ? (
                                        <span className="text-danger">Care Guide</span>
                                    ) : (
                                        <span>Care Guide</span>
                                    )}  
                                </span>
                                <span>
                                    {openCareGuide ? <FaChevronUp /> : <FaChevronDown />}
                                </span>
                            </Button>
                            <Collapse in={openCareGuide}>
                                <div id="careguide-collapse-text" className="mt-3">
                                    <p style={{ fontSize: '1rem', fontWeight: '500' }}>{product?.careguid}</p>
                                </div>
                            </Collapse>
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
