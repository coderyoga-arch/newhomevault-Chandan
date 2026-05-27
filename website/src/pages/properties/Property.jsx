import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { propertyService } from "../../services/supabaseService";
import { properties as mockProperties } from "../../utils/mockData";
import meganMain from "../../assets/images/megan_main.png";
import "./Property.css";

export default function Property() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProperties() {
      try {
        const data = await propertyService.fetchProperties();
        if (data) {
          setProperties(data);
        }
      } catch (err) {
        console.error("Failed to load properties from database:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProperties();
  }, []);

  return (
    <div>
      <div className="page-banner">
        <h1>Property Listing</h1>
        <div className="breadcrumb">
          <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>Home</span>
          <span style={{ cursor: 'default', color: 'rgba(255,255,255,0.4)' }}>›</span>
          <span style={{ cursor: 'default', color: 'rgba(255,255,255,0.6)' }}>Property Listing</span>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div className="spinner" style={{
                width: "40px",
                height: "40px",
                border: "3px solid rgba(184, 149, 42, 0.1)",
                borderTop: "3px solid var(--gold)",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 20px"
              }}></div>
              <p style={{ color: "var(--slate)", letterSpacing: "1px" }}>Loading Properties...</p>
              <style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          ) : (
            <div className="property-grid">
              {properties.length > 0 ? (
                properties.map((p) => (
                  <div key={p.id} className="property-card" onClick={() => navigate("/property-detail", { state: p })}>
                    <div className="property-img-wrap">
                      <img src={p.img || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80"} alt={p.name} />
                      <span className="property-badge">{p.status}</span>
                      <div className="property-author">
                        <img src={meganMain} alt="Megan Rekhi" />
                      </div>
                    </div>
                    <div className="property-body">
                      <h3 className="mgmt-prop-name" style={{ fontSize: 20, color: "var(--navy)", fontWeight: 600 }}>{p.name}</h3>
                      <p className="property-loc">📍 {p.location}</p>
                      {p.priceFrom && (
                        <p className="property-price">From ${p.priceFrom.toLocaleString()}</p>
                      )}
                      <button className="property-btn">View Details →</button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "80px 20px", border: "1px dashed var(--border)", background: "white", borderRadius: "4px" }}>
                  <p style={{ color: "var(--slate)", fontSize: "16px" }}>No active pre-construction developments listed in the database currently.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <div className="cta-banner">
        <div className="container">
          <h2>Looking for a dream home?</h2>
          <p>We can help you realize your dream of a new home</p>
          <button className="btn-primary" onClick={() => navigate("/contact")}>Explore Properties</button>
        </div>
      </div>
    </div>
  );
}
