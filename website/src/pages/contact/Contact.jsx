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
              <div className="owner-avatar">
                <img src={meganPortrait} alt="Megan" />
              </div>
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

      <section className="map-section" style={{ height: "450px", marginBottom: "60px" }}>
        <div className="container" style={{ height: "100%" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2881.08053629471!2d-79.60533282343272!3d43.75043814612349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b3a270f2f3d53%3A0xe9fa688dbce047fa!2s5010%20Steeles%20Ave%20W%2C%20Etobicoke%2C%20ON%20M9V%205C6%2C%20Canada!5e0!3m2!1sen!2sin!4v1716800000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: "8px", boxShadow: "0 15px 40px rgba(0,0,0,0.08)" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location Map"
          />
        </div>
      </section>
    </div>
  );
}
