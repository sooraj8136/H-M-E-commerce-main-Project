import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from "react-redux";  

const GetAllSellers = () => {
  const { darkMode } = useSelector((state) => state.mode);
  const [sellers, setSellers] = useState([]);
  const [modal, setModal] = useState({ show: false, action: '', sellerId: '' });

  useEffect(() => {
    const fetchSellers = async () => {
      try {   
        const response = await axiosInstance.get('/seller/get-all-sellers');
        setSellers(response.data);
      } catch (err) {
        toast.error(err?.response?.data?.message || 'Failed to fetch sellers');
      }
    };

    fetchSellers();
  }, []);

  const handleModal = (action, sellerId) => {
    setModal({ show: true, action, sellerId });
  };

  const handleConfirm = async () => {
    try {
      await axiosInstance.delete(`/seller/delete-seller/${modal.sellerId}`);
      setSellers((prev) => prev.filter((seller) => seller._id !== modal.sellerId));
      toast.success('Seller deleted successfully');
    } catch (err) {
      toast.error('Failed to delete seller');
    } finally {
      setModal({ show: false, action: '', sellerId: '' });
    }
  };

  return (
    <Container className="my-5">
      <div className="container  d-flex justify-content-center align-items-center heading-head  mt-4">
        <p className={darkMode ? "text-black" : "text-white"}>HM.com / <span className='text-danger' style={{
          fontWeight: "800"
        }}>All Sellers</span> </p>
      </div>
      <h1 className="text-center mt-4 mb-4" style={{ color: darkMode ? "black" : "white", fontSize: 'x-large', fontWeight: '600' }}>
        All Sellers
      </h1>
      {sellers.length === 0 ? (
        <p>Sorry, No sellers found.</p>
      ) : (
        <div className="user-cards">
          {sellers.map((seller) => (
            <div className="user-card" key={seller._id}>
              <div className="user-card-content">
                <h3>{seller.name}</h3>
                <p>{seller.email}</p>
                <p>{seller.mobile}</p>
                <div className="user-actions d-flex justify-content-center">
                  <button onClick={() => handleModal('delete', seller._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal show={modal.show} onHide={() => setModal({ show: false, action: '', sellerId: '' })}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm {modal.action.charAt(0).toUpperCase() + modal.action.slice(1)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to {modal.action} this seller?
        </Modal.Body>
        <Modal.Footer>
          <div className="user-actions confirm-btn">
            <button onClick={() => setModal({ show: false, action: '', sellerId: '' })}>
              Cancel
            </button>
            <button onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default GetAllSellers;
