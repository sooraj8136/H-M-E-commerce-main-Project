import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';
import GetReview from '../../components/seller/GetReview';
import { axiosInstance } from '../../config/axiosInstance';

function AdminProductDetails() {
    const { darkMode } = useSelector((state) => state.mode);
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axiosInstance.get(`/product/get-product/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Failed to fetch product details:", error);
            }
        };

        fetchProduct();
    }, [productId]);

    return (
        <Container className="my-5">
            {product ? (
                <Row className="d-flex justify-content-center align-items-center">
                    <Col xs="12" md="6">
                        <img
                            src={product?.data?.image}
                            alt={product?.data?.title}
                            style={{ width: '100%' }}
                        />
                    </Col>
                    <Col xs="12" md="6" className="text-center text-md-start">
                        <h1
                            className={darkMode ? 'text-black' : 'text-white'}
                            style={{ fontSize: '1.5rem', marginBottom: '1rem' }}
                        >
                            {product?.data?.title}
                        </h1>
                        <p
                            className={darkMode ? 'text-black' : 'text-white'}
                            style={{ fontSize: '1.2rem', fontWeight: '600' }}
                        >
                            Rs.{product?.data?.price}.00
                        </p>
                        <p
                            className={darkMode ? 'text-black' : 'text-white'}
                            style={{ fontSize: '0.9rem', fontWeight: '500' }}
                        >
                            <strong>Stock :</strong> {product?.data?.stock}
                        </p>
                        <p
                            className={darkMode ? 'text-black' : 'text-white'}
                            style={{ fontSize: '1rem', marginBottom: '1.5rem' }}
                        >
                            <strong>Description :</strong> {product?.data?.description}
                        </p>
                        <p
                            className={darkMode ? 'text-black' : 'text-white'}
                            style={{ fontSize: '1rem', marginBottom: '1.5rem' }}
                        >
                            <strong>Category :</strong> {product?.data?.category}
                        </p>
                        <p
                            className={darkMode ? 'text-black' : 'text-white'}
                            style={{ fontSize: '1rem', marginBottom: '1.5rem' }}
                        >
                            <strong>Careguide :</strong> {product?.data?.careguid}
                        </p>
                        <p
                            className={darkMode ? 'text-black' : 'text-white'}
                            style={{ fontSize: '1rem', marginBottom: '1.5rem' }}
                        >
                            <strong>Materials :</strong> {product?.data?.materials}
                        </p>
                        <GetReview />
                    </Col>
                </Row>
            ) : null}
        </Container>
    );
}

export default AdminProductDetails;
