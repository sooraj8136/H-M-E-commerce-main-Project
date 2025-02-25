import React from 'react'
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';
import { useFetch } from '../../hooks/useFetch';
import GetReview from '../../components/seller/GetReview';

function AdminProductDetails() {
    const { darkMode } = useSelector((state) => state.mode);
    const { productId } = useParams();
    const [product, error] = useFetch(`/product/get-product/${productId}`);
  
    return (
      <Container className="my-5">
        {error ? (
          <p >Loading product details...</p>
        ) : product ? (
          <Row className="d-flex justify-content-center align-items-center">
          <Col xs="12" md="6">
            <img
              src={product?.image}
              alt={product?.title}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs="12" md="6" className="text-center text-md-start">
            <h1
              className={darkMode ? 'text-black' : 'text-white'}
              style={{ fontSize: '1.5rem', marginBottom: '1rem' }}
            >
              {product?.title}
            </h1>
            <p
              className={darkMode ? 'text-black' : 'text-white'}
              style={{ fontSize: '1.2rem', fontWeight: '600' }}
            >
              Rs.{product?.price}.00
            </p>
            <p
              className={darkMode ? 'text-black' : 'text-white'}
              style={{ fontSize: '0.9rem', fontWeight: '500' }}
            >
              <strong style={{fontWeight: 'bold'}}>Stock  :</strong> {product?.stock}
            </p>
            <p
              className={darkMode ? 'text-black' : 'text-white'}
              style={{ fontSize: '1rem', marginBottom: '1.5rem' }}
            >
              <strong style={{fontWeight: 'bold'}}>Description : </strong>{product?.description}
            </p>
            <p
              className={darkMode ? 'text-black' : 'text-white'}
              style={{ fontSize: '1rem', marginBottom: '1.5rem' }}
            >
              <strong style={{fontWeight: 'bold'}}> Category : </strong>{product?.category}
            </p>
            <p
              className={darkMode ? 'text-black' : 'text-white'}
              style={{ fontSize: '1rem', marginBottom: '1.5rem' }}
            >
              <strong style={{fontWeight: 'bold'}}>Careguid : </strong>{product?.careguid}
            </p>
            <p
              className={darkMode ? 'text-black' : 'text-white'}
              style={{ fontSize: '1rem', marginBottom: '1.5rem' }}
            >
             <strong style={{fontWeight: 'bold'}}> Materials :</strong>{product?.materials}
            </p>
            <GetReview />
          </Col>
        </Row>
        ) : (
          <p className="text-danger">Failed to fetch product details.</p>
        )}
      </Container>
    );
}

export default AdminProductDetails