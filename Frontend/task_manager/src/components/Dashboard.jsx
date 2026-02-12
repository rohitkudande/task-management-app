import React from 'react';
import TaskManager from './TaskManager';

const Dashboard = ({ user, onLogout }) => {
  return (
    <div>
      <nav className="navbar">
        <h1>Task Management System</h1>
        <div>
          <span>Welcome, {user?.username}</span>
          {user?.role === 'admin' && <span className="admin-badge">Admin</span>}
          <button onClick={onLogout}>Logout</button>
        </div>
      </nav>
      <div className="container">
        <TaskManager user={user} />
      </div>
    </div>
  );
};

export default Dashboard;