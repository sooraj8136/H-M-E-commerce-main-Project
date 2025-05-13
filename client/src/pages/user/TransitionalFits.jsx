import React, { useEffect, useState } from 'react';
import { Col, Container, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import CategoryCard from '../../components/user/CategoryCard';
import { axiosInstance } from '../../config/axiosInstance';
import { Link } from 'react-router-dom';
import { BiSolidLeftArrow } from 'react-icons/bi';

function TransitionalFits() {

    const { darkMode } = useSelector((state) => state.mode);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get('/product/Transitional-fits');
                setTimeout(() => {
                    setLoading(false)
                    setProducts(response.data?.data || []);
                })
            } catch (err) {
                console.error("Error fetching products:", err);
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
                                        / TRANSITIONAL FITS
                                    </span>
                                </p>
                            </div>

                            <div className="text-center py-4 position-relative">
                                <img
                                    src="https://image.hm.com/content/dam/global_campaigns/season_01/men/ms11e7/scroll/MS11E7-season-start-3x2-CPD-LP1-top.jpg?imwidth=1150"
                                    alt="Activewear"
                                    style={{ maxWidth: '100%', height: 'auto' }}
                                />
                                <Link to="/productDetails/67b408b99ee20c9e01b9bda8" className="position-absolute" style={{ top: '65%', left: '72%', transform: 'translate(-50%, -50%)', textDecoration: 'none' }}>
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
                                        <BiSolidLeftArrow style={{ marginRight: '10px', color: 'black', marginLeft: '-28px' }} />
                                        <div style={{ color: 'white', fontSize: 'x-small', fontWeight: '600', textAlign: 'left' }}>
                                            Rs.2,699.00
                                            <br />
                                        </div>
                                    </button>
                                </Link>
                            </div>

                            <div className={darkMode ? "text-black" : "text-white "}>
                                <h1 style={{ fontSize: '4vw', textAlign: 'left', lineHeight: '1.2', marginLeft: '8px' }}>
                                    Casual silhouettes with crisp textures for the transitional season.
                                </h1>
                            </div>

                            <div className="text-center py-4 position-relative">
                                <img
                                    src="https://image.hm.com/content/dam/global_campaigns/season_01/men/ms11e7/scroll/MS11E7-season-start-3x2-CPD-LP2.jpg?imwidth=1920"
                                    alt="Activewear"
                                    style={{ maxWidth: '100%', height: 'auto' }}
                                />
                                <Link to="/productDetails/67b40b569ee20c9e01b9be0f" className="position-absolute" style={{ top: '65%', left: '68%', transform: 'translate(-50%, -50%)', textDecoration: 'none' }}>
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
                                        <BiSolidLeftArrow style={{ marginRight: '10px', color: 'white', marginLeft: '-26px', color: 'black' }} />
                                        <div style={{ color: 'white', fontSize: 'x-small', fontWeight: '600', textAlign: 'left' }}>
                                            Rs.2,699.00
                                        </div>
                                    </button>
                                </Link>
                            </div>
                            <div className="text-center py-4 position-relative">
                                <img
                                    src="https://image.hm.com/content/dam/global_campaigns/season_01/men/ms11e7/scroll/MS11E7-season-start-3x2-CPD-LP3.jpg?imwidth=1920"
                                    alt="Activewear"
                                    style={{ maxWidth: '100%', height: 'auto' }}
                                />
                                <Link to="/productDetails/67b407ec9ee20c9e01b9bd5e" className="position-absolute" style={{ top: '65%', left: '68%', transform: 'translate(-50%, -50%)', textDecoration: 'none' }}>
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
                                        <BiSolidLeftArrow style={{ marginRight: '10px', color: 'white', marginLeft: '-26px', color: 'black' }} />
                                        <div style={{ color: 'white', fontSize: 'x-small', fontWeight: '600', textAlign: 'left' }}>
                                            Rs.1,499.00
                                            <br />
                                        </div>
                                    </button>
                                </Link>
                            </div>
                            <div className={darkMode ? "text-black" : "text-white "}>
                                <h1 style={{ fontSize: '4vw', textAlign: 'left', lineHeight: '1.2', marginLeft: '8px' }}>
                                    Effortless urban look. A boxy button-down shirt paired with creased chinos.
                                </h1>
                            </div>
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
                        <div className="text-center py-4 position-relative">
                            <img
                                src="https://image.hm.com/content/dam/global_campaigns/season_01/men/ms11e7/scroll/MS11E7-season-start-3x2-CPD-LP4.jpg?imwidth=2560"
                                alt="Activewear"
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                            <Link to="/productDetails/67b409e99ee20c9e01b9bde3" className="position-absolute" style={{ top: '65%', left: '63%', transform: 'translate(-50%, -50%)', textDecoration: 'none' }}>
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
                                    <BiSolidLeftArrow style={{ marginRight: '10px', color: 'white', marginLeft: '-26px' }} />
                                    <div style={{ color: 'white', fontSize: 'x-small', fontWeight: '600', textAlign: 'left' }}>
                                        Rs.1,999.00
                                        <br />
                                    </div>
                                </button>
                            </Link>
                        </div>
                        <div className={darkMode ? "text-black" : "text-white "}>
                            <h1 style={{ fontSize: '4vw', textAlign: 'left', lineHeight: '1.2', marginLeft: '8px' }}>
                                Versatile pieces in light colourways, styled with sporty accents.
                            </h1>
                        </div>
                        <div className="text-center py-4 position-relative">
                            <img
                                src="https://image.hm.com/content/dam/global_campaigns/season_01/men/ms11e7/scroll/MS11E7-season-start-3x2-CPD-LP5.jpg?imwidth=2560"
                                alt="Activewear"
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                            <Link to="/productDetails/67b40ad29ee20c9e01b9be09" className="position-absolute" style={{ top: '65%', left: '68%', transform: 'translate(-50%, -50%)', textDecoration: 'none' }}>
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
                                    <BiSolidLeftArrow style={{ marginRight: '10px', color: 'white', marginLeft: '-26px', color: 'black' }} />
                                    <div style={{ color: 'white', fontSize: 'x-small', fontWeight: '600', textAlign: 'left' }}>
                                        Rs.5,499.00
                                        <br />
                                    </div>
                                </button>
                            </Link>
                        </div>
                        <div className={darkMode ? "text-black" : "text-white "}>
                            <h1 style={{ fontSize: '4vw', textAlign: 'left', lineHeight: '1.2', marginLeft: '8px' }}>
                                Twill jackets and car coats, essentials for the transitional season.
                            </h1>
                        </div>
                    </Container>
                </>
            )}
        </>
    )
}

export default TransitionalFits