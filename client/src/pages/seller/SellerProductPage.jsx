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
            <div className="container py-5 text-center">
                <h2 className="display-4 fw-bold" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)' }}>
                    Manage Your Products
                </h2>
                <p className="lead" style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)' }}>
                    View, add, update, and delete your products with ease. Manage your inventory with just a few clicks! Keep your store updated and your customers happy.
                </p>
            </div>
            <div className="container d-flex justify-content-center align-items-center">
                <p className={darkMode ? "text-black" : "text-white"}>
                    H&M / <span className='text-danger fw-bold'>All products</span>
                </p>
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
