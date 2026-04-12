import { useNavigate } from "react-router-dom";
import { testimonials, blogs } from "../../utils/mockData";
import LeadForm from "../../components/common/LeadForm";
import "./About.css";
import meganMain from "../../assets/images/megan_main.png";
import meganBW from "../../assets/images/megan_bw.png";
import meganShowroom from "../../assets/images/megan_showroom_clean.png";

export default function About() {
  const navigate = useNavigate();
  return (
    <div className="about-page">
      <div className="page-banner">
        <h1>About Us</h1>
        <div className="breadcrumb">
          <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>Home</span>
          <span style={{ cursor: 'default', color: 'rgba(255,255,255,0.4)' }}>›</span>
          <span style={{ cursor: 'default', color: 'rgba(255,255,255,0.6)' }}>About Us</span>
        </div>
      </div>

      {/* INTRO */}
      <section id="about-me" className="section">
        <div className="container about-grid">
          <div className="about-images">
            <img src={meganShowroom} alt="Megan Showroom" className="about-img1" />
            <img src={meganMain} alt="Megan Portrait" className="about-img2" />
            <img src={meganBW} alt="Megan Design" className="about-img3" />
          </div>
          <div className="about-text">
            <span className="section-label">The Founder</span>
            <h2 className="section-title">Megan Rekhi</h2>
            <p>Megan and her team lead NewHomeVault.com with a calm, thoughtful approach to real estate, design, and long-term property strategy. With over a decade of experience in new home developments, buyer advisory, and residential design, they bring depth, structure, and steady guidance to every engagement.</p>
            <p style={{ marginTop: 16 }}>Their reputation is built on deep market knowledge, candid advice, and consistent client care. Clients choose NewHomeVault.com for clarity in complex decisions and perspective in fast-moving markets.</p>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="about-experience" className="section-alt">
        <div className="container experience-grid">
          <div>
            <span className="section-label">Background</span>
            <h2 className="section-title">Experience &<br />Perspective</h2>
            <p style={{ color: 'var(--slate)', lineHeight: 1.8, marginBottom: 16 }}>Originally rooted in Toronto, the newhomevault.com team brings experience shaped by time spent living and working in Los Angeles, the San Francisco Bay Area, and major cities across India. These global perspectives inform a nuanced understanding of architecture, lifestyle, and urban living.</p>
            <p style={{ color: 'var(--slate)', lineHeight: 1.8, marginBottom: 32 }}>The team specializes in pre-construction and new-build opportunities across Canada and select international markets, supported by long-standing relationships with leading developers. These partnerships provide clients with early access, deeper insight, and stronger negotiating positioning.</p>
            <button className="btn-primary" onClick={() => navigate("/contact#inquiry")}>Book a Private Consultation</button>
          </div>
          <div>
            <img src={meganBW} alt="Megan Professional" style={{ width: '100%', height: 440, objectFit: 'cover', borderRadius: '8px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
          </div>
        </div>
      </section>

      {/* SERVICES DETAIL */}
      <section id="about-services" className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <span className="section-label">Our Philosophy</span>
            <h2 className="section-title">Expertise in Every Detail</h2>
          </div>
          <div className="about-services-grid">
            <div className="about-service">
              <img src={meganShowroom} alt="Design" />
              <div className="about-service-body">
                <h3>Design, Staging & Spatial Strategy</h3>
                <p>Design and staging are central to the newhomevault.com team's practice. Interiors are approached as a strategic extension of real estate value, with a focus on balance, flow, and proportion; light and spatial clarity; architectural emphasis; and resale positioning.</p>
              </div>
            </div>
            <div className="about-service">
              <img src={meganBW} alt="Advisory" />
              <div className="about-service-body">
                <h3>A Boutique, Data-Informed Practice</h3>
                <p>newhomevault.com operates as a boutique new home and design advisory. Structured, data-driven consultations are offered across Canada and key global markets. Rather than listing everything, recommendations are selectively curated — grounded in research, experience, and long-term thinking.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="about-testimonials" className="section-alt">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="section-label">Our Testimonial</span>
            <h2 className="section-title">Clients Feedback</h2>
          </div>
          <div className="testimonials-grid-about">
            {testimonials.map((t) => (
              <div key={t.name} className="testimonial-card">
                <p>{t.text}</p>
                <div className="testimonial-author">{t.name}</div>
                <div className="testimonial-location">{t.location}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INQUIRY SECTION */}
      <section id="about-inquiry" className="section">
        <div className="container">
          <div className="about-inquiry-grid" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "center"
          }}>
            <div>
              <span className="section-label">Consultation</span>
              <h2 className="section-title">Book a Private<br />Planning Session</h2>
              <p style={{ marginBottom: 24, lineHeight: 1.8, color: "var(--slate)" }}>
                Our advisory approach is built on clarity, not pressure. Whether you are at the beginning of your property search or looking for design guidance, a planning session provides the structure needed to move forward confidently.
              </p>
              <div className="about-contact-bullets" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <span style={{ color: 'var(--gold)' }}>✓</span>
                  <span>Portfolio Assessment</span>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <span style={{ color: 'var(--gold)' }}>✓</span>
                  <span>Market Entry Strategy</span>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <span style={{ color: 'var(--gold)' }}>✓</span>
                  <span>Residential Design Direction</span>
                </div>
              </div>
            </div>
            <div id="inquiry">
              <LeadForm
                context="About Page Consultation"
                title="Request a Session"
                subtitle="Submit your details and we will reach out to schedule a private call."
                buttonText="Request Consultation"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
