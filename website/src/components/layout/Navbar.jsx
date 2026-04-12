import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === "/";
  // The header should be solid if we've scrolled OR if we are on any page other than home
  const isSolid = scrolled || !isHome || menuOpen;

  const links = [
    { label: "Home", page: "home", path: "/" },
    { label: "About Us", page: "about", path: "/about#about-me" },
    { label: "Property", page: "property", path: "/property" },
    { label: "Services", page: "services", path: "/services#core-services" },
    { label: "Contact", page: "contact", path: "/contact#inquiry" },
  ];

  return (
    <nav className={`navbar ${isSolid ? "scrolled" : ""} ${menuOpen ? "menu-active" : ""}`}>
      <div className="nav-inner container">
        <div className="nav-logo" onClick={() => navigate("/")}>
          <span className="logo-text">NewHome<span>Vault</span></span>
        </div>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          {links.map((l) => (
            <li key={l.page}>
              <NavLink
                to={l.path}
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
          <li>
            <button className="nav-cta" onClick={() => { navigate("/contact#inquiry"); setMenuOpen(false); }}>
              Book a Strategy
            </button>
          </li>
        </ul>

        <div className="nav-phone">
          <span className="phone-label">Get Support</span>
          <a href="tel:+16476931222">(647) 693-1222</a>
        </div>

        <button className={`hamburger ${menuOpen ? "open" : ""}`} aria-label="Toggle Menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
