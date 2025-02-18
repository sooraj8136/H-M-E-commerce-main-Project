import React, { useEffect, useState } from 'react';
import { Col, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import CategoryCard from '../../components/user/CategoryCard';
import { axiosInstance } from '../../config/axiosInstance';
import { Link } from 'react-router-dom';
import { BiSolidLeftArrow } from 'react-icons/bi'; // Import the left arrow icon


function ActiveWear() {
    const { darkMode } = useSelector((state) => state.mode);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get('/product/Activewear-by-Move');
                setProducts(response.data?.data || []);
            } catch (err) {
                setError('Failed to fetch products');
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            <Container className="d-flex flex-wrap justify-content-center">
                <div className="text-center position-relative mx-1">
                    <div style={{ fontWeight: '600' }}>
                        <div className="container d-flex justify-content-center align-items-center heading-head">
                            <p className={darkMode ? "text-black" : "text-white "}>
                                HM.com / Ladies / <span className="text-danger" style={{ fontWeight: "700" }}>Campaigns Activewear SoftMove™</span>
                            </p>
                        </div>
                    </div>

                    <div className="text-center py-4 position-relative">
                        <img
                            src="https://image.hm.com/content/dam/global_campaigns/season_01/move/6021a/6021A-3x2-1.jpg?imwidth=1536"
                            alt="Activewear"
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                        <Link to="/productDetails/67b3965d74d47ef393393e7f" className="position-absolute" style={{ top: '65%', left: '68%', transform: 'translate(-50%, -50%)', textDecoration: 'none' }}>
                            <button
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: 'rgb(0, 0, 0)',
                                    fontSize: '16px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <BiSolidLeftArrow style={{ marginRight: '10px', color: 'white', marginLeft: '-32px', color:'black' }} /> 
                                <div style={{ color: 'white', fontSize: 'small', fontWeight: '700', textAlign: 'left' }}>
                                    Rs.1,499.00
                                    <br/>
                                    <div></div>
                                    Light Support Sport...
                                </div>
                            </button>
                        </Link>
                    </div>

                    <div className={darkMode ? "text-black" : "text-white "}>
                        <h1 className="alata-regular" style={{ fontSize: '60px', textAlign: 'left', marginTop: '40px', marginBottom: '40px' }}>
                            Embrace the flow Activewear featuring SoftMove™
                        </h1>
                    </div>

                    <div className="mt-4">
                        <div className="d-flex flex-wrap justify-content-center">
                            {products.map(product => (
                                <Col key={product._id} xs={12} sm={6} md={6} lg={4} xl={3} xxl={3} className='mt-4'>
                                    <CategoryCard key={product._id} product={product} />
                                </Col>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default ActiveWear;
