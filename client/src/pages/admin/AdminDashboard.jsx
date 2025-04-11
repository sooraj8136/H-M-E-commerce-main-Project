import React from "react";
import AdminBarchart from "../../components/admin/AdminBarchart";
import { useSelector } from "react-redux";

function AdminDashboard() {
  const { darkMode } = useSelector((state) => state.mode);

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
