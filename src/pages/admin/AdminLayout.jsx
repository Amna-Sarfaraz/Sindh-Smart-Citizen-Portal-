import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.jpg';

const ADMIN_LINKS = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: '🏠' },
  { name: 'Complaints', href: '/admin/complaints', icon: '📝' },
  { name: 'Officers', href: '/admin/officers', icon: '👮' },
  { name: 'Departments', href: '/admin/departments', icon: '🏛️' },
];

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: "'Segoe UI', sans-serif" }}>
      <nav style={{
        background: 'linear-gradient(90deg, #0e2a4a 0%, #1a3f6f 100%)',
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={logo} alt="Logo" style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', objectFit: 'contain' }} />
          <span style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.3px' }}>
            Admin Panel - Sindh Smart Citizen Portal
          </span>
        </div>
      </nav>

      <div style={{ display: 'flex', flex: 1 }}>
        <aside style={{
          width: '220px',
          minHeight: 'calc(100vh - 64px)',
          background: 'linear-gradient(180deg, #0e2a4a 0%, #1a3f6f 100%)',
          padding: '16px 0',
          flexShrink: 0,
        }}>
          {ADMIN_LINKS.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.name}
                to={link.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 20px',
                  color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
                  background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
                  borderLeft: isActive ? '3px solid #4ade80' : '3px solid transparent',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 600 : 400,
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ fontSize: '1.1rem' }}>{link.icon}</span>
                {link.name}
              </Link>
            );
          })}
          <button
            onClick={logout}
            style={{
              marginTop: '10px',
              width: '100%',
              border: 'none',
              textAlign: 'left',
              padding: '12px 20px',
              background: 'transparent',
              color: 'rgba(255,255,255,0.8)',
              fontSize: '0.9rem',
              cursor: 'pointer',
            }}
          >
            🚪 Logout
          </button>
        </aside>

        <main style={{ flex: 1, background: '#f0f4f8', padding: '24px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
