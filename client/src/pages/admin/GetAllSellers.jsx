import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const GetAllSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axiosInstance.get('/seller/get-all-sellers');
        setSellers(response.data);
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to fetch sellers');
        toast.error(err?.response?.data?.message || 'Failed to fetch sellers');
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">All Sellers</h1>
      {loading ? (
        <p>Loading sellers...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : sellers.length === 0 ? (
        <p>Sorry, No sellers found.</p>
      ) : (
        <Row>
          {sellers.map((seller) => (
            <Col key={seller._id} xs="12" md="6" lg="4" className="mb-4">
              <div className="card shadow-x-sm">
                <div className="card-body">
                  <img
                    src={seller.profilePic}
                    alt={`${seller.name}'s profile`}
                    className="card-img-top mb-3 rounded-circle"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                  <h5 className="card-title">{seller.name}</h5>
                  <p className="card-text"><strong>Email:</strong> {seller.email}</p>
                  <p className="card-text"><strong>Mobile:</strong> {seller.mobile}</p>
                  <p className="card-text"><strong>Store Name:</strong> {seller.storeName}</p>
                  <p className="card-text"><strong>Address:</strong> {seller.address}</p>
                  <p className="card-text"><strong>Role:</strong> {seller.role}</p>
                  <p className="card-text">
                    <strong>Status:</strong> 
                    {seller.isActive ? (
                      <span className="text-success"> Active</span>
                    ) : (
                      <span className="text-danger"> Inactive</span>
                    )}
                  </p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default GetAllSellers;
