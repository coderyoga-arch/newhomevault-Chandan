import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { properties as mockProperties } from "../../utils/mockData";
import { slugify } from "../../utils/slugify";
import { propertyService } from "../../services/supabaseService";
import LeadForm from "../../components/common/LeadForm";
import meganMain from "../../assets/images/megan_main.png";
import "./PropertyDetail.css";

export default function PropertyDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    async function loadProperties() {
      try {
        const data = await propertyService.fetchProperties();
        if (data && data.length > 0) {
          setProperties(data);
        } else {
          setProperties(mockProperties);
        }
      } catch (err) {
        console.error("PropertyDetail: Failed to load properties from database:", err);
        setProperties(mockProperties);
      }
    }
    loadProperties();
  }, []);

  const { name: urlSlug } = useParams();

  // Resolve current property by URL slug, fallback to location.state or default property
  let p = null;
  if (urlSlug && properties.length > 0) {
    p = properties.find((x) => slugify(x.name) === urlSlug);
  }
  if (!p && urlSlug) {
    p = mockProperties.find((x) => slugify(x.name) === urlSlug);
  }
  if (!p) {
    p = location.state || properties[0] || mockProperties[0];
  }

  const related = properties.filter((x) => x.id !== p.id).slice(0, 3);

  return (
    <div className="property-detail-page">
      {/* HERO IMAGE */}
      <div id="property-hero" className="pd-hero" style={{ backgroundImage: `url(${p.img})` }}>
        <div className="pd-hero-overlay" />
        <div className="container pd-hero-content">
          <span className="pd-badge">{p.status}</span>
          <h1>{p.name}</h1>
          <p className="pd-location">📍 {p.location}</p>
          {p.builder && <p className="pd-builder">By {p.builder}</p>}
        </div>
      </div>

      {/* BREADCRUMB BAR */}
      <div className="pd-breadbar">
        <div className="container">
          <div className="breadcrumb" style={{ justifyContent: "flex-start" }}>
            <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>Home</span>
            <span style={{ cursor: "default", color: "rgba(255,255,255,0.4)" }}>›</span>
            <span onClick={() => navigate("/property")} style={{ cursor: "pointer" }}>Properties</span>
            <span style={{ cursor: "default", color: "rgba(255,255,255,0.4)" }}>›</span>
            <span style={{ cursor: "default", color: "rgba(255,255,255,0.6)" }}>{p.name}</span>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container pd-grid">
          {/* MAIN */}
          <div className="pd-main">
            <div className="pd-specs-bar">
              {p.priceFrom && !isNaN(p.priceFrom) && (
                <div className="pd-spec">
                  <span className="pd-spec-label">
                    {p.priceTo && !isNaN(p.priceTo) ? "Price Range" : "Price"}
                  </span>
                  <span className="pd-spec-val">
                    {p.priceTo && !isNaN(p.priceTo)
                      ? `$${p.priceFrom.toLocaleString()} – $${p.priceTo.toLocaleString()}`
                      : `From $${p.priceFrom.toLocaleString()}`}
                  </span>
                </div>
              )}
              {p.beds && (
                <div className="pd-spec">
                  <span className="pd-spec-label">Bedrooms</span>
                  <span className="pd-spec-val">🛏 {p.beds}</span>
                </div>
              )}
              {p.baths && (
                <div className="pd-spec">
                  <span className="pd-spec-label">Bathrooms</span>
                  <span className="pd-spec-val">🚿 {p.baths}</span>
                </div>
              )}
              <div className="pd-spec">
                <span className="pd-spec-label">Status</span>
                <span className="pd-spec-val" style={{ color: "var(--gold)" }}>{p.status}</span>
              </div>
            </div>

            <div className="pd-section">
              <h2>About {p.name}</h2>
              <p style={{ whiteSpace: "pre-line", lineHeight: "1.8", color: "var(--slate)" }}>{p.desc}</p>
            </div>

            <div className="pd-section">
              <h2>Specifications & Details</h2>
              <ul className="pd-features-list" style={{ marginTop: "20px" }}>
                {p.location && <li><span className="pd-check" style={{ color: "var(--gold)" }}>✓</span> Location: <strong>{p.location}</strong></li>}
                {p.builder && <li><span className="pd-check" style={{ color: "var(--gold)" }}>✓</span> Builder: <strong>{p.builder}</strong></li>}
                {p.beds && <li><span className="pd-check" style={{ color: "var(--gold)" }}>✓</span> Bedrooms: <strong>{p.beds} Beds</strong></li>}
                {p.baths && <li><span className="pd-check" style={{ color: "var(--gold)" }}>✓</span> Bathrooms: <strong>{p.baths} Baths</strong></li>}
                {p.status && <li><span className="pd-check" style={{ color: "var(--gold)" }}>✓</span> Status: <strong>{p.status}</strong></li>}
              </ul>
            </div>

            <div className="pd-actions">
              <button className="btn-primary" onClick={() => navigate("/contact#inquiry")}>Download Brochure</button>
              <button className="btn-outline" onClick={() => navigate("/contact#inquiry")}>Register Interest</button>
            </div>
          </div>

          <div className="pd-sidebar">
            <div className="pd-contact-card">
              <div className="pd-agent">
                <img src={meganMain} alt="Megan Rekhi" />
                <div>
                  <strong>Megan Rekhi</strong>
                  <p>Salesperson, HomeLife/Miracle Realty Ltd.</p>
                  <a href="tel:+16476931222">(647) 693-1222</a>
                </div>
              </div>

              <div id="inquiry">
                <LeadForm
                  context={`Property Inquiry: ${p.name}`}
                  title="Get More Information"
                  subtitle="Request details about pricing, floor plans, and availability for this project."
                  buttonText="Send Inquiry"
                  isStacked={true}
                />
              </div>
            </div>

            <div className="pd-info-box">
              <h4>Advisory Note</h4>
              <p>All property details, pricing, and availability are subject to change. Contact us to verify current information before making any decisions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section id="related-properties" className="section-alt">
        <div className="container">
          <div style={{ marginBottom: 40 }}>
            <span className="section-label">More Properties</span>
            <h2 className="section-title">You May Also Like</h2>
          </div>
          <div className="pd-related-grid">
            {related.map((rp) => (
              <div key={rp.id} className="listing-card" onClick={() => { navigate("/property-detail/" + slugify(rp.name), { state: rp }); }} style={{ cursor: "pointer" }}>
                <div className="listing-img-wrap">
                  <img src={rp.img} alt={rp.name} />
                  <span className="listing-badge">{rp.status}</span>
                </div>
                <div className="listing-body">
                  <p className="listing-loc">📍 {rp.location}</p>
                  {rp.priceFrom && !isNaN(rp.priceFrom) && <p className="listing-price">From ${rp.priceFrom.toLocaleString()}</p>}
                  <h3 className="listing-title">{rp.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="cta-banner">
        <div className="container">
          <h2>Ready to take the next step?</h2>
          <p>Book a private consultation with our advisory team</p>
          <button className="btn-primary" onClick={() => navigate("/contact#inquiry")}>Book a Consultation</button>
        </div>
      </div>
    </div>
  );
}
