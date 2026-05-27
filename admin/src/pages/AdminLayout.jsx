import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { LayoutDashboard, Home, Mail, LogOut, Menu, X, ArrowLeft } from "lucide-react";
import "./AdminLayout.css";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Not authenticated, redirect to login
        navigate("/login", { replace: true });
      } else {
        setAdminEmail(session.user.email);
        setLoading(false);
      }
    }
    
    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        navigate("/login", { replace: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  if (loading) {
    return (
      <div className="admin-loading-screen">
        <div className="admin-spinner"></div>
        <p>Verifying Admin Session...</p>
      </div>
    );
  }

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Properties", path: "/properties", icon: Home },
    { name: "Leads Inbox", path: "/leads", icon: Mail },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar Nav */}
      <aside className={`admin-sidebar ${mobileOpen ? "is-open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <span className="brand-dot"></span>
            <h2>NHV Admin</h2>
          </div>
          <button className="sidebar-close-btn" onClick={() => setMobileOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-user">
          <div className="avatar-placeholder">M</div>
          <div className="user-details">
            <p className="user-role">Megan (Administrator)</p>
            <p className="user-email">{adminEmail}</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-link ${isActive ? "active" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="admin-main-container">
        {/* Top Header */}
        <header className="admin-header">
          <div className="header-left">
            <button className="mobile-toggle" onClick={() => setMobileOpen(true)}>
              <Menu size={22} />
            </button>
            <h1 className="header-title">
              {menuItems.find((item) => location.pathname.startsWith(item.path))?.name || "Admin Panel"}
            </h1>
          </div>
          <div className="header-right">
            <a href="http://localhost:5173" target="_blank" rel="noreferrer" className="view-site-link">
              <ArrowLeft size={14} />
              <span>Launch Client Website</span>
            </a>
          </div>
        </header>

        {/* Content Pane */}
        <main className="admin-content-pane">
          <Outlet />
        </main>
      </div>

      {mobileOpen && <div className="sidebar-overlay" onClick={() => setMobileOpen(false)}></div>}
    </div>
  );
}
