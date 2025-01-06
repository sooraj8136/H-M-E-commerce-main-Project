import React from 'react';
import Sidebar from '../../components/admin/Sidebar';

function AdminDashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div style={{ padding: '20px' }}>
        <h2 className="text-center">Admin Dashboard</h2>
      </div>
    </div>
  );
}

export default AdminDashboard;
