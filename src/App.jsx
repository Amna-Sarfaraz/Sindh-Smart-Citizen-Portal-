import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Property from './pages/Property';
import Complaint from './pages/Complaint';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';

const navLinkClass = 'text-surface-500 transition-colors hover:text-brand-600';

function App() {
  const location = useLocation();
  const isComplaintRoute = location.pathname === '/complaint';
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="min-h-screen bg-surface-50 text-surface-800">
      <div className="flex min-h-screen flex-col">
        {!isAuthRoute && (
          <nav className="sticky top-0 z-50 flex items-center justify-between bg-white px-[5%] py-4 shadow-sm">
            <div className="text-lg font-bold text-surface-900">
              <Link to="/">SSCP</Link>
            </div>
            <ul className="flex list-none items-center gap-6 p-0 text-sm font-medium">
              <li><Link to="/" className={navLinkClass}>Home</Link></li>
              <li><Link to="/property" className={navLinkClass}>Properties</Link></li>
              <li><Link to="/complaint" className={navLinkClass}>Complaints</Link></li>
              <li><Link to="/dashboard" className={navLinkClass}>Dashboard</Link></li>
              <li><Link to="/profile" className={navLinkClass}>Profile</Link></li>
              <li><Link to="/login" className={navLinkClass}>Login</Link></li>
              <li><Link to="/register" className={navLinkClass}>Register</Link></li>
            </ul>
          </nav>
        )}

        <main className={isComplaintRoute ? 'flex-1' : 'mx-auto w-[90%] max-w-[1200px] flex-1 px-[5%] py-8'}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/property" element={<Property />} />
            <Route path="/complaint" element={<Complaint />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>

        {!isComplaintRoute && (
          <footer className="mt-auto p-8 text-center text-sm text-surface-500">
            <p>&copy; 2026 Smart City Service Complaint Portal. All rights reserved.</p>
          </footer>
        )}
      </div>
    </div>
  );
}

export default App;
