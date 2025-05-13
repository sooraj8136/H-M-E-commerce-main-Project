import React, { useEffect, useState } from 'react';
import { Col, Container, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import CategoryCard from '../../components/user/CategoryCard';
import { axiosInstance } from '../../config/axiosInstance';
import { Link } from 'react-router-dom';
import { BiSolidLeftArrow } from 'react-icons/bi';

function DenimRoundUp() {

    const { darkMode } = useSelector((state) => state.mode);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance({
                    method: "GET",
                    url: "/product/Denim"
                });
                setTimeout(() => {
                    setLoading(false)
                    setProducts(response.data?.data || []);
                })
            } catch (err) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            {loading ? (
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ marginTop: "180px" }}>
                    <div className="dot-spinner">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                    <span className={`mt-3 ${darkMode ? "text-black" : "text-white"}`} style={{ letterSpacing: "2px", marginLeft: "12px" }}>Loading...</span>
                </div>
            ) : (
                <>
                    <Container className="d-flex flex-wrap justify-content-center">
                        <div className="text-center position-relative mx-1">
                            <div
                                className="container d-flex justify-content-start align-items-start heading-head"
                                style={{ marginTop: "140px" }}>
                                <p className={darkMode ? "text-black" : "text-white"} style={{ fontWeight: "400", fontSize: "0.9rem", color: "#a0a0a0" }}>
                                    SM.COM /
                                    <span style={{ fontWeight: "600", fontSize: "0.9rem", color: "red", marginLeft: "4px" }}>
                                        MEN
                                    </span>
                                    <span style={{ fontWeight: "600", fontSize: "0.9rem", color: "red", marginLeft: "6px" }}>
                                        / THE DENIM ROUNDUP
                                    </span>
                                </p>
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
                                            <div>
                                                Baggy Jeans
                                            </div>
                                        </div>
                                    </button>
                                </Link>
                            </div>

                            <div className={darkMode ? "text-black" : "text-white"}>
                                <p className={`text ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: '1rem', fontWeight: '600', textAlign: 'left', marginTop: '20px', marginLeft: '8px' }}> Baggy </p>

                                <h1 className="text" style={{ fontSize: '4vw', textAlign: 'left', lineHeight: '1.2', marginLeft: '8px' }}>
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
                                <p className={`text ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: '1rem', fontWeight: '600', textAlign: 'left', marginTop: '20px', marginLeft: '8px' }}>Loose</p>

                                <h1 className="text" style={{ fontSize: '4vw', textAlign: 'left', lineHeight: '1.2', marginLeft: '8px' }}>
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
                                <p className={`text ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: '1rem', fontWeight: '600', textAlign: 'left', marginTop: '20px', marginLeft: '8px' }}>Straight Regular</p>

                                <h1 className="text" style={{ fontSize: '4vw', textAlign: 'left', lineHeight: '1.2', marginLeft: '8px' }}>
                                    The Straight Regular jeans have a straight fit from waist to hem, a mid-rise waist, and slight stretch for added comfort.
                                </h1>
                            </div>
                        </div>
                    </Container>
                </>
            )}
        </>
    )
}

export default DenimRoundUp