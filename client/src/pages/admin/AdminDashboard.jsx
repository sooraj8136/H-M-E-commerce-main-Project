import React from "react";
import AdminBarhart from "../../components/admin/AdminBarchart";
import { useSelector } from "react-redux";

function AdminDashboard() {
  const { darkMode } = useSelector((state) => state.mode);
  return (
    <>

      <div className="dashboard" style={{ display: "flex" }}>
        <div style={{ flex: 1, padding: "20px" }}>
          <div className="container  d-flex justify-content-center align-items-center heading-head  mt-4">
            <p className={darkMode ? "text-black" : "text-white"}>HM.com / <span className='text-danger' style={{
              fontWeight: "800"
            }}>Admin Dashboard</span> </p>
          </div>
          <AdminBarhart />
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
