import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import SellerProductCard from '../../components/seller/SellerProductCard';
import { axiosInstance } from '../../config/axiosInstance';
import { Spinner } from 'react-bootstrap';

function ProductPage() {
    const { darkMode } = useSelector((state) => state.mode);
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setTimeout(async () => {
                try {
                    const response = await axiosInstance.get("/product/get-seller-products");
                    setProductList(response.data.data.products || []);
                } catch (err) {
                    console.error("Error fetching products:", err.message);
                } finally {
                    setLoading(false);
                }
            }, 1200); // ⏱️ 1.2 second delay
        };

        fetchProducts();
    }, []);

    return (
        <Container>
            <div
              className="container d-flex justify-content-start align-items-start heading-head"
              style={{ marginTop: "100px" }}>
              <p className={darkMode ? "text-black" : "text-white"} style={{ fontWeight: "400", fontSize: "0.9rem", color: "#a0a0a0" }}>
                SM.COM / <span style={{ fontWeight: "600", fontSize: "0.9rem", color: "red" }}>YOUR PRODUCTS</span>
              </p>
            </div>

            <div className="container py-5 text-center">
                <div className={darkMode ? "text-black" : "text-white"}>
                    <div className="container d-flex justify-content-start align-items-start heading-head">
                        <p style={{ fontSize: "20px", fontWeight: "600" }}>
                            YOU CAN MANAGE YOUR PRODUCTS
                        </p>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100px' }}>
                    <Spinner animation="border" variant={darkMode ? "dark" : "light"} />
                    <span className={`ms-3 ${darkMode ? "text-black" : "text-white"}`}>Loading...</span>
                </div>
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
