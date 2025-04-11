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
                <div className="d-flex justify-content-center align-items-center" style={{ marginTop: "80px" }}>
                    <Spinner animation="border" variant={darkMode ? "dark" : "light"} />
                    <span className={`ms-3 ${darkMode ? "text-black" : "text-white"}`}>Loading products...</span>
                </div>
            ) : (
                <>
                    <Container>
                        <div
                            className="container d-flex justify-content-start align-items-start heading-head"
                            style={{ marginTop: "140px" }}>
                            <p style={{ fontWeight: "400", fontSize: "0.9rem", color: "#a0a0a0" }}>
                                HM.COM / <span className={darkMode ? "text-black" : "text-white"} style={{ fontWeight: "600", fontSize: "0.9rem", color: "black" }}>PRODUCTS</span>
                            </p>
                        </div>
                    </Container>
                    <Container>
                        <Row>
                            {productList?.map((value) => (
                                <Col key={value._id} xs={12} sm={6} md={6} lg={4} xl={3} xxl={3}>
                                    <ProductCards product={value} />
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </>
            )}
        </>
    );
}

export default ProductPage;
