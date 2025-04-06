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
        <div className="container d-flex justify-content-center align-items-center heading-head mt-4 text-center">
          <p className={darkMode ? "text-black" : "text-white"}>
            HM.com /{" "}
            <span
              className="text-danger"
              style={{
                fontWeight: "800",
              }}
            >
              Admin Dashboard
            </span>
          </p>
        </div>

        <div className="w-100 mt-4">
          <AdminBarchart />
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
