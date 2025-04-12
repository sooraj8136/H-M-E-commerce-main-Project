import React, { useEffect, useState } from "react";
import AdminBarchart from "../../components/admin/AdminBarchart";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

function AdminDashboard() {
  const { darkMode } = useSelector((state) => state.mode);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '130px' }}>
        <Spinner animation="border" variant={darkMode ? "dark" : "light"} />
        <span className={`ms-3 ${darkMode ? "text-black" : "text-white"}`}>Loading...</span>
      </div>
    );
  }

  return (
    <>
      <div
        className="dashboard container-fluid"
        style={{ display: "flex", flexDirection: "column", padding: "20px" }}
      >
        <div className="w-100 mt-4">
          <AdminBarchart />
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
