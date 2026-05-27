import { useNavigate } from "react-router-dom";
import LeadForm from "../../components/common/LeadForm";
import "./Services.css";
import meganShowroom from "../../assets/images/megan_showroom.png";
import meganBW from "../../assets/images/megan_bw.png";

export default function Services() {
  const navigate = useNavigate();

  return (
    <div className="services-page">
      <div className="page-banner">
        <div className="container">
          <h1>Expertise & Guidance</h1>
          <p className="banner-sub">Selectively curated strategies for new home acquisition and residential design.</p>
          <div className="breadcrumb">
            <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>Home</span>
            <span className="sep">›</span>
            <span>Services</span>
          </div>
        </div>
      </div>

      {/* CORE PILLARS */}
      <section id="core-services" className="section">
        <div className="container">
          <div className="section-header center">
            <span className="section-label">Our Core Pillars</span>
            <h2 className="section-title">Strategic Real Estate<br />& Design Advisory</h2>
          </div>

          <div className="pillars-grid">
            <div className="pillar-card">
              <div className="pillar-header">
                <span className="pillar-no">01</span>
                <h3>New Home Advisory</h3>
              </div>
              <p>Strategic representation for new-build and condominium developments. We assess builder track records, pricing structures, deposit schedules, and long-term resale potential.</p>
              <ul className="pillar-list">
                <li>Builder Due Diligence</li>
                <li>Inventory Analysis</li>
                <li>Exclusive Project Access</li>
              </ul>
              <button className="text-btn" onClick={() => navigate("/contact#inquiry")}>Enquire Now →</button>
            </div>

            <div className="pillar-card">
              <div className="pillar-header">
                <span className="pillar-no">02</span>
                <h3>Portfolio Strategy</h3>
              </div>
              <p>Long-term acquisition and disposition planning for buyers and investors. We provide data-driven analysis, entry timing guidance, and structured resale strategy.</p>
              <ul className="pillar-list">
                <li>Market Data Analysis</li>
                <li>Portfolio Assessment</li>
                <li>ROI Projections</li>
              </ul>
              <button className="text-btn" onClick={() => navigate("/contact#inquiry")}>Enquire Now →</button>
            </div>

            <div className="pillar-card">
              <div className="pillar-header">
                <span className="pillar-no">03</span>
                <h3>Design & Staging</h3>
              </div>
              <p>Thoughtful interior direction and presentation strategy. We shape spaces to feel elevated, functional, and market-ready — optimizing properties for living or resale.</p>
              <ul className="pillar-list">
                <li>Spatial Strategy</li>
                <li>Interior Direction</li>
                <li>Market Staging</li>
              </ul>
              <button className="text-btn" onClick={() => navigate("/contact#inquiry")}>Enquire Now →</button>
            </div>
          </div>
        </div>
      </section>

      {/* THE PROCESS */}
      <section id="our-process" className="section-alt process-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">How We Work</span>
            <h2 className="section-title">A Structured Path to Your Next Home</h2>
          </div>

          <div className="process-flow">
            <div className="process-step">
              <div className="step-point" />
              <h4>01. Consult</h4>
              <p>We begin with a data-informed private consultation to understand your lifestyle goals, financial objectives, and timeline.</p>
            </div>
            <div className="process-step">
              <div className="step-point" />
              <h4>02. Source</h4>
              <p>Leveraging deep builder relationships, we identify selectively curated opportunities that align with your specific criteria.</p>
            </div>
            <div className="process-step">
              <div className="step-point" />
              <h4>03. Secure</h4>
              <p>We provide full-service support through the acquisition, from structural review to final contract and closing strategy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTISE GRID */}
      <section id="why-us" className="section">
        <div className="container">
          <div className="expertise-wrap">
            <div className="expertise-content">
              <span className="section-label">Expertise</span>
              <h2 className="section-title">The Foundation of<br />NewHomeVault</h2>
              <p className="expertise-desc">
                We don't rush decisions or push listings. Our model is built on trust, global data, and a decade of experience across North America and beyond.
              </p>
              <div className="expertise-features-list">
                 <div className="ex-item">
                    <strong>Vetted Inventory</strong>
                    <p>Every project is assessed for quality, developer stability, and capital growth potential.</p>
                 </div>
                 <div className="ex-item">
                    <strong>Global Network</strong>
                    <p>Insights shaped by experience in Toronto, Los Angeles, and major international hubs.</p>
                 </div>
                 <div className="ex-item">
                    <strong>Data First</strong>
                    <p>Decisions are grounded in research and analysis, ensuring clarity at every milestone.</p>
                 </div>
              </div>
              <button className="btn-primary" style={{ marginTop: 40 }} onClick={() => navigate("/contact#inquiry")}>Start Your Journey</button>
            </div>
            <div className="expertise-visual">
              <img src={meganShowroom} alt="Megan at showroom" />
              <div className="expertise-overlay-card">
                 <span>10+ Years</span>
                 <p>Real Estate & Design Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INQUIRY */}
      <section id="services-inquiry" className="section section-alt">
        <div className="container">
          <div className="services-inquiry-grid" id="inquiry">
            <div className="inquiry-text-col">
              <span className="section-label">Request Information</span>
              <h2 className="section-title">Ready to Begin?</h2>
              <p>Whether you are pursuing a specific project or need broader advisory guidance, we invite you to start with a planning session.</p>
              <div className="contact-info-sm">
                <p>📍 Toronto HQ · Advisory Canada-Wide</p>
                <p>📞 (647) 693-1222</p>
              </div>
            </div>
            <div className="inquiry-form-col">
              <LeadForm 
                context="Services Page Footer"
                title="Service Request"
                subtitle="Let us know how we can support your property goals."
                buttonText="Send Request"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <div className="cta-banner">
        <div className="container">
          <h2>Looking for a dream home?</h2>
          <p>We can help you realize your dream of a new home</p>
          <button className="btn-primary" onClick={() => navigate("/property")}>Explore Properties</button>
        </div>
      </div>
    </div>
  );
}
