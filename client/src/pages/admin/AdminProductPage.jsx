import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AdminProductCard from "../../components/admin/AdminProductCard";
import { axiosInstance } from "../../config/axiosInstance";

function AdminProductPage() {
    const { darkMode } = useSelector((state) => state.mode);
    const [productList, setProductList] = useState([]); // Initialize as empty array

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await axiosInstance({
                    method: "GET",
                    url: "/product/get-all-products",
                });
                setProductList(response.data.data); // Set the fetched products
            } catch (error) {
                console.log(error.response?.data?.message || "Something went wrong!");
            }
        };
        fetchAllProducts();
    }, []);

    return (
        <Container>
            <div
                className="container d-flex justify-content-start align-items-start heading-head"
                style={{ marginTop: "120px" }}>
                <p className={darkMode ? "text-dark" : "text-white"} style={{ fontSize: "40px", fontWeight: "600" }}>
                    ALL PRODUCTS
                </p>
            </div>
            <Row>
                {productList.length > 0 ? (
                    productList.map((value) => (
                        <Col key={value._id} xs="12" sm="6" md="4" lg="4" xl="3" xxl="3">
                            <AdminProductCard product={value} />
                        </Col>
                    ))
                ) : (
                    <p className="text-center mt-4">No products available.</p>
                )}
            </Row>
        </Container>
    );
}

export default AdminProductPage;
