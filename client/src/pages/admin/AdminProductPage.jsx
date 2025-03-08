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
            <div className="container py-2 text-center">
                <p className="lead" style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)' }}>
                </p>
            </div>
            <div>
                <div className="container  d-flex justify-content-center align-items-center heading-head  mt-4">
                    <p className={darkMode ? "text-black" : "text-white"}>HM.com / <span className='text-danger' style={{
                        fontWeight: "800"
                    }}>All Products</span> </p>
                </div>
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
