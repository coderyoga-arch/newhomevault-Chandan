import { Link } from "react-router-dom";
import LeadForm from "../common/LeadForm";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner container">
        <div className="footer-brand">
          <div className="footer-logo">NewHome<span>Vault</span></div>
          <p>A boutique advisory for new homes & design. Serving Canada and key global markets.</p>
          <div className="footer-contact-list">
            <span>📞 (647) 693-1222</span>
            <span>✉ info@newhomevault.com</span>
            <span>📍 5010 Steeles Ave West, Suite 11A, Toronto M9V 5C6</span>
            <span>🕐 Mon–Sat, 9:00 AM – 9:00 PM</span>
          </div>
        </div>
        <div className="footer-links">
          <h4>Navigate</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about#about-me">Our Story</Link></li>
            <li><Link to="/services#core-services">Our Services</Link></li>
            <li><Link to="/property">New Properties</Link></li>
            <li><Link to="/contact#inquiry">Get in Touch</Link></li>
          </ul>
        </div>
        <div className="footer-newsletter">
          <h4>Newsletter</h4>
          <p>Subscribe to receive updates via email.</p>
          <div className="newsletter-form-container-footer">
            <LeadForm isNewsletter={true} />
          </div>
        </div>
      </div>
      <div className="footer-bottom container">
        <p>© NewHomeVault.com — Megan Rekhi — Salesperson, HomeLife/Miracle Realty Ltd., Brokerage</p>
        <div className="footer-legal">
          <button>Terms & Conditions</button>
          <button>Privacy Policy</button>
        </div>
      </div>
      <div className="footer-disclaimer container">
        <p><strong>Pre-Construction Disclaimer:</strong> This website is intended for informational and promotional purposes only. Property details, pricing, and availability are subject to change without notice. All renderings are artist's concepts. This does not constitute legal, financial, or investment advice.</p>
      </div>
    </footer>
  );
}
