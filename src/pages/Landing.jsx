import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.jpg";
import heroBg from "../assets/bg pic.png";

const NAV_LINKS = [
  { name: "Home",         href: "#home" },
  { name: "Features",     href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Departments",  href: "#departments" },
  { name: "Contact",      href: "#contact" },
];

export default function Landing() {
  const navigate = useNavigate();

  function goToLogin(role) {
    navigate(`/login?role=${role}`);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700;800&display=swap');
        * { font-family: 'EB Garamond', serif; }
        :root { --blue: #2E4A6F; --blue-light: #3a5c8a; --blue-pale: #eef2f7; --blue-border: #c2d0e0; }
        .btn-primary { background: #2E4A6F; color: white; transition: all 0.3s; }
        .btn-primary:hover { background: #3a5c8a; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(46,74,111,0.35); }
        .mini-card { transition: all 0.3s; }
        .mini-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(46,74,111,0.15) !important; }
        .fade-up { animation: fadeUp 0.8s ease forwards; opacity: 0; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.25s; }
        .delay-3 { animation-delay: 0.4s; }
        .delay-4 { animation-delay: 0.55s; }
        .delay-5 { animation-delay: 0.7s; }
        .badge { background: #eef2f7; color: #2E4A6F; border: 1px solid #c2d0e0; display: inline-flex; align-items: center; gap: 6px; padding: 6px 16px; border-radius: 999px; font-size: 14px; font-weight: 600; }
        .dot { width: 8px; height: 8px; border-radius: 50%; background: #2E4A6F; display: inline-block; }
      `}</style>

      {/* ── NAVBAR  ── */}
      <nav style={{
        background: "linear-gradient(135deg, #1a2f47 0%, #1a2f47 100%)",
        boxShadow: "0 4px 20px rgba(9,38,75,0.4)",
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, padding: "16px 0"
      }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo + Name */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
            <span className="font-bold text-xl tracking-tight" style={{ color: "white" }}>
              Sindh  Smart  Citizen  Portal
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a key={link.name} href={link.href}
                className="text-base font-medium transition-all duration-200 px-3 py-1.5 rounded-lg"
                style={{ color: "#bfd4e8" }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = "#bfd4e8";
                  e.currentTarget.style.background = "transparent";
                }}>
                {link.name}
              </a>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <button className="px-5 py-2 text-base font-semibold rounded-lg transition-all"
            style={{ color: "white", border: "1px solid rgba(255,255,255,0.3)" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            onClick={() => goToLogin('citizen')}>
            Citizen Login
            </button>
            <button className="px-5 py-2 text-base font-semibold rounded-lg transition-all"
            style={{ color: "#dbeafe", border: "1px solid rgba(147,197,253,0.55)", background: "rgba(147,197,253,0.12)" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(147,197,253,0.2)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(147,197,253,0.12)"}
            onClick={() => goToLogin('admin')}>
            Admin Login
            </button>
            <button className="px-6 py-2.5 text-base rounded-xl font-semibold transition-all"
            style={{ background: "white", color: "#2E4A6F" }}
            onMouseEnter={e => {
            e.currentTarget.style.background = "#eef2f7";
            e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={e => {
           e.currentTarget.style.background = "white";
            e.currentTarget.style.transform = "translateY(0)";
           }}
  onClick={() => navigate('/register')}>
  Register
</button>
            
          </div>

        </div>
      </nav>

      
      <div className="min-h-screen text-gray-900 overflow-x-hidden">

        {/* ── HERO ── */}
        
          <section id="home" className="relative px-4 pb-16"
  style={{
    backgroundImage: `url(${heroBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    paddingTop: "112px",
  }}>
          <div className="absolute inset-0" style={{ background: "rgba(46,74,111,0.75)" }} />
          <div className="relative mx-auto max-w-4xl text-center pt-10 pb-8">

            <div className="fade-up delay-1 badge mb-8"
              style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.3)" }}>
              <span className="dot" style={{ background: "white" }} />
              Sindh Government Official Portal
            </div>

            <h1 className="fade-up delay-2 text-5xl font-extrabold leading-tight mb-6 text-white">
              Your Voice,{" "}
              <span style={{ color: "#93c5fd" }}>Our Responsibility</span>
            </h1>

            <p className="fade-up delay-3 text-lg max-w-xl mx-auto mb-10 leading-relaxed"
              style={{ color: "rgba(255,255,255,0.85)" }}>
              File complaints directly with government departments. Track progress in real time.
              Hold authorities accountable — all from one platform.
            </p>

            <div className="fade-up delay-4 mb-10">
              <div className="mb-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <button className="px-8 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all"
                  style={{ background: "white", color: "#2E4A6F" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                  onClick={() => goToLogin('citizen')}>
                  Citizen Login
                </button>
                <button className="px-8 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all"
                  style={{ background: "#dbeafe", color: "#17365d" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                  onClick={() => goToLogin('admin')}>
                  Admin Login
                </button>
              </div>
              <button className="px-8 py-3 rounded-2xl font-bold text-base shadow-xl transition-all"
                style={{ background: "rgba(255,255,255,0.14)", color: "white", border: "1px solid rgba(255,255,255,0.3)" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                onClick={() => navigate('/complaint')}>
                Submit a Complaint →
              </button>
            </div>

            <div className="fade-up delay-5 mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3">
              {[
                { icon: "✅", label: "Easy Filing",   desc: "Simple guided form" },
                { icon: "📍", label: "Live Tracking", desc: "Real-time updates" },
                { icon: "🏛️", label: "Direct to Gov", desc: "Right department" },
              ].map((item, i) => (
                <div key={i} className="mini-card rounded-3xl flex flex-col items-center gap-3 px-5 py-6"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    border: "1.5px solid rgba(255,255,255,0.25)",
                    backdropFilter: "blur(10px)",
                  }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ background: "rgba(255,255,255,0.2)" }}>
                    {item.icon}
                  </div>
                  <span className="text-base font-bold text-white">{item.label}</span>
                  <span className="text-sm text-center" style={{ color: "rgba(255,255,255,0.75)" }}>{item.desc}</span>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── STATS ── */}
        <section className="py-14 px-6" style={{ background: "#eef2f7" }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-extrabold" style={{ color: "#1a2f47" }}>Our Impact in Numbers</h2>
              <p className="text-lg mt-2" style={{ color: "#6b7280" }}>Real results for real citizens</p>
            </div>
            <div className="grid grid-cols-4 gap-6">
              {[
                { value: "12,400+", label: "Complaints Resolved", icon: "✅" },
                { value: "98%",     label: "Satisfaction Rate",   icon: "⭐" },
                { value: "24hrs",   label: "Avg Response Time",   icon: "⚡" },
                { value: "10+",     label: "Departments",         icon: "🏛️" },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-3xl p-6 text-center transition-all duration-300"
                  style={{ border: "1.5px solid #c2d0e0", boxShadow: "0 4px 20px rgba(46,74,111,0.07)" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                  <div className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center text-2xl"
                    style={{ background: "#eef2f7" }}>
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-extrabold mb-1" style={{ color: "#2E4A6F" }}>{stat.value}</div>
                  <div className="text-base font-medium" style={{ color: "#6b7280" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section id="features" className="py-9 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <div className="badge mb-2">Why Sindh Citizen Complaint Portal</div>
              <h2 className="text-4xl font-extrabold leading-tight" style={{ color: "#1a2f47" }}>
                Everything you need<br />to get heard
              </h2>
              <p className="text-lg mt-3 max-w-xl mx-auto" style={{ color: "#6b7280" }}>
                A complete platform built for citizens like you
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {[
                { icon: "📝", title: "Easy Complaint Filing",  desc: "Submit your complaint in minutes with our simple guided form. Attach photos and location for faster resolution." },
                { icon: "🔍", title: "Real-Time Tracking",     desc: "Track your complaint status live. Get notified at every stage — from submission to resolution." },
                { icon: "🏛️", title: "Direct to Departments",  desc: "Complaints are automatically routed to the right department — no manual follow-ups needed." },
                { icon: "📊", title: "Transparent Reports",    desc: "Access public dashboards showing resolution rates, popular issues, and department performance." },
                { icon: "🔔", title: "Smart Notifications",    desc: "Receive email or SMS updates whenever your complaint status changes." },
                { icon: "🔒", title: "Secure & Private",       desc: "Your data is protected with industry-standard encryption. File anonymously if you choose." },
              ].map((f, i) => (
                <div key={i} className="rounded-3xl p-7 transition-all duration-300 cursor-pointer"
                  style={{ background: "#eef2f7", border: "1.5px solid #c2d0e0" }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(46,74,111,0.14)";
                    e.currentTarget.style.borderColor = "#2E4A6F";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "#c2d0e0";
                  }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5"
                    style={{ background: "#dce5f0" }}>
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: "#1a2f47" }}>{f.title}</h3>
                  <p className="text-base leading-relaxed" style={{ color: "#6b7280" }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how-it-works" className="py-9 px-6" style={{ background: "#eef2f7" }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <div className="badge mb-4">Process</div>
              <h2 className="text-4xl font-extrabold" style={{ color: "#1a2f47" }}>How It Works</h2>
              <p className="text-lg mt-3" style={{ color: "#6b7280" }}>4 simple steps to get your issue resolved</p>
            </div>
            <div className="grid grid-cols-4 gap-6">
              {[
                { num: "01", title: "Register / Login", desc: "Create a free account using your email and city details.", icon: "👤" },
                { num: "02", title: "Submit Complaint",  desc: "Fill out the complaint form with title, description, location & department.", icon: "📝" },
                { num: "03", title: "Track Progress",    desc: "Monitor real-time updates as your complaint moves through the system.", icon: "📍" },
                { num: "04", title: "Get Resolved",      desc: "Receive confirmation once your issue is fully resolved by the department.", icon: "✅" },
              ].map((step, i) => (
                <div key={i} className="bg-white rounded-3xl p-7 text-center transition-all duration-300"
                  style={{ border: "1.5px solid #c2d0e0", boxShadow: "0 4px 20px rgba(46,74,111,0.07)" }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(46,74,111,0.15)";
                    e.currentTarget.style.borderColor = "#2E4A6F";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(46,74,111,0.07)";
                    e.currentTarget.style.borderColor = "#c2d0e0";
                  }}>
                  <div className="text-5xl font-extrabold mb-3" style={{ color: "#2E4A6F" }}>{step.num}</div>
                  <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl"
                    style={{ background: "#eef2f7" }}>
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: "#1a2f47" }}>{step.title}</h3>
                  <p className="text-base leading-relaxed" style={{ color: "#6b7280" }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DEPARTMENTS ── */}
        <section id="departments" className="py-9 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <div className="badge mb-4">Coverage</div>
              <h2 className="text-4xl font-extrabold" style={{ color: "#1a2f47" }}>Departments We Cover</h2>
              <p className="text-lg mt-3" style={{ color: "#6b7280" }}>
                Your complaint goes directly to the right authority — no middlemen.
              </p>
            </div>
            <div className="grid grid-cols-4 gap-5">
              {[
                { icon: "💧", name: "Water & Sanitation",    desc: "Clean water & drainage issues" },
                { icon: "🛣️", name: "Roads & Infrastructure", desc: "Road damage & construction" },
                { icon: "⚡", name: "Electricity Board",      desc: "Power outages & billing" },
                { icon: "🚌", name: "Public Transport",       desc: "Buses & transport issues" },
              
               
              ].map((dept, i) => (
                <div key={i} className="rounded-3xl p-6 text-center bg-white transition-all duration-300 cursor-pointer"
                  style={{ border: "1.5px solid #c2d0e0", boxShadow: "0 4px 16px rgba(46,74,111,0.06)" }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(46,74,111,0.14)";
                    e.currentTarget.style.borderColor = "#2E4A6F";
                    e.currentTarget.style.background = "#eef2f7";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(46,74,111,0.06)";
                    e.currentTarget.style.borderColor = "#c2d0e0";
                    e.currentTarget.style.background = "white";
                  }}>
                  <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl"
                    style={{ background: "#eef2f7" }}>
                    {dept.icon}
                  </div>
                  <h3 className="text-base font-bold mb-1" style={{ color: "#1a2f47" }}>{dept.name}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#9ca3af" }}>{dept.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="py-12 px-6" style={{ background: "#2E4A6F" }}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-extrabold text-white mb-4">Ready to be heard?</h2>
            <p className="text-lg mb-8" style={{ color: "#c2d0e0" }}>
              Join thousands of citizens who have resolved issues through our portal.
            </p>
            <button className="px-10 py-4 rounded-2xl font-bold text-lg bg-white transition-all duration-300"
              style={{ color: "#2E4A6F" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              Submit a Complaint →
            </button>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer id="contact" className="py-14 px-6" style={{ background: "#0f1e30" }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-4 gap-10 mb-10">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img src={logo} alt="Logo" className="w-9 h-9 object-contain" />
                  <span className="font-bold text-lg text-white">Sindh Citizen Portal</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                  Empowering citizens to resolve local issues through transparent and accountable governance.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-white text-base mb-4">Quick Links</h4>
                <ul className="space-y-2.5">
                  {["Home", "Features", "How It Works", "Departments"].map(link => (
                    <li key={link}>
                      <a href="#" className="text-sm transition-colors" style={{ color: "#94a3b8" }}
                        onMouseEnter={e => e.currentTarget.style.color = "white"}
                        onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white text-base mb-4">Platform</h4>
                <ul className="space-y-2.5">
                  {["Submit Complaint", "Track Status", "Citizen Dashboard", "Register"].map(link => (
                    <li key={link}>
                      <a href="#" className="text-sm transition-colors" style={{ color: "#94a3b8" }}
                        onMouseEnter={e => e.currentTarget.style.color = "white"}
                        onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white text-base mb-4">Contact Us</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm" style={{ color: "#94a3b8" }}>
                    <span>📧</span> support@sindhportal.gov.pk
                  </li>
                  <li className="flex items-center gap-2 text-sm" style={{ color: "#94a3b8" }}>
                    <span>📞</span> 0800-12345
                  </li>
                  <li className="flex items-center gap-2 text-sm" style={{ color: "#94a3b8" }}>
                    <span>📍</span> Karachi, Sindh, Pakistan
                  </li>
                </ul>
              </div>
            </div>
            <div className="pt-6 flex items-center justify-between" style={{ borderTop: "1px solid #1e3a5f" }}>
              <p className="text-sm" style={{ color: "#64748b" }}>© 2024 Sindh Citizen Complaint Portal. All rights reserved.</p>
              <p className="text-sm" style={{ color: "#64748b" }}>Made with ❤️ for the citizens of Sindh</p>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
