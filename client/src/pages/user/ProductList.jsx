import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import CategoryCard from '../../components/user/CategoryCard';

function ProductList() {
    const { darkMode } = useSelector((state) => state.mode);
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProduct = async () => {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: `/product/${category}`
            });
            console.log("ProductsList ---- ", response);
            setTimeout(() => {
                setProducts(response?.data?.data);
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [category]);

    return (
        <Container className="my-5">
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ marginTop: "180px" }} >
                    <Spinner animation="border" variant={darkMode ? "dark" : "light"} />
                    <span className={`ms-3 ${darkMode ? "text-black" : "text-white"}`}>Loading products...</span>
                </div>
            ) : (
                <Row>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <Col key={product._id} xs="12" sm="6" md="4" lg="4" xl="3" xxl="3">
                                <CategoryCard product={product} />
                            </Col>
                        ))
                    ) : (
                        <div className='text-center'>
                            <p className={darkMode ? "text-black" : "text-white"} style={{ fontWeight: "600" }}>No product found.</p>
                        </div>
                    )}
                </Row>
            )}
        </Container>
    );
}

export default ProductList;
