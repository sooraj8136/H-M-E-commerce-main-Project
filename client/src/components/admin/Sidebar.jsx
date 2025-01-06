import React from "react";

const Sidebar = () => {
  return (
    <div className="d-flex flex-column  vh-100 p-3 ">
      <h4 className="mb-4">Admin Dashboard</h4>
      <div className="d-flex flex-column">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a href="/admin/get-all-users" className="nav-link">
              <i className="bi bi-person-circle me-2"></i>Users
            </a>
          </li>
          <li className="nav-item">
            <a href="#sellers" className="nav-link">
              <i className="bi bi-shop-window me-2"></i>Sellers
            </a>
          </li>
          <li className="nav-item">
            <a href="#products" className="nav-link">
              <i className="bi bi-box-seam me-2"></i>Products
            </a>
          </li>
          <li className="nav-item">
            <a href="#orders" className="nav-link">
              <i className="bi bi-cart-check me-2"></i>Orders
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;