import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const SIDEBAR_LINKS = [
  { name: "Dashboard",          href: "/dashboard",  icon: "🏠" },
  { name: "Departments",        href: "/departments", icon: "🏛️" },
  { name: "Complaints",         href: "/complaint",   icon: "📝" },
  { name: "Profile",            href: "/profile",     icon: "👤" },
  { name: "Logout",             href: "/login",       icon: "🚪" },
];

export default function DashboardLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Segoe UI', sans-serif" }}>

      {/* ── TOP NAVBAR ── */}
      <nav style={{
        background: "linear-gradient(90deg, #0e2a4a 0%, #1a3f6f 100%)",
        padding: "0 24px",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      }}>

        {/* Left: Logo + Name */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src={logo} alt="Logo" style={{ width: "42px", height: "42px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", objectFit: "contain" }} />
          <span style={{ color: "white", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "0.3px" }}>
            Sindh Smart Citizen Portal
          </span>
        </div>


        {/* Right: Icons + User */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <span style={{ color: "white", fontSize: "1.3rem", cursor: "pointer" }}>🔔</span>
          <div style={{ position: "relative", cursor: "pointer" }}>
            <span style={{ color: "white", fontSize: "1.3rem" }}>✉️</span>
            <span style={{
              position: "absolute", top: "-6px", right: "-6px",
              background: "#e53e3e", color: "white", borderRadius: "50%",
              width: "16px", height: "16px", fontSize: "0.65rem",
              display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700
            }}>3</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.85rem" }}>ENG ▾</span>
            <img src={logo} alt="User" style={{ width: "36px", height: "36px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.4)", objectFit: "cover" }} />
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.85rem" }}>▾</span>
          </div>
        </div>

      </nav>

      {/* ── BODY: Sidebar + Content ── */}
      <div style={{ display: "flex", flex: 1 }}>

        {/* ── LEFT SIDEBAR ── */}
        <aside style={{
          width: "220px",
          minHeight: "calc(100vh - 64px)",
          background: "linear-gradient(180deg, #0e2a4a 0%, #1a3f6f 100%)",
          padding: "16px 0",
          flexShrink: 0,
        }}>
          {SIDEBAR_LINKS.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.name}
                to={link.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 20px",
                  color: isActive ? "white" : "rgba(255,255,255,0.7)",
                  background: isActive ? "rgba(255,255,255,0.15)" : "transparent",
                  borderLeft: isActive ? "3px solid #4ade80" : "3px solid transparent",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  fontWeight: isActive ? 600 : 400,
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "white";
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                  }
                }}
              >
                <span style={{ fontSize: "1.1rem" }}>{link.icon}</span>
                {link.name}
              </Link>
            );
          })}
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main style={{ flex: 1, background: "#f0f4f8", padding: "24px", overflowY: "auto" }}>
          {children}
        </main>

      </div>
    </div>
  );
}
