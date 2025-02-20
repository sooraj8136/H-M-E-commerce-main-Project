import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';
import { useFetch } from '../../hooks/useFetch';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { Modal, Button } from 'react-bootstrap';
import GetReview from '../../components/seller/GetReview';

function SellerProductDetails() {
  const { darkMode } = useSelector((state) => state.mode);
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, error] = useFetch(`/product/get-product/${productId}`);
  const [showModal, setShowModal] = useState(false);

  const handleDeleteProduct = async () => {
    try {
      const response = await axiosInstance.delete(`/product/delete-product/${productId}`);
      toast.success('Product deleted successfully');
      setShowModal(false);
      navigate('/seller/seller-product');
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Failed to delete product');
      setShowModal(false);
    }
  };

  return (
    <Container className="my-5">
      {product ? (
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

            <Link to={`/seller/update-product/${productId}`}>
              <button
                className="bg-black signin-btn"
                style={{ maxWidth: '400px', width: '90%' }}
              >
                Update Product
              </button>
            </Link>

            <button
              onClick={() => setShowModal(true)}
              className="bg-black signin-btn mt-3"
              style={{ maxWidth: '400px', width: '90%' }}
            >
              Delete Product
            </button>
          </Col>
        </Row>
      ) : (
        <p>No product found.</p>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
          Are you sure you want to delete this product?
        </Modal.Body>
        <Modal.Footer>
          <button
            className="bg-black signin-btn"
            style={{ maxWidth: '400px', width: '90%' }}
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="bg-black signin-btn"
            style={{ maxWidth: '400px', width: '90%' }}
            onClick={handleDeleteProduct}
          >
            Confirm Delete
          </button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default SellerProductDetails;
