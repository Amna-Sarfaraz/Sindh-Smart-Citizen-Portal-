import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Property from './pages/Property';
import Complaint from './pages/Complaint';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="app-container">
      <nav className="main-nav">
        <div className="logo"><Link to="/">SSCP</Link></div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/property">Properties</Link></li>
          <li><Link to="/complaint">Complaints</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/login" className="btn-login">Login</Link></li>
          <li><Link to="/register" className="btn-register">Register</Link></li>
        </ul>
      </nav>

      <main className="content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/property" element={<Property />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>

      <footer className="main-footer">
        <p>&copy; 2026 Smart City Service Complaint Portal. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
