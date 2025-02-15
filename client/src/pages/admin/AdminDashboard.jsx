import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import AdminBarhart from "../../components/admin/AdminBarchart";

function AdminDashboard() {
  return (
    <div className="dashboard" style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        <h2 className="text-center">Admin Dashboard</h2>
        <AdminBarhart />
      </div>
    </div>
  );
}

export default AdminDashboard;
