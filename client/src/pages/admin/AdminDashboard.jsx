import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner, Card, Row, Col, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminBarchart from "../../components/admin/AdminBarchart";
import { axiosInstance } from "../../config/axiosInstance";

function AdminDashboard() {
  const { darkMode } = useSelector((state) => state.mode);

  const [orders, setOrders] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const ordersRes = await axiosInstance.get("/orders/get-all-orders");
        const sellersRes = await axiosInstance.get("/seller/get-all-sellers");
        const usersRes = await axiosInstance.get("/user/get-all-user");

        setOrders(ordersRes.data);
        setSellers(sellersRes.data);
        setUsers(usersRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" variant={darkMode ? "light" : "dark"} />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column flex-md-row" style={{ minHeight: "100vh", overflowX: "hidden" }}>
      <div
        className="p-3"
        style={{
          width: "100%",
          maxWidth: "250px",
          backgroundColor: "transparent",
          position: "relative",
          zIndex: 1000,
        }}
      >
        <Nav className="flex-column" style={{ marginTop: "100px" }}>
          <Nav.Item>
            <Link to="/admin/admin-dashboard" className={`nav-link ${darkMode ? "text-dark" : "text-light"}`}>
              DASHBOARD
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/admin/get-sellers" className={`nav-link ${darkMode ? "text-dark" : "text-light"}`}>
              MANAGE SELLERS
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/admin/get-all-users" className={`nav-link ${darkMode ? "text-dark" : "text-light"}`}>
              MANAGE USERS
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/admin/admin-products" className={`nav-link ${darkMode ? "text-dark" : "text-light"}`}>
              PRODUCTS
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/admin/get-all-orders" className={`nav-link ${darkMode ? "text-dark" : "text-light"}`}>
              ORDERS
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/admin/pending-requests" className={`nav-link ${darkMode ? "text-dark" : "text-light"}`}>
              PENDING REQUESTS
            </Link>
          </Nav.Item>
        </Nav>
      </div>

      <div className="flex-grow-1 p-4" style={{ backgroundColor: "transparent", borderRadius:"0px" }}>
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className={darkMode ? "text-white" : "text-dark"}>Admin Dashboard</h2>
            <Button variant={darkMode ? "outline-light" : "outline-dark"}>Manage Users</Button>
          </div>

          <Row className="gy-4" style={{marginTop:"50px"}}>
            <Col xs={12} sm={6} md={3}>
              <Card className={darkMode ? "bg-dark text-light" : "bg-light text-dark"} style={{borderRadius:"0px" }}>
                <Card.Body>
                  <h5>Total Sales</h5>
                  <p className="h5">$96,500</p> 
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <Card className={darkMode ? "bg-dark text-light" : "bg-light text-dark"} style={{borderRadius:"0px" }}>
                <Card.Body>
                  <h5>Total Orders</h5>
                  <p className="h5">{orders?.length || 0}</p>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <Card className={darkMode ? "bg-dark text-light" : "bg-light text-dark"} style={{borderRadius:"0px" }}>
                <Card.Body>
                  <h5>Total Sellers</h5>
                  <p className="h5">{sellers?.length || 0}</p>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <Card className={darkMode ? "bg-dark text-light" : "bg-light text-dark"} style={{borderRadius:"0px" }}>
                <Card.Body>
                  <h5>Total Users</h5>
                  <p className="h5">{users?.length || 0}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div className="my-5">
            <AdminBarchart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
