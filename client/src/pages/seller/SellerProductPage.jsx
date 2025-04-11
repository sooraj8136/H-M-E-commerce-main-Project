import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import SellerProductCard from '../../components/seller/SellerProductCard';
import { axiosInstance } from '../../config/axiosInstance';

function ProductPage() {
    const { darkMode } = useSelector((state) => state.mode);
    const [productList, setProductList] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get("/product/get-seller-products");
                setProductList(response.data.data.products || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <Container>
            <div
                className="container d-flex justify-content-start align-items-start heading-head"
                style={{ marginTop: "140px" }}>
                <p style={{ fontWeight: "400", fontSize: "0.9rem", color: "#a0a0a0" }}>
                    HM.COM / <span className={darkMode ? "text-black" : "text-white"} style={{ fontWeight: "600", fontSize: "0.9rem", color: "black" }}>YOUR PRODUCTS</span>
                </p>
            </div>
            <div className="container py-5 text-center">
                <div className={darkMode ? "text-black" : "text-white"} >
                    <div
                        className="container d-flex justify-content-start align-items-start heading-head">
                        <p style={{ fontSize: "20px", fontWeight: "600" }}>
                            YOU CAN MANAGE YOUR PRODUCTS
                        </p>
                    </div>
                </div>
            </div>
            {loading ? (
                <p className="text-center">Loading products...</p>
            ) : error ? (
                <p className="text-danger text-center">Error: {error}</p>
            ) : productList.length > 0 ? (
                <Row>
                    {productList.map((value) => (
                        <Col key={value._id} xs="12" sm="6" md="4" lg="4" xl="3" xxl="3">
                            <SellerProductCard product={value} />
                        </Col>
                    ))}
                </Row>
            ) : (
                <p className="text-center">No products found.</p>
            )}
        </Container>
    );
}

export default ProductPage;
