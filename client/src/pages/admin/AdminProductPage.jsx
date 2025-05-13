import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Spinner } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AdminProductCard from "../../components/admin/AdminProductCard";
import { axiosInstance } from "../../config/axiosInstance";

function AdminProductPage() {
    const { darkMode } = useSelector((state) => state.mode);
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true); // New loading state

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await axiosInstance.get("/product/get-all-products");
                setProductList(response.data.data);
            } catch (error) {
                console.log(error.response?.data?.message || "Something went wrong!");
            } finally {
                // Simulate loading delay
                setTimeout(() => setLoading(false), 1200);
            }
        };

        fetchAllProducts();
    }, []);

    return (
        <Container>
            <div
                className="container d-flex justify-content-start align-items-start heading-head"
                style={{ marginTop: "120px" }}
            >
                <p
                    className={darkMode ? "text-dark" : "text-white"}
                    style={{ fontSize: "40px", fontWeight: "600" }}
                >
                    ALL PRODUCTS
                </p>
            </div>

            {loading ? (
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ marginTop: "180px" }}>
                    <div className="dot-spinner">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                    <span className={`mt-3 ${darkMode ? "text-black" : "text-white"}`} style={{ letterSpacing: "2px", marginLeft: "12px" }}>Loading...</span>
                </div>
            ) : productList.length > 0 ? (
                <Row>
                    {productList.map((value) => (
                        <Col key={value._id} xs="12" sm="6" md="4" lg="4" xl="3" xxl="3">
                            <AdminProductCard product={value} />
                        </Col>
                    ))}
                </Row>
            ) : (
                <p className="text-center mt-4">No products available.</p>
            )}
        </Container>
    );
}

export default AdminProductPage;
