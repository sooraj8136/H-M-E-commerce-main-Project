import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from "react-redux";
import { Spinner } from 'react-bootstrap';

const GetAllSellers = () => {
  const { darkMode } = useSelector((state) => state.mode);
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ show: false, action: '', sellerId: '' });

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axiosInstance.get("/seller/get-all-sellers");
        setTimeout(() => {
          setSellers(response.data);
          setLoading(false);
        }, 1500);
      } catch (err) {
        toast.error(err?.response?.data?.message || 'Failed to fetch sellers');
        setLoading(false);
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
      <div
        className="container d-flex justify-content-start align-items-start heading-head"
        style={{ marginTop: "140px" }}
      >
        <p className={darkMode ? "text-dark" : "text-white"} style={{ fontSize: "40px", fontWeight: "600" }}>
          ALL SELLERS
        </p>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ marginTop: "140px" }}>
          <Spinner animation="border" variant={darkMode ? "dark" : "light"} />
          <span className={`ms-3 ${darkMode ? "text-black" : "text-white"}`}>Loading...</span>
        </div>
      ) : sellers.length === 0 ? (
        <p className="text-center">SORRY, NO SELLER FOUND.</p>
      ) : (
        <div className="d-flex flex-column align-items-center w-100">
          {sellers.map((seller) => (
            <div
              className="user-card w-100 p-3 mb-3 d-flex justify-content-between align-items-center"
              key={seller._id}
              style={{ backgroundColor: darkMode ? "white" : "black", color: darkMode ? "#000" : "#fff" }}
            >
              <div className="user-details">
                <h3>{seller.name}</h3>
                <p>{seller.email}</p>
                <p>{seller.mobile}</p>
                <p>{seller.storeName}</p>
                <p>{seller.address}</p>
                <p>{seller.role}</p>
              </div>
              <div className="user-actions d-flex flex-column align-items-end">
                <button className="w-100" onClick={() => handleModal('delete', seller._id)} style={{ border: '1px solid white' }}>
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal show={modal.show} onHide={() => setModal({ show: false, action: '', sellerId: '' })}>
        <Modal.Header closeButton>
          <Modal.Title> {modal.action.charAt(0).toUpperCase() + modal.action.slice(1)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to {modal.action} this seller?
        </Modal.Body>
        <Modal.Footer>
          <div className="user-actions d-flex gap-2">
            <button onClick={() => setModal({ show: false, action: '', sellerId: '' })}>
              CANCEL
            </button>
            <button onClick={handleConfirm}>
              CONFIRM
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default GetAllSellers;
