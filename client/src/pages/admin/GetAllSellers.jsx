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
        const response = await axiosInstance({
          method : "GET",
          url : "/seller/get-all-sellers"
        });
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
      <div className="container d-flex justify-content-center align-items-center heading-head mt-4">
        <p className={darkMode ? "text-black" : "text-white"}>
          HM.com / <span className='text-danger' style={{ fontWeight: "800" }}>All Sellers</span>
        </p>
      </div>
      <h1 className="text-center mt-4 mb-4" style={{ color: darkMode ? "black" : "white", fontSize: 'x-large', fontWeight: '600' }}>
        All Sellers
      </h1>

      {sellers.length === 0 ? (
        <p className="text-center">Sorry, No sellers found.</p>
      ) : (
        <div className="d-flex flex-column align-items-center w-100">
          {sellers.map((seller) => (
            <div
              className="user-card w-100 p-3 mb-3  d-flex justify-content-between align-items-center"
              key={seller._id}
              style={{ backgroundColor: darkMode ? "white" : "black", color: darkMode ? "#000" : "#fff" }}
            >
              {/* Seller Details on the Left */}
              <div className="user-details">
                <h3>{seller.name}</h3>
                <p>{seller.email}</p>
                <p>{seller.mobile}</p>
              </div>

              {/* Delete Button on the Right */}
              <div className="user-actions d-flex flex-column align-items-end">
                <button className=" w-100" onClick={() => handleModal('delete', seller._id)} style={{border: '1px solid white'}}>
                  Delete
                </button>
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
          <div className="user-actions d-flex gap-2">
            <button className="" onClick={() => setModal({ show: false, action: '', sellerId: '' })}>
              Cancel
            </button>
            <button className="" onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default GetAllSellers;
