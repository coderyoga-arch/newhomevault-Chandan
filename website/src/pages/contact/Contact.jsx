import { useNavigate } from "react-router-dom";
import LeadForm from "../../components/common/LeadForm";
import "./Contact.css";
import meganPortrait from "../../assets/images/megan_main.png";

export default function Contact() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="page-banner">
        <h1>Contact Us</h1>
        <div className="breadcrumb">
          <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>Home</span>
          <span style={{ cursor: "default", color: "rgba(255,255,255,0.4)" }}>›</span>
          <span style={{ cursor: "default", color: "rgba(255,255,255,0.6)" }}>Contact Us</span>
        </div>
      </div>

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-info">
            <span className="section-label">Get in Touch</span>
            <h2 className="section-title">Let's Discuss Your<br />Next Home</h2>
            
            <div className="owner-contact-preview" style={{ marginBottom: 32, display: 'flex', gap: 24, alignItems: 'center' }}>
              <img src={meganPortrait} alt="Megan" style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--gold)' }} />
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, marginBottom: 4 }}>Megan</h3>
                <p style={{ color: 'var(--gold)', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>Lead Advisor & Designer</p>
              </div>
            </div>

            <p className="contact-intro">Whether you're looking for early access to a new project or need guidance on residential design, we're here to help.</p>
            
            <div className="contact-methods">
              <div className="method">
                <span className="method-icon">📍</span>
                <div>
                  <strong>Our Office</strong>
                  <p>5010 Steeles Ave West, Suite 11A, Toronto M9V 5C6</p>
                </div>
              </div>
              <div className="method">
                <span className="method-icon">📞</span>
                <div>
                  <strong>Phone</strong>
                  <p>(647) 693-1222</p>
                </div>
              </div>
              <div className="method">
                <span className="method-icon">✉</span>
                <div>
                  <strong>Email</strong>
                  <p>info@newhomevault.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-card" id="inquiry">
            <LeadForm 
              context="General Inquiry" 
              title="Send an Inquiry" 
              subtitle="Fill out the form below and Megan's team will get back to you within 24 hours."
            />
          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="container">
          <div className="map-placeholder">
            <p>Toronto Office Location</p>
            <span>5010 Steeles Ave West, Suite 11A</span>
          </div>
        </div>
      </section>
    </div>
  );
}
