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
              style={{ fontSize: '2rem', marginBottom: '1rem' }}
            >
              {product?.title}
            </h1>
            <p
              className={darkMode ? 'text-black' : 'text-white'}
              style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}
            >
              {product?.description}
            </p>
            <p
              className={darkMode ? 'text-black' : 'text-white'}
              style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
            >
              Rs.{product?.price}.00
            </p>

            <Link to={`/seller/update-product/${productId}`}>
              <button className="btn btn-warning mt-3">Update Product</button>
            </Link>

            <button
              onClick={() => setShowModal(true)} 
              className="btn btn-danger mt-3 ml-3"
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
        <Modal.Body>
          Are you sure you want to delete this product? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteProduct}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default SellerProductDetails;
