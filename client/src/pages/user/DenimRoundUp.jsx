import React, { useEffect, useState } from 'react';
import { Col, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import CategoryCard from '../../components/user/CategoryCard';
import { axiosInstance } from '../../config/axiosInstance';
import { Link } from 'react-router-dom';
import { BiSolidLeftArrow } from 'react-icons/bi';

function DenimRoundUp() {

    const { darkMode } = useSelector((state) => state.mode);

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get('/product/Denim');
                setProducts(response.data?.data || []);
            } catch (err) {
                setError('Failed to fetch products');
            }
        };

        fetchProducts();
    }, []);

    return (
        <Container className="d-flex flex-wrap justify-content-center">
            <div className="text-center position-relative mx-1">
                <div style={{ fontWeight: '600' }}>
                    <div className="container d-flex justify-content-center align-items-center heading-head">
                        <p className={darkMode ? "text-black" : "text-white "}>
                            HM.com / Men / <span className="text-danger" style={{ fontWeight: "700" }}>THE DENIM ROUNDUP</span>
                        </p>
                    </div>
                </div>

                <div className="text-center py-4 position-relative">
                    <img
                        src="https://image.hm.com/content/dam/global_campaigns/season_01/men/ms11e3/MS11E3-Denimroundup-CPD-top.jpg?imwidth=1920"
                        alt="Denim"
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                    <Link to="/productDetails/67b3f8e3a2982ea0bd9d7258" className="position-absolute" style={{ top: '65%', left: '68%', transform: 'translate(-50%, -50%)', textDecoration: 'none' }}>
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
                            <BiSolidLeftArrow style={{ marginRight: '10px', color: 'white', marginLeft: '-32px', color: 'black' }} />
                            <div style={{ color: 'white', fontSize: 'small', fontWeight: '700', textAlign: 'left' }}>
                                Rs.1,499.00
                                <br />
                                <div></div>
                                Baggy Jeans
                            </div>
                        </button>
                    </Link>
                </div>

                <div className={darkMode ? "text-black" : "text-white"}>
                    <p style={{ fontSize: '1rem', fontWeight: '600', textAlign: 'left', marginTop: '20px', marginLeft: '8px' }}> Baggy </p>
                    <h1 className="alata-regular" style={{ fontSize: '4vw', textAlign: 'left', lineHeight: '1.2', marginLeft: '8px' }}>
                        The Baggy jeans have a relaxed wide-leg fit, dropped crotch, and a mid-rise waist.
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
                <img
                    src="https://image.hm.com/content/dam/global_campaigns/season_01/men/ms11e6/ns/MS11E6-Denimroundup-CPD-2-v3.jpg?imwidth=1920"
                    alt="Denim"
                    style={{ maxWidth: '100%', height: 'auto' }}
                />
                <div className={darkMode ? "text-black" : "text-white "}>
                    <p style={{ fontSize: '1rem', fontWeight: '600', textAlign: 'left', marginTop: '20px', marginLeft: '8px' }}>Loose</p>
                    <h1 className="alata-regular" style={{ fontSize: '4vw', textAlign: 'left', lineHeight: '1.2', marginLeft: '8px' }}>
                        The Loose jeans have an easy fit through the thigh and knee, a mid-rise waist, and either a tapered or straight leg.
                    </h1>
                </div>
                <div className="text-center py-4 position-relative">
                    <img
                        src="https://image.hm.com/content/dam/global_campaigns/season_01/men/ms11e3/edit-w4/MS11E3-CPD-3-Edit-w4-v2.jpg?imwidth=1920"
                        alt="Denim"
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                    <Link to="/productDetails/67b3fceea2982ea0bd9d74fc" className="position-absolute" style={{ top: '65%', left: '65%', transform: 'translate(-50%, -50%)', textDecoration: 'none' }}>
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
                            <BiSolidLeftArrow style={{ marginRight: '10px', color: 'white', marginLeft: '-32px', color: 'black' }} />
                            <div style={{ color: 'white', fontSize: 'small', fontWeight: '700', textAlign: 'left' }}>
                                Rs.2,299.00
                                <br />
                                <div></div>
                                Regular Jeans
                            </div>
                        </button>
                    </Link>
                </div>
                <div className={darkMode ? "text-black" : "text-white "}>
                    <p style={{ fontSize: '1rem', fontWeight: '600', textAlign: 'left', marginTop: '20px', marginLeft: '8px' }}>Straight Regular</p>
                    <h1 className="alata-regular" style={{ fontSize: '4vw', textAlign: 'left', lineHeight: '1.2', marginLeft: '8px' }}>
                        The Straight Regular jeans have a straight fit from waist to hem, a mid-rise waist, and slight stretch for added comfort.
                    </h1>
                </div>
            </div>
        </Container>
    )
}

export default DenimRoundUp