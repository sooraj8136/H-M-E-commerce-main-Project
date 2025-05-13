import React, { useEffect, useState } from 'react';
import ProductCards from '../../components/user/Cards';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import { axiosInstance } from '../../config/axiosInstance';
import { Spinner } from 'react-bootstrap';

function ProductPage() {

    const { darkMode } = useSelector((state) => state.mode);
    console.log(darkMode);

    const [productList, setProductList] = useState();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance({
                    method: "GET",
                    url: "/product/get-all-products"
                })
                setTimeout(() => {
                    setProductList(response?.data?.data || []);
                    setLoading(false)
                })
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        }
        fetchProducts()
    }, [])

    return (
        <>
            {loading ? (
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ marginTop: "180px" }}>
                    <div className="dot-spinner">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                    <span className={`mt-3 ${darkMode ? "text-black" : "text-white"}`} style={{ letterSpacing: "2px",marginLeft:"12px" }}>Loading...</span>
                </div>
            ) : (
                <>
                    <Container>
                        <div
                            className="container d-flex justify-content-start align-items-start heading-head"
                            style={{ marginTop: "140px" }}>
                            <p className={darkMode ? "text-black" : "text-white"} style={{ fontWeight: "400", fontSize: "0.9rem", color: "#a0a0a0" }}>
                                SM.COM / <span style={{ fontWeight: "600", fontSize: "0.9rem", color: "red" }}>PRODUCTS</span>
                            </p>
                        </div>
                    </Container>
                    <Row>
                        {productList?.map((value) => (
                            <Col key={value._id} xs="12" sm="6" md="4" lg="4" xl="3" xxl="3">
                                <ProductCards product={value} />
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </>
    );
}

export default ProductPage;
