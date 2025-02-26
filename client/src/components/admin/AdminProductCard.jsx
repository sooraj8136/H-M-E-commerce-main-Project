import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function AdminProductCard({ product }) {
    const { darkMode } = useSelector((state) => state.mode);

    return (
        <Container className="d-flex flex-wrap justify-content-center">
            <div className="text-center position-relative mx-1 text-start" style={{ maxWidth: '100%' }}>
                <Link to={`/admin/admin-product-details/${product?._id}`} className="text-decoration-none">
                    <img
                        src={product?.image}
                        alt={product?.title}
                        style={{
                            objectFit: 'cover',
                            marginBottom: '6px',
                            maxWidth: '1024px',
                            width: '100%',
                            height: 'auto',
                        }}
                        className="img-fluid"
                    />
                    <div className="d-flex flex-column align-items-start">
                        <h3
                            className={darkMode ? 'text-black' : 'text-white'}
                            style={{ fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem' }}
                        >
                            {product?.title}
                        </h3>
                        <p className={darkMode ? 'text-black' : 'text-white'} style={{ fontSize: '0.8rem', fontWeight: '500' }}>
                            Rs. {product?.price}.00
                        </p>
                    </div>
                </Link>
            </div>
        </Container>
    );
}

export default AdminProductCard;
